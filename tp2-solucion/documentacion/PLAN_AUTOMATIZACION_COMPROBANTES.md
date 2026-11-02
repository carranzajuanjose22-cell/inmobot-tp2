# Plan de automatización de comprobantes

## Diagnóstico del proyecto existente

El proyecto conserva la presentación académica estática en `web/dist` y los documentos de análisis, plan y resolución. No existe backend, motor OCR, almacenamiento de archivos ni integración con Excel. Tampoco se encontró `Libro Alquileres.xlsx` ni otra planilla en la carpeta de trabajo; por eso no es posible afirmar todavía cuáles son sus filas, períodos o columnas reales.

La presentación se conservará. La aplicación operativa se agrega en `app-local` para que pueda ejecutarse localmente durante la exposición sin depender del sitio publicado.

## Arquitectura seleccionada

- **Frontend local:** HTML, CSS y JavaScript, servido por Express. Permite una instalación simple para la clase.
- **Backend:** Node.js + Express. Recibe archivos, contiene reglas y nunca expone claves en el navegador.
- **PDF digital:** extracción de texto con `pdf-parse`.
- **Imágenes:** OCR real con Tesseract.js.
- **Excel:** ExcelJS. Lee hojas, conserva las demás celdas y genera una copia descargable.
- **Persistencia temporal:** archivos y resultados se guardan en directorios locales ignorados por Git. No se suben comprobantes a servicios externos.

## Flujo de procesamiento

1. Se carga una plantilla Excel y uno o varios comprobantes.
2. El backend valida extensión, MIME y tamaño.
3. Extrae texto del PDF digital o ejecuta OCR sobre imagen.
4. Normaliza texto, importes y fechas.
5. Detecta servicio, propiedad, período y monto con evidencia explícita.
6. Inspecciona la planilla cargada para localizar filas y encabezados de período.
7. Calcula estado: pendiente, rechazado, duplicado o listo para revisar.
8. El usuario confirma manualmente los registros válidos.
9. El backend crea una copia del Excel, preservando el resto del libro, y la ofrece para descarga.

## Reglas de clasificación

- Luz: EPEC, electricidad, energía, luz.
- Agua: Aguas Cordobesas, agua.
- Gas: Ecogas, gas.
- Municipalidad: muni, municipalidad, impuesto municipal.
- Expensas y alquiler solo se asignan con texto explícito.
- La propiedad se reconoce por una coincidencia normalizada con los encabezados/filas reales de la planilla o por una dirección configurada por el usuario. Una coincidencia débil no se registra.
- Solo se considera un monto cuando hay un indicador de pago o un único total inequívoco. Varios importes sin contexto quedan pendientes.

## Escritura segura en Excel

- Nunca se modifica el archivo original: la descarga es una copia nueva.
- Antes de escribir, se compara el valor actual de la celda. Una celda no vacía genera conflicto y exige decisión explícita.
- Se usa hash SHA-256 del comprobante y una clave compuesta de propiedad, concepto, período e importe para advertir duplicados.
- Sin fila, columna, importe o confirmación humana, no hay escritura.

## Riesgos y límites actuales

- Falta la planilla real. El motor puede inspeccionar una plantilla cargada, pero el mapeo definitivo y las pruebas de escritura reales requieren que `Libro Alquileres.xlsx` sea incorporado al proyecto.
- OCR depende de la calidad del comprobante. Si no hay texto suficiente, el resultado queda pendiente, no se completa con suposiciones.
- Un PDF escaneado requiere rasterización adicional. La primera versión informa claramente cuando el PDF no contiene texto; se podrá añadir renderizado OCR al incorporar la utilidad de conversión adecuada.

## Etapas y pruebas

1. Implementar recepción, extracción, clasificación, revisión y descarga.
2. Probar imagen y PDF digital legibles, múltiples archivos, importe ambiguo, archivo ajeno y duplicado.
3. Cargar la planilla real, inspeccionar sus hojas/encabezados y ajustar el mapeo.
4. Probar conflictos de celda ocupada, fórmulas, estilos y dos pagos legítimos.
5. Integrar el flujo operativo a la demostración académica.
