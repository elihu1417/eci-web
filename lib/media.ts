/* ───────────────────────────────────────────────────────────────
   DE DÓNDE SALEN LOS ARCHIVOS PESADOS

   El planteamiento lo dice desde el documento maestro: el CMS —o en
   este caso la ficha— guarda un identificador, no una URL completa.
   Así se puede cambiar de proveedor sin tocar el contenido.

   Aquí se resuelve ese identificador a una URL real:

   - Si la ruta ya es absoluta (empieza con http), se respeta.
   - Si no, se le antepone NEXT_PUBLIC_MEDIA_BASE.
   - Sin esa variable, queda relativa y se sirve desde public/.

   En la práctica:

     desarrollo   sin variable      →  /demo/reels/reel-01.mp4
     producción   media.eci.mx      →  https://media.eci.mx/demo/reels/reel-01.mp4

   Cambiar de Netlify a Cloudflare R2, o a cualquier otro almacenamiento,
   es cuestión de mover esa variable de entorno. Ni una línea de código.

   REGLA PRÁCTICA de qué va en cada lado:

     En el repositorio   portadas, galerías, previews de hover, logos y
                         tipografías — todo lo que pese menos de ~1 MB.
     Fuera               los reels completos y el video del hero, que son
                         los que engordan el historial de Git y se comen
                         el ancho de banda.
   ─────────────────────────────────────────────────────────────── */

const BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE ?? "").replace(/\/$/, "");

export function urlMedia(src: string): string {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
  return BASE ? `${BASE}${src.startsWith("/") ? "" : "/"}${src}` : src;
}
