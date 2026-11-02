# Informe técnico InmoControl IA

## Resumen ejecutivo

InmoControl IA es una aplicación local para clasificar comprobantes de servicios y preparar su registro seguro en un libro de alquileres. El sistema reduce tareas manuales, pero no reemplaza la revisión humana cuando falta evidencia.

## Problema abordado

La administración recibe tickets, capturas y PDFs de distintas fuentes. Identificar el servicio, propiedad e importe de cada documento y trasladarlo a Excel de forma manual consume tiempo y puede generar errores de carga.

## Solución implementada

La aplicación recibe archivos PDF, JPG y PNG. Extrae texto de PDF digitales y utiliza OCR para imágenes. Luego aplica reglas para reconocer servicio, propiedad, período e importe pagado. Solo habilita un registro cuando los datos críticos son consistentes.

## Arquitectura

- Frontend web local con una interfaz de carga, revisión y confirmación.
- Backend Express que recibe archivos, ejecuta extracción y contiene las reglas de validación.
- Tesseract.js para OCR de imágenes.
- PDF Parse para texto de documentos PDF.
- ExcelJS para conservar hojas, fórmulas y formatos al actualizar el libro.

## Integración con Excel

El repositorio incluye la plantilla `Libro Alquileres IA.xlsx`. La aplicación la vincula al iniciar. Para cada comprobante confirmado busca el concepto correspondiente, valida que la celda de pago esté disponible y crea un respaldo antes de guardar cualquier cambio. El usuario puede además descargar una copia en lugar de modificar el libro principal.

## Controles de seguridad

- No se inventan propiedad, concepto, período ni importe.
- Los documentos ambiguos quedan pendientes de revisión.
- Los duplicados se detectan por la huella SHA-256 del archivo.
- Una celda con un importe existente no se sobrescribe.
- Se detecta si el archivo fue movido, no está disponible o está abierto por otra aplicación.
- Cada modificación se registra en un historial local junto con su respaldo.

## Pruebas

Se incluyen comprobantes sintéticos con resultados esperados. Los casos válidos permiten probar luz, gas, agua, municipalidad, expensas y alquiler; los casos ambiguos, ilegibles o duplicados permiten comprobar que el sistema no registra datos sin evidencia suficiente.

## Conclusión

InmoControl IA transforma una tarea de clasificación manual en un flujo controlado: extraer, validar, revisar y registrar. La automatización se usa para acelerar la preparación de datos, mientras que las decisiones inciertas permanecen bajo control del usuario.
