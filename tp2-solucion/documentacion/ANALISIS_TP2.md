# Análisis del TP2

## Tema

Diseño, configuración, prueba y mejora de un agente de inteligencia artificial para la gestión inmobiliaria y el control de cobranzas.

## Objetivo general

Diseñar un agente que interprete comprobantes de servicios, impuestos y alquileres recibidos en PDF o imagen, identifique datos verificables y los deje listos para su carga en una planilla de control, sin inventar información ante evidencia insuficiente.

## Objetivos específicos

- Definir la identidad, el usuario destinatario, el alcance y las limitaciones del agente.
- Establecer reglas de extracción, clasificación y mapeo hacia filas de Excel.
- Probar el comportamiento con cinco escenarios: dos normales, uno ambiguo, uno incompleto y uno fuera de alcance.
- Detectar un fallo, corregir las reglas y verificar el cambio.

## Resumen de la consigna

La administración recibe comprobantes heterogéneos: tickets de homebanking, transferencias de Mercado Pago y facturas PDF. La tarea manual de reconocer la propiedad, el servicio y el importe genera demoras y errores. El TP2 exige un comportamiento integral de agente, no una pregunta aislada a un chatbot. La salida esperada debe distinguir lo confirmado de lo incierto y orientar la carga en la planilla `Libro Alquileres.xlsx`.

## Actividades obligatorias

1. Completar una ficha conceptual con nombre, objetivo, destinatario, funcionalidades, entradas, reglas, comportamiento y limitaciones.
2. Redactar instrucciones del agente que indiquen cómo actuar frente a cada archivo.
3. Registrar al menos cinco pruebas concretas, con entrada, respuesta obtenida, evaluación y mejora posible.
4. Identificar al menos un fallo, modificar reglas o instrucciones, volver a probar y explicar el motivo del cambio.

## Requisitos observados

- Entradas: PDF, JPEG, PNG, capturas de transferencias y tickets.
- Datos a detectar: propiedad, período si aparece, servicio o concepto, monto total y fila destino en Excel.
- Servicios contemplados: luz, agua, gas, expensas, municipalidad y alquiler.
- No se deben asumir importes ni conceptos cuando el archivo es ilegible, incompleto o ambiguo.
- Deben alertarse comprobantes de otra propiedad o no relacionados con la gestión.
- Deben conservarse decimales y centavos.

## Conocimientos y decisiones requeridas

Se requieren diseño de prompts, lectura crítica de comprobantes, normalización de importes argentinos, clasificación de datos y validación humana. La solución propone una salida estructurada y estados de confianza para evitar que una inferencia se convierta en un dato contable.

## Aspectos que requieren atención

- La consigna menciona una planilla, pero no incluye el listado real de filas. Se usa un mapa propuesto y editable; debe reemplazarse por los nombres exactos de `Libro Alquileres.xlsx` antes del uso real.
- No se adjuntaron comprobantes reales. Las cinco pruebas se documentan como casos ficticios reproducibles, tal como permite la consigna.
- La demostración web es un prototipo didáctico de reglas y trazabilidad; no se presenta como OCR ni como integración real con Excel.

## Criterios de resolución completa

El TP2 queda resuelto cuando la ficha y el prompt definen el comportamiento, las cinco pruebas muestran resultados y límites, la mejora está justificada y se puede explicar cómo un resultado confirmado se prepara para la planilla sin cargar automáticamente una respuesta dudosa.
