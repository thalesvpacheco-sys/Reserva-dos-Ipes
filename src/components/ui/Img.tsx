import type { ImgHTMLAttributes } from "react";

// Todas as imagens saem de scripts/optimize-images.mjs em 640/1280/1920 px, no mesmo quadro 1920x1071.
const WIDTHS = [640, 1280, 1920] as const;

export function imgSrc(name: string, w: (typeof WIDTHS)[number] = 1280) {
  return `/images/${name}-${w}.webp`;
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "width" | "height"> & {
  name: string;
  alt: string;
  /** imagem da primeira dobra: carrega na hora e com prioridade */
  priority?: boolean;
};

export function Img({ name, alt, priority = false, sizes = "100vw", ...rest }: Props) {
  return (
    <img
      src={imgSrc(name)}
      srcSet={WIDTHS.map((w) => `${imgSrc(name, w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={1920}
      height={1071}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      {...rest}
    />
  );
}
