"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Placeholder from "./Placeholder";
import { useCargaDiferida } from "@/lib/carga-diferida";

/* Hero rotativo: cinco segundos de cada reel, no uno solo en bucle.

   El problema de tomar un reel completo es que la home enseña un solo
   cliente durante minuto y medio. Rotando, en treinta segundos se ven
   seis trabajos distintos y el hero cumple lo que debe cumplir: dar una
   idea rápida del catálogo.

   El costo es ancho de banda, y por eso hay tres frenos:

   1. Fragmento de medios (#t=0,5). El navegador pide por rango solo el
      arranque del archivo y no bufferea más allá del segundo cinco, así
      que de un reel de 15 MB se bajan unos 2 MB, no los 15.
   2. Dos ranuras y nada más. Una se ve, la otra prepara la siguiente y
      se vacía en cuanto sale de pantalla (removeAttribute + load suelta
      el buffer). Nunca hay tres archivos vivos.
   3. Nadie descarga a ciegas. Si la pestaña está en segundo plano o el
      hero salió del viewport, la rotación se detiene donde está y no
      pide el siguiente hasta que vuelvan a mirarla.

   Con eso, quedarse un minuto en la home cuesta del orden de 12–15 MB
   contra los 11 MB de un solo reel en bucle. Si más adelante existe un
   video de marca propio, este componente se queda igual: se le pasa una
   sola fuente y deja de rotar solo.

   Nota sobre el fragmento: al fijar un final en #t, Chrome deja de
   respetar `loop` — el video termina en el segundo cinco y se queda en
   el último cuadro. Por eso el reinicio se hace a mano en `ended`. */

export type ClipHero = {
  slug: string;
  cliente: string;
  titulo: string;
  src: string;
};

const DURACION = 5000; // ms visibles de cada reel
const ANTICIPO = 1600; // ms antes del corte en que se prepara el siguiente
const CRUCE = 700; // ms de fundido entre ranuras
const MAXIMO = 6; // reels en la rotación

export default function HeroReel({ clips }: { clips: ClipHero[] }) {
  const lista = clips.slice(0, MAXIMO);
  const { ref, cargar } = useCargaDiferida<HTMLDivElement>();

  const ranuraA = useRef<HTMLVideoElement>(null);
  const ranuraB = useRef<HTMLVideoElement>(null);

  const [frente, setFrente] = useState(0);
  const [indice, setIndice] = useState(0);
  const [listo, setListo] = useState(false);

  /* El bucle de rotación vive fuera del render, así que la ranura que
     está al frente se espeja en un ref. */
  const frenteRef = useRef(0);

  /* ¿Alguien está viendo esto?

     Se mide el rectángulo en el momento de preguntar en lugar de
     confiar en un IntersectionObserver: el observer solo avisa cuando
     se cruza el umbral, y si su primera lectura cae antes de que el
     hero tenga altura, se queda con un "no visible" que nunca se
     corrige. Medir cuesta nada y siempre dice la verdad. */
  const atento = useCallback(() => {
    if (typeof document === "undefined") return false;
    if (document.visibilityState !== "visible") return false;
    const el = ref.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return r.height > 0 && r.bottom > 0 && r.top < window.innerHeight;
  }, [ref]);

  /* Pone a correr la ranura del frente y detiene la otra */
  const sincronizar = useCallback(() => {
    const delante = frenteRef.current === 0 ? ranuraA.current : ranuraB.current;
    const detras = frenteRef.current === 0 ? ranuraB.current : ranuraA.current;
    detras?.pause();
    if (!delante?.getAttribute("src")) return;
    if (atento()) delante.play().catch(() => {});
    else delante.pause();
  }, [atento]);

  /* ── Pausa cuando nadie está mirando ── */
  useEffect(() => {
    document.addEventListener("visibilitychange", sincronizar);
    window.addEventListener("scroll", sincronizar, { passive: true });
    window.addEventListener("resize", sincronizar);
    return () => {
      document.removeEventListener("visibilitychange", sincronizar);
      window.removeEventListener("scroll", sincronizar);
      window.removeEventListener("resize", sincronizar);
    };
  }, [sincronizar]);

  /* ── La rotación ── */
  useEffect(() => {
    if (!cargar || lista.length === 0) return;
    const els = [ranuraA.current, ranuraB.current];
    if (!els[0] || !els[1]) return;

    let cancelado = false;
    const relojes = new Set<number>();

    const dormir = (ms: number) =>
      new Promise<void>((res) => {
        const t = window.setTimeout(() => {
          relojes.delete(t);
          res();
        }, ms);
        relojes.add(t);
      });

    /* No se pide el siguiente archivo mientras nadie mira la home */
    const esperarAtencion = async () => {
      while (!cancelado && !atento()) await dormir(400);
    };

    /* Carga una fuente en la ranura de atrás y resuelve cuando puede
       reproducirse. Si el archivo falla o tarda demasiado, resuelve
       igual: más vale un corte feo que una rotación congelada. */
    const preparar = (ranura: number, i: number) =>
      new Promise<void>((res) => {
        const v = els[ranura]!;
        v.src = `${lista[i].src}#t=0,${DURACION / 1000}`;
        v.load();
        let hecho = false;
        const fin = () => {
          if (hecho) return;
          hecho = true;
          v.removeEventListener("canplay", fin);
          v.removeEventListener("error", fin);
          res();
        };
        v.addEventListener("canplay", fin);
        v.addEventListener("error", fin);
        const t = window.setTimeout(fin, 6000);
        relojes.add(t);
      });

    /* Suelta el buffer de la ranura que ya salió de pantalla */
    const vaciar = (ranura: number) => {
      const v = els[ranura];
      if (!v) return;
      v.pause();
      v.removeAttribute("src");
      v.load();
    };

    const correr = async () => {
      await preparar(0, 0);
      if (cancelado) return;
      frenteRef.current = 0;
      setFrente(0);
      setIndice(0);
      setListo(true);
      sincronizar();

      if (lista.length < 2) return;

      let visible = 0;
      let i = 0;

      while (!cancelado) {
        await dormir(DURACION - ANTICIPO);
        if (cancelado) return;
        await esperarAtencion();
        if (cancelado) return;

        const siguiente = (i + 1) % lista.length;
        const detras = visible === 0 ? 1 : 0;

        const t0 = performance.now();
        await preparar(detras, siguiente);
        if (cancelado) return;

        /* Lo que quedaba del clip en pantalla, descontando la carga */
        const resto = ANTICIPO - (performance.now() - t0);
        if (resto > 0) await dormir(resto);
        if (cancelado) return;

        els[detras]!.currentTime = 0;
        frenteRef.current = detras;
        setFrente(detras);
        setIndice(siguiente);
        sincronizar();

        const saliente = visible;
        const t = window.setTimeout(() => {
          relojes.delete(t);
          if (!cancelado) vaciar(saliente);
        }, CRUCE);
        relojes.add(t);

        visible = detras;
        i = siguiente;
      }
    };

    correr();

    return () => {
      cancelado = true;
      relojes.forEach((t) => clearTimeout(t));
      relojes.clear();
      els.forEach((v) => {
        if (!v) return;
        v.pause();
        v.removeAttribute("src");
      });
    };
    // La lista viene del contenido estático: no cambia en vida del componente.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cargar]);

  const clip = lista[indice] ?? lista[0];
  if (!clip) return null;

  return (
    <Link
      href={`/reels/${clip.slug}`}
      className="group relative mx-auto w-full max-w-[340px] lg:max-w-none"
    >
      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-[var(--color-borde)] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        style={{ aspectRatio: "9 / 16" }}
      >
        {/* Marcador detrás: si el master no está disponible, el hueco no
            se ve negro sino encuadrado. */}
        <div className="absolute inset-0">
          <Placeholder formato="vertical" etiqueta="reel de marca" />
        </div>

        {cargar &&
          [0, 1].map((r) => (
            <video
              key={r}
              ref={r === 0 ? ranuraA : ranuraB}
              muted
              playsInline
              preload="none"
              onEnded={(e) => {
                /* El fragmento #t deja fuera de juego a `loop` */
                const v = e.currentTarget;
                v.currentTime = 0;
                if (frenteRef.current === r) v.play().catch(() => {});
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                listo && frente === r ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Marcas de posición en la rotación */}
        {lista.length > 1 && (
          <div className="absolute left-5 top-5 flex gap-1.5">
            {lista.map((c, i) => (
              <span
                key={c.slug}
                className={`h-[3px] w-5 rounded-full transition-colors duration-500 ${
                  i === indice
                    ? "bg-[var(--color-menta)]"
                    : "bg-[color-mix(in_srgb,#eeebe3_30%,transparent)]"
                }`}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div key={clip.slug} className="[animation:aparecer_.5s_var(--ease-eci)]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[var(--color-menta)]">
              {clip.cliente}
            </p>
            <p className="display-suave text-lg text-[var(--color-crema)]">
              {clip.titulo}
            </p>
          </div>
        </div>

        <span className="absolute right-4 top-4 rounded-full bg-[color-mix(in_srgb,#111827_70%,transparent)] px-3 py-1.5 text-[10px] text-[var(--color-crema)] backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
          Ver el feed →
        </span>
      </div>
    </Link>
  );
}
