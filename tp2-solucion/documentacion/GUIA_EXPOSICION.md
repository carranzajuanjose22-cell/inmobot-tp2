# Guía de exposición oral

## Apertura (30 segundos)

“Nuestro proyecto aborda un problema cotidiano: una administración recibe comprobantes en formatos distintos y hoy debe clasificarlos manualmente. Diseñamos un agente que prepara cada registro para revisión, pero que nunca inventa datos ni reemplaza la decisión contable.”

## Recorrido sugerido

1. **Problema:** mostrar los formatos heterogéneos y el riesgo de carga manual.
2. **Diseño:** explicar que el agente recibe un archivo, busca evidencia, clasifica y propone una fila de Excel.
3. **Reglas:** destacar la regla central: si falta propiedad, concepto o monto, pregunta; no completa por intuición.
4. **Pruebas:** recorrer los cinco escenarios, especialmente la transferencia con “Varios”.
5. **Mejora:** explicar que el primer comportamiento era demasiado confiado y cómo la nueva regla lo corrige.
6. **Cierre:** remarcar que se acelera la preclasificación manteniendo trazabilidad y control humano.

## Cómo explicar lo técnico

- **Prompt del sistema:** “es el manual de trabajo del agente: define qué debe buscar y qué no está autorizado a hacer”.
- **Mapeo a Excel:** “traduce un concepto reconocido, por ejemplo Gas + Chacabuco, a la fila acordada de la planilla”.
- **Estado de confianza:** “no basta una respuesta: el estado nos dice si está listo para revisar, si falta información o si el archivo no corresponde”.

## Demostración recomendada

En la web, usar el selector de casos y empezar por el ticket claro. Luego elegir “Motivo: Varios” para mostrar que el prototipo bloquea la clasificación y solicita una aclaración. Concluir con el caso de imagen recortada para reforzar la política de no inventar.

## Posibles preguntas y respuestas

**¿El agente reemplaza al administrador?** No. Prepara una propuesta trazable; la revisión y carga final siguen siendo humanas.

**¿Cómo evita equivocarse?** Solo confirma una fila si la evidencia contiene los datos críticos. Ante ambigüedad, deja el caso en aclaración.

**¿Qué ocurriría con una factura con varios conceptos?** Genera registros separados o pide el desglose necesario; no convierte varios importes en un único registro ambiguo.

**¿Puede conectarse con Excel?** Es posible mediante una automatización posterior, pero para este TP2 se mantiene una etapa de revisión antes de cualquier escritura.

## Cierre

“La solución no promete infalibilidad. Su aporte es hacer visible la evidencia, separar lo confirmado de lo dudoso y ayudar a que el administrador llegue más rápido a una carga correcta.”
