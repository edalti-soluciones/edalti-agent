import { Link } from "react-router-dom";
import {
  MessageCircle, Calendar, Clock, Bot, BellRing, Users, ShieldCheck,
  ArrowRight, Sparkles, Check, ChevronDown, MailQuestion, PhoneCall, CalendarX,
  Stethoscope, Smile, Scissors, BadgeCheck, Headset, Hospital, FlaskConical,
} from "lucide-react";
import { useState } from "react";
import SiteLayout from "@/components/site/SiteLayout";
import DemoSplitView from "@/components/site/DemoSplitView";
import WhatsAppMockup from "@/components/site/WhatsAppMockup";
import BeforeAfter from "@/components/site/BeforeAfter";
import { trackEvent } from "@/lib/analytics";
import { GENERIC_TRIAL_COPY } from "@/data/plans";

const stats = [
  { value: "100%", label: "de mensajes respondidos" },
  { value: "24/7", label: "sin interrupciones" },
  { value: "9 de cada 10", label: "citas sin intervención humana" },
  { value: "Hasta 40%", label: "menos ausentismo", note: "referencia de industria" },
];

const heroTrust = [
  { icon: BadgeCheck, title: "API Oficial de WhatsApp Business" },
  { icon: ShieldCheck, title: "Cumplimiento Ley 1581" },
];

const problems = [
  {
    icon: MailQuestion,
    title: "Pacientes sin respuesta",
    desc: "Tu WhatsApp no puede atender a las 2am. El paciente escribe, no obtiene respuesta y llama a otra clínica.",
  },
  {
    icon: PhoneCall,
    title: "Confirmaciones manuales",
    desc: "Horas al día llamando para confirmar citas que igual no se cumplen. Tiempo que debería ir a tus pacientes.",
  },
  {
    icon: CalendarX,
    title: "Ausentismo sin aviso",
    desc: "El paciente simplemente no llegó. Tu agenda tiene huecos vacíos que cuestan dinero real.",
  },
];

const features = [
  {
    icon: Bot,
    title: "Conversaciones naturales con IA",
    desc: "Tu agente entiende lenguaje natural, responde con tono humano y aprende del contexto de tu negocio.",
  },
  {
    icon: Calendar,
    title: "Agenda en tiempo real",
    desc: "Disponibilidad real por profesional, servicio y sede. Cero choques de horarios ni dobles reservas.",
  },
  {
    icon: BellRing,
    title: "Recordatorios automáticos",
    desc: "Confirma asistencia y reduce el ausentismo hasta un 40% con recordatorios automáticos por WhatsApp.",
    note: "referencia de industria",
  },
  {
    icon: Clock,
    title: "Disponible 24/7",
    desc: "Tus clientes agendan a las 11pm un domingo. Tú duermes tranquilo.",
  },
  {
    icon: Users,
    title: "AI + humano: lo mejor de los dos mundos",
    desc: "9 de cada 10 citas se gestionan solas, sin intervención humana. Cuando el paciente lo necesita, el agente transfiere la conversación a tu equipo con todo el contexto ya visible — el humano continúa donde el AI paró, sin que el paciente tenga que repetir nada.",
  },
  {
    icon: ShieldCheck,
    title: "100% seguro",
    desc: "API oficial de WhatsApp Business. Tus datos cifrados y protegidos en Colombia.",
  },
];

const steps = [
  {
    n: "01",
    title: "Conectamos tu WhatsApp",
    desc: "Activamos la API de WhatsApp Business en tu número actual. Sin cambios para tus clientes.",
  },
  {
    n: "02",
    title: "Entrenamos tu agente",
    desc: "Personalizamos el agente con tus servicios, horarios, ubicación y tono de marca.",
  },
  {
    n: "03",
    title: "Empieza a vender mientras duermes",
    desc: "Tu agente atiende, agenda y recuerda citas automáticamente. Activo en 48 horas.",
  },
];

const industries = [
  {
    icon: Hospital,
    title: "Clínicas y centros médicos con varios especialistas",
    desc: "Coordina las agendas de varios profesionales y sedes sin choques ni dobles reservas.",
  },
  {
    icon: Stethoscope,
    title: "Consultorios médicos",
    desc: "Tu consultorio siempre lleno, sin una llamada de confirmación de tu parte.",
  },
  {
    icon: Sparkles,
    title: "Centros de estética y spa",
    desc: "Un agente que conoce cada servicio, cada profesional y cada horario disponible.",
  },
  {
    icon: Smile,
    title: "Clínicas dentales",
    desc: "Recordatorios con instrucciones de preparación. Lista de espera automática.",
  },
  {
    icon: Scissors,
    title: "Salones y barberías",
    desc: "Agenda digital en WhatsApp. Sin papel, sin llamadas, sin errores.",
  },
  {
    icon: FlaskConical,
    title: "Laboratorios y centros de exámenes",
    desc: "Cada examen con su preparación previa —como el ayuno— explicada al paciente, sin confusiones.",
  },
];

const trustBadges = [
  {
    icon: BadgeCheck,
    title: "Meta Tech Provider verificado",
    desc: "Usamos la API oficial de WhatsApp Business. No somos un intermediario no autorizado.",
  },
  {
    icon: ShieldCheck,
    title: "Cumplimiento Ley 1581",
    desc: "Tratamos los datos de tus pacientes conforme a la ley colombiana de Habeas Data.",
    href: "/privacidad",
  },
  {
    icon: Headset,
    title: "Soporte cercano",
    desc: "Acompañamiento en tu zona horaria, con gente que entiende la realidad de tu negocio.",
  },
];

type Faq = { q: string; a: string; href?: string; linkLabel?: string };

const faqs: Faq[] = [
  {
    q: "¿Pueden bloquear o banear mi número de WhatsApp?",
    a: "No: usamos la API oficial de WhatsApp Business a través de Meta Tech Provider verificado; las conversaciones las inician tus clientes, y cumplimos las políticas de calidad de Meta.",
  },
  {
    q: "¿Funciona con mi número de WhatsApp actual?",
    a: "Sí. Usamos tu propio número de WhatsApp Business —es tuyo y sigue siéndolo—. Y si aún no tienes uno, te ayudamos a crearlo y configurarlo.",
  },
  {
    q: "¿El agente puede equivocarse o inventar?",
    a: "El agente consulta tus servicios, precios y disponibilidad reales. Si no sabe algo, lo dice y transfiere a una persona con todo el contexto.",
  },
  {
    q: "¿Qué pasa con los datos de mis clientes y pacientes?",
    a: "Cumplimos la Ley 1581 (Habeas Data), con distinción entre Responsable y Encargado del tratamiento.",
    href: "/privacidad",
    linkLabel: "Ver nuestra política de privacidad",
  },
  {
    q: "¿Quedo atado a Edalti?",
    a: "No. Usas tu propio número en tu cuenta de Meta y pagas las conversaciones directamente a Meta. Si algún día decides irte, te vas con tu número, sin permanencia ni lock-in.",
  },
  {
    q: "¿Cuánto tiempo toma implementarlo?",
    a: "48 horas hábiles desde que confirmamos los detalles de tu negocio. Incluye configuración completa, entrenamiento del agente y pruebas — nosotros nos encargamos de todo.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "No. Nosotros nos encargamos de todo: integración, entrenamiento y mantenimiento. Tú solo recibes las citas en tu calendario.",
  },
];

const Inicio = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SiteLayout>
      {/* HERO */}
      <section id="hero" className="relative bg-hero-gradient overflow-hidden">
        <div className="container-edalti pt-12 pb-20 lg:pt-20 lg:pb-32 grid grid-cols-1 md:grid-cols-2 md:gap-x-16 md:items-center">
          {/* Bloque superior: badge + titular + subtitular — siempre primero */}
          <div className="animate-fade-up md:col-start-1 md:row-start-1">
            <span className="inline-flex items-center gap-2 bg-secondary text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5" />
              Nuevo • IA conversacional para PyMEs
            </span>
            <h1 className="mt-6 leading-[1.05] tracking-tight">
              <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
                Tu agenda se llena sola.
              </span>
              <span className="block mt-3 text-lg sm:text-xl lg:text-2xl font-semibold leading-snug text-muted-foreground">
                Tu agente de IA responde, agenda y recuerda por WhatsApp, las 24 horas.
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg font-semibold text-primary">
              Sin formularios, sin apps, sin salir de WhatsApp: tu cliente agenda en el chat que ya usa.
            </p>
          </div>

          {/* Mockup de Sofi — en móvil sube tras el subtitular; en desktop va en la columna derecha */}
          <div
            className="animate-fade-up mt-10 md:mt-0 md:col-start-2 md:row-start-1 md:row-span-2 md:self-center"
            style={{ animationDelay: "0.15s" }}
          >
            <WhatsAppMockup />
          </div>

          {/* Bloque inferior: descripción, CTAs, franja y métricas */}
          <div className="animate-fade-up mt-10 md:mt-4 md:col-start-1 md:row-start-2">
            <p className="text-lg text-body leading-relaxed max-w-xl">
              Diseñado para clínicas, laboratorios, consultorios y centros de bienestar. Sin conocimientos técnicos — nosotros lo configuramos todo en 48 horas.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="https://cal.com/edalti-solution/30min"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("calcom_click", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="h-5 w-5" />
                Agendar demo gratis
              </a>
              <Link
                to="/precios"
                className="inline-flex items-center justify-center gap-2 bg-background hover:bg-secondary border border-border text-foreground font-semibold px-6 py-3.5 rounded-xl transition-all"
              >
                Ver precios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Franja de confianza compacta — solo los dos sellos de mayor impacto */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm text-muted-foreground">
              {heroTrust.map((b) => (
                <span key={b.title} className="inline-flex items-center gap-1.5">
                  <b.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  {b.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="container-edalti pb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-6 lg:p-8 text-center">
                <div className="text-2xl lg:text-4xl font-bold text-primary">{s.value}</div>
                <div className="mt-1 text-xs lg:text-sm text-muted-foreground">{s.label}</div>
                {s.note && (
                  <div className="mt-1 text-[10px] lg:text-[11px] text-muted-foreground/70">{s.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="py-20 lg:py-28">
        <div className="container-edalti">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">El problema</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold leading-tight">
              ¿Cuántas citas estás perdiendo hoy?
            </h2>
            <p className="mt-5 text-body leading-relaxed">
              Cada WhatsApp sin responder es una cita — y un ingreso — que se va a la competencia.
            </p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-5 lg:gap-6">
            {problems.map((p) => (
              <div
                key={p.title}
                className="bg-background rounded-2xl p-7 lg:p-8 border border-border shadow-card hover:border-primary/30 hover:-translate-y-0.5 transition-all"
              >
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <p.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-body text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSplitView />

      {/* FEATURES */}
      <section id="caracteristicas" className="py-20 lg:py-28 bg-secondary">
        <div className="container-edalti">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Características</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold leading-tight">
              Todo lo que necesitas para vender mientras duermes.
            </h2>
            <p className="mt-4 text-body">
              Una plataforma completa diseñada para negocios que viven de las citas.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-background rounded-2xl p-6 lg:p-7 shadow-card border border-border hover:border-primary/30 hover:-translate-y-0.5 transition-all"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-body leading-relaxed">{f.desc}</p>
                {f.note && (
                  <div className="mt-1 text-[10px] lg:text-[11px] text-muted-foreground/70">{f.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <BeforeAfter />

      {/* HOW IT WORKS */}
      <section className="py-20 lg:py-28">
        <div className="container-edalti">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Cómo funciona</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold">Listo en 3 pasos simples</h2>
            <p className="mt-4 text-body">De cero a agente funcionando en 48 horas.</p>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="bg-background rounded-2xl p-7 border border-border h-full">
                  <span className="text-5xl font-bold text-primary/15">{s.n}</span>
                  <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-body text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-5 -translate-y-1/2 h-6 w-6 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container-edalti">
          <div className="max-w-2xl mx-auto text-center">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Para tu industria</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold leading-tight">Diseñado para tu tipo de negocio</h2>
            <p className="mt-4 text-body">
              Cada sector tiene sus propios dolores. Nuestro agente se configura para cada uno.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <article
                key={industry.title}
                className="bg-background border border-border rounded-2xl p-7 shadow-card hover:border-primary transition-colors"
              >
                <industry.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-6 text-lg font-bold">{industry.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-body">{industry.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-20 lg:py-28">
        <div className="container-edalti">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl lg:text-4xl font-bold leading-tight">
              Tecnología verificada por Meta, con los estándares que tu negocio necesita
            </h2>
            <p className="mt-4 text-body">
              Construido sobre la API oficial de WhatsApp Business, con los estándares de seguridad y privacidad
              que tu negocio necesita.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {trustBadges.map((b) => {
              const inner = (
                <>
                  <div className="flex items-center gap-3 md:flex-col md:gap-0">
                    <div
                      className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ background: "var(--gradient-cta)" }}
                    >
                      <b.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-bold text-foreground md:mt-4">{b.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-body leading-relaxed md:text-center">{b.desc}</p>
                </>
              );
              const cardClass =
                "bg-background rounded-2xl p-6 border border-border shadow-card md:text-center hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-md transition-all";
              return b.href ? (
                <Link key={b.title} to={b.href} className={`${cardClass} block`}>
                  {inner}
                </Link>
              ) : (
                <div key={b.title} className={cardClass}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-28 bg-secondary">
        <div className="container-edalti max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Preguntas frecuentes</span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold">Resolvemos tus dudas</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="bg-background rounded-xl border border-border overflow-hidden"
              >
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
                    {f.href && (
                      <>
                        {" "}
                        <Link
                          to={f.href}
                          className="font-medium text-primary underline underline-offset-2 hover:text-primary-hover"
                        >
                          {f.linkLabel}
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta-final" className="py-20 lg:py-28">
        <div className="container-edalti">
          <div
            className="rounded-3xl p-10 lg:p-16 text-center text-primary-foreground relative overflow-hidden"
            style={{ background: "var(--gradient-cta)" }}
          >
            {/* Velo graduado: mantiene el azul vivo arriba-izquierda y oscurece hacia el
                extremo cian, donde el texto pequeño no alcanzaba contraste AA. */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, hsl(var(--foreground) / 0.08) 0%, hsl(var(--foreground) / 0.55) 100%)",
              }}
            />
            <div aria-hidden className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.3) 1px, transparent 1px)",
                backgroundSize: "32px 32px, 24px 24px",
              }}
            />
            <div className="relative">
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight max-w-3xl mx-auto text-primary-foreground">
                Cada minuto sin responder es dinero que se pierde.
              </h2>
              <p className="mt-5 text-primary-foreground text-lg max-w-xl mx-auto">
                Activa tu agente IA en 48 horas y empieza a llenar tu agenda.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://cal.com/edalti-solution/30min"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("calcom_click", { location: "final" })}
                  className="inline-flex items-center justify-center gap-2 bg-background text-primary hover:bg-secondary font-semibold px-7 py-4 rounded-xl shadow-lg transition-all"
                >
                  <MessageCircle className="h-5 w-5" />
                  Agendar demo gratis
                </a>
                <Link
                  to="/precios"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur text-primary-foreground border border-white/30 font-semibold px-7 py-4 rounded-xl transition-all"
                >
                  Ver precios
                </Link>
              </div>
              <p className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-primary-foreground">
                <Check className="h-4 w-4" /> {GENERIC_TRIAL_COPY}
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Inicio;
