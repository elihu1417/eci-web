"use client";

import { useEffect, useRef, useState } from "react";

/* Cuándo vale la pena empezar a bajar un video.

   Un <video autoPlay> empieza a descargar en cuanto el navegador lee la
   etiqueta, antes que las imágenes y las tipografías. Con un reel de
   11 MB eso hace que la home se sienta lenta aunque el resto pese poco.

   La regla es la misma en todos los videos decorativos del sitio, así
   que vive aquí y no repetida en cada componente. */

type Conexion = { saveData?: boolean; effectiveType?: string };

/* Conexión en la que un video decorativo hace más daño que bien */
export function conexionLimitada(): boolean {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as Navigator & { connection?: Conexion }).connection;
  if (c?.saveData) return true;
  if (c?.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return true;
  return false;
}

/* Devuelve `cargar: true` cuando la página ya pintó, el hilo está libre
   y el elemento está cerca del viewport. En conexión limitada nunca. */
export function useCargaDiferida<T extends HTMLElement>(margen = "200px") {
  const ref = useRef<T>(null);
  const [cargar, setCargar] = useState(false);

  useEffect(() => {
    if (conexionLimitada()) return;

    let cancelado = false;
    let observador: IntersectionObserver | null = null;

    const arrancar = () => {
      if (cancelado) return;
      const el = ref.current;
      if (!el) return;
      observador = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((e) => e.isIntersecting)) {
            setCargar(true);
            observador?.disconnect();
          }
        },
        { rootMargin: margen }
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
  }, [margen]);

  return { ref, cargar };
}
