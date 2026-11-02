# Resolución del TP2

## 1. Ficha de diseño del agente

| Elemento | Definición propuesta |
|---|---|
| Nombre | **InmoControl Cobranzas** |
| Objetivo | Extraer datos verificables de comprobantes, clasificarlos por propiedad y concepto, y preparar una propuesta de fila para su revisión antes de Excel. |
| Usuario destinatario | Administrador/a o gestor/a inmobiliario/a. |
| Entradas | PDF, JPEG, PNG, captura de transferencia o ticket; listado de propiedades y filas válidas de la planilla. |
| Funcionalidades | Identificar propiedad, período si figura, concepto, importe total, evidencia y fila propuesta; alertar ambigüedades. |
| Salida | Registro estructurado con estado: `CONFIRMADO`, `REQUIERE_ACLARACION` o `FUERA_DE_ALCANCE`. |
| Limitaciones | No reemplaza la revisión contable; no deduce datos ocultos, no carga Excel por sí solo y no valida la autenticidad del comprobante. |

### Mapa inicial de filas

| Propiedad | Luz | Gas | Agua | Expensas | Municipalidad | Alquiler |
|---|---|---|---|---|---|---|
| Chacabuco | luz chacabuco | gas chacabuco | agua chacabuco | expensas chacab. | muni chacabuco | alquiler chacabuco |
| Urquiza | luz urquiza | gas urquiza | agua urquiza | expensas urquiza | muni urquiza | alquiler urquiza |
| Rondeau | luz rondeau | gas rondeau | agua rondeau | expensas rondeau | muni rondeau | alquiler rondeau |

Este mapa es un modelo: antes de operar debe cotejarse con los encabezados reales de la planilla.

## 2. Instrucciones del agente

```text
Eres InmoControl Cobranzas, un asistente de preclasificación para una administración inmobiliaria.
Tu tarea es leer comprobantes de servicios, impuestos o alquileres y preparar una propuesta para revisión humana. No registras ni modificas la planilla.

Para cada archivo:
1. Determina si es un comprobante pertinente. Si no lo es, devuelve FUERA_DE_ALCANCE y explica por qué.
2. Extrae solo lo legible: propiedad, fecha/período, emisor, concepto y monto total pagado en pesos.
3. Normaliza el monto sin perder centavos; por ejemplo, "$ 9.535,67" se informa como 9535.67 y se conserva el texto original como evidencia.
4. Clasifica el concepto únicamente entre Luz, Agua, Gas, Expensas, Municipalidad y Alquiler cuando la evidencia sea explícita.
5. Mapea propiedad + concepto a una fila del listado autorizado. No inventes una fila ni una propiedad.
6. Si falta el monto, la propiedad o el concepto, si el documento es borroso, o si hay más de un concepto sin desglose suficiente, responde REQUIERE_ACLARACION. Indica exactamente qué dato falta y formula una pregunta breve.
7. Si el motivo dice "Varios" o es genérico, nunca asumas el servicio: solicita el detalle o comprobante complementario.

Devuelve siempre:
Estado | Propiedad | Concepto | Período | Monto original | Monto normalizado | Fila propuesta | Evidencia | Acción siguiente.
```

## 3. Pruebas y resultados

| Nº | Caso | Resultado del agente | ¿Funcionó? | Ajuste / lectura |
|---|---|---|---|---|
| 1 | Ticket claro: Gas Chacabuco, $9.535,67 | `CONFIRMADO`; fila `gas chacabuco`; monto 9535.67 | Sí | La evidencia contiene los tres datos críticos. |
| 2 | PDF: Alquiler $450.000, Expensas $38.500 y Luz $12.900 de Urquiza | `REQUIERE_ACLARACION`; tres registros propuestos, sin elegir un "monto total" único | Sí | Evita perder el desglose; se revisa cada fila. |
| 3 | Mercado Pago: "Motivo: Varios", $25.000 | Primer diseño: propuso Expensas. Diseño corregido: `REQUIERE_ACLARACION` | No al inicio; sí tras mejora | El motivo no identifica el concepto. |
| 4 | Imagen con servicio visible pero total recortado | `REQUIERE_ACLARACION`; no propone monto ni fila final | Sí | Solicita imagen completa o monto escrito. |
| 5 | Ticket de supermercado o comprobante de Urquiza en carpeta Chacabuco | `FUERA_DE_ALCANCE` o alerta de discrepancia | Sí | Se evita contaminar el control de la propiedad. |

## 4. Mejora aplicada

**Fallo encontrado:** ante una transferencia de Mercado Pago con el texto "Varios", una versión inicial asociaba el pago a Expensas por contexto. Esto es riesgoso: un importe plausible no es evidencia contable.

**Cambio:** se agregó la regla 7 del prompt y se impuso una condición: solo se crea una fila propuesta cuando propiedad, concepto e importe son legibles o están aportados explícitamente por el usuario.

**Nueva prueba del caso 3:** la salida correcta es `REQUIERE_ACLARACION`, con la pregunta: “¿A qué servicio y propiedad corresponde la transferencia de $25.000? Adjuntá el comprobante o indicá el concepto.” El cambio reduce falsos positivos y conserva la decisión final en manos del administrador.

## 5. Conclusión técnica

El valor del agente no es “adivinar” datos sino convertir documentos variados en una preclasificación trazable. La combinación de extracción estructurada, estados de confianza y revisión humana permite ganar tiempo sin comprometer la calidad del registro.
