"use client";

import { useState, type FormEvent } from "react";
import { digits, maskPhone, sendLead } from "@/lib/lead";
import { Send } from "@/components/ui/icons";

/** Contato rápido do rodapé: só o WhatsApp. */
export function QuickContact() {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const tel = String(new FormData(e.currentTarget).get("whatsapp") ?? "");
    if (digits(tel).length < 10) {
      setMsg({ ok: false, text: "Informe um WhatsApp com DDD." });
      return;
    }
    sendLead({ telefone: digits(tel) }, "contato-rapido-rodape");
    setMsg({ ok: true, text: "Recebemos seu número. Um consultor vai chamar você no WhatsApp." });
  }

  return (
    <form className="quick" noValidate onSubmit={onSubmit}>
      <label className="sr" htmlFor="quick-tel">
        Seu WhatsApp
      </label>
      <input
        id="quick-tel"
        name="whatsapp"
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="(62) 90000-0000"
        aria-describedby="quick-msg"
        aria-invalid={msg && !msg.ok ? true : undefined}
        onInput={(e) => (e.currentTarget.value = maskPhone(e.currentTarget.value))}
      />
      <button type="submit" aria-label="Enviar meu WhatsApp">
        <Send />
      </button>
      <p className={`quick__msg${msg && !msg.ok ? " is-err" : ""}`} id="quick-msg" role="status">
        {msg?.text}
      </p>
    </form>
  );
}
