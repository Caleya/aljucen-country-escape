# Plan: Página web para Casa Rural La Plata (Aljucén)

## Objetivo
Crear una landing page de una sola página para promocionar la Casa Rural La Plata en Aljucén (Extremadura), con estilo rústico y acogedor, información de contacto visible e imágenes generadas como placeholders.

## Información de partida confirmada
- **Nombre:** Casa Rural La Plata
- **Dirección:** 9 Calle San Andrés, 06894 Aljucén, España
- **Puntuación:** 9,3/10 (492 comentarios en Booking.com)
- **Categorías destacadas:** Personal 9,6 · Instalaciones 9,6 · Limpieza 9,6 · Confort 9,6 · Relación calidad-precio 9,6 · Ubicación 9,4
- **Servicios principales:** WiFi gratis, parking gratis, aire acondicionado, jardín, salón de uso común, terraza, cocina compartida, habitaciones sin humo, habitaciones familiares, tetera/cafetera en habitaciones.
- **Habitaciones:** Doble Grande (20 m²), Doble con balcón, Doble con vistas a la montaña. Todas con baño privado, TV de pantalla plana, lavavajillas, calefacción, secador de pelo.
- **Entorno:** a 15 km de Mérida (Acueducto de los Milagros, Basílica de Santa Eulalia), 17 km del Teatro y Anfiteatro Romano, 59 km del aeropuerto de Badajoz.
- **Normas:** entrada 13:00-23:00, salida 8:00-11:00.
- **Preferencias del usuario:** estilo rústico y acogedor, imágenes placeholder, solo información de contacto (sin formulario).

## Estructura de la página

1. **Hero**
   - Imagen principal generada: fachada o patio de casa rural extremeña.
   - Título "Casa Rural La Plata".
   - Subtítulo con ubicación y puntuación destacada.
   - Botón de CTA a la sección de contacto.

2. **Sobre la casa**
   - Breve descripción con encanto rural.
   - Badges de puntuación (9,3), nº de opiniones y servicios estrella.

3. **Habitaciones**
   - 3 tarjetas: Doble Grande, Doble con balcón, Doble con vistas a la montaña.
   - Lista de amenities por habitación.

4. **Servicios e instalaciones**
   - Grid visual con iconos para WiFi, parking, aire acondicionado, jardín, terraza, cocina compartida, etc.

5. **Ubicación y entorno**
   - Descripción de Aljucén y distancias a puntos de interés.
   - Imagen generada del entorno natural.

6. **Opiniones de huéspedes**
   - 3-4 testimonios reales extraídos de Booking.com.

7. **Contacto**
   - Teléfono, email, WhatsApp y dirección completos.
   - Botones con `tel:`, `mailto:` y enlace a WhatsApp.
   - Horarios de entrada y salida.

8. **Footer**
   - Copyright y enlace a Booking.com (opcional).

## Diseño y estilo
- **Dirección visual:** rústica y acogedora, con tonos tierra, madera, beige y verde oliva.
- **Tipografía:** serif clásica para títulos, sans-serif legible para cuerpo.
- **Tokens CSS:** ajustar `src/styles.css` con paleta cálida (marrón, arena, verde musgo) manteniendo el sistema de variables semánticas.
- **Componentes:** usar shadcn/ui existentes si los hay; si no, crear componentes locales simples.
- **Responsive:** diseño mobile-first, navegación simple o ancla a secciones.

## Imágenes
- Generar 4-5 imágenes placeholder con imagegen:
  1. Fachada/patio de casa rural extremeña.
  2. Interior acogedor (salón o dormitorio).
  3. Terraza/jardín con vegetación.
  4. Entorno natural de Aljucén/Extremadura.
  5. Detalle decorativo rústico.
- Guardar en `src/assets/` e importar en los componentes.

## SEO y metadatos
- Título: "Casa Rural La Plata | Alojamiento en Aljucén, Extremadura"
- Descripción: "Casa Rural La Plata en Aljucén. Alojamiento con encanto, WiFi y parking gratis. A 15 km de Mérida. Reserva directa por teléfono o WhatsApp."
- `og:title`, `og:description`, `og:type`, `twitter:card` en `src/routes/index.tsx`.
- Reemplazar el placeholder actual de `src/routes/index.tsx`.

## Técnica
- Reemplazar `src/routes/index.tsx` por la landing page completa.
- Crear componentes auxiliares en `src/components/` si es necesario para mantener el archivo de ruta legible.
- No requiere backend ni base de datos: solo contenido estático e información de contacto.
- Verificar build y preview tras los cambios.

## Entregable
Landing page publicable en `/` con toda la información de Casa Rural La Plata, lista para que el usuario sustituya las imágenes placeholder por fotos reales cuando las tenga.