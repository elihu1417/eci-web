import { SITIO } from "@/lib/sitio";

export const metadata = { title: "Contacto" };

const CAMPOS = [
  { id: "nombre", etiqueta: "Nombre", tipo: "text", ancho: "md:col-span-1" },
  { id: "marca", etiqueta: "Marca o negocio", tipo: "text", ancho: "md:col-span-1" },
];

const TIPOS = ["Contenido vertical", "Comercial", "Identidad de marca", "Fotografía", "Web", "Todavía no sé"];
const PRESUPUESTOS = ["Menos de $5,000", "$5,000 – $15,000", "$15,000 – $35,000", "Más de $35,000"];

export default function Contacto() {
  const wa = SITIO.whatsapp.replace(/[^0-9]/g, "");

  return (
    <section className="mx-auto max-w-[1100px] px-6 lg:px-10 py-14 md:py-20">
      <h1 className="display text-4xl md:text-6xl text-[var(--color-crema)] max-w-[16ch]">
        Cuéntanos qué necesitas
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-[color-mix(in_srgb,#eeebe3_75%,transparent)]">
        Cuatro campos, no diez. Con esto basta para saber si podemos ayudarte
        y con qué paquete empezar.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.3fr_1fr]">
        {/* Formulario — todavía sin envío conectado */}
        <form className="grid gap-5 md:grid-cols-2">
          {CAMPOS.map((c) => (
            <label key={c.id} className={`block ${c.ancho}`}>
              <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-texto-tenue)]">
                {c.etiqueta}
              </span>
              <input
                type={c.tipo}
                name={c.id}
                className="mt-2 w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-superficie)] px-4 py-3 text-sm text-[var(--color-crema)] outline-none focus:border-[var(--color-menta)] transition-colors"
              />
            </label>
          ))}

          <label className="block md:col-span-1">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-texto-tenue)]">
              Tipo de proyecto
            </span>
            <select className="mt-2 w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-superficie)] px-4 py-3 text-sm text-[var(--color-crema)] outline-none focus:border-[var(--color-menta)]">
              {TIPOS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="block md:col-span-1">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-texto-tenue)]">
              Presupuesto aproximado
            </span>
            <select className="mt-2 w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-superficie)] px-4 py-3 text-sm text-[var(--color-crema)] outline-none focus:border-[var(--color-menta)]">
              {PRESUPUESTOS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2">
            <button
              type="button"
              className="rounded-full bg-[var(--color-menta)] px-7 py-3 text-sm font-medium text-[var(--color-profundo)] hover:bg-[var(--color-crema)] transition-colors"
            >
              Enviar
            </button>
            <p className="mt-3 text-xs text-[var(--color-naranja)]">
              Prototipo: el envío todavía no está conectado a un servicio de correo.
            </p>
          </div>
        </form>

        {/* Contacto directo */}
        <div className="space-y-6">
          <a
            href={`https://wa.me/${wa}`}
            className="block rounded-xl border border-[var(--color-borde)] p-5 hover:border-[var(--color-menta)] transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-menta)]">
              WhatsApp Business
            </span>
            <p className="display-suave mt-1 text-lg text-[var(--color-crema)]">{SITIO.whatsapp}</p>
          </a>
          <a
            href={`mailto:${SITIO.correo}`}
            className="block rounded-xl border border-[var(--color-borde)] p-5 hover:border-[var(--color-menta)] transition-colors"
          >
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-menta)]">Correo</span>
            <p className="display-suave mt-1 text-lg text-[var(--color-crema)]">{SITIO.correo}</p>
          </a>
          <div className="rounded-xl border border-[var(--color-borde)] p-5">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-menta)]">Instagram</span>
            <p className="display-suave mt-1 text-lg text-[var(--color-crema)]">{SITIO.instagram}</p>
          </div>
          <p className="text-xs text-[var(--color-naranja)]">
            Los datos de contacto son de ejemplo — faltan los reales.
          </p>
        </div>
      </div>
    </section>
  );
}
