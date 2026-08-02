# Ajustes del PDF, envío por correo, Descubre y Search Console

## 1. PDF del parte de viajeros

- Eliminar del PDF la cabecera con el título/dirección de la casa.
- Eliminar el bloque final de firma, fecha y texto legal.
- Mantener el sello, pero corregir su carga y dibujarlo con proporciones y posición visibles dentro de la primera página.
- Hacer que las celdas crezcan según su contenido: correos, direcciones, nombres y observaciones largos se partirán en varias líneas sin quedar cortados ni salirse de la tabla.
- Mantener los campos y secciones del parte de viajeros, empezando directamente por sus tablas.

## 2. Descarga y apertura del correo en móvil

- Conservar la descarga y el correo como dos acciones separadas.
- Tras generar el PDF, mostrar de forma estable el botón “Abrir correo con la solicitud” y llevar el foco visual hasta ese bloque.
- Simplificar el contenido del enlace de correo para evitar URLs demasiado largas que algunos móviles rechazan.
- Abrir explícitamente la aplicación de correo desde la pulsación del usuario, con destinatario, asunto y resumen breve; el usuario seguirá adjuntando el PDF descargado.
- Mostrar un enlace alternativo visible al correo de la casa por si el dispositivo no tiene una aplicación de correo configurada.

## 3. Reorganización de “Descubre”

- Dejar como tarjetas principales con fotografía únicamente:
  1. Dólmenes de Lácara.
  2. Parque Natural de Cornalvo.
  3. Rutas de senderismo.
- Mostrar debajo, en un bloque secundario más sencillo y sin fotografías, los tres puntos cercanos fuera de Aljucén:
  1. Mérida.
  2. Cáceres y su cuartel.
  3. Aeropuerto de Badajoz.
- Mantener el bloque de ubicación y el enlace a Google Maps.

## 4. Google Search Console y sitemap

- Reutilizar la conexión de Google Search Console que ya está enlazada al proyecto.
- Conservar la etiqueta META existente: la propiedad `https://casa-rural-la-plata.lovable.app/` ya aparece verificada con nivel de propietario.
- Corregir la URL interna del sitemap para evitar la doble barra actual en la entrada de la portada.
- Revisar que `robots.txt` siga apuntando al sitemap publicado.
- Enviar `https://casa-rural-la-plata.lovable.app/sitemap.xml` a la propiedad verificada y comprobar la respuesta de Search Console.

## Verificación

- Generar un PDF de prueba con valores largos y revisar todas sus páginas visualmente.
- Probar descarga, aparición del segundo paso y apertura del correo en una vista móvil.
- Revisar “Descubre” en escritorio y móvil para confirmar la jerarquía de 3 tarjetas con foto + 3 extras sin foto.
- Consultar el estado del sitemap en Search Console después de enviarlo.

## Detalles técnicos

- Los cambios visuales y de PDF se concentran en el formulario y la portada existentes, sin añadir almacenamiento ni recopilar datos en un servidor.
- La aplicación de correo se abre mediante el cliente configurado en el dispositivo; los navegadores no permiten adjuntar automáticamente un archivo local a un correo mediante `mailto:`.