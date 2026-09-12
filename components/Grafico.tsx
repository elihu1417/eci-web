import Image from "next/image";
import { urlMedia } from "@/lib/media";

/* Imagen que llena su caja, sea mapa de bits o vector.

   Los SVG no pasan por el optimizador de next/image: se niega a
   rasterizarlos sin `dangerouslyAllowSVG`, y aunque se activara no
   tendría sentido. Un SVG de 3 KB ya pesa menos que cualquier
   derivado WebP y se ve nítido en cualquier pantalla y a cualquier
   zoom. Se sirve tal cual, sin dar la vuelta por /_next/image.

   Por eso conviene que las tarjetas de marca vengan en vector cuando
   el material lo permita: la de Don Neto pasó de 43 KB en JPEG a
   3 KB, y deja de pixelearse en pantallas retina. */

export default function Grafico({
  src,
  alt = "",
  sizes,
  priority = false,
  quality = 85,
  className = "object-cover",
}: {
  src: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
}) {
  const url = urlMedia(src);

  if (/\.svg($|\?)/i.test(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={url}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
    />
  );
}
