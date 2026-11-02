import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import ExcelJS from 'exceljs';
import { createWorker } from 'tesseract.js';
import { PDFParse } from 'pdf-parse';

const serviceAliases={luz:['epec','electricidad','energia','energía','luz'],agua:['aguas cordobesas','agua'],gas:['ecogas','gas'],municipalidad:['municipalidad','municipal','muni','impuesto municipal'],expensas:['expensas','expensa','exp.'],alquiler:['alquiler']};
export const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');
export const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
export async function extract(file){
 const type=file.mimetype; if(type==='application/pdf'){
   const parser=new PDFParse({data:await fs.readFile(file.path)}); const out=await parser.getText(); await parser.destroy();
   return {text:out.text||'',source:'texto PDF'};
 }
 if(!type.startsWith('image/')) throw new Error('Formato no admitido');
 const worker=await createWorker('spa+eng'); try{const {data}=await worker.recognize(file.path);return {text:data.text||'',source:`OCR (${Math.round(data.confidence||0)}%)`,confidence:data.confidence||0};}finally{await worker.terminate();}
}
export function parse(text, workbookMeta){
 const t=String(text||'').replace(/\s+/g,' ').trim(); const lower=t.toLowerCase(); const foundServices=Object.entries(serviceAliases).filter(([,a])=>a.some(x=>lower.includes(x))).map(([k])=>k);
 // Un número aislado puede ser un año, fecha o número de comprobante. Solo
 // aceptamos importes que estén junto a un indicador contable explícito.
 const money='([0-9]{1,3}(?:\\.[0-9]{3})*(?:,[0-9]{2})?|[0-9]+,[0-9]{2})';
 const labeled=[...t.matchAll(new RegExp(`(?:total|importe|monto)\\s*(?:pagado|abonado|a pagar)?\\s*[:\\-]?\\s*\\$?\\s*${money}(?![0-9])`,'gi'))].map(m=>m[1]);
 const currency=[...t.matchAll(new RegExp(`\\$\\s*${money}(?![0-9])`,'g'))].map(m=>m[1]);
 const amounts=[...new Set((labeled.length?labeled:currency).map(v=>Number(v.replace(/\./g,'').replace(',','.'))).filter(v=>v>50&&v<1e9))];
 const paid=/pagad|abonad|transferen|comprobante|recibo/i.test(t); const periods=[...t.matchAll(/\b(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s*(?:de)?\s*(20\d{2})?/gi)].map(m=>m[0]);
 const properties=workbookMeta.properties.filter(p=>norm(p).length>2&&lower.includes(norm(p)));
 let reasons=[]; if(!t||t.length<12) reasons.push('No se extrajo texto suficiente.'); if(foundServices.length!==1) reasons.push(foundServices.length?'Hay más de un concepto posible.':'No se identificó un servicio.'); if(properties.length!==1) reasons.push(properties.length?'Hay más de una propiedad posible.':'No se identificó una propiedad con evidencia.'); if(amounts.length!==1) reasons.push(amounts.length?'Hay varios importes posibles.':'No se identificó un importe.'); if(!paid) reasons.push('No hay evidencia clara de pago efectuado.'); if(periods.length!==1) reasons.push('No se identificó un período único.');
 const service=foundServices[0]||null, property=properties[0]||null, amount=amounts[0]||null, period=periods[0]||null; const row=service&&property?workbookMeta.rows.find(r=>norm(r).includes(norm(service))&&norm(r).includes(norm(property))):null; const column=workbookMeta.targets?.length?'Pagado':(period?workbookMeta.columns.find(c=>norm(c).includes(norm(period))):null);
 if(!row||!column) reasons.push('No se encontró una fila o columna compatible en la planilla.');
 return {text:t,service,property,amount,period,row,column,status:reasons.length?'PENDIENTE DE REVISION':'LISTO PARA REGISTRAR',reasons};
}
export async function inspectExcel(path){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(path);const sheet=wb.worksheets[0];let values=[],targets=[];sheet.eachRow((row,n)=>row.eachCell((cell,c)=>{if(cell.value!=null) values.push({v:String(cell.text||cell.value),n,c});}));
 // Libro Alquileres IA: conceptos en D y montos pagados en E. La detección
 // se conserva genérica para otras plantillas, pero usa este par cuando existe.
 for(let n=1;n<=sheet.rowCount;n++){const label=String(sheet.getCell(n,4).text||'');if(label)targets.push({label,rowIndex:n,colIndex:5,address:sheet.getCell(n,5).address});}
 const entries=values.map(x=>x.v), properties=[...new Set(entries.flatMap(v=>['Chacabuco','Urquiza','Rondeau','Salguero'].filter(p=>norm(v).includes(norm(p)))) )];
 return {sheet:sheet.name,properties,rows:targets.map(x=>x.label),columns:['Pagado'],targets,preview:values.slice(0,120)};}
export async function writeExcel(template,changes,out){const wb=new ExcelJS.Workbook();await wb.xlsx.readFile(template);const sheet=wb.worksheets[0];for(const ch of changes){const row=sheet.getRow(ch.rowIndex),cell=row.getCell(ch.colIndex);const current=cell.value;const occupied=current!==null&&current!==undefined&&current!==0&&current!=='';if(occupied) throw new Error(`La celda ${cell.address} ya contiene un importe (${current}).`);cell.value=ch.amount;}await wb.xlsx.writeFile(out);}
