import { Link } from "react-router-dom";
import { Check, MessageCircle, Sparkles, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import { trackEvent, trackOnce } from "@/lib/analytics";
import {
  ANNUAL_DISCOUNT,
  OVERAGE_ALERT_THRESHOLD,
  OVERAGE_PRICE,
  annualMonthlyPrice,
  formatCOP,
  formatNumber,
  planFeatures,
  plans,
  trialCopy,
} from "@/data/plans";

type Billing = "monthly" | "annual";

const includedAll = [
  "API oficial de WhatsApp Business",
  "Agente IA conversacional en español",
  "Datos cifrados y alojados de forma segura",
  "Actualizaciones continuas del modelo IA",
];

const faqs = [
  {
    q: "¿Hay costo de implementación?",
    a: "El setup inicial está incluido en todos los planes. Solo pagas la mensualidad desde el día 1.",
  },
  {
    q: "¿Puedo cambiar de plan después?",
    a: "Sí, puedes subir o bajar de plan en cualquier momento. Los cambios aplican al siguiente ciclo de facturación.",
  },
  {
    q: "¿Cómo es la facturación?",
    a: "Facturamos mensualmente en pesos colombianos (COP). Aceptamos transferencia, tarjeta y PSE. Emitimos factura electrónica DIAN.",
  },
  {
    q: "¿Qué es una conversación?",
    a: "Una conversación es todo el intercambio con un paciente dentro de una ventana de 24 horas, sin importar cuántos mensajes incluya. Si el mismo paciente vuelve a escribir al día siguiente, cuenta como una conversación nueva.",
  },
  {
    q: "¿Qué pasa si supero las conversaciones de mi plan?",
    a: `Te avisamos cuando llegues al ${OVERAGE_ALERT_THRESHOLD}% de tu cupo. Por defecto el agente sigue atendiendo y las conversaciones adicionales se facturan a $${formatNumber(OVERAGE_PRICE)} COP cada una. Desde tu panel puedes activar un tope para que el agente pause al llegar al límite.`,
  },
  {
    q: "¿Cómo funciona la prueba gratuita?",
    a: "Tienes 15 días o el cupo de conversaciones del plan que estés evaluando, lo que ocurra primero. No pedimos tarjeta de crédito. Los 15 días empiezan a contar cuando tu agente queda activo sobre tu número de WhatsApp, no cuando nos escribes.",
  },
];

const Precios = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billing, setBilling] = useState<Billing>("monthly");
  const isAnnual = billing === "annual";
  const plansRef = useRef<HTMLElement>(null);

  // scroll_pricing_view: se dispara una sola vez cuando la sección de precios entra al viewport.
  useEffect(() => {
    const el = plansRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trackOnce("scroll_pricing_view");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section id="hero" className="bg-hero-gradient">
        <div className="container-edalti pt-12 pb-12 lg:pt-20 lg:pb-16 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-secondary text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
            <Sparkles className="h-3.5 w-3.5" />
            Precios simples en pesos colombianos
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Un plan para cada{" "}
            <span className="text-primary">tamaño de negocio</span>.
          </h1>
          <p className="mt-5 text-lg text-body">
            Sin costos ocultos. Sin contratos a largo plazo. Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section ref={plansRef} className="pb-20 lg:pb-28">
        <div className="container-edalti mb-10 flex flex-col items-center gap-3">
          <div className="inline-flex rounded-2xl bg-secondary p-1 border border-border">
            {(["monthly", "annual"] as Billing[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  billing === option
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {option === "monthly" ? "Mensual" : "Anual"}
              </button>
            ))}
          </div>
          {isAnnual && (
            <span className="rounded-full bg-success px-3 py-1 text-xs font-bold text-success-foreground animate-fade-in">
              Ahorra {ANNUAL_DISCOUNT * 100}%
            </span>
          )}
        </div>
        <div className="container-edalti grid md:grid-cols-3 gap-5 lg:gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl p-7 lg:p-8 flex flex-col transition-all ${
                p.highlight
                  ? "bg-foreground text-background shadow-lg ring-2 ring-primary lg:scale-[1.02]"
                  : "bg-background border border-border shadow-card hover:-translate-y-0.5"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                  MÁS POPULAR
                </span>
              )}
              <div>
                <h3 className={`text-2xl font-bold ${p.highlight ? "text-background" : "text-foreground"}`}>
                  {p.name}
                </h3>
                <p className={`mt-2 text-sm ${p.highlight ? "text-background/70" : "text-muted-foreground"}`}>
                  {p.tagline}
                </p>
              </div>
              <div className="mt-6">
                {/* El renglón "Desde" se reserva en las tres tarjetas para que los CTA queden alineados. */}
                <span
                  aria-hidden={!p.priceFrom}
                  className={`block text-base font-semibold ${
                    p.highlight ? "text-background/70" : "text-muted-foreground"
                  }`}
                >
                  {p.priceFrom ? "Desde" : "\u00a0"}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-2xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
                    {formatCOP(isAnnual ? annualMonthlyPrice(p) : p.monthlyPrice)}
                  </span>
                </div>
                <span className={`text-sm ${p.highlight ? "text-background/60" : "text-muted-foreground"}`}>
                  COP / mes + IVA
                </span>
                {isAnnual && (
                  <p className={`mt-2 text-sm ${p.highlight ? "text-background/70" : "text-muted-foreground"}`}>
                    facturado anualmente · ahorras {ANNUAL_DISCOUNT * 100}%
                  </p>
                )}
              </div>
              <a
                href={p.ctaHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("calcom_click", { location: "pricing" })}
                className={`mt-7 inline-flex items-center justify-center gap-2 font-semibold px-5 py-3.5 rounded-xl transition-all ${
                  p.highlight
                    ? "bg-primary hover:bg-primary-hover text-primary-foreground shadow-md"
                    : "bg-foreground hover:bg-foreground/90 text-background"
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                {p.cta}
              </a>
              <p
                className={`mt-3 text-center text-xs ${
                  p.highlight ? "text-background/70" : "text-muted-foreground"
                }`}
              >
                {trialCopy(p)}
              </p>
              <ul className="mt-8 space-y-3 flex-1">
                {planFeatures(p).map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${
                        p.highlight ? "bg-primary/20" : "bg-primary/10"
                      }`}
                    >
                      <Check className={`h-3 w-3 ${p.highlight ? "text-accent" : "text-primary"}`} />
                    </span>
                    <span className={p.highlight ? "text-background/90" : "text-body"}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {isAnnual && (
          <p className="container-edalti mt-6 text-center text-sm font-semibold text-primary animate-fade-in">
            Con facturación anual ahorras el {ANNUAL_DISCOUNT * 100}% de la mensualidad en
            cualquier plan.
          </p>
        )}

        {/* Nota de transparencia de precios */}
        <div className="container-edalti mt-10">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-secondary/60 p-5 text-center">
            <p className="text-sm text-body leading-relaxed">
              Nuestros planes en pesos colombianos. Las conversaciones de WhatsApp las pagas
              directamente a Meta desde tu propia cuenta — tu número es tuyo, sin permanencia.
            </p>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              A partir de octubre, Meta cobra por conversación en WhatsApp. Las conversaciones de
              Sofi son cortas y de bajo costo.
            </p>
          </div>
          <div className="mx-auto mt-4 max-w-3xl rounded-2xl border border-border bg-secondary/60 p-5 text-center">
            <p className="text-sm text-body leading-relaxed">
              ¿Superas tu plan? Cada conversación adicional cuesta ${formatNumber(OVERAGE_PRICE)} COP.
              Te avisamos cuando llegues al {OVERAGE_ALERT_THRESHOLD}% de tu cupo y decides desde tu
              panel si continúas o pausas el agente.
            </p>
          </div>
        </div>

        {/* Included in all */}
        <div className="container-edalti mt-12">
          <div className="bg-secondary rounded-3xl p-8 lg:p-10 border border-border">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div>
                <h3 className="text-xl lg:text-2xl font-bold">Incluido en todos los planes</h3>
                <p className="mt-2 text-body text-sm">
                  Sin importar qué plan elijas, recibes la base completa de Edalti.
                </p>
              </div>
              <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-3">
                {includedAll.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container-edalti max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Preguntas sobre precios</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold">Lo que más nos preguntan</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-background rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold text-foreground">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-body text-sm leading-relaxed animate-fade-in">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta-final" className="py-16 lg:py-24">
        <div className="container-edalti text-center max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold">¿Aún no estás seguro qué plan elegir?</h2>
          <p className="mt-4 text-body">
            Agenda una demo gratuita y te recomendamos el plan ideal según tu volumen y caso de uso.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://cal.com/edalti-solution/30min"
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("calcom_click", { location: "pricing_final" })}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="h-5 w-5" />
              Agendar demo gratis
            </a>
            <Link
              to="/inicio"
              className="inline-flex items-center justify-center gap-2 bg-background hover:bg-secondary border border-border text-foreground font-semibold px-6 py-3.5 rounded-xl transition-all"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Precios;
