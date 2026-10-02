# Deploy (Hostinger)

## Como funciona
1. Push na `main` → GitHub Actions (`.github/workflows/deploy.yml`) roda typecheck e `npm run build`.
2. O workflow publica só o site pronto (`out/`) na branch **`deploy`**, sobrescrevendo a anterior.
3. A Hostinger (hPanel > Avançado > **Git**, conectado pelo GitHub App) puxa a branch `deploy` e substitui os arquivos da pasta do domínio.

A Git da Hostinger não roda build em hospedagem compartilhada ("the files committed to the repo are the files served"), por isso o build acontece no GitHub.
Fonte: https://docs.hostinger.com/websites/git

## Status atual (02/10/2026)
- Domínio principal ainda serve o **teaser em WordPress/Elementor** até segunda-feira. Não conectar o Git da Hostinger ao `public_html` do domínio principal antes da virada: o deploy substitui os arquivos da pasta.
- Plano: conectar primeiro num subdomínio de homologação (ex.: `novo.reservadosipescanedo.com.br`); na virada, fazer backup do WordPress, limpar o `public_html` e apontar o Git para ele.

## Secrets (opcionais, mas o formulário só envia com o webhook)
`NEXT_PUBLIC_MAKE_WEBHOOK_URL`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_GA4_ID`

## Make (formulário)
O site envia `application/x-www-form-urlencoded` para o webhook, com os campos:
`nome, telefone, email, objetivo, entrada, parcela, origem, pagina, enviado_em` e UTMs quando houver
(`utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid`).
`origem` = `formulario-principal` ou `contato-rapido-rodape` (este só manda `telefone`).
O visitante sempre vê a mensagem de sucesso; erros de CRM/Sheets ficam no Make (alerta).

## Conferir depois de subir
- abre com https e sem www
- formulário chega no Make (teste com `?utm_source=teste`)
- compartilhar o link no WhatsApp mostra a imagem da portaria (`/og.jpg`)
