import { MEDIDAS, type Formato } from "@/lib/content";

/* Marcador de posición dimensionado.

   No es una imagen genérica: dibuja el rectángulo en la proporción
   exacta que pide el manual y escribe encima las medidas, para poder
   juzgar en pantalla si esos tamaños funcionan en la rejilla real.
   Cuando lleguen las portadas de verdad, este componente se sustituye
   por <Image> y nada más cambia.

   `variante` sirve para distinguir el recurso base del recurso que
   aparece al pasar el cursor: son dos archivos del mismo tamaño, y
   aquí se pintan con acentos distintos para que el cambio se note. */

const ACENTOS: Record<Formato, [string, string]> = {
  vertical: ["var(--color-menta)", "var(--color-azul)"],
  horizontal: ["var(--color-naranja)", "var(--color-azul)"],
  estatico: ["var(--color-azul)", "var(--color-menta)"],
};

const ACENTOS_B: Record<Formato, [string, string]> = {
  vertical: ["var(--color-naranja)", "var(--color-menta)"],
  horizontal: ["var(--color-menta)", "var(--color-naranja)"],
  estatico: ["var(--color-naranja)", "var(--color-azul)"],
};

export default function Placeholder({
  formato,
  etiqueta,
  className = "",
  compacto = false,
  variante = 1,
  medidas,
  esHover = false,
}: {
  formato: Formato;
  etiqueta?: string;
  className?: string;
  compacto?: boolean;
  /* Solo cambia el acento de color, para distinguir dos recursos */
  variante?: 1 | 2;
  /* Para los módulos del caso, que no usan las medidas de portada */
  medidas?: { w: number; h: number };
  /* Marca explícitamente el recurso que aparece al pasar el cursor */
  esHover?: boolean;
}) {
  const { w, h } = medidas ?? MEDIDAS[formato];
  const [a, b] = (variante === 2 ? ACENTOS_B : ACENTOS)[formato];
  const desfase = variante === 2 ? "80% 20%" : "20% 10%";

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(120% 90% at ${desfase}, color-mix(in srgb, ${a} 26%, transparent), transparent 62%),
          radial-gradient(110% 80% at 85% 95%, color-mix(in srgb, ${b} 22%, transparent), transparent 60%),
          var(--color-superficie)`,
      }}
    >
      {/* Retícula de referencia: ayuda a ver el recorte de la tarjeta */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-crema) 1px, transparent 1px), linear-gradient(90deg, var(--color-crema) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Cruz central: marca dónde recorta la tarjeta en pantallas chicas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-px h-full bg-[var(--color-crema)] opacity-10" />
        <div className="absolute w-full h-px bg-[var(--color-crema)] opacity-10" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span
          className={`display text-[var(--color-crema)] opacity-90 ${
            compacto ? "text-lg" : "text-2xl md:text-3xl"
          }`}
        >
          {w} × {h}
        </span>
        {etiqueta && !compacto && (
          <span className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[var(--color-texto-tenue)]">
            {etiqueta}
          </span>
        )}
        {esHover && (
          <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-naranja)]">
            recurso hover
          </span>
        )}
      </div>
    </div>
  );
}
