# Descubre con imágenes, formulario oficial y arreglos en móvil

## 1. Apartado "Descubre" replanteado

Se cambia el bloque actual (lista de textos con icono) por una **rejilla de tarjetas con imagen** (3 columnas en escritorio, 1 en móvil), cada una con foto, título y descripción breve:

1. Mérida y su Teatro Romano (15 km)
2. Dólmenes de Lácara
3. Parque Natural de Cornalvo
4. **Rutas de senderismo** (nuevo) — Camino de Santiago Vía de la Plata, riberos del Aljucén y senderos de Cornalvo
5. **Cáceres y su cuartel** (nuevo) — casco histórico Patrimonio de la Humanidad y cercanía al acuartelamiento
6. Aeropuerto de Badajoz (59 km)

- Las imágenes se generan con IA (una por tarjeta), en el mismo estilo cálido y rústico de la web.
- Se mantiene el botón "Ver ubicación en Google Maps" debajo de la rejilla.
- Nota: dime la distancia exacta a Cáceres y al cuartel y ajusto el texto; de partida pongo "a poco más de 1 hora".

## 2. Formulario idéntico al parte de entrada de viajeros

El formulario de la web pasa a recoger **todos los campos** del documento, agrupados en bloques:

- **Datos de la reserva:** referencia, fecha del contrato, fecha de entrada y salida, nº de personas, nº de habitaciones.
- **Información del pago:** tipo de pago, medios de pago, titular del pago, fecha de pago.
- **Datos del titular:** nombre, primer y segundo apellido, fecha de nacimiento, nacionalidad, sexo, tipo de documento, documento, soporte del documento, teléfono, teléfono adicional, correo.
- **Dirección del titular:** dirección, dirección adicional, país, provincia, municipio, código postal.
- **Datos del viajero** y **dirección del viajero:** mismos campos más parentesco, con una casilla **"Los datos del viajero son los mismos que los del titular"** que los rellena automáticamente y los mantiene sincronizados.

El **PDF generado replica el documento**: mismas secciones, mismas tablas con las celdas y etiquetas en la misma posición, y el **sello de Casa Rural La Plata** en la esquina superior derecha (recortado de tu escaneo y embebido en el PDF).

## 3. Arreglos en móvil

- **Llamar / WhatsApp:** se revisan todos los botones (cabecera, menú, hero, contacto y barra fija inferior) para que los enlaces `tel:` y `wa.me` se abran correctamente en el navegador móvil, y se comprueba que la barra fija no quede tapada ni bloqueada por otras capas.
- **Descargar PDF y enviar por email:** en móvil falla porque se descarga el PDF y se cambia de página al correo en la misma acción, y el navegador cancela una de las dos. Se separa en dos pasos: al enviar se descarga el PDF y aparece un botón **"Abrir correo con la solicitud"** que el usuario pulsa; así funciona en iPhone y Android.

## Técnica
- Imágenes nuevas generadas con IA y publicadas vía `lovable-assets`.
- `ReservationForm.tsx` reescrito con esquema zod completo por secciones; PDF con `jspdf` dibujando las rejillas de tablas y el sello como imagen embebida.
- Sello extraído del escaneo subido, recortado y subido como asset.
- Verificación: build, captura del formulario en móvil y revisión visual del PDF generado página a página.