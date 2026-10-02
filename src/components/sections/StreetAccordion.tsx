"use client";

import { useEffect, useRef, useState } from "react";
import type { Rua } from "@/lib/content";
import { Img } from "@/components/ui/Img";
import { Expand } from "@/components/ui/icons";
import { Lightbox } from "@/components/ui/Lightbox";

const AUTOPLAY_MS = 4000;

/** Acordeão das casas por rua (adaptado do acordeão do Harmoni). Clique no painel aberto abre as fotos da rua. */
export function StreetAccordion({ ruas, startAt = 2 }: { ruas: Rua[]; startAt?: number }) {
  const [active, setActive] = useState(startAt);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const paused = useRef(false);
  const visible = useRef(false);

  const stop = () => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
  };
  const play = () => {
    stop();
    if (paused.current || !visible.current || lightbox !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(() => setActive((a) => (a + 1) % ruas.length), AUTOPLAY_MS);
  };

  // só gira quando está na tela e ninguém está interagindo
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        play();
      },
      { threshold: 0.3 },
    );
    if (box.current) io.observe(box.current);
    return () => {
      io.disconnect();
      stop();
    };
    // play lê refs e o estado do lightbox; reinicia quando o lightbox fecha
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  const pause = (v: boolean) => {
    paused.current = v;
    if (v) stop();
    else play();
  };

  const rua = lightbox !== null ? ruas[lightbox] : null;

  return (
    <>
      <div
        className="acc"
        ref={box}
        onMouseEnter={() => pause(true)}
        onMouseLeave={() => pause(false)}
        onFocus={() => pause(true)}
        onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && pause(false)}
      >
        {ruas.map((r, i) => {
          const on = i === active;
          return (
            <button
              key={r.id}
              type="button"
              className={`h-panel${on ? " active" : ""}`}
              style={{ ["--c" as string]: r.cor }}
              aria-label={`Rua ${r.nome}: ver as ${r.fotos.length} fotos`}
              onMouseEnter={() => window.matchMedia("(hover:hover)").matches && setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => (on ? setLightbox(i) : setActive(i))}
            >
              <Img className="h-cover" name={r.fotos[0].img} alt={r.fotos[0].alt} sizes="(max-width:759px) 100vw, 75vw" />
              <span className="h-panel-overlay" />
              <span className="h-panel-content">
                <span className="h-panel-text-wrapper">
                  <span className="h-panel-number">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="h-panel-title">Rua {r.nome}</span>
                    <span className="h-panel-desc">
                      <Expand />
                      Ver as {r.fotos.length} fotos da rua
                    </span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <Lightbox
        open={rua !== null}
        title={rua ? `Rua ${rua.nome}` : ""}
        color={rua?.cor ?? "#fff"}
        photos={rua?.fotos ?? []}
        onClose={() => setLightbox(null)}
      />
    </>
  );
}
