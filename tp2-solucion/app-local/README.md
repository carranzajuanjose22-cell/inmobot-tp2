# InmoControl Operativo

Aplicación local para cargar una planilla Excel y comprobantes PDF, JPG o PNG.

## Ejecutar

```powershell
cd "tp2-solucion\app-local"
pnpm start
```

Abrir `http://localhost:3000`.

## Uso

1. La aplicación inicia con `plantilla/Libro Alquileres IA.xlsx`, incluido en el repositorio.
2. Cargar uno o varios comprobantes.
3. Revisar los resultados. Solo los casos marcados `LISTO PARA REGISTRAR` pueden seleccionarse.
4. Guardar en el Excel principal (con respaldo automático) o descargar una copia.

Los archivos se procesan de forma local. El sistema no reemplaza valores existentes, no modifica el Excel original y deja como pendientes los casos sin evidencia suficiente.

La configuración permite cambiar la ruta del Excel principal por otra plantilla local cuando sea necesario.
