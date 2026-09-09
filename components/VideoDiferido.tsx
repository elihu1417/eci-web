"use client";

import { useEffect, useRef, useState } from "react";

/* Video que no compite con la primera carga.

   Un <video autoPlay> empieza a descargar en cuanto el navegador lee
   la etiqueta, antes que las imágenes y las tipografías. Con un reel
   de 11 MB eso significa que la home se siente lenta aunque el resto
   pese poco: el video se lleva todo el ancho de banda.

   Aquí el video se monta solo cuando:
     · la página ya pintó y el hilo está libre (requestIdleCallback)
     · el elemento está a la vista
     · la conexión no es lenta ni tiene ahorro de datos activado

   Mientras tanto se ve lo que haya detrás — la portada o el marcador —
   así que el hueco nunca queda negro. */

type Conexion = { saveData?: boolean; effectiveType?: string };

export default function VideoDiferido({
  src,
  className = "",
  claseContenedor = "",
}: {
  src: string;
  className?: string;
  claseContenedor?: string;
}) {
  const contenedor = useRef<HTMLDivElement>(null);
  const [cargar, setCargar] = useState(false);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const c = (navigator as Navigator & { connection?: Conexion }).connection;
    /* En 2G o con ahorro de datos, el video simplemente no se carga:
       vale más la página que el adorno. */
    if (c?.saveData) return;
    if (c?.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return;

    let cancelado = false;
    let observador: IntersectionObserver | null = null;

    const arrancar = () => {
      if (cancelado) return;
      const el = contenedor.current;
      if (!el) return;
      observador = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((e) => e.isIntersecting)) {
            setCargar(true);
            observador?.disconnect();
          }
        },
        { rootMargin: "200px" }
      );
      observador.observe(el);
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let id: number;
    if (w.requestIdleCallback) {
      id = w.requestIdleCallback(arrancar, { timeout: 2500 });
    } else {
      id = window.setTimeout(arrancar, 1200);
    }

    return () => {
      cancelado = true;
      observador?.disconnect();
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  return (
    <div ref={contenedor} className={`absolute inset-0 ${claseContenedor}`}>
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
