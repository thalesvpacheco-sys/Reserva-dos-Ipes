"use client";

import { useEffect, useState } from "react";

/** Barra fixa do celular com o CTA; some quando o formulário está na tela. */
export function MobileDock() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const form = document.getElementById("form");
    if (!form) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.1 });
    io.observe(form);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`dock${hidden ? " is-hidden" : ""}`} aria-hidden={hidden || undefined}>
      <a className="btn" href="#contato" tabIndex={hidden ? -1 : undefined}>
        Falar com um consultor
      </a>
    </div>
  );
}
