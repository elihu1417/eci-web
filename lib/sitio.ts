/* Configuración del sitio y catálogo de servicios.
   Los textos salen del Documento Maestro de Identidad de Marca (v2,
   22 ago 2026) y de ECI — Paquetes de Servicios (Base).
   Equivale al documento `configuracionSitio` del CMS. */

export const SITIO = {
  nombre: "ECI",
  nombreLargo: "Espacio de Creación e Innovación",

  // Tagline favorita del documento de identidad, sección 03.
  tagline: "El talento que empieza haciendo crecer negocios reales",
  taglineCorta: "Lo justo para resultados grandes",

  // Del manifiesto citado en la Alineación.
  manifiesto:
    "Existimos porque tenemos la necesidad de conectar, de dejar de crear en solitario y empezar a hacer cosas increíbles juntos.",

  // Propuesta de valor, sección 01.
  promesa:
    "Conectamos negocios que están creciendo con creativos que están empezando. Los negocios obtienen contenido de calidad a un precio que pueden costear; los creativos ganan experiencia real, pagada, con equipo profesional.",

  personalidad: ["Transparente", "Detallista", "Cercana", "Tecnológica", "Eficiente"],

  // PENDIENTE: datos reales de contacto.
  correo: "hola@eci.mx",
  whatsapp: "+52 33 0000 0000",
  instagram: "@eci.estudio",
  ciudad: "Guadalajara, México",
};

export type Servicio = {
  id: string;
  pilar: string;
  nombre: string;
  promesa: string;
  paraQuien: string;
  incluye: string[];
  noIncluye: string[];
  precio: string;
  rubro: string;
  acento: "menta" | "naranja" | "azul";
};

export const SERVICIOS: Servicio[] = [
  {
    id: "contenido-vertical",
    pilar: "A",
    nombre: "Contenido Vertical",
    promesa: "El motor de volumen: una jornada de grabación, ocho a diez piezas.",
    paraQuien:
      "Marcas personales, profesionistas independientes y clínicas que necesitan volumen constante de contenido vertical.",
    incluye: [
      "1 día (o medio día) de grabación, en locación del cliente o en espacio de ECI",
      "8 a 10 Reels o TikToks editados a partir de esa grabación",
      "Etalonaje de color y diseño sonoro en cada pieza",
      "Subtítulos dinámicos integrados",
      "Guion base y escaleta, dirigidos por ECI el día de la grabación",
      "2 rondas de ajustes menores por lote",
    ],
    noIncluye: [
      "Pauta y calendario de publicación",
      "Casting, actuación o vestuario de terceros",
      "Grabación fuera del área metropolitana de Guadalajara",
    ],
    precio: "Desde $5,090 MXN",
    rubro: "reels",
    acento: "menta",
  },
  {
    id: "audiovisual-comercial",
    pilar: "B",
    nombre: "Audiovisual Comercial",
    promesa: "El servicio de alto valor: formato cine, con guion y storyboard aprobados.",
    paraQuien:
      "Empresas sólidas, campañas de publicidad, videos de lanzamiento o piezas para la portada de un sitio.",
    incluye: [
      "Sesiones de grabación para la pieza comercial",
      "Edición de 1 video de 1 a 3 minutos",
      "Guion narrativo y guion técnico con storyboard, para aprobación",
      "B-roll",
      "Colorización y diseño sonoro avanzado",
    ],
    noIncluye: [
      "Crew ampliado (gaffer, sonidista dedicado, segunda cámara)",
      "Casting profesional o derechos de imagen de terceros",
    ],
    precio: "Desde $7,550 MXN",
    rubro: "comercial",
    acento: "naranja",
  },
  {
    id: "identidad-express",
    pilar: "C1",
    nombre: "Identidad Visual Exprés",
    promesa: "Verse profesional el lunes siguiente, sin construir un sistema completo.",
    paraQuien:
      "Emprendedores nuevos, consultores o doctores que recién abren redes.",
    incluye: [
      "Vectorización del logotipo existente, con reducciones para avatar",
      "Si no hay logo: un wordmark simple",
      "Paleta de color",
      "2 familias tipográficas para redes",
      "Diseño del primer post destacado",
      "Set de iconos para historias",
    ],
    noIncluye: [
      "Manual de marca ni tono de voz redactado",
      "Papelería impresa o señalética",
      "Exploración abierta de conceptos de logo",
    ],
    precio: "$2,250 MXN",
    rubro: "marca-express",
    acento: "azul",
  },
  {
    id: "identidad-completa",
    pilar: "C2",
    nombre: "Identidad Visual Completa",
    promesa: "Una marca conceptualizada a fondo, con manual y aplicaciones.",
    paraQuien:
      "PyMEs establecidas, corporativos y clínicas premium que necesitan una marca pensada desde la raíz.",
    incluye: [
      "Logotipo con variaciones: principal, isotipo, horizontal y negativo",
      "Manual de marca: uso del logo, paleta, tipografía, iconografía y aplicaciones",
      "Definición de tono y voz de comunicación",
      "3 mockups comerciales aplicados según el giro",
      "Papelería base: tarjetas, membretado y firma de correo",
    ],
    noIncluye: [
      "Impresión física de la papelería",
      "Estrategia de mercadotecnia o pauta",
      "Rondas de revisión ilimitadas",
    ],
    precio: "Desde $9,800 MXN",
    rubro: "marca",
    acento: "naranja",
  },
  {
    id: "fotografia",
    pilar: "T",
    nombre: "Fotografía de Marca",
    promesa: "Humanizar el perfil, el portafolio y el catálogo en medio día.",
    paraQuien:
      "Doctores, CEOs y marcas personales; también fotografía de producto.",
    incluye: [
      "Sesión de medio día en el espacio del cliente",
      "15 a 20 fotos retocadas",
      "Retratos corporativos tipo headshot",
      "B-roll fotográfico del cliente en su espacio",
    ],
    noIncluye: [
      "Locación externa o de estudio",
      "Maquillaje y peinado profesional",
      "Retoque avanzado pieza por pieza",
    ],
    precio: "Desde $2,500 MXN",
    rubro: "foto",
    acento: "menta",
  },
  {
    id: "landing-express",
    pilar: "D",
    nombre: "Landing Page Exprés",
    promesa: "Una sola página con un solo objetivo de conversión.",
    paraQuien:
      "Negocios con pauta activa o clínicas que necesitan un embudo simple.",
    incluye: [
      "Diseño de una sola página",
      "Copywriting orientado a convertir",
      "Desarrollo y despliegue en Vercel",
      "Conexión del dominio del cliente",
      "Botones de contacto por WhatsApp o Calendly",
    ],
    noIncluye: [
      "Compra del dominio y hosting recurrente",
      "Sitio multipágina o blog",
      "Edición de fotografía o video para la página",
    ],
    precio: "Desde $3,500 MXN",
    rubro: "web",
    acento: "azul",
  },
];
