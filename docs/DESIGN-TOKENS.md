> **Atualizado em 02/10/2026:** a LP usa a paleta "Dia e noite" (azul do entardecer + luz de poste) definida em `src/styles/tokens.css`. As cores abaixo são do teaser e ficam como referência histórica.

# Design tokens (extraídos do teaser)

Código em `src/styles/tokens.css`. Fonte única (troca de Montserrat + Gochi Hand por 1 só).

## Fonte
Recomendada: **Plus Jakarta Sans** (variável 300–800, `next/font/google`, subset latin). Premium, limpa, ótima em PT-BR.
Alternativas: **Fraunces** (serifada, mais editorial/elegante) ou **Sora** (mais tech/moderna).
Troca = mudar 1 linha em `layout.tsx` (`--font-brand`). O efeito "manuscrito" do teaser vira peso leve + tamanho grande + tracking apertado.

## Cores
| Token | Hex | Uso |
|---|---|---|
| ipe-amarelo | #F8C21C | botão principal do form |
| marrom / marrom-escuro | #4A2608 / #3A1D05 | botões, texto, seção "história" |
| ocre | #C58B3A | foco de campos, detalhes |
| ferrugem / bronze | #B3662B / #8A4A12 | ícones, hovers |
| dourado-1/2/glow | #C99645 / #C08533 / #D6A052 | fundo hero e "chegando" |
| linha / campo | #E8DDCC / #FBF8F3 | bordas e inputs |
| morais-azul / teal | #2B2A6E / #3F9AA0 | logo Morais |
| whats | #1FA855 (hover #178A45) | WhatsApp |
| erro | #C0392B | validação |
| flores | #F7C21E #EF79B0 #F4F1EC #9A7BE3 #E08A2E | árvore de ipê |

## Tipografia (escala do teaser)
H2 `clamp(28px, 2.9vw, 42px)` peso 600 · lead `clamp(22px, 2.1vw, 31px)` peso 300 · título hero `clamp(70px, 7.6vw, 124px)` · corpo 17–18px · botão 15–16px peso 700.

## Layout / forma
Container 1240px (padding 24) · raio 2–3px · botões h-58 · card do form padding 40, sombra `--shadow-card` · breakpoints 1100 / 900 / 560.

## Movimento
Ease `cubic-bezier(.2,.8,.2,1)`; "pop" `cubic-bezier(.3,1.5,.5,1)`. Respeitar `prefers-reduced-motion`.

## Comportamentos do teaser a portar pra React/Framer Motion
- Árvore de ipê gerada por SVG (seed aleatória, ~170 flores, tronco/galhos desenham, flores "pipocam") — hero e seção final
- Texto letra por letra (título) e palavra por palavra (lead); reveal ao rolar
- Hover nas flores (giram/crescem), ícones que sobem, linha ocre animada nos itens, brilho nos botões
- Barra fixa mobile (Entrar na lista + WhatsApp) que some quando o form está visível; WhatsApp flutuante no desktop
- Form: máscara (11 dígitos, tira 55 duplicado), honeypot, UTMs, payload JSON, sempre mostra sucesso (fetch sem await, `keepalive`)
- Tracking: `Lead` e `Contact` no Meta Pixel + dataLayer

## Atenções
- Webhook do Make e número de WhatsApp estão hardcoded no teaser → na LP nova vão pra `.env` (`NEXT_PUBLIC_MAKE_WEBHOOK_URL`, número em `content/site.json`).
- Imagens do teaser estão em `wp-content/uploads` (foto família, `MORAIS.webp`, `moraislogobranca.png`). Quando o WordPress sair do ar, somem: baixar e guardar em `assets-originais/teaser/`.
- Campos novos da LP completa (entrada e parcela) precisam virar colunas no Make/CRM junto com `objetivo`.
