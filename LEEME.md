# ECI — Prototipo de la web

Primera construcción para aprobar diseño, tamaños y estructura **antes** de
exportar el material real.

## Cómo correrlo

```bash
cd sitio
npm run dev
```

Luego abrir <http://localhost:3000>.

## Qué hay

| Ruta | Qué es |
|---|---|
| `/` | Home: hero, tres pilares, selección, clientes, servicios |
| `/trabajo` | Dashboard con la rejilla bento y filtros por rubro |
| `/trabajo/[slug]` | Caso de estudio: métricas, relato, galería, otras piezas del cliente |
| `/reels` | Feed vertical a pantalla completa |
| `/reels/[slug]` | El feed posicionado en una pieza concreta |
| `/servicios` | Los seis paquetes con lo que incluye y lo que no |
| `/contacto` | Formulario de cuatro campos y contacto directo |

## Atajos del feed de reels

| Tecla | Acción |
|---|---|
| ↑ ↓ | Cambiar de pieza |
| `M` | Activar o silenciar el sonido |
| `G` | **Mostrar la guía de zona segura** |

La guía dibuja las franjas que ocupa la interfaz sobre un cuadro de
1080 × 1920: 180 px arriba, 420 px abajo y 140 px a la derecha. Sirve para
comprobar si el material ya exportado choca con el overlay.

## De dónde sale cada cosa

- **Paleta, logos y tipografías**: `00_PLANTEAMIENTO/02_MARCA`, copiados a
  `public/marca` y `public/fonts`. Las dos familias son variables y con
  licencia OFL, así que el uso web está cubierto.
- **Textos**: `ECI - Documento Maestro de Identidad de Marca (1).pdf`
  (tagline, manifiesto, promesa, personalidad) y
  `ECI - Paquetes de Servicios (Base).pdf` (los seis paquetes).
- **Dirección visual**: sección 06 del documento de identidad — "fondo azul
  marino casi negro, tipografía blanca condensada y muy pesada, manchas de
  gradiente suaves naranja y azul".
- **Videos del feed**: los cinco masters de `99_videos prueba`, sin optimizar.

## El caso de estudio se arma por módulos

El cuerpo de cada caso se compone con tres piezas que se combinan
libremente y en cualquier orden, según lo que ese proyecto tenga que
contar. Se declaran en el campo `modulos` de la ficha.

| Módulo | Qué es | Medidas |
|---|---|---|
| `cuadricula` | Dos imágenes cuadradas, una al lado de la otra | 1400 × 1400 c/u |
| `completa` | Una imagen que cubre el ancho de las dos anteriores | 2400 × 1350, o 2400 × 1000 con `alto: "panoramico"` |
| `texto` | Título grande a la izquierda y párrafos a la derecha. Con `imagen: true` lleva una cuadrada al costado | — |

El módulo de texto sirve para las secciones específicas que dan
robustez al proyecto: dirección de fotografía, cómo se construyeron
los iconos, decisiones de producción.

### Cada foto tiene dos tamaños

En la ficha, cada imagen guarda las medidas de su **archivo original**:

```ts
{ tipo: "cuadricula", imagenes: [
  { w: 1333, h: 2000, pie: "Thai Latte" },
  { w: 2000, h: 2000, pie: "Textura de espuma" },
]}
```

El layout la **recorta** a la proporción del módulo, para que la
rejilla quede pareja y ordenada. Al hacer clic, el visor la abre
**completa, en su proporción original**, y se recorre con ← y →.

Las que están recortadas llevan un aviso en la esquina; la que ya
coincide con su caja, no. Es una ayuda de producción: enseña de un
vistazo qué fotos pierden encuadre en la rejilla.

| Tecla | Acción en el visor |
|---|---|
| ← → | Foto anterior / siguiente, en orden de lectura del caso |
| `Esc` | Cerrar |

El visor recorre **todas** las imágenes del caso en el orden en que
aparecen, incluidas las que viven dentro de un módulo de texto.

### Rubros ocultos

`RUBROS_OCULTOS` en `lib/content.ts` saca un rubro completo de los
listados, del menú de filtros y de las rutas generadas, sin borrar
nada. Para este primer lanzamiento están ocultos `web` y `diseno`.

Los dos casos de marca del prototipo demuestran los dos extremos:

- **Don Neto** alterna cuadrículas, panorámica y dos bloques de texto.
- **Desvelados** es puras cuadrículas y una imagen completa, sin texto.

## La tarjeta de la rejilla

Cada tarjeta muestra el recuadro con el logo reducido del cliente, su
nombre resaltado en menta y la categoría debajo. Mientras no exista el
SVG del cliente se dibuja un monograma con sus iniciales, en la misma
caja y del mismo tamaño.

Al pasar el cursor, la tarjeta cambia entre **dos recursos del mismo
tamaño**: el base y el de hover. En las piezas de video el segundo
recurso es el preview mudo.

## Contenido de demostración

Once piezas, una por cada tipo de área, en `lib/content.ts`. Todas llevan
`demo: true`.

La estructura de esos objetos es idéntica al frontmatter de `_FICHA.md` en
`01_RECURSOS/00_NuevoOrden`. Cuando conectemos Sanity, cambia de dónde salen
los datos, no el resto del sitio.

**Antes de lanzar hay que quitar todas las piezas con `demo: true`.**

## Lo que todavía no es real

- Las portadas son marcadores dimensionados, no imágenes.
- Los videos del feed son los masters sin optimizar (10 a 45 MB); el objetivo
  del manual es 6 a 12 MB.
- Las fuentes van en `.ttf`; pasarlas a `.woff2` recorta cerca del 40 % del peso.
- El formulario de contacto no envía nada todavía.
- Los datos de contacto son de ejemplo.
