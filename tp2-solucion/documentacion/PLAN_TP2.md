# Plan de resolución del TP2

## Fase 1 — Modelar el problema

**Tarea:** convertir el circuito manual en una secuencia verificable: recibir archivo, leer evidencia, reconocer propiedad/concepto/monto, mapear fila y validar.

**Justificación:** responde a la situación de comprobantes diversos y a la exigencia de comportamiento integral.

**Finalización:** existe una ficha de diseño con alcance, reglas y limitaciones explícitas.

## Fase 2 — Diseñar el agente

**Tarea:** redactar el prompt del sistema con prioridades de evidencia, reglas de no invención, formato de salida y consultas de aclaración.

**Herramientas:** un asistente multimodal que acepte PDF/imágenes, una planilla de mapeo y revisión humana previa a Excel.

**Finalización:** el prompt permite procesar cada documento de manera consistente y no habilita una carga cuando falta un dato crítico.

## Fase 3 — Probar cinco situaciones

**Tarea:** ejecutar o simular casos representativos y registrar entrada, salida, resultado y ajuste posible.

**Justificación:** la guía exige cinco pruebas: dos normales, una inesperada, una incompleta y una fuera de alcance.

**Finalización:** cada caso tiene una decisión clara: preparado para revisión, requiere aclaración o rechazado.

## Fase 4 — Mejorar y verificar

**Tarea:** usar el caso de transferencia con motivo "Varios" para detectar el riesgo de clasificar sin evidencia; agregar una regla de evidencia mínima y repetir la prueba.

**Finalización:** el agente solicita la asignación del pago en vez de mapearlo a una fila por intuición.

## Fase 5 — Presentar

**Tarea:** recorrer problema, flujo, reglas, pruebas, mejora y conclusión en una página con navegación por teclado.

**Criterio de exposición:** cada diapositiva debe responder una pregunta: qué problema existe, cómo decide el agente, cómo evita errores y qué demuestran las pruebas.
