# MiEmpresa — Movilidad y Asistencia

Sitio web responsive para vender sillas de ruedas, muletas y artículos de asistencia.

## Incluye
- Catálogo responsive con filtros y búsqueda.
- Carrito con subtotal, impuestos y total.
- Registro/inicio de sesión local para demo.
- Flujo de checkout con opciones Tarjeta, PSE y PayPal preparado para integración real.
- Botón flotante de WhatsApp con +57 300 000 0000.
- Formulario de cotización mayorista.
- Endpoint de correo que envía solicitudes a `ventas@miempresa.com` vía SMTP.

## Ejecutar localmente
1. Instala Node.js 18+.
2. Ejecuta `npm install`.
3. Copia `.env.example` como `.env` y configura las credenciales SMTP.
4. Ejecuta `npm start`.
5. Abre `http://localhost:3000`.

## Pagos reales
La interfaz incluye el selector de Tarjeta/PSE/PayPal, pero por seguridad no procesa dinero real todavía. Para producción hay que conectar un proveedor (por ejemplo Wompi/Mercado Pago para tarjeta/PSE o PayPal Checkout), crear órdenes en backend, validar webhooks y nunca almacenar datos de tarjeta en este sitio.

## Personalización
Edita `products` en `app.js` para cambiar catálogo, precios y descripciones. Cambia datos de contacto y dominio en `index.html`.
