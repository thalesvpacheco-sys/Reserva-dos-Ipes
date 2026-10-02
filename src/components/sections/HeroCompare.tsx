"use client";

import { useEffect, useRef } from "react";
import { useMode } from "@/lib/mode";
import { Img } from "@/components/ui/Img";
import { Moon, Sun } from "@/components/ui/icons";

type Shot = { img: string; alt: string };

/** Comparador da portaria: o cursor "anoitece" a foto; no toque arrasta; no teclado usa o range. */
export function HeroCompare({ dia, noite, labels }: { dia: Shot; noite: Shot; labels: { dia: string; noite: string; label: string } }) {
  const box = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const rest = useRef(50);
  const mode = useMode();
  const firstMode = useRef(true);

  // atualiza só a variável CSS (sem re-render a cada movimento do mouse)
  function setX(v: number) {
    box.current?.style.setProperty("--x", `${v}%`);
    if (range.current) range.current.value = String(Math.round(v));
  }

  // botão Dia/Noite: a portaria vai inteira para o modo escolhido
  useEffect(() => {
    if (firstMode.current) {
      firstMode.current = false;
      return;
    }
    rest.current = mode === "noite" ? 100 : 0;
    setX(rest.current);
  }, [mode]);

  useEffect(() => {
    const el = box.current!;
    let drag = false;
    const at = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      return Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || drag) {
        el.classList.add("is-drag");
        setX(at(e));
      }
    };
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        drag = true;
        el.classList.add("is-drag");
        setX(at(e));
      }
    };
    const up = () => {
      if (drag) {
        drag = false;
        el.classList.remove("is-drag");
      }
    };
    const leave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        el.classList.remove("is-drag");
        setX(rest.current);
      }
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerleave", leave);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return (
    <div className="cmp" ref={box}>
      <Img name={dia.img} alt={dia.alt} priority />
      <Img name={noite.img} alt={noite.alt} priority className="cmp__n" />
      <span className="cmp__tag cmp__tag--n">{labels.noite}</span>
      <span className="cmp__tag cmp__tag--d">{labels.dia}</span>
      <input
        ref={range}
        className="cmp__range"
        type="range"
        min={0}
        max={100}
        defaultValue={50}
        aria-label={labels.label}
        onInput={(e) => {
          rest.current = Number(e.currentTarget.value);
          setX(rest.current);
        }}
      />
      <span className="cmp__line" aria-hidden="true">
        <span className="cmp__knob">
          <Moon />
          <Sun />
        </span>
      </span>
    </div>
  );
}
