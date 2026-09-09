"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ENLACES = [
  { href: "/trabajo", texto: "Trabajo" },
  { href: "/reels", texto: "Reels" },
  { href: "/servicios", texto: "Servicios" },
  { href: "/contacto", texto: "Contacto" },
];

export default function Nav() {
  const ruta = usePathname();

  // El feed es inmersivo: la barra se quita para no competir con el video.
  if (ruta?.startsWith("/reels")) return null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color-mix(in_srgb,var(--color-profundo)_82%,transparent)] border-b border-[var(--color-borde)]">
      <nav className="mx-auto max-w-[1400px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          {/* Logo oficial: versión secundaria en crema */}
          <img
            src="/marca/logos/ECI_Secundario_Crema.svg"
            alt="ECI"
            className="h-7 w-auto transition-opacity group-hover:opacity-80"
          />
        </Link>

        <ul className="flex items-center gap-6 md:gap-8 text-sm">
          {ENLACES.map((e) => {
            const activo = ruta?.startsWith(e.href);
            return (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className={`transition-colors ${
                    activo
                      ? "text-[var(--color-menta)]"
                      : "text-[var(--color-texto-tenue)] hover:text-[var(--color-crema)]"
                  }`}
                >
                  {e.texto}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
