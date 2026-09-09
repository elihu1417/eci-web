# ECI — Sitio web

Portafolio y sitio de **ECI · Espacio de Creación e Innovación**, agencia B2B
de producción audiovisual y servicios creativos.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4

## Correr en local

```bash
npm install
npm run dev
```

<http://localhost:3000>

> **Nota:** el proyecto no compila en unidades formateadas en **exFAT**
> (`next build` falla con `EISDIR ... readlink`). Para compilar en local hay
> que trabajar desde una unidad NTFS. El servidor de desarrollo sí funciona
> en exFAT, y Vercel compila en Linux sin problema.

## Documentación

- [`LEEME.md`](LEEME.md) — estructura del sitio, sistema de módulos y contenido de demostración
- `00_PLANTEAMIENTO/` (fuera del repo) — documento maestro, manual de recursos y lista de entregables

## Antes del lanzamiento

- [ ] Reexportar los reels a 6–12 MB y moverlos a Cloudflare R2
- [ ] Portadas, previews y galerías reales
- [ ] Datos de contacto reales
- [ ] Apagar el contenido marcado `demo: true`

## Despliegue en Netlify — dos trampas que ya nos costaron

**Netlify bloquea versiones de Next.js con vulnerabilidades conocidas.**
No es un error de compilación: el despliegue se rechaza a propósito. Las
versiones afectadas por CVE-2025-55182 llegan hasta la 15.5.6, así que hay
que mantenerse por encima de eso. Si un despliegue falla con un mensaje
sobre seguridad, lo que toca es subir la versión de Next, no revisar el
código.

**En repositorios privados, el plan gratuito admite un solo colaborador
de Git.** Los commits con un trailer `Co-Authored-By` cuentan como un
segundo colaborador y el despliegue falla con "colaborador de Git no
reconocido". Este repositorio es público, así que no aplica — pero si
alguna vez se hace privado, o se cambia de plan, ese es el motivo.
