"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { copy } from "@/lib/content";
import { digits, maskBRL, maskPhone, sendLead } from "@/lib/lead";

type Errors = Partial<Record<"nome" | "whatsapp" | "email" | "objetivo", string>>;

/** Formulário principal (nome, WhatsApp, e-mail, objetivo, entrada, parcela). Labels = copy do cliente. */
export function LeadForm() {
  const [labels] = useState(() => copy.form.campos);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const okRef = useRef<HTMLParagraphElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const err: Errors = {};
    if (v("nome").length < 2) err.nome = "Informe seu nome.";
    if (digits(v("whatsapp")).length < 10) err.whatsapp = "Informe um WhatsApp com DDD.";
    if (!/^\S+@\S+\.\S+$/.test(v("email"))) err.email = "Informe um e-mail válido.";
    if (!v("objetivo")) err.objetivo = "Escolha uma opção.";
    setErrors(err);
    const first = Object.keys(err)[0];
    if (first) {
      (e.currentTarget.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    // honeypot: robô preenche o campo escondido; finge sucesso e não envia
    if (!v("empresa")) {
      sendLead(
        { nome: v("nome"), telefone: digits(v("whatsapp")), email: v("email"), objetivo: v("objetivo"), entrada: v("entrada"), parcela: v("parcela") },
        "formulario-principal",
      );
    }
    setDone(true);
    requestAnimationFrame(() => okRef.current?.focus());
  }

  const field = (name: keyof Errors, label: string, input: ReactNode) => (
    <div className="lead__field">
      <label htmlFor={`lf-${name}`}>{label}</label>
      {input}
      {errors[name] && (
        <p className="lead__err" id={`lf-${name}-err`}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  const aria = (name: keyof Errors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `lf-${name}-err` : undefined,
  });

  return (
    <form className={`lead${done ? " is-done" : ""}`} noValidate onSubmit={onSubmit}>
      {field("nome", labels[0], <input id="lf-nome" name="nome" type="text" autoComplete="name" required {...aria("nome")} />)}
      {field(
        "whatsapp",
        labels[1],
        <input
          id="lf-whatsapp"
          name="whatsapp"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="(62) 90000-0000"
          required
          onInput={(e) => (e.currentTarget.value = maskPhone(e.currentTarget.value))}
          {...aria("whatsapp")}
        />,
      )}
      {field("email", labels[2], <input id="lf-email" name="email" type="email" autoComplete="email" required {...aria("email")} />)}
      <fieldset className="lead__field" aria-describedby={errors.objetivo ? "lf-objetivo-err" : undefined}>
        <legend>{labels[3]}</legend>
        <div className="lead__radios">
          <label className="lead__radio">
            <input type="radio" name="objetivo" value="morar" />
            <span>Morar</span>
          </label>
          <label className="lead__radio">
            <input type="radio" name="objetivo" value="investir" />
            <span>Investir</span>
          </label>
        </div>
        {errors.objetivo && (
          <p className="lead__err" id="lf-objetivo-err">
            {errors.objetivo}
          </p>
        )}
      </fieldset>
      <div className="lead__row">
        <div className="lead__field">
          <label htmlFor="lf-entrada">{labels[4]}</label>
          <input id="lf-entrada" name="entrada" type="text" inputMode="numeric" placeholder="R$ 0" onInput={(e) => (e.currentTarget.value = maskBRL(e.currentTarget.value))} />
        </div>
        <div className="lead__field">
          <label htmlFor="lf-parcela">{labels[5]}</label>
          <input id="lf-parcela" name="parcela" type="text" inputMode="numeric" placeholder="R$ 0" onInput={(e) => (e.currentTarget.value = maskBRL(e.currentTarget.value))} />
        </div>
      </div>
      {/* campo-isca anti-robô: fora da tela e fora do leitor de tela */}
      <div className="sr" aria-hidden="true">
        <input type="text" name="empresa" tabIndex={-1} autoComplete="off" />
      </div>
      <button className="btn btn--submit" type="submit">
        {copy.form.cta}
      </button>
      {done && (
        <p className="lead__ok" role="status" tabIndex={-1} ref={okRef}>
          {copy.form.sucesso}
        </p>
      )}
    </form>
  );
}
