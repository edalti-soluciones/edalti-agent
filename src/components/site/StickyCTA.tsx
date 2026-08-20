import { useEffect, useState } from "react";
import { MessageCircle, CalendarClock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { WHATSAPP_DEMO_URL } from "@/lib/constants";

const CAL_URL = "https://cal.com/edalti-solution/30min";

const StickyCTA = () => {
  // Se oculta mientras el hero (protege la franja de confianza y el mockup)
  // o la sección de CTA final estén visibles, para no tapar contenido ni duplicar el CTA.
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const targets = ["hero", "cta-final"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visibility = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visibility.set(e.target, e.isIntersecting));
        setHidden([...visibility.values()].some(Boolean));
      },
      { threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-3 bottom-3 z-30 flex gap-2 transition-all duration-300 ${
        hidden ? "pointer-events-none translate-y-28 opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={WHATSAPP_DEMO_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("demo_whatsapp_click", { location: "sticky" })}
        className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] bg-background text-foreground border border-border font-semibold px-3 rounded-xl shadow-lg active:scale-[0.98] transition-transform"
      >
        <MessageCircle className="h-5 w-5 text-primary shrink-0" />
        Probar en WhatsApp
      </a>
      <a
        href={CAL_URL}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("calcom_click", { location: "sticky" })}
        className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] bg-primary text-primary-foreground font-semibold px-3 rounded-xl shadow-lg active:scale-[0.98] transition-transform"
      >
        <CalendarClock className="h-5 w-5 shrink-0" />
        Agendar demo
      </a>
    </div>
  );
};

export default StickyCTA;
