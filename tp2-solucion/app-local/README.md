# InmoControl Operativo

Aplicación local para cargar una planilla Excel y comprobantes PDF, JPG o PNG.

## Ejecutar

```powershell
cd "tp2-solucion\app-local"
pnpm start
```

Abrir `http://localhost:3000`.

## Uso

1. Cargar primero la plantilla `.xlsx` real.
2. Cargar uno o varios comprobantes.
3. Revisar los resultados. Solo los casos marcados `LISTO PARA REGISTRAR` pueden seleccionarse.
4. Descargar la copia actualizada del Excel.

Los archivos se procesan de forma local. El sistema no reemplaza valores existentes, no modifica el Excel original y deja como pendientes los casos sin evidencia suficiente.

## Límite pendiente

Debe incorporarse el `Libro Alquileres.xlsx` real para ajustar y comprobar el mapeo de filas y períodos. Sin ese archivo no se puede validar la ubicación definitiva de las celdas ni una escritura con datos reales.
