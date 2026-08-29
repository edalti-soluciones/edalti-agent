/**
 * Fuente única de verdad de los planes comerciales.
 * Precios en COP sin IVA. Los límites (conversaciones, sedes, profesionales) y el
 * cupo de la prueba gratuita se derivan de estos datos, nunca se escriben en el JSX.
 */

export type Plan = {
  name: string;
  tagline: string;
  /** Mensualidad base en COP, sin IVA. */
  monthlyPrice: number;
  /** Muestra el precio como "Desde $X" (planes con alcance negociable). */
  priceFrom?: boolean;
  /** Conversaciones incluidas al mes. */
  includedConversations: number;
  /** Cupo de conversaciones durante la prueba gratuita. Derivado de las incluidas. */
  trialConversations: number;
  /** Sedes incluidas. */
  locations: number;
  /** Profesionales incluidos. */
  professionals: number;
  /** Primera línea de la lista de features, antes de los límites. */
  leadFeature: string;
  /** Features adicionales, después de los límites. */
  features: string[];
  cta: string;
  ctaHref: string;
  highlight?: boolean;
};

/** Descuento de la facturación anual, aplicado solo sobre la mensualidad base. */
export const ANNUAL_DISCOUNT = 0.2;

/** El cupo de la prueba gratuita es la mitad de las conversaciones incluidas. */
export const TRIAL_CONVERSATION_RATIO = 0.5;

/** Días de la prueba gratuita. */
export const TRIAL_DAYS = 15;

/** Costo de cada conversación por encima del cupo del plan, en COP. */
export const OVERAGE_PRICE = 600;

/** Porcentaje del cupo en el que avisamos al cliente. */
export const OVERAGE_ALERT_THRESHOLD = 80;

const CALCOM_URL = "https://cal.com/edalti-solution/30min";

type PlanInput = Omit<Plan, "trialConversations">;

const planInputs: PlanInput[] = [
  {
    name: "Esencial",
    tagline: "Para consultorios que empiezan a automatizar",
    monthlyPrice: 149000,
    includedConversations: 250,
    locations: 1,
    professionals: 2,
    leadFeature: "1 agente IA en WhatsApp",
    features: [
      "Agendamiento, confirmación y cancelación automáticas",
      "Recordatorios automáticos",
      "Encuesta de satisfacción",
      "Soporte por email",
    ],
    cta: "Empezar con Esencial",
    ctaHref: CALCOM_URL,
  },
  {
    name: "Profesional",
    tagline: "Lo más elegido por clínicas en crecimiento",
    monthlyPrice: 590000,
    includedConversations: 1000,
    locations: 2,
    professionals: 5,
    highlight: true,
    leadFeature: "Agente IA multicanal (WhatsApp, Instagram, Facebook y widget web)",
    features: [
      "Agendamiento avanzado con reglas por servicio y profesional",
      "Recordatorios y confirmaciones automáticas",
      "Base de conocimiento propia para preguntas frecuentes",
      "Reportes de rendimiento",
      "Encuesta de satisfacción",
      "Soporte prioritario por WhatsApp",
    ],
    cta: "Empezar con Profesional",
    ctaHref: CALCOM_URL,
  },
  {
    name: "Empresarial",
    tagline: "Para clínicas con varias sedes y alto volumen",
    monthlyPrice: 1590000,
    priceFrom: true,
    includedConversations: 2500,
    locations: 3,
    professionals: 10,
    leadFeature: "Todo lo del plan Profesional",
    features: [
      "Panel multiusuario para tu equipo",
      "Onboarding y entrenamiento dedicado",
      "Soporte con SLA",
    ],
    cta: "Hablar con ventas",
    ctaHref: CALCOM_URL,
  },
];

export const plans: Plan[] = planInputs.map((p) => ({
  ...p,
  trialConversations: Math.round(p.includedConversations * TRIAL_CONVERSATION_RATIO),
}));

export const formatCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

export const formatNumber = (n: number) => new Intl.NumberFormat("es-CO").format(n);

/** Mensualidad con facturación anual: 20% sobre la mensualidad base. */
export const annualMonthlyPrice = (plan: Plan) =>
  Math.round(plan.monthlyPrice * (1 - ANNUAL_DISCOUNT));

/** Lista completa de features: la primera línea, los límites derivados y el resto. */
export const planFeatures = (plan: Plan): string[] => [
  plan.leadFeature,
  `Hasta ${formatNumber(plan.includedConversations)} conversaciones/mes`,
  plan.locations === 1 ? "1 sede" : `Hasta ${plan.locations} sedes`,
  `Hasta ${plan.professionals} profesionales`,
  ...plan.features,
];

/** Promesa de prueba gratuita con el cupo del plan. */
export const trialCopy = (plan: Plan) =>
  `${TRIAL_DAYS} días gratis o ${formatNumber(plan.trialConversations)} conversaciones, lo que ocurra primero. Sin tarjeta.`;

/** Promesa genérica, para los puntos del sitio donde no hay un plan seleccionado. */
export const GENERIC_TRIAL_COPY = `${TRIAL_DAYS} días de prueba gratuita. Sin tarjeta de crédito.`;
