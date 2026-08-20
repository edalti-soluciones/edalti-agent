# SPEC v2 — Sección S3 "Demo en Vivo" · Edalti Solutions

> **Reemplaza al spec v1.** La diferencia clave: la animación ahora refleja **fielmente el flujo de producción** (no una versión condensada), con los datos reales del tenant ya configurado.

**Objetivo:** Reemplazar el mockup genérico de S3 por un demo split-view fiel a lo que Sofi hace en vivo, con dos CTAs (Cal.com + probar a Sofi en WhatsApp).
**Stack:** Vite + React 18 + TS + Tailwind + shadcn/ui. Mobile-first (validar 375–430px primero).
**Colores de marca:** azul `#006DFC` · celeste `#00CBF4` (reutilizar `--gradient-cta` si aplica).
**Regla de integridad:** el guion del sitio debe coincidir con lo que responde el número real. Datos ficticios. Precios (si aparecen) en COP.

---

## Estado previo (ya hecho por Edison — no es parte de este spec)

El tenant demo ya está configurado y probado en la plataforma:
- Negocio: **Clínica Demo Edalti** (confirmar que el nombre coincida exactamente con el configurado).
- Sedes: **Sede El Refugio** (Calle 14 # 70-30, Cali) y **Sede Pance**, ambas en Cali.
- Número real de Sofi (demo): **+57 322 6868840**, perfil "Edalti Solutions - Sofi (Demo)".
- Flujo de agendamiento probado: produce 4 slots por profesional.

Este spec cubre **solo la sección S3 del sitio** (repo `edalti-agent`).

---

## Layout

**Desktop (≥ 768px):** split-view en 2 columnas.
- Izquierda: conversación de WhatsApp animada (burbujas que aparecen una a una, con indicador de "escribiendo…").
- Derecha: "vista del negocio" — panel simplificado con (1) la conversación activa en una lista de chats y (2) una **agenda** donde se materializa la card de la cita en el momento de la confirmación (el "momento ajá").

**Mobile (< 768px):** apilado vertical:
1. La conversación de WhatsApp (protagonista, ancho completo).
2. Debajo, una **card compacta de "Mi panel"** que se actualiza en vivo: al confirmarse la cita, aparece la card de la cita + un contador ("Citas agendadas hoy +1"). No replicar el panel completo de escritorio en móvil — solo el momento de valor.

---

## Conversación (guion fiel al flujo de producción)

Renderizar desde un array de mensajes para animar burbuja a burbuja. Este es el flujo real, con un servicio de un solo profesional (Dermatología) para que la lista de slots quede en 4.

```ts
// sender: 'client' | 'sofi'; delayMs = pausa antes de mostrar; triggersPanel opcional
const demoConversation = [
  { sender: 'client', text: 'Quiero agendar una cita', delayMs: 600 },

  { sender: 'sofi', delayMs: 1600, triggersPanel: 'chatActive',
    text: '¡Hola! 👋 Soy Sofi, la asistente de agendamiento de Clínica Demo Edalti.\nPara agendar tu cita, por favor confírmame los siguientes datos del paciente:\n• Nombre y Apellido\n• Tipo de documento (CC, TI, CE, RC, PSP)\n• Número de documento (sin puntos ni comas)\n• Correo electrónico\n• Fecha deseada para la cita (por ejemplo: 26 de diciembre o 28/01/2026)' },

  { sender: 'client', text: 'Laura Gómez, CC, 1144055088, laura.gomez@ejemplo.com, 24 de julio', delayMs: 1400 },

  { sender: 'sofi', delayMs: 1600,
    text: 'Gracias por la información 😊 Dame un momento mientras valido en nuestro sistema…\n\nPor favor, selecciona el número del servicio o especialidad que deseas para tu cita:\n1. Sede El Refugio - Cali - Medicina General\n2. Sede El Refugio - Cali - Odontología general\n3. Sede El Refugio - Cali - Dermatología\n4. Sede El Refugio - Cali - Laboratorio clínico\n5. Sede Pance - Cali - Medicina General\n6. Sede Pance - Cali - Odontología general\n7. Sede Pance - Cali - Nutrición\n8. Sede Pance - Cali - Fisioterapia' },

  { sender: 'client', text: '3', delayMs: 900 },

  { sender: 'sofi', delayMs: 1600,
    text: 'Para la fecha solicitada, tengo disponibles los siguientes horarios (slots).\nIndícame el número de la opción que prefieres:\n1. 10:00 am – Dr. Sebastián Duarte – Dermatología\n2. 10:20 am – Dr. Sebastián Duarte – Dermatología\n3. 10:40 am – Dr. Sebastián Duarte – Dermatología\n4. 11:00 am – Dr. Sebastián Duarte – Dermatología' },

  { sender: 'client', text: '1', delayMs: 900 },

  { sender: 'sofi', text: 'Un momento por favor ⏳\nEstoy validando la disponibilidad del horario seleccionado…', delayMs: 1400, triggersPanel: 'validating' },

  { sender: 'sofi', delayMs: 1800, triggersPanel: 'booked',
    text: '✅ ¡Tu cita ha sido agendada con éxito!\n📋 Detalles de tu cita:\n• Paciente: Laura Gómez\n• Servicio: Dermatología\n• Profesional: Dr. Sebastián Duarte\n📅 Fecha: viernes, 24 de julio de 2026\n🕒 Hora: 10:00 a. m.\n🏥 Clínica Demo Edalti\n📍 Sede: Sede El Refugio\n📌 Dirección: Calle 14 # 70-30, Cali\n¡Te esperamos! 😊' },
];
```

> **Nota de fidelidad:** el guion es idéntico en estructura y contenido al flujo real. La única "elección" es usar Dermatología (1 profesional → 4 slots) en vez de Medicina General (2 profesionales → 8 slots), para que la animación no sea un muro en móvil. Nada aquí muestra algo que el bot no haga.

---

## Sincronización del panel derecho / card móvil

Estados disparados por `triggersPanel`:
- **`chatActive`:** la conversación aparece como chat activo en la lista de chats del panel.
- **`validating`:** indicador sutil de "procesando" en la agenda.
- **`booked`:** se materializa la card de la cita en la agenda con los mismos datos de la confirmación (Laura Gómez · Dermatología · Vie 24 jul · 10:00 a.m. · Dr. Sebastián Duarte · Sede El Refugio) + incrementa un contador "Citas agendadas hoy".

---

## Los dos CTAs (canales de conversión — decisión cerrada)

Ambos visibles al cierre de la sección. Entregar en formato A/B (activar uno, dejar el otro comentado):

- **Primario → Cal.com** (`https://cal.com/edalti-solution/30min`)
  - A: `Agendar demo gratis`
  - B: `Ver Edalti en acción — 30 min`
- **Secundario → WhatsApp Sofi** (número real)
  - A: `Probar a Sofi en WhatsApp`
  - B: `Chatear con Sofi ahora`
  - Link: `WHATSAPP_DEMO_URL` (`src/lib/constants.ts`) → `https://wa.me/573126848977?text=Hola%20Sofi%2C%20quiero%20probar%20el%20demo`

**Aviso de datos de ejemplo:** junto al CTA de WhatsApp, una línea pequeña (caption): *"Es una demostración, puedes usar datos de ejemplo."*

---

## Comportamiento y accesibilidad

- La animación arranca al entrar la sección al viewport (IntersectionObserver), una sola vez; botón "Reiniciar demo".
- **Control de ritmo:** las burbujas aparecen una a una con los `delayMs`; el mensaje del slot y el de servicios (que son largos) aparecen como un solo bloque, no letra a letra, para no eternizar la animación.
- Respetar `prefers-reduced-motion`: si está activo, mostrar la conversación completa sin animación de tipeo.
- Área táctil de CTAs ≥ 48px. El widget de Chatwoot no debe tapar los CTAs en móvil.

---

## Notas de integridad

1. El link del CTA secundario apunta al número real de Sofi — no es placeholder. Si el número aún no está activo en Meta al momento de desplegar, dejar el CTA construido pero se activa cuando Meta apruebe.
2. Todos los datos del guion son ficticios (paciente, documento, correo con `@ejemplo.com`).
3. El guion debe coincidir con lo que responde el número real. Si al probar en vivo el flujo cambió, ajustar el array.

---

## Criterio de aceptación (DoD)

- [ ] La conversación anima burbuja a burbuja y **cierra la cita** (llega a `booked`).
- [ ] El panel/card refleja la cita confirmada con los mismos datos del mensaje.
- [ ] Los dos CTAs funcionan: Cal.com abre el booking; el link de WhatsApp abre chat con Sofi y el mensaje pre-cargado.
- [ ] Caption de "datos de ejemplo" visible junto al CTA de WhatsApp.
- [ ] Validado primero en 375px: apilado legible, sin scroll horizontal, CTAs alcanzables con el pulgar.
- [ ] Sin datos reales; coherente con el sistema de diseño existente.
