# Mejoras: contacto, formulario de reserva y zonas comunes

## 1. Datos de contacto actualizados
- Teléfono: **691 231 248** (`tel:+34691231248`) en la sección de contacto, en el pie y en el hero.
- WhatsApp: mismo número (`https://wa.me/34691231248`).
- Email: **casarurallaplata@gmail.com** (`mailto:`) en contacto, pie y datos estructurados JSON-LD.

## 2. Prioridad visual: "Llamar ahora" por encima de Booking
- El botón **Llamar ahora** pasa a ser el CTA principal: tamaño grande, color primario (terracota), icono de teléfono, y colocado primero en hero y en "¿Hablamos?".
- Se añade un texto corto tipo "Reserva directa por teléfono: mejor precio y disponibilidad".
- El botón de Booking se mantiene pero como enlace secundario discreto (estilo `outline`/enlace, tamaño menor), tanto en contacto como en el pie.

## 3. Formulario de solicitud de reserva
Nueva sección con formulario (validación con zod, mensajes en español):
- Al enviar se genera un **PDF** con los datos, descargable al instante.
- A la vez se abre el correo del usuario con destinatario casarurallaplata@gmail.com, asunto y cuerpo ya rellenados, para que solo tenga que adjuntar el PDF y darle a enviar.
- Sin backend ni base de datos (opción elegida). Si más adelante quieres envío 100% automático sin abrir el correo, se puede añadir con Lovable Cloud y un dominio de email propio.

**Campos:** pendiente de la imagen `.jpg` con el formulario que quieres replicar. Adjúntala en el chat (botón +) y monto los campos exactamente igual. Si prefieres no esperar, arranco con: nombre, teléfono, email, fecha de entrada, fecha de salida, nº de personas, habitación de interés y observaciones.

## 4. Apartado "Zonas comunes"
- Nueva sección entre "Habitaciones" y "Servicios" con una galería (mismo estilo de lightbox que las habitaciones) para las zonas compartidas por las 3 habitaciones: salón, cocina, comedor y terraza.
- De partida se reutilizan las fotos ya subidas de salón, cocina, comedor y terraza; cuando me pases las fotos específicas de zonas comunes las sustituyo/añado.

## Técnica
- Generación de PDF en cliente con `jspdf` (nueva dependencia ligera).
- Formulario con `react-hook-form` + `zod` y componentes shadcn ya presentes.
- Fotos nuevas vía `lovable-assets`.
- Verificación con build y captura de pantalla del formulario y del PDF generado.
