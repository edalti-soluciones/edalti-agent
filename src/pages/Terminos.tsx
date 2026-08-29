import { Link } from "react-router-dom";
import LegalPage, { LegalSection } from "@/components/site/LegalPage";

const sections: LegalSection[] = [
  {
    title: "1. Naturaleza del servicio y ámbito de aplicación",
    blocks: [
      "**1.1.** Edalti Solutions presta un servicio dirigido exclusivamente a personas jurídicas y a profesionales independientes que lo contratan como insumo de su actividad económica. **El servicio no está dirigido a consumidores finales.**",
      "**1.2.** Estos Términos y Condiciones se complementan con el contrato de prestación de servicios suscrito entre Edalti y cada Cliente, en el que se detallan el plan contratado, sus cupos, tarifas y condiciones particulares. **En caso de contradicción entre estos Términos y dicho contrato, prevalece el contrato de prestación de servicios.**",
      "**1.3.** El tratamiento de datos personales derivado de la prestación del servicio se rige por el Acuerdo de Tratamiento de Datos Personales suscrito entre las partes, que forma parte integral de la relación contractual.",
    ],
  },
  {
    title: "2. Definiciones",
    blocks: [
      "**2.1. Conversación.** Para efectos de la medición del servicio y de la facturación, se entiende por conversación el conjunto de mensajes intercambiados entre un mismo paciente o usuario final y el agente de Edalti dentro de una ventana de veinticuatro (24) horas continuas, contadas desde el primer mensaje de esa ventana, con independencia del número de mensajes que la compongan y del canal por el que se desarrolle.",
      "**2.2. Límite de respuestas por conversación.** Cada conversación admite hasta diez (10) respuestas generadas por el agente de inteligencia artificial. Alcanzado ese límite, el sistema transfiere la atención al equipo del Cliente y la conversación continúa bajo su gestión, sin que ello genere cobro adicional ni consuma una conversación distinta.",
      "**2.3. Nueva conversación.** Si el mismo paciente o usuario final escribe nuevamente una vez transcurrida la ventana de veinticuatro (24) horas, se contabiliza una conversación nueva.",
      "**2.4. Cupo mensual.** Es el número de conversaciones incluidas en la tarifa del plan contratado durante cada periodo de facturación. El cupo no es acumulable: las conversaciones no utilizadas en un periodo no se trasladan al siguiente ni son objeto de reembolso, compensación o canje.",
      "**2.5. Conversación adicional.** Es cada conversación que exceda el cupo mensual del plan contratado en un mismo periodo de facturación.",
    ],
  },
  {
    title: "3. Planes, cupos y tarifas",
    blocks: [
      "**3.1.** Edalti ofrece los planes publicados en su sitio web, cada uno con una tarifa mensual, un cupo mensual de conversaciones y unos límites de sedes y de profesionales que se detallan en el sitio y en la orden de servicio suscrita con el Cliente.",
      "**3.2.** Las tarifas publicadas se expresan en pesos colombianos (COP) y **no incluyen** el Impuesto sobre las Ventas (IVA), que se liquidará conforme a la normativa vigente al momento de la facturación.",
      "**3.3. Sedes y profesionales adicionales.** El Cliente que requiera sedes o profesionales por encima de los límites de su plan podrá contratarlos como servicios adicionales, cuyas condiciones y tarifas se pactarán en la orden de servicio correspondiente. Los servicios adicionales **no amplían** el cupo mensual de conversaciones.",
      "**3.4. Modificación de tarifas.** Edalti podrá modificar sus tarifas comunicándolo al Cliente con una antelación no inferior a treinta (30) días calendario. La modificación no afectará periodos ya facturados. Si el Cliente no acepta la nueva tarifa, podrá terminar el servicio al final del periodo en curso sin penalidad alguna.",
    ],
  },
  {
    title: "4. Medición del consumo y conversaciones adicionales",
    blocks: [
      "**4.1. Fuente de medición.** El conteo de conversaciones lo realiza la plataforma de Edalti y estará disponible para consulta del Cliente en su panel de administración en todo momento. Las cifras registradas por la plataforma serán la base de la facturación.",
      "**4.2. Alertas de consumo.** Edalti notificará al Cliente cuando su consumo alcance el ochenta por ciento (80%) y el cien por ciento (100%) del cupo mensual de su plan, a través del panel de administración y de los medios de contacto registrados por el Cliente.",
      "**4.3. Comportamiento por defecto al superar el cupo.** Salvo que el Cliente configure lo contrario, el agente **continuará operando** una vez agotado el cupo mensual, y las conversaciones adicionales se facturarán a la tarifa vigente de **seiscientos pesos colombianos ($600 COP) por conversación adicional**, más IVA. Esta tarifa se publica en el sitio web de Edalti y podrá modificarse conforme a la cláusula 3.4.",
      "**4.4. Tope de consumo opcional.** El Cliente podrá activar en cualquier momento, desde su panel de administración, un tope que suspenda la operación del agente al agotarse el cupo mensual. Activado el tope, no se generarán cobros por conversaciones adicionales. En ese estado, el agente responderá a los pacientes con un mensaje informativo y notificará al equipo del Cliente para que asuma la atención. **La activación del tope es una decisión del Cliente y Edalti no responde por las consecuencias comerciales derivadas de la suspensión del servicio automatizado.**",
      "**4.5. Facturación del consumo adicional.** Las conversaciones adicionales se facturarán junto con la mensualidad del periodo siguiente, con el detalle del consumo que las originó.",
    ],
  },
  {
    title: "5. Prueba gratuita",
    blocks: [
      "**5.1. Alcance.** Edalti ofrece un periodo de prueba gratuita sin cargo y sin requerir medio de pago, cuya vigencia es de **quince (15) días calendario o del cupo de conversaciones asignado al plan que el Cliente esté evaluando, lo que ocurra primero.**",
      "**5.2. Cupo de la prueba.** El cupo de la prueba equivale al cincuenta por ciento (50%) del cupo mensual del plan evaluado, en correspondencia con la duración de quince (15) días. El cupo aplicable se informará al Cliente antes de iniciar la prueba y se publica en el sitio web junto a cada plan.",
      "**5.3. Inicio del cómputo.** El plazo de quince (15) días comenzará a contarse desde el momento en que el agente quede **efectivamente activo** sobre la línea de WhatsApp del Cliente. El tiempo empleado en la configuración, la migración de agenda o cualquier actividad previa a la activación **no consume** el periodo de prueba.",
      "**5.4. Finalización.** Al cumplirse el plazo o agotarse el cupo, lo que ocurra primero, el agente dejará de operar de forma autónoma y responderá con un mensaje informativo, notificando al equipo del Cliente. **En ningún caso el servicio se interrumpirá sin aviso previo al Cliente.**",
      "**5.5. Datos y configuración.** La información y configuración cargadas durante la prueba se conservarán por treinta (30) días calendario después de su finalización, para permitir la continuidad si el Cliente contrata. Transcurrido ese plazo sin contratación, Edalti procederá a su eliminación conforme a su política de tratamiento de datos.",
      "**5.6. Una prueba por cliente.** La prueba gratuita se otorga una sola vez por Cliente. Edalti podrá negar o dar por terminada anticipadamente una prueba cuando detecte uso fraudulento, automatizado o ajeno a la finalidad de evaluación del servicio.",
    ],
  },
  {
    title: "6. Facturación y pago",
    blocks: [
      "**6.1. Periodicidad.** La suscripción se factura por periodos mensuales anticipados, salvo que el Cliente opte por facturación anual.",
      "**6.2. Descuento por pago anual.** El Cliente que opte por facturación anual anticipada accederá a un descuento del veinte por ciento (20%) **aplicable exclusivamente sobre la tarifa mensual base** del plan. Este descuento **no aplica** sobre conversaciones adicionales, servicios adicionales ni cualquier otro concepto variable, los cuales se facturarán a tarifa plena en el periodo en que se generen.",
    ],
  },
  {
    title: "7. Costos de la plataforma de mensajería (Meta)",
    blocks: [
      "**7.1.** El servicio de Edalti opera sobre la API oficial de WhatsApp Business de Meta Platforms. **La cuenta de WhatsApp Business (WABA) y el número de teléfono asociado son de titularidad del Cliente**, quien los conserva en caso de terminación del servicio.",
      "**7.2.** Los costos que Meta cobra por el envío de mensajes son facturados por Meta directamente al Cliente, desde su propia cuenta y con su propio medio de pago. **Dichos costos no están incluidos en las tarifas de Edalti**, son independientes de ellas y pueden variar según las políticas de precios de Meta, ajenas al control de Edalti.",
      "**7.3.** Es responsabilidad del Cliente mantener un medio de pago válido y vigente en su cuenta de Meta. Edalti no responde por interrupciones en la entrega de mensajes derivadas de la ausencia, vencimiento o rechazo del medio de pago registrado ante Meta.",
    ],
  },
  {
    title: "8. Descripción del servicio",
    blocks: [
      "Edalti es una plataforma SaaS que permite a empresas gestionar conversaciones con sus clientes a través de WhatsApp Business API y otros canales de comunicación. Entre sus funcionalidades se incluyen:",
      {
        list: [
          "Automatización de la gestión de citas y recordatorios vía WhatsApp.",
          "Agentes de inteligencia artificial para atención y soporte al cliente.",
        ],
      },
      "El servicio se presta bajo modalidad de suscripción y está destinado exclusivamente a empresas y profesionales.",
    ],
  },
  {
    title: "9. Uso aceptable",
    blocks: [
      "Al utilizar Edalti, el usuario se compromete a:",
      {
        list: [
          "Usar la plataforma únicamente para fines lícitos y conforme a la legislación vigente.",
          "No enviar comunicaciones no solicitadas (spam), contenido engañoso, ilegal o que infrinja derechos de terceros.",
          "Obtener el consentimiento explícito de sus usuarios finales antes de iniciarles conversaciones vía WhatsApp.",
          "Cumplir en todo momento con las Políticas de uso de WhatsApp Business de Meta Platforms, Inc., incluyendo la Política de Uso Aceptable y la Política Comercial de WhatsApp.",
          "No utilizar la plataforma para actividades que violen los términos de servicio de cualquier proveedor externo integrado.",
        ],
      },
      "Edalti se reserva el derecho de suspender o cancelar el acceso de cualquier usuario que incumpla estas condiciones.",
    ],
  },
  {
    title: "10. Responsabilidad del usuario y tratamiento de datos",
    blocks: [
      "El usuario es el único responsable de:",
      {
        list: [
          "El contenido de los mensajes enviados a través de la plataforma.",
          "Contar con las autorizaciones necesarias para comunicarse con sus destinatarios.",
          "Mantener la confidencialidad de sus credenciales de acceso.",
          "Garantizar que el uso que hace de Edalti cumple con las leyes de protección de datos aplicables en su jurisdicción.",
          "Notificar a Edalti de inmediato ante cualquier uso no autorizado de su cuenta.",
        ],
      },
      <p key="privacy-ref" className="mt-4 text-body leading-relaxed">
        En relación con los datos personales de sus usuarios finales (por ejemplo, pacientes), el usuario actúa
        como <strong>Responsable del tratamiento</strong> y Edalti como <strong>Encargado</strong>, tratando dichos
        datos por cuenta del usuario y conforme a sus instrucciones. El usuario es responsable de obtener la
        autorización previa, expresa e informada de los titulares, en especial cuando se trate de datos sensibles o
        de salud. Para más detalle, consulta nuestra{" "}
        <Link to="/privacidad" className="text-primary hover:underline">
          Política de Privacidad
        </Link>
        .
      </p>,
    ],
  },
  {
    title: "11. Integración con terceros",
    blocks: [
      "La plataforma Edalti utiliza servicios de terceros para su funcionamiento, incluyendo la API oficial de WhatsApp Business proporcionada por Meta Platforms, Inc.",
      "El usuario reconoce que el uso de WhatsApp está sujeto a los términos y políticas de Meta, y que Edalti actúa únicamente como intermediario tecnológico que facilita la comunicación entre empresas y sus clientes.",
      "Edalti no es responsable por interrupciones, cambios o restricciones impuestas por proveedores externos como Meta.",
    ],
  },
  {
    title: "12. Limitación de responsabilidad",
    blocks: [
      "En la máxima medida permitida por la ley aplicable, Edalti no será responsable por:",
      {
        list: [
          "Pérdidas de datos, ingresos o beneficios derivadas del uso o la imposibilidad de uso de la plataforma.",
          "Interrupciones del servicio causadas por terceros, fuerza mayor o mantenimiento programado.",
          "Daños indirectos, incidentales, especiales o consecuentes.",
          "Decisiones empresariales tomadas con base en información procesada por la plataforma.",
        ],
      },
      "La responsabilidad total de Edalti frente al usuario, por cualquier concepto, estará limitada al importe abonado por el usuario en los tres meses anteriores al evento que originó el daño.",
    ],
  },
  {
    title: "13. Terminación del servicio",
    blocks: [
      "Edalti podrá suspender o cancelar el acceso del usuario a la plataforma en los siguientes casos:",
      {
        list: [
          "Incumplimiento de estos Términos y Condiciones.",
          "Falta de pago de la suscripción.",
          "Solicitud expresa del usuario.",
          "Obligación legal o requerimiento de autoridad competente.",
        ],
      },
      "El usuario podrá cancelar su suscripción en cualquier momento notificándolo a info@edalti.com. La cancelación tendrá efecto al final del período de facturación en curso.",
    ],
  },
  {
    title: "14. Modificaciones",
    blocks: [
      "Edalti se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán notificadas al usuario con al menos 15 días de antelación mediante correo electrónico o aviso en la plataforma.",
      "El uso continuado de la plataforma tras la entrada en vigor de los cambios implica la aceptación de los nuevos términos. Si el usuario no acepta las modificaciones, deberá cancelar su cuenta antes de la fecha de entrada en vigor.",
    ],
  },
  {
    title: "15. Contacto",
    blocks: [
      "Para cualquier consulta relacionada con estos Términos y Condiciones, puedes contactarnos en:",
      {
        list: ["**Email:** info@edalti.com", "**Ubicación:** Cali, Colombia"],
      },
    ],
  },
];

const Terminos = () => (
  <LegalPage title="Términos y Condiciones" lastUpdated="agosto de 2026" sections={sections} />
);

export default Terminos;
