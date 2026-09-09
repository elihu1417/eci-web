/* ───────────────────────────────────────────────────────────────
   CONTENIDO DE DEMOSTRACIÓN

   Un proyecto de ejemplo por cada tipo de área, con la ficha
   completamente llena. Sirve para dos cosas:

   1. Probar la estructura de la web sin material exportado.
   2. Enseñarle al equipo qué tan largo debe ser cada campo y con
      qué tono se escribe.

   TODAS las piezas llevan `demo: true`. Antes de lanzar se apagan
   con una sola bandera — no queda rastro.

   La estructura de estos objetos es idéntica al frontmatter de
   _FICHA.md en 01_RECURSOS/00_NuevoOrden. Cuando conectemos Sanity,
   cambia de dónde salen los datos, no el resto del sitio.
   ─────────────────────────────────────────────────────────────── */

export type Rubro =
  | "marca"
  | "marca-express"
  | "reels"
  | "comercial"
  | "foto"
  | "diseno"
  | "web";

export type Formato = "vertical" | "horizontal" | "estatico";

export type Metrica = { valor: string; etiqueta: string };

/* Quién trabajó en la pieza. Va al final del caso de estudio.
   El enlace es opcional: no todos tienen o quieren redes públicas. */
export type Colaborador = {
  nombre: string;
  rol: string;
  url?: string;
  /* Cómo se muestra el enlace. Si se omite se deduce del dominio. */
  red?: string;
};

export type Media =
  | { tipo: "local"; src: string; pesoMB: number }
  | { tipo: "youtube"; id: string }
  | { tipo: "ninguno" };

/* ── Una imagen dentro de un caso ──
   Guarda las medidas del ARCHIVO ORIGINAL, que casi nunca coinciden
   con la proporción que usa el layout. La rejilla recorta a cuadrada
   o a panorámica para que la interfaz quede ordenada; el visor a
   pantalla completa muestra la foto entera, sin recorte. */
export type Imagen = {
  /** Medidas del archivo tal como se exportó */
  w: number;
  h: number;
  pie?: string;
  /** Ruta del archivo. Sin ella se dibuja el marcador dimensionado. */
  src?: string;
  /** Animación opcional (MP4 mudo) que se reproduce sobre `src`.
      Los GIF de marca se convierten a MP4: mismo movimiento, una
      décima parte del peso, y `src` queda de póster. */
  video?: string;
};

/* ── Módulos del cuerpo del caso de estudio ──
   Se combinan libremente y en cualquier orden. Un proyecto puede ser
   solo cuadrículas; otro puede alternar texto e imagen. Lo decide
   cada proyecto según lo que haya que contar. */
export type Modulo =
  /* Dos imágenes recortadas a cuadrada, una al lado de la otra */
  | { tipo: "cuadricula"; imagenes: [Imagen, Imagen] }
  /* Una sola imagen que cubre el ancho de las dos anteriores */
  | { tipo: "completa"; imagen: Imagen; alto?: "normal" | "panoramico" | "cuadro" }
  /* Bloque de texto: título grande a la izquierda, párrafos a la
     derecha. Opcionalmente con una imagen al costado. */
  | { tipo: "texto"; titulo: string; parrafos: string[]; imagen?: Imagen };

/* Reúne, en orden de lectura, todas las imágenes de un caso.
   Es la lista que recorre el visor con las flechas. */
export const imagenesDe = (modulos: Modulo[] = []): Imagen[] =>
  modulos.flatMap((m) =>
    m.tipo === "cuadricula"
      ? m.imagenes
      : m.tipo === "completa"
      ? [m.imagen]
      : m.imagen
      ? [m.imagen]
      : []
  );

export type Pieza = {
  slug: string;
  titulo: string;
  cliente: string;
  clienteId: string;
  /* Categoría o giro del cliente — se muestra en la tarjeta */
  categoria: string;
  /* Logo reducido del cliente para el recuadro de la tarjeta.
     Si no hay archivo, se dibuja un monograma con sus iniciales. */
  logo?: string;
  /* El logo trae su propio fondo de color y llena la caja. Las
     reducciones sobre transparente se dejan con aire alrededor. */
  logoLleno?: boolean;
  /* Imágenes de la pieza. Donde falte una, se dibuja el marcador. */
  portada?: string;
  tarjeta?: string;
  tarjetaHover?: string;
  /** Animación de hover para piezas sin video propio (MP4 mudo).
      Si existe, manda sobre `tarjetaHover`, que queda de póster. */
  tarjetaHoverVideo?: string;
  campana?: string;
  rubro: Rubro;
  formato: Formato;
  anio: number;
  resumen: string;
  /* Contexto general del proyecto: un título y el párrafo que lo
     acompaña. Sustituye al bloque de tres métricas en el caso. */
  contexto?: { titulo: string; parrafos: string[] };
  descripcion: string[];
  servicios: string[];
  metricas: Metrica[];
  /* Créditos de la pieza, al cierre del caso */
  colaboradores?: Colaborador[];
  modulos?: Modulo[];
  destacado: boolean;
  orden: number;
  media: Media;
  galeria: number;
  demo: boolean;
};

/* Logotipos para la franja de "marcas con las que hemos trabajado".

   Van aparte de la pieza porque esa franja lista CLIENTES, no
   trabajos: un cliente con tres proyectos aparece una sola vez, y no
   tendría sentido repetir el mismo archivo en cada ficha. Donde no
   hay logo se sigue escribiendo el nombre, que es como estaba. */
export const LOGOS_CLIENTE: Record<string, string> = {
  "Don Neto": "/clientes/don-neto.svg",
};

export const RUBROS: { id: Rubro; nombre: string; corto: string }[] = [
  { id: "marca", nombre: "Identidad completa", corto: "Marca" },
  { id: "marca-express", nombre: "Identidad exprés", corto: "Exprés" },
  { id: "reels", nombre: "Contenido vertical", corto: "Reels" },
  { id: "comercial", nombre: "Audiovisual comercial", corto: "Comercial" },
  { id: "foto", nombre: "Fotografía", corto: "Foto" },
  { id: "diseno", nombre: "Diseño gráfico", corto: "Diseño" },
  { id: "web", nombre: "Desarrollo web", corto: "Web" },
];

/* Medidas del manual — se dibujan sobre cada placeholder para poder
   juzgar los tamaños reales en pantalla. */
export const MEDIDAS: Record<Formato, { w: number; h: number }> = {
  vertical: { w: 1080, h: 1920 },
  horizontal: { w: 1920, h: 1080 },
  estatico: { w: 1600, h: 1200 },
};

export const PIEZAS: Pieza[] = [
  /* ─── REELS · Desvelados — tres piezas de una misma campaña ─── */
  {
    slug: "desvelados-otono-thai-latte",
    titulo: "Thai Latte",
    cliente: "Desvelados",
    clienteId: "31_DESVELADOS",
    categoria: "Cafetería de especialidad",
    campana: "otono-2025",
    rubro: "reels",
    formato: "vertical",
    anio: 2025,
    resumen: "La bebida de temporada contada en el tiempo que tarda en servirse.",
    descripcion: [
      "Desvelados abre temporada de otoño con tres bebidas nuevas y necesita que se entiendan en redes antes de que alguien pise la cafetería. El reto no era mostrar el producto: era que se antojara en los primeros dos segundos, antes de que el pulgar siguiera de largo.",
      "Grabamos las tres bebidas en una sola sesión de medio día, aprovechando la luz natural del local a media mañana. El montaje sigue el ritmo del proceso —vertido, vapor, primer sorbo— sin locución, apoyado solo en diseño sonoro.",
    ],
    servicios: ["contenido-vertical"],
    metricas: [
      { valor: "3 piezas", etiqueta: "en una sola sesión" },
      { valor: "1/2 día", etiqueta: "de grabación" },
    ],
    destacado: true,
    orden: 1,
    media: { tipo: "local", src: "/01_REELS/2025-Desvelados_Thai Latte.mp4", pesoMB: 11.4 },
    galeria: 0,
    demo: true,
  },
  {
    slug: "desvelados-otono-pumpkin-spice",
    titulo: "Pumpkin Spice",
    cliente: "Desvelados",
    clienteId: "31_DESVELADOS",
    categoria: "Cafetería de especialidad",
    campana: "otono-2025",
    rubro: "reels",
    formato: "vertical",
    anio: 2025,
    resumen: "El clásico de temporada, sin el cliché de temporada.",
    descripcion: [
      "Segunda pieza de la campaña de otoño. La instrucción de dirección de arte fue evitar todo el repertorio visual gastado del pumpkin spice —hojas secas, suéteres, luz naranja— y quedarse en el producto y las manos.",
    ],
    servicios: ["contenido-vertical"],
    metricas: [{ valor: "18 s", etiqueta: "de duración" }],
    destacado: false,
    orden: 2,
    media: { tipo: "local", src: "/01_REELS/2025_Desvelados_PumkingSpicen.mp4", pesoMB: 18.7 },
    galeria: 0,
    demo: true,
  },
  {
    slug: "desvelados-que-le-puedo-ofrecer",
    titulo: "¿Qué le puedo ofrecer?",
    cliente: "Desvelados",
    clienteId: "31_DESVELADOS",
    categoria: "Cafetería de especialidad",
    campana: "otono-2025",
    rubro: "reels",
    formato: "vertical",
    anio: 2025,
    resumen: "La pregunta de barra convertida en gancho de apertura.",
    descripcion: [
      "Cierra la campaña de otoño. La frase que el barista dice cien veces al día abre el video, y el resto de la pieza son las respuestas posibles: cada bebida de la temporada en un corte.",
    ],
    servicios: ["contenido-vertical"],
    metricas: [{ valor: "3ª pieza", etiqueta: "de la campaña de otoño" }],
    destacado: false,
    orden: 3,
    media: { tipo: "local", src: "/01_REELS/2025-Desvelados-Que-Le-Puedo-Ofrecer.mp4", pesoMB: 14.4 },
    galeria: 0,
    demo: true,
  },

  /* ─── REELS · otros clientes, para demostrar rango ───
     Reexportados y servidos desde R2. */
  {
    slug: "landmark-departamento-1404",
    titulo: "Departamento 1404",
    cliente: "Erika · Landmark",
    clienteId: "27_LANDMARK",
    categoria: "Bienes raíces",
    rubro: "reels",
    formato: "vertical",
    anio: 2026,
    resumen: "Un recorrido de departamento que se entiende sin narración.",
    descripcion: [
      "Bienes raíces en formato vertical tiene un problema propio: el recorrido tradicional es horizontal y aburrido. Aquí la cámara sigue el trayecto que haría alguien que llega a vivir, no el que haría un inspector.",
      "Los gráficos en pantalla sustituyen a la locución: metros cuadrados, recámaras y amenidades aparecen cuando el espacio correspondiente está a cuadro.",
    ],
    servicios: ["contenido-vertical"],
    metricas: [
      { valor: "1404", etiqueta: "piso 14, unidad 04" },
      { valor: "0", etiqueta: "palabras de locución" },
    ],
    destacado: true,
    orden: 4,
    media: { tipo: "local", src: "/01_REELS/2026-BRICKA-Landmark-Departamento-140.mp4", pesoMB: 16.2 },
    galeria: 0,
    demo: true,
  },
  /* ── Estas dos piezas llevan TEXTO GENÉRICO a propósito ──
     Están para poder ver el feed completo mientras llega el documento
     maestro con los textos reales. No son propuesta de redacción. */
  {
    slug: "shiny-servicios",
    titulo: "Servicios",
    cliente: "Shiny",
    clienteId: "14_SHINY",
    categoria: "Por definir",
    rubro: "reels",
    formato: "vertical",
    anio: 2025,
    resumen: "Pieza de contenido vertical. Texto pendiente del documento maestro.",
    descripcion: [],
    servicios: ["contenido-vertical"],
    metricas: [],
    destacado: false,
    orden: 5,
    media: { tipo: "local", src: "/01_REELS/2025-Shiny-Servicios.mp4", pesoMB: 19.2 },
    galeria: 0,
    demo: true,
  },
  {
    slug: "espolon-rollforcocktail",
    titulo: "Roll for Cocktail",
    cliente: "Espolón Tequila",
    clienteId: "08_ESPOLON_TEQUILA",
    categoria: "Destilados",
    rubro: "reels",
    formato: "vertical",
    anio: 2026,
    resumen: "Pieza de contenido vertical. Texto pendiente del documento maestro.",
    descripcion: [],
    servicios: ["contenido-vertical"],
    metricas: [],
    destacado: false,
    orden: 6,
    media: { tipo: "local", src: "/01_REELS/2026-Espolontequila-Rollforcocktail.mp4", pesoMB: 11.8 },
    galeria: 0,
    demo: true,
  },
  {
    slug: "electrificaciones-ramos-intro",
    titulo: "Intro",
    cliente: "Electrificaciones Ramos",
    clienteId: "05_ELECTRIFICACIONES_RAMOS",
    categoria: "Servicios industriales",
    rubro: "reels",
    formato: "vertical",
    anio: 2025,
    resumen: "Pieza de contenido vertical. Texto pendiente del documento maestro.",
    descripcion: [],
    servicios: ["contenido-vertical"],
    metricas: [],
    destacado: false,
    orden: 7,
    media: { tipo: "local", src: "/01_REELS/2025-Electrificaciones-Ramos.mp4", pesoMB: 11.1 },
    galeria: 0,
    demo: true,
  },
  {
    slug: "bricka-casa-salon-eventos",
    titulo: "Casa, salón y eventos",
    cliente: "BRICKA",
    clienteId: "04_BRICKA",
    categoria: "Espacios para eventos",
    rubro: "reels",
    formato: "vertical",
    anio: 2026,
    resumen: "Un mismo espacio contando sus tres vidas posibles.",
    descripcion: [
      "BRICKA renta un mismo inmueble para tres usos distintos, y su problema comercial era que quien lo veía como casa no lo imaginaba como salón. La pieza resuelve eso con transiciones sobre el mismo encuadre: el espacio se transforma sin que la cámara se mueva.",
    ],
    servicios: ["contenido-vertical"],
    metricas: [{ valor: "3 usos", etiqueta: "en un solo espacio" }],
    destacado: false,
    orden: 8,
    media: { tipo: "local", src: "/01_REELS/2026-Bricka-CasaSalonEvento.mp4", pesoMB: 21.1 },
    galeria: 0,
    demo: true,
  },
  {
    slug: "espolon-calle-espolon-nyc",
    titulo: "Calle Espolón NYC",
    cliente: "Espolón Tequila",
    clienteId: "08_ESPOLON_TEQUILA",
    categoria: "Destilados",
    rubro: "reels",
    formato: "vertical",
    anio: 2026,
    resumen: "Pieza de contenido vertical. Texto pendiente del documento maestro.",
    descripcion: [],
    servicios: ["contenido-vertical"],
    metricas: [],
    destacado: false,
    orden: 9,
    media: { tipo: "local", src: "/01_REELS/2026-Espolontequila-Calle-Espolon.mp4", pesoMB: 17.2 },
    galeria: 0,
    demo: true,
  },
  {
    slug: "espolon-rg-takes",
    titulo: "R&G Takes",
    cliente: "Espolón Tequila",
    clienteId: "08_ESPOLON_TEQUILA",
    categoria: "Destilados",
    rubro: "reels",
    formato: "vertical",
    anio: 2026,
    resumen: "Pieza de contenido vertical. Texto pendiente del documento maestro.",
    descripcion: [],
    servicios: ["contenido-vertical"],
    metricas: [],
    destacado: false,
    orden: 10,
    /* El archivo subió con una "e" de más al principio del nombre.
       Funciona, pero conviene renombrarlo cuando se haga la limpieza. */
    media: { tipo: "local", src: "/01_REELS/e2026-Espolontequila-rg-takes.mp4", pesoMB: 16.0 },
    galeria: 0,
    demo: true,
  },

  /* ─── COMERCIAL 16:9 ─── */
  {
    slug: "eci-pieza-comercial-demo",
    titulo: "Pieza comercial de referencia",
    cliente: "ECI",
    clienteId: "00_ECI",
    categoria: "Marca propia",
    logo: "/marca/logos/ECI_Secundario_Crema.svg",
    rubro: "comercial",
    formato: "horizontal",
    anio: 2026,
    resumen: "Formato cine 16:9 servido desde YouTube sin listar, cargado solo al hacer clic.",
    contexto: {
      titulo: "El video vive fuera del sitio",
      parrafos: [
        "Esta pieza está aquí para probar el comportamiento del reproductor 16:9 dentro del caso de estudio: el video no se carga hasta que alguien lo pide, de modo que la página abre en el mismo tiempo tenga o no tenga video.",
        "En producción, cada comercial vive en Vimeo o YouTube sin listar y en la carpeta del proyecto solo queda su identificador. Un comercial de dos minutos pesa cientos de megas y no hay razón para duplicarlo en el disco del sitio.",
      ],
    },
    descripcion: [],
    servicios: ["audiovisual-comercial"],
    metricas: [],
    /* CRÉDITOS DE EJEMPLO — sustituir por el equipo real */
    colaboradores: [
      { nombre: "Elihu Arrieta", rol: "Dirección", url: "https://instagram.com/eci.estudio" },
      { nombre: "Nombre por definir", rol: "Cámara" },
      { nombre: "Nombre por definir", rol: "Edición y color", url: "https://vimeo.com/" },
      { nombre: "Nombre por definir", rol: "Diseño sonoro" },
    ],
    destacado: true,
    orden: 6,
    media: { tipo: "youtube", id: "9O3Rb37micI" },
    galeria: 0,
    demo: true,
  },

  /* ═══════════════════════════════════════════════════════════════
     MARCA · Don Neto — MATERIAL REAL
     Primer cliente montado con sus archivos definitivos. Alterna
     cuadrículas y cajas a lo ancho, y estrena la capa animada: los
     GIF del manual convertidos a MP4, tanto en el hover de la
     tarjeta como dentro del caso. Faltan los textos.
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: "don-neto-identidad",
    titulo: "Identidad Don Neto",
    cliente: "Don Neto",
    clienteId: "02_DONNETO",
    categoria: "Panadería tradicional",
    /* La reducción nueva ya trae su fondo crema: llena la caja */
    logo: "/trabajo/don-neto-identidad/logo.svg",
    logoLleno: true,
    portada: "/trabajo/don-neto-identidad/portada.jpg",
    /* La tarjeta es vector: 3 KB y nítida a cualquier tamaño */
    tarjeta: "/trabajo/don-neto-identidad/tarjeta.svg",
    tarjetaHover: "/trabajo/don-neto-identidad/tarjeta-hover.jpg",
    rubro: "marca",
    formato: "estatico",
    anio: 2024,
    /* TEXTOS PENDIENTES — lo que sigue solo describe el material que
       ya está montado. El relato del proyecto lo escribe Elihu. */
    resumen:
      "Sistema de identidad completo para una panadería tradicional: logotipo, mascota, paleta, patrón, empaque y uniformes.",
    descripcion: [],
    servicios: ["identidad-completa"],
    metricas: [],
    /* El caso va en tres tiempos: el sistema, sus aplicaciones y el
       oficio que lo sostiene. Las fotos de panadería cierran el caso
       en vez de abrir un rubro de fotografía aparte: aquí no son un
       trabajo distinto, son el contexto de la marca. */
    modulos: [
      {
        tipo: "cuadricula",
        imagenes: [
          {
            w: 900,
            h: 900,
            src: "/trabajo/don-neto-identidad/galeria/01-logo-animado.jpg",
            video: "/trabajo/don-neto-identidad/galeria/01-logo-animado.mp4",
            pie: "El logotipo construyéndose",
          },
          { w: 1999, h: 2000, src: "/trabajo/don-neto-identidad/galeria/02-reducciones.png", pie: "Logotipo y sus reducciones" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 2000, h: 2000, src: "/trabajo/don-neto-identidad/galeria/03-colores.png", pie: "Paleta con equivalencias Pantone y CMYK" },
          { w: 988, h: 928, src: "/trabajo/don-neto-identidad/galeria/04-graficos.jpg", pie: "Repertorio gráfico de panes" },
        ],
      },
      {
        tipo: "completa",
        alto: "cuadro",
        imagen: {
          w: 1600,
          h: 1202,
          src: "/trabajo/don-neto-identidad/galeria/05-bolsa.jpg",
          video: "/trabajo/don-neto-identidad/galeria/05-bolsa.mp4",
          pie: "Bolsa de tela",
        },
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1151, h: 1081, src: "/trabajo/don-neto-identidad/galeria/06-patron.jpg", pie: "Patrón para empaque" },
          { w: 1503, h: 1679, src: "/trabajo/don-neto-identidad/galeria/07-papeleria.jpg", pie: "Papelería" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 700, h: 955, src: "/trabajo/don-neto-identidad/galeria/08-mandil.jpg", pie: "Mandil de mostrador" },
          { w: 1500, h: 1250, src: "/trabajo/don-neto-identidad/galeria/09-playera.jpg", pie: "Playera de equipo" },
        ],
      },
      {
        tipo: "completa",
        alto: "cuadro",
        imagen: {
          w: 1400,
          h: 1052,
          src: "/trabajo/don-neto-identidad/galeria/10-stickers.jpg",
          video: "/trabajo/don-neto-identidad/galeria/10-stickers.mp4",
          pie: "Stickers del sistema",
        },
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1368, h: 1172, src: "/trabajo/don-neto-identidad/galeria/11-vasos.jpg", pie: "Vasos para llevar" },
          { w: 1400, h: 960, src: "/trabajo/don-neto-identidad/galeria/12-pan.jpg", pie: "Papel de empaque en uso" },
        ],
      },

      /* ── El oficio ── */
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1066, h: 1600, src: "/trabajo/don-neto-identidad/galeria/13-foto-charolas.jpg", pie: "Charolas antes del horno" },
          { w: 1066, h: 1600, src: "/trabajo/don-neto-identidad/galeria/14-foto-conchas.jpg", pie: "Conchas de la casa" },
        ],
      },
      {
        tipo: "completa",
        imagen: { w: 1600, h: 1066, src: "/trabajo/don-neto-identidad/galeria/15-foto-horno.jpg", pie: "El horno encendido" },
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1066, h: 1600, src: "/trabajo/don-neto-identidad/galeria/16-foto-bolillos.jpg", pie: "Bolillo recién salido" },
          { w: 1066, h: 1600, src: "/trabajo/don-neto-identidad/galeria/17-foto-reposo.jpg", pie: "Reposo antes del horno" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1066, h: 1600, src: "/trabajo/don-neto-identidad/galeria/18-foto-vitrina.jpg", pie: "Vitrina de la mañana" },
          { w: 1066, h: 1600, src: "/trabajo/don-neto-identidad/galeria/19-foto-baguettes.jpg", pie: "Baguettes del día" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1066, h: 1600, src: "/trabajo/don-neto-identidad/galeria/20-foto-roles.jpg", pie: "Roles de canela" },
          { w: 1600, h: 1066, src: "/trabajo/don-neto-identidad/galeria/21-foto-harina.jpg", pie: "Harina y masa en la mesa" },
        ],
      },
    ],
    destacado: true,
    orden: 7,
    media: { tipo: "ninguno" },
    galeria: 0,
    demo: false,
  },

  /* ═══════════════════════════════════════════════════════════════
     MARCA · Desvelados — composición SOLO CUADRÍCULA
     El mismo sistema de módulos, usado en su versión más simple:
     puras imágenes, sin bloques de texto. Demuestra el punto 4 —
     el layout depende de lo que cada proyecto tenga que contar.
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: "desvelados-identidad",
    titulo: "Identidad Desvelados",
    cliente: "Desvelados",
    clienteId: "31_DESVELADOS",
    categoria: "Cafetería de especialidad",
    rubro: "marca",
    formato: "estatico",
    anio: 2025,
    resumen: "Una cafetería que abre de noche y necesitaba que eso se notara desde la fachada.",
    contexto: {
      titulo: "Una marca para las horas raras",
      parrafos: [
        "Desvelados abre cuando las demás cafeterías cierran. Su público no busca el ritual de la mañana sino el turno nocturno: estudiantes en examen, gente que sale tarde del trabajo, insomnes con laptop. La identidad tenía que decir eso sin explicarlo.",
      ],
    },
    descripcion: [],
    servicios: ["identidad-completa"],
    metricas: [],
    modulos: [
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 2400, h: 2400, pie: "Logotipo" },
          { w: 2400, h: 2400, pie: "Isotipo nocturno" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 3000, h: 2000, pie: "Paleta" },
          { w: 2000, h: 2500, pie: "Tipografía aplicada" },
        ],
      },
      {
        tipo: "completa",
        imagen: { w: 3600, h: 2025, pie: "Fachada y letrero luminoso" },
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 2000, h: 3000, pie: "Vasos y sleeves" },
          { w: 3000, h: 2000, pie: "Carta de temporada" },
        ],
      },
    ],
    destacado: false,
    orden: 8,
    media: { tipo: "ninguno" },
    galeria: 0,
    demo: true,
  },

  /* ─── MARCA EXPRÉS ─── */
  {
    slug: "klevers-identidad-express",
    titulo: "Arranque de marca Klevers",
    cliente: "Klevers",
    clienteId: "18_KLEVERS",
    categoria: "Consultoría",
    rubro: "marca-express",
    formato: "estatico",
    anio: 2026,
    resumen: "De cero a redes listas para publicar, en una semana.",
    contexto: {
      titulo: "Verse serio el lunes siguiente",
      parrafos: [
        "Klevers necesitaba abrir redes con cara de negocio establecido antes de su primera campaña de pauta. No pedía un sistema de marca completo: pedía dejar de verse improvisado antes de gastar en publicidad.",
      ],
    },
    descripcion: [],
    servicios: ["identidad-express"],
    metricas: [],
    modulos: [
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 2400, h: 2400, pie: "Logotipo y reducción" },
          { w: 3000, h: 2000, pie: "Paleta" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1500, h: 2668, pie: "Perfil aplicado" },
          { w: 2000, h: 2000, pie: "Primer post anclado" },
        ],
      },
    ],
    destacado: false,
    orden: 9,
    media: { tipo: "ninguno" },
    galeria: 0,
    demo: true,
  },

  /* ═══════════════════════════════════════════════════════════════
     FOTO · Athípico — PRIMERA PIEZA CON MATERIAL REAL

     Los textos son una PROPUESTA, escrita a partir de las imágenes.
     Elihu los reescribe con lo que realmente se acordó con el cliente.
     ═══════════════════════════════════════════════════════════════ */
  {
    slug: "athipico-producto",
    titulo: "Antes de la taza",
    cliente: "Athípico",
    clienteId: "01_ATHIPICO",
    categoria: "Café de especialidad",
    rubro: "foto",
    formato: "estatico",
    anio: 2025,
    resumen:
      "La molienda, la extracción y el vertido, fotografiados con la misma precisión con que se ejecutan.",
    portada: "/trabajo/athipico-producto/portada.jpg",
    tarjeta: "/trabajo/athipico-producto/tarjeta.jpg",
    tarjetaHover: "/trabajo/athipico-producto/tarjeta-hover.jpg",
    contexto: {
      titulo: "El precio se explica solo si se ve",
      parrafos: [
        "Un café de especialidad cuesta el doble que uno de cadena, y esa diferencia vive en pasos que el cliente nunca alcanza a ver: la molienda al gramo, la distribución pareja, los segundos exactos de extracción. Athípico necesitaba mostrar ese trabajo sin caer en el catálogo de producto.",
        "La sesión se resolvió como una secuencia de proceso y no como fotos sueltas: cada imagen es un momento del ritual, en el orden en que ocurre. La luz se mantuvo cálida y baja para que el metal y la madera conservaran su textura, y el fondo se dejó siempre fuera de foco para que nunca compitiera con las manos.",
      ],
    },
    descripcion: [],
    servicios: ["fotografia"],
    metricas: [],
    /* CRÉDITOS DE EJEMPLO — nombres y enlaces inventados, para ver el
       diseño. Sustituir por el equipo real de la sesión. */
    colaboradores: [
      { nombre: "Elihu Arrieta", rol: "Dirección y fotografía", url: "https://instagram.com/eci.estudio" },
      { nombre: "Nombre por definir", rol: "Asistencia de set" },
      { nombre: "Nombre por definir", rol: "Retoque digital", url: "https://behance.net/" },
    ],
    modulos: [
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1287, h: 2000, src: "/trabajo/athipico-producto/galeria/01.jpg", pie: "El resultado, antes de contar cómo se llega" },
          { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/04.jpg", pie: "Dosificación al portafiltro" },
        ],
      },
      {
        tipo: "texto",
        titulo: "La molienda es la mitad del café",
        parrafos: [
          "El primer bloque de la secuencia se dedica al molino porque es donde se decide casi todo: el grosor, el peso exacto, la distribución dentro del portafiltro. Es también el paso menos vistoso, así que se fotografió en plano cerrado para que la textura del café molido cargara la imagen.",
        ],
        imagen: { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/05.jpg", pie: "Molienda lista, antes del prensado" },
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/06.jpg", pie: "Extracción" },
          { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/07.jpg", pie: "Los primeros segundos, en detalle" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/08.jpg", pie: "Vaporizado de la leche" },
          { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/09.jpg", pie: "La jarra, lista para verter" },
        ],
      },
      {
        tipo: "texto",
        titulo: "El vertido es lo que la gente fotografía",
        parrafos: [
          "El arte latte es el único paso que el cliente sí ve, y el que termina en redes. Se cubrió con dos tomas: el vertido en movimiento y la taza ya terminada, para que la marca tenga una imagen de proceso y otra de producto sin volver a montar el set.",
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1390, h: 2000, src: "/trabajo/athipico-producto/galeria/10.jpg", pie: "El vertido" },
          { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/11.jpg", pie: "Taza terminada" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/02.jpg", pie: "Bebida fría de temporada" },
          { w: 1333, h: 2000, src: "/trabajo/athipico-producto/galeria/03.jpg", pie: "Integrado frente al cliente" },
        ],
      },
    ],
    destacado: true,
    orden: 9,
    media: { tipo: "ninguno" },
    galeria: 0,
    demo: true,
  },

  /* ─── FOTO ─── */
  {
    slug: "desvelados-producto-otono",
    titulo: "Producto de temporada",
    cliente: "Desvelados",
    clienteId: "31_DESVELADOS",
    categoria: "Cafetería de especialidad",
    campana: "otono-2025",
    rubro: "foto",
    formato: "estatico",
    anio: 2025,
    resumen: "Las mismas tres bebidas del reel, en fijo, para carta y catálogo.",
    contexto: {
      titulo: "Aprovechar el set que ya estaba montado",
      parrafos: [
        "Se aprovechó el mismo día de grabación del contenido vertical: las luces ya estaban montadas y el barista ya estaba en set, así que la sesión de foto costó medio día adicional en vez de una jornada completa.",
        "La secuencia sigue el orden narrativo del manual: general del set, media distancia con las manos en cuadro, y cierre en detalle de textura.",
      ],
    },
    descripcion: [],
    servicios: ["fotografia"],
    metricas: [],
    /* Las medidas son las que pide el manual para galería de foto:
       lado largo 2000 px. La mezcla de horizontales, verticales y
       cuadradas es a propósito — así se ve la diferencia entre el
       recorte del layout y la foto completa en el visor. */
    modulos: [
      {
        tipo: "completa",
        imagen: { w: 2000, h: 1333, pie: "General del set" },
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1333, h: 2000, pie: "Thai Latte" },
          { w: 1333, h: 2000, pie: "Chisme Matcha" },
        ],
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 2000, h: 1333, pie: "Detalle de vertido" },
          { w: 2000, h: 2000, pie: "Textura de espuma" },
        ],
      },
    ],
    destacado: false,
    orden: 10,
    media: { tipo: "ninguno" },
    galeria: 0,
    demo: true,
  },

  /* ─── DISEÑO ─── */
  {
    slug: "acrilexsa-catalogo-industrial",
    titulo: "Catálogo industrial Acrilexsa",
    cliente: "Acrilexsa",
    clienteId: "15_ACRILEXSA",
    categoria: "Manufactura industrial",
    rubro: "diseno",
    formato: "estatico",
    anio: 2026,
    resumen: "Fichas técnicas que un vendedor puede usar en el celular, frente al cliente.",
    contexto: {
      titulo: "Del PDF de 40 páginas a la ficha suelta",
      parrafos: [
        "El catálogo anterior era un PDF pensado para imprimirse. Nadie lo imprimía y en el teléfono era ilegible, así que el equipo de ventas terminaba mandando fotos sueltas por WhatsApp y perdiendo la consistencia de marca en el camino.",
      ],
    },
    descripcion: [],
    servicios: ["identidad-completa"],
    metricas: [],
    modulos: [
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1600, h: 2000, pie: "Ficha de producto" },
          { w: 1600, h: 2000, pie: "Reverso técnico" },
        ],
      },
      {
        tipo: "completa",
        imagen: { w: 3000, h: 1688, pie: "La serie completa" },
      },
    ],
    destacado: false,
    orden: 11,
    media: { tipo: "ninguno" },
    galeria: 0,
    demo: true,
  },

  /* ─── WEB ─── */
  {
    slug: "tecmi-landing-campus",
    titulo: "Landing de campus",
    cliente: "Tecmi",
    clienteId: "03_TECMI",
    categoria: "Educación",
    rubro: "web",
    formato: "estatico",
    anio: 2026,
    resumen: "Una sola página con un solo trabajo: que agenden la visita.",
    contexto: {
      titulo: "Un objetivo por página",
      parrafos: [
        "La campaña de pauta llevaba tráfico a la página institucional, donde el visitante se perdía entre siete secciones antes de encontrar el formulario. La tasa de rebote lo decía todo.",
        "Se construyó una landing de una sola página, desplegada en Vercel, con un único objetivo de conversión y el botón de agenda visible en todo momento.",
      ],
    },
    descripcion: [],
    servicios: ["landing-express"],
    metricas: [],
    modulos: [
      {
        tipo: "completa",
        imagen: { w: 2560, h: 1440, pie: "Vista de escritorio" },
      },
      {
        tipo: "cuadricula",
        imagenes: [
          { w: 1170, h: 2532, pie: "Móvil · inicio" },
          { w: 1170, h: 2532, pie: "Móvil · formulario" },
        ],
      },
    ],
    destacado: false,
    orden: 12,
    media: { tipo: "ninguno" },
    galeria: 0,
    demo: true,
  },
];

/* ── Rubros ocultos en este primer lanzamiento ──
   No se borra nada: las piezas siguen en el archivo y su ficha queda
   intacta. Solo desaparecen de los listados, del menú de filtros y de
   las rutas generadas. Para volver a mostrarlas basta con sacar el
   rubro de esta lista. */
export const RUBROS_OCULTOS: Rubro[] = ["web", "diseno"];

export const esVisible = (p: Pieza) => !RUBROS_OCULTOS.includes(p.rubro);

/* Todas las piezas publicables. Es la lista que deben usar los
   listados; PIEZAS queda como archivo completo. */
export const visibles = () => PIEZAS.filter(esVisible).sort((a, b) => a.orden - b.orden);

export const piezasPorRubro = (r: Rubro | "todos") =>
  visibles().filter((p) => r === "todos" || p.rubro === r);

export const reels = () =>
  visibles().filter((p) => p.rubro === "reels");

export const piezaPorSlug = (slug: string) => PIEZAS.find((p) => p.slug === slug);

export const rubrosActivos = () =>
  RUBROS.filter(
    (r) => !RUBROS_OCULTOS.includes(r.id) && PIEZAS.some((p) => p.rubro === r.id)
  );

export const otrasDelCliente = (p: Pieza) =>
  visibles().filter((o) => o.clienteId === p.clienteId && o.slug !== p.slug);

/* Iniciales para el monograma que sustituye al logo mientras no
   tengamos el SVG del cliente. */
export const iniciales = (nombre: string) =>
  nombre
    .replace(/[^\p{L}\s·]/gu, "")
    .split(/[\s·]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
