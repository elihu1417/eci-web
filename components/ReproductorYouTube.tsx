"use client";

import { useState } from "react";
import Placeholder from "./Placeholder";

/* Reproductor 16:9 con carga diferida.

   El iframe de YouTube pesa cerca de 1 MB de JavaScript de terceros.
   Aquí no se carga hasta que alguien lo pide: la página abre igual de
   rápido tenga video o no. Es la razón por la que los comerciales
   viven fuera del sitio y aquí solo guardamos el identificador. */

export default function ReproductorYouTube({
  id,
  titulo,
}: {
  id: string;
  titulo: string;
}) {
  const [activo, setActivo] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[var(--color-borde)] bg-black"
      style={{ aspectRatio: "16 / 9" }}
    >
      {activo ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={titulo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          onClick={() => setActivo(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Reproducir ${titulo}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 -z-10">
            <Placeholder formato="horizontal" etiqueta="portada del comercial" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-menta)] text-[var(--color-profundo)] transition-transform group-hover:scale-110">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="currentColor" aria-hidden>
                <path d="M20 11 0 22V0z" />
              </svg>
            </span>
          </span>
          <span className="absolute bottom-3 left-4 rounded-full bg-[color-mix(in_srgb,#111827_75%,transparent)] px-3 py-1.5 text-[11px] text-[var(--color-crema)] backdrop-blur-sm">
            El reproductor carga solo al hacer clic
          </span>
        </button>
      )}
    </div>
  );
}
