import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    /* next/image solo sirve las calidades que estén en esta lista, y
       por omisión la lista es solo [75]. 75 está bien para fotografía
       suelta, pero este sitio enseña láminas de manual, mockups con
       texto pequeño y logotipos de contorno limpio, donde el ruido de
       compresión sí se ve. A 85 el peso sube poco —los originales ya
       llegan reducidos— y los bordes dejan de ensuciarse. */
    qualities: [75, 85],
  },
};

export default nextConfig;
