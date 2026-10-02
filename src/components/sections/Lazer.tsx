"use client";

import { useState } from "react";
import { copy, galeria } from "@/lib/content";
import { useMode } from "@/lib/mode";
import { Img } from "@/components/ui/Img";

const fine = () => typeof window !== "undefined" && window.matchMedia("(hover:hover) and (pointer:fine)").matches;

/** Lazer: passar o mouse (ou focar) num item troca a foto no lugar; no modo Noite usa a versão do entardecer quando existe. */
export function Lazer() {
  const items = galeria.lazer;
  const [cur, setCur] = useState(0);
  // só monta as fotos já pedidas: evita baixar as 10 imagens de uma vez
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const mode = useMode();
  const t = copy.lazer;

  const pick = (k: number) => {
    setCur(k);
    setSeen((s) => (s.has(k) ? s : new Set(s).add(k)));
  };

  return (
    <section className="sec" id="lazer" aria-labelledby="lz-h" style={{ paddingTop: 0 }}>
      <div className="wrap lz">
        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <h2 className="h2" id="lz-h">{t.titulo}</h2>
          <p className="body">{t.texto}</p>
          <div className="lz__list">
            {items.map((it, k) => (
              <button
                key={it.item}
                className="lz__it"
                type="button"
                aria-current={k === cur}
                onMouseEnter={() => fine() && pick(k)}
                onFocus={() => pick(k)}
                onClick={() => pick(k)}
              >
                {it.item}
              </button>
            ))}
          </div>
          <p className="lamp-line">{t.fechamento}</p>
        </div>
        <div>
          <div className="lz__frame" aria-live="polite">
            {items.map((it, k) => {
              if (!seen.has(k)) return null;
              const useNight = mode === "noite" && "noite" in it && it.noite;
              const name = useNight ? (it.noite as string) : it.dia;
              return <Img key={`${k}-${name}`} name={name} alt={it.alt} className={k === cur ? "on" : ""} sizes="(min-width:960px) 55vw, 100vw" />;
            })}
            <span className="lz__cap">{items[cur].item}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
