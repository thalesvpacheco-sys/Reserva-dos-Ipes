"use client";

import { useSyncExternalStore } from "react";

// Modo Dia/Noite da página. Fica no <html data-mode>, porque CSS e várias ilhas de React leem o mesmo valor.
export type Mode = "dia" | "noite";

const listeners = new Set<() => void>();

function read(): Mode {
  return document.documentElement.dataset.mode === "noite" ? "noite" : "dia";
}

export function setMode(mode: Mode) {
  document.documentElement.dataset.mode = mode;
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useMode(): Mode {
  return useSyncExternalStore(subscribe, read, () => "dia");
}
