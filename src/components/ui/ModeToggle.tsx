"use client";

import { setMode, useMode } from "@/lib/mode";
import { Moon, Sun } from "./icons";

export function ModeToggle() {
  const mode = useMode();
  return (
    <div className="mode" role="group" aria-label="Ver o condomínio de dia ou à noite">
      <button type="button" aria-pressed={mode === "dia"} onClick={() => setMode("dia")}>
        <Sun />
        Dia
      </button>
      <button type="button" aria-pressed={mode === "noite"} onClick={() => setMode("noite")}>
        <Moon />
        Noite
      </button>
    </div>
  );
}

/** chave do rodapé (padrão footer-section): mesmo estado do botão do topo */
export function ModeSwitch() {
  const mode = useMode();
  const noite = mode === "noite";
  return (
    <div className="sw">
      <Sun />
      <button
        type="button"
        role="switch"
        aria-checked={noite}
        aria-label="Ver à noite"
        onClick={() => setMode(noite ? "dia" : "noite")}
      />
      <Moon />
    </div>
  );
}
