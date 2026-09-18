# Deploy Hostinger — Shiver Broker (estático)

Mesmo modelo do Bull-ex: `next export` → pasta `dist/` → upload FTP/File Manager.

URL de produção: `https://www.shiverbroker.com/`

## Gerar

```bash
npm install
npm run build
```

Isso roda `next build` (export estático) e `scripts/prepare-dist.cjs`, gerando `dist/`.

## Upload

1. No FTP/Gerenciador da Hostinger, abra `public_html/`
2. Apague o conteúdo antigo do site (mantenha pastas que não forem deste projeto, se houver)
3. Envie **todo o conteúdo interno** de `dist/` para `public_html/`

Estrutura correta no servidor:

```text
public_html/
  index.html
  .htaccess
  blog/
  legal/
  sobre/
  _next/
  media/
  ...
```

**Errado:** enviar a pasta `dist` inteira → `public_html/dist/...`

## Preview local

```bash
npm run preview:static
```

Abra: `http://localhost:4173/`

## Subpasta (opcional)

Se o site for em subcaminho (ex.: `/shiver/`):

```powershell
$env:BASE_PATH="/shiver"; npm run build
```

Aí envie o conteúdo de `dist/` para `public_html/shiver/` e ajuste o `RewriteBase` no `.htaccess` se necessário.

## Erros comuns

| Sintoma | Causa |
|---|---|
| 403 na raiz | Sem `index.html` / `.htaccess` |
| Página sem CSS | Upload na pasta errada ou `_next/` incompleto |
| Rotas 404 | Falta `trailingSlash` / `.htaccess` ou pasta da rota não enviada |
| Abrir HTML no Explorer | Não funciona — use preview ou Hostinger |
