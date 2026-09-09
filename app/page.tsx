import Link from "next/link";
import Placeholder from "@/components/Placeholder";
import { SITIO, SERVICIOS } from "@/lib/sitio";
import { visibles } from "@/lib/content";
import { urlMedia } from "@/lib/media";

const PILARES = [
  { id: "reels", titulo: "Contenido vertical", texto: "El motor de volumen. Una jornada de grabación, ocho a diez piezas.", formato: "vertical" as const, href: "/reels" },
  { id: "comercial", titulo: "Audiovisual comercial", texto: "Formato cine, con guion y storyboard aprobados antes de producir.", formato: "horizontal" as const, href: "/trabajo" },
  { id: "marca", titulo: "Identidad de marca", texto: "Desde el arranque exprés hasta el sistema completo con manual.", formato: "estatico" as const, href: "/trabajo" },
];

export default function Home() {
  const publicables = visibles();
  const destacados = publicables.filter((p) => p.destacado).slice(0, 4);
  const clientes = [...new Set(publicables.map((p) => p.cliente))];
  // El reel del hero: el más ligero de los verticales, para no castigar
  // la primera carga con un archivo de 45 MB.
  const heroPieza = publicables
    .filter((p) => p.media.tipo === "local")
    .sort((a, b) => (a.media as { pesoMB: number }).pesoMB - (b.media as { pesoMB: number }).pesoMB)[0];

  return (
    <>
      {/* ── Hero ──
          El planteamiento (documento maestro, 6.1) pide video de marca
          en el hero. Todavía no existe esa pieza, así que aquí corre un
          reel real, silenciado y en bucle: ocupa el sitio que le toca y
          de paso enseña trabajo antes del primer scroll. */}
      <section className="relative overflow-hidden aura">
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[var(--color-menta)]">
                {SITIO.nombreLargo}
              </p>
              <h1 className="display mt-6 text-[12vw] leading-[0.88] md:text-[7vw] lg:text-[5.2vw] text-[var(--color-crema)] max-w-[15ch]">
                {SITIO.tagline}
              </h1>
              <p className="mt-7 max-w-lg text-base md:text-lg leading-relaxed text-[color-mix(in_srgb,#eeebe3_72%,transparent)]">
                {SITIO.manifiesto}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/trabajo"
                  className="rounded-full bg-[var(--color-menta)] px-6 py-3 text-sm font-medium text-[var(--color-profundo)] hover:bg-[var(--color-crema)] transition-colors"
                >
                  Ver el trabajo
                </Link>
                <Link
                  href="/servicios"
                  className="rounded-full border border-[var(--color-borde)] px-6 py-3 text-sm text-[var(--color-crema)] hover:border-[var(--color-crema)] transition-colors"
                >
                  Servicios y precios
                </Link>
              </div>
            </div>

            {heroPieza && heroPieza.media.tipo === "local" && (
              <Link
                href={`/reels/${heroPieza.slug}`}
                className="group relative mx-auto w-full max-w-[340px] lg:max-w-none"
              >
                <div
                  className="relative overflow-hidden rounded-2xl border border-[var(--color-borde)] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
                  style={{ aspectRatio: "9 / 16" }}
                >
                  {/* Marcador detrás: si el master no está disponible,
                      el hueco no se ve negro sino encuadrado. */}
                  <div className="absolute inset-0">
                    <Placeholder formato="vertical" etiqueta="reel de marca" />
                  </div>
                  <video
                    src={urlMedia(heroPieza.media.src)}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-menta)]">
                      {heroPieza.cliente}
                    </p>
                    <p className="display-suave text-lg text-[var(--color-crema)]">
                      {heroPieza.titulo}
                    </p>
                  </div>
                  <span className="absolute right-4 top-4 rounded-full bg-[color-mix(in_srgb,#111827_70%,transparent)] px-3 py-1.5 text-[10px] text-[var(--color-crema)] backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                    Ver el feed →
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Los tres pilares, cada uno en su formato nativo ── */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-24">
        <h2 className="display text-2xl md:text-3xl text-[var(--color-crema)]">
          Tres formas de trabajar
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3 items-start">
          {PILARES.map((p) => (
            <Link key={p.id} href={p.href} className="group">
              <div
                className="overflow-hidden rounded-xl border border-[var(--color-borde)]"
                style={{ aspectRatio: p.formato === "vertical" ? "3 / 4" : p.formato === "horizontal" ? "16 / 9" : "4 / 3" }}
              >
                <Placeholder formato={p.formato} etiqueta={p.titulo} />
              </div>
              <h3 className="display-suave mt-4 text-xl text-[var(--color-crema)] group-hover:text-[var(--color-menta)] transition-colors">
                {p.titulo}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-texto-tenue)] leading-relaxed">
                {p.texto}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Destacados ── */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="display text-2xl md:text-3xl text-[var(--color-crema)]">Selección</h2>
          <Link href="/trabajo" className="text-sm text-[var(--color-menta)] hover:underline">
            Ver todo →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {destacados.map((p) => (
            <Link
              key={p.slug}
              href={p.rubro === "reels" ? `/reels/${p.slug}` : `/trabajo/${p.slug}`}
              className="group"
            >
              <div
                className="overflow-hidden rounded-xl border border-[var(--color-borde)]"
                style={{ aspectRatio: p.formato === "vertical" ? "9 / 16" : p.formato === "horizontal" ? "16 / 9" : "4 / 3" }}
              >
                <Placeholder formato={p.formato} compacto />
              </div>
              <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-[var(--color-menta)]">
                {p.cliente}
              </p>
              <h3 className="display-suave text-base text-[var(--color-crema)] group-hover:text-[var(--color-menta)] transition-colors">
                {p.titulo}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Franja de clientes ── */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-texto-tenue)]">
          Marcas con las que hemos trabajado
        </p>
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {clientes.map((c) => (
            <span key={c} className="display-suave text-lg md:text-xl text-[color-mix(in_srgb,#eeebe3_45%,transparent)]">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ── Servicios, resumen ── */}
      <section className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
        <h2 className="display text-2xl md:text-3xl text-[var(--color-crema)]">Qué hacemos</h2>
        <div className="mt-8 grid gap-px bg-[var(--color-borde)] rounded-xl overflow-hidden md:grid-cols-3">
          {SERVICIOS.map((s) => (
            <div key={s.id} className="bg-[var(--color-fondo)] p-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-menta)]">
                Pilar {s.pilar}
              </span>
              <h3 className="display-suave mt-2 text-lg text-[var(--color-crema)]">{s.nombre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-texto-tenue)]">{s.promesa}</p>
              <p className="mt-4 text-sm text-[var(--color-naranja)]">{s.precio}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
