import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { SITIO } from "@/lib/sitio";

export const metadata: Metadata = {
  title: {
    default: `${SITIO.nombre} — ${SITIO.nombreLargo}`,
    template: `%s · ${SITIO.nombre}`,
  },
  description: SITIO.promesa,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="border-t border-[var(--color-borde)] mt-32">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-[1fr_auto]">
            <div>
              <p className="display text-3xl md:text-4xl max-w-xl text-[var(--color-crema)]">
                {SITIO.taglineCorta}
              </p>
              <p className="mt-5 text-sm text-[var(--color-texto-tenue)] max-w-md leading-relaxed">
                {SITIO.manifiesto}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-sm md:text-right">
              <a href={`mailto:${SITIO.correo}`} className="hover:text-[var(--color-menta)] transition-colors">
                {SITIO.correo}
              </a>
              <span className="text-[var(--color-texto-tenue)]">{SITIO.instagram}</span>
              <span className="text-[var(--color-texto-tenue)]">{SITIO.whatsapp}</span>
              <span className="text-[var(--color-texto-tenue)]">{SITIO.ciudad}</span>
            </div>
          </div>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-10 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[var(--color-texto-tenue)]">
            <span>© {new Date().getFullYear()} {SITIO.nombreLargo}</span>
            <span className="text-[var(--color-naranja)]">
              Prototipo · contenido de demostración
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
