## Objetivo
1. Que las fotos de las habitaciones sean pinchables y abran una galería emergente con más fotos reales.
2. Añadir un botón/enlace a Booking en la sección "¿Hablamos?".

## 1. Fotos reales subidas
Subir las 9 fotos aportadas a almacenamiento CDN (Lovable Assets) y repartirlas por habitación:

- **Doble Grande**: salón-comedor con vigas, salón con TV, comedor con mesa.
- **Doble con balcón**: cocina-salón, baño blanco con ducha, baño con lavabo y espejo.
- **Doble con vistas**: dormitorio de dos camas, baño verde/turquesa, terraza con césped y vistas a la iglesia.

La foto principal de cada tarjeta pasará a ser una foto real (dormitorio, salón, terraza) en lugar del placeholder generado. El resto de placeholders (hero, entorno) se mantienen hasta que envíes más fotos.

## 2. Galería emergente (lightbox)
- Cada tarjeta de habitación se vuelve pinchable (cursor, overlay con icono de lupa y texto "Ver fotos", accesible por teclado).
- Al pinchar se abre un `Dialog` con:
  - Carrusel de las fotos de esa habitación (flechas y puntos de navegación, swipe en móvil).
  - Título de la habitación, metros y lista de comodidades.
  - Botón de cierre y cierre con tecla Esc.
- Componente nuevo `src/components/RoomGalleryDialog.tsx` usando `dialog` y `carousel` de shadcn ya presentes en el proyecto.

## 3. Enlace a Booking
- En la sección "¿Hablamos?" (`#contacto`), junto a teléfono / email / WhatsApp, añadir una tarjeta-botón "Reservar en Booking.com" que abra la URL indicada en pestaña nueva (`target="_blank" rel="noopener noreferrer"`).
- Añadir también el mismo enlace en el pie de página.

## Técnica
- Fotos vía `lovable-assets` (punteros `.asset.json` en `src/assets/`), importados y usados por URL.
- Estructura de datos `rooms` ampliada con un array `photos` por habitación.
- Sin backend ni base de datos.
- Verificación con build y captura de pantalla del diálogo abierto.

Cuando me pases más fotos, las añado a las galerías correspondientes.
