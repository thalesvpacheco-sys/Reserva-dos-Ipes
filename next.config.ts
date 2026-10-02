import type { NextConfig } from "next";

// Hostinger compartilhada não roda Node: o site sai como HTML estático em out/.
// As imagens já chegam otimizadas por scripts/optimize-images.mjs, por isso o otimizador do Next fica desligado.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
