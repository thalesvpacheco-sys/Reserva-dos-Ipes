import type { CSSProperties } from "react";
import { Img } from "./Img";

type Shot = { img: string; alt: string };

/** Foto que segue o modo da página: a versão do entardecer fica por cima e aparece no modo Noite (só CSS). */
export function DayNight({ dia, noite, sizes, className = "", style }: { dia: Shot; noite?: Shot; sizes?: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`dn ${className}`} style={style}>
      <Img name={dia.img} alt={dia.alt} sizes={sizes} />
      {noite && <Img name={noite.img} alt={noite.alt} sizes={sizes} />}
    </div>
  );
}
