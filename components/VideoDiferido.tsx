"use client";

import { useState } from "react";
import { useCargaDiferida } from "@/lib/carga-diferida";

/* Video decorativo de una sola fuente, que no compite con la primera
   carga de la página. La regla de "cuándo empezar a bajar" vive en
   useCargaDiferida; aquí solo queda el elemento y su fundido.

   Mientras tanto se ve lo que haya detrás — la portada o el marcador —
   así que el hueco nunca queda negro. */

export default function VideoDiferido({
  src,
  className = "",
  claseContenedor = "",
}: {
  src: string;
  className?: string;
  claseContenedor?: string;
}) {
  const { ref, cargar } = useCargaDiferida<HTMLDivElement>();
  const [listo, setListo] = useState(false);

  return (
    <div ref={ref} className={`absolute inset-0 ${claseContenedor}`}>
      {cargar && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setListo(true)}
          className={`${className} transition-opacity duration-700 ${
            listo ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
