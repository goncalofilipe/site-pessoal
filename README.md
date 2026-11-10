# Site pessoal · Gonçalo Filipe

Doze placas numa galeria horizontal (fisheye ao scroll, a partir do template Florilegium). Cada placa abre uma página com a experiência ou competência. O Ciber Gonçalo, um avatar em pixel art, acompanha a visita e dá o contexto de cada placa. As falas dele são escritas à mão: não há modelo de IA nem pedidos a serviços externos.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/, estático, pronto para qualquer alojamento
npm run publicar # build + envia dist/ para o branch gh-pages (GitHub Pages)
```

O GitHub Pages está em "Deploy from a branch", a servir o branch `gh-pages`. O código fica na `main`; publicar é sempre um passo à parte, com `npm run publicar`.

## Onde mudar o quê

| O quê | Onde |
|---|---|
| Textos das placas e das páginas, falas e perguntas do avatar | `src/content.ts` |
| Contactos, links e CV | `PERSON` em `src/content.ts`; PDFs em `public/cv/` |
| O que o avatar diz e quando (saudação, final, dicas) | `src/ciber/script.ts` |
| Ilustrações das placas sem fotografia (SVG 3:4) | `src/PlateArt.tsx` |
| Galeria, relógio de anos, final | `src/Hero.tsx` |
| Página de placa | `src/PlatePage.tsx` |
| Estilos | `src/styles/` |

Ligações diretas às páginas: `#/placa/<slug>` (por exemplo `#/placa/comunicador`).

## Imagens

As fotografias saem de vídeos e fotos do Gonçalo e estão já em `assets/`. Para as refazer, juntar os originais numa pasta e correr:

```bash
node scripts/preparar-imagens.mjs <pasta-com-os-originais>
```

O script lista os ficheiros de origem que espera (`barulhobom.jpg`, `cover96.jpg`, `protest.jpg`, `boj2616.jpg`, `portrait.jpg`, …) e os recortes de cada um. Também gera o avatar (`ciber-goncalo.png`) a partir do retrato.
