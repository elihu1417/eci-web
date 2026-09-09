"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Placeholder from "./Placeholder";
import { visibles, rubrosActivos, MEDIDAS, iniciales, type Pieza, type Rubro } from "@/lib/content";
import { urlMedia } from "@/lib/media";

/* Rejilla asimétrica tipo bento.

   Se resuelve con columnas CSS (masonry) en vez de una cuadrícula
   rígida, porque cada pieza conserva su proporción nativa: las
   verticales quedan altas y angostas, las horizontales anchas y
   cinematográficas. La composición sola comunica la mezcla de
   servicios, que era el objetivo del planteamiento. */

const PROPORCION: Record<string, string> = {
  vertical: "9 / 16",
  horizontal: "16 / 9",
  estatico: "4 / 3",
};

/* Recuadro con el logo reducido del cliente.
   Mientras no exista el SVG, se dibuja un monograma con sus
   iniciales — mismo tamaño y misma caja, para poder juzgar el diseño. */
function CajaLogo({ pieza, tam = 34 }: { pieza: Pieza; tam?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-md border border-[color-mix(in_srgb,#eeebe3_22%,transparent)] bg-[color-mix(in_srgb,#111827_78%,transparent)] backdrop-blur-sm overflow-hidden"
      style={{ width: tam, height: tam }}
    >
      {pieza.logo ? (
        <img src={pieza.logo} alt="" className="h-[62%] w-[62%] object-contain" />
      ) : (
        <span
          className="display text-[var(--color-crema)] leading-none"
          style={{ fontSize: tam * 0.4 }}
        >
          {iniciales(pieza.cliente)}
        </span>
      )}
    </span>
  );
}

function Tarjeta({ p }: { p: Pieza }) {
  const [hover, setHover] = useState(false);
  /* Una vez que el cursor entró, la imagen de hover ya se pidió y se
     queda montada; no tiene sentido volver a descargarla. */
  const [tocada, setTocada] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const medidas = MEDIDAS[p.formato];

  const alEntrar = () => {
    setHover(true);
    setTocada(true);
    const v = video.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const alSalir = () => {
    setHover(false);
    video.current?.pause();
  };

  const esVideoLocal = p.media.tipo === "local";

  return (
    <Link
      href={p.rubro === "reels" ? `/reels/${p.slug}` : `/trabajo/${p.slug}`}
      className="group mb-3 md:mb-4 block break-inside-avoid"
      onMouseEnter={alEntrar}
      onMouseLeave={alSalir}
    >
      <div
        className="relative overflow-hidden rounded-xl border border-[var(--color-borde)] bg-[var(--color-superficie)]"
        style={{ aspectRatio: PROPORCION[p.formato] }}
      >
        {/* Recurso base */}
        {p.tarjeta ? (
          <Image
            src={urlMedia(p.tarjeta)}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <Placeholder formato={p.formato} etiqueta="recurso base" variante={1} />
        )}

        {/* Segundo recurso: aparece al pasar el cursor.
            En las piezas de video es el preview mudo; en las estáticas
            es la segunda imagen, del mismo tamaño que la base. */}
        {esVideoLocal ? (
          <video
            ref={video}
            src={urlMedia((p.media as { src: string }).src)}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          >
            {p.tarjetaHover ? (
              /* Solo se descarga cuando el cursor entra por primera vez.
                 Antes se bajaban las dos imágenes de cada tarjeta aunque
                 nadie pasara por encima: el doble de peso en la rejilla. */
              tocada && (
                <Image
                  src={urlMedia(p.tarjetaHover)}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover"
                />
              )
            ) : (
              <Placeholder formato={p.formato} etiqueta="segundo recurso" variante={2} esHover />
            )}
          </div>
        )}

        {/* Degradado de lectura */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--color-profundo)] via-[color-mix(in_srgb,#111827_55%,transparent)] to-transparent" />

        {/* Etiqueta de medidas — para juzgar tamaños de un vistazo */}
        <span className="absolute top-3 left-3 rounded-full bg-[color-mix(in_srgb,var(--color-profundo)_75%,transparent)] px-2.5 py-1 text-[10px] tracking-wider text-[var(--color-menta)] backdrop-blur-sm">
          {medidas.w} × {medidas.h}
        </span>

        {esVideoLocal && (
          <span className="absolute top-3 right-3 rounded-full bg-[color-mix(in_srgb,var(--color-naranja)_85%,transparent)] px-2.5 py-1 text-[10px] font-medium tracking-wider text-[var(--color-profundo)]">
            {(p.media as { pesoMB: number }).pesoMB} MB
          </span>
        )}

        {/* ── Bloque de identidad del cliente ──
            Logo reducido en su recuadro, nombre del cliente resaltado
            y la categoría debajo. */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center gap-2.5">
            <CajaLogo pieza={p} />
            <div className="min-w-0">
              <p className="display-suave truncate text-[15px] leading-tight text-[var(--color-menta)]">
                {p.cliente}
              </p>
              <p className="truncate text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,#eeebe3_58%,transparent)]">
                {p.categoria}
              </p>
            </div>
          </div>

          <h3 className="display-suave mt-3 text-lg leading-tight text-[var(--color-crema)]">
            {p.titulo}
          </h3>
          <p className="mt-1 text-xs leading-snug text-[var(--color-texto-tenue)] line-clamp-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {p.resumen}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function Rejilla() {
  const [filtro, setFiltro] = useState<Rubro | "todos">("todos");

  const lista = useMemo(
    () => visibles().filter((p) => filtro === "todos" || p.rubro === filtro),
    [filtro]
  );

  const total = visibles().length;
  const conteo = (r: Rubro) => visibles().filter((p) => p.rubro === r).length;

  return (
    <>
      {/* Filtro: reordena en vivo, no navega a otra página */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Boton activo={filtro === "todos"} onClick={() => setFiltro("todos")}>
          Todo <span className="opacity-50">{total}</span>
        </Boton>
        {rubrosActivos().filter((r) => conteo(r.id) > 0).map((r) => (
          <Boton
            key={r.id}
            activo={filtro === r.id}
            onClick={() => setFiltro(r.id)}
          >
            {r.corto} <span className="opacity-50">{conteo(r.id)}</span>
          </Boton>
        ))}
      </div>

      <div
        key={filtro}
        className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 [animation:aparecer_.4s_var(--ease-eci)]"
      >
        {lista.map((p) => (
          <Tarjeta key={p.slug} p={p} />
        ))}
      </div>
    </>
  );
}

function Boton({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
        activo
          ? "border-[var(--color-menta)] bg-[var(--color-menta)] text-[var(--color-profundo)]"
          : "border-[var(--color-borde)] text-[var(--color-texto-tenue)] hover:border-[var(--color-crema)] hover:text-[var(--color-crema)]"
      }`}
    >
      {children}
    </button>
  );
}
