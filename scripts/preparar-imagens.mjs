// Recorta e converte as imagens das placas (3:4, WebP) e gera o avatar em pixel art.
// Uso: node scripts/preparar-imagens.mjs <pasta-com-os-originais>
// Os originais vêm dos vídeos e fotos do Gonçalo; ver README.md.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const src = process.argv[2]
if (!src) throw new Error('Indica a pasta dos originais')
const out = new URL('../assets/', import.meta.url).pathname
mkdirSync(out, { recursive: true })

const placa = (file, name, extract, opts = {}) =>
  sharp(join(src, file))
    .rotate()
    .extract(extract)
    .resize(1200, 1600, { fit: 'cover', position: opts.position ?? 'centre' })
    .modulate(opts.modulate ?? {})
    .webp({ quality: 80 })
    .toFile(join(out, `${name}.webp`))

const extra = (file, name, extract, w = 1200) =>
  sharp(join(src, file)).rotate().extract(extract).resize({ width: w }).webp({ quality: 78 }).toFile(join(out, `${name}.webp`))

await Promise.all([
  placa('barulhobom.jpg', 'diaspora', { left: 395, top: 0, width: 719, height: 959 }),
  placa('cover96.jpg', 'comunicador', { left: 0, top: 160, width: 1080, height: 1440 }),
  placa('cover89.jpg', 'video', { left: 0, top: 330, width: 1080, height: 1440 }),
  placa('protest.jpg', 'estrategia', { left: 0, top: 290, width: 560, height: 747 }),
  placa('boj2616.jpg', 'bojarda', { left: 0, top: 560, width: 2160, height: 2880 }),
  extra('cover97.jpg', 'galeria-reel-1', { left: 0, top: 160, width: 1080, height: 1440 }, 900),
  extra('cover5.jpg', 'galeria-reel-2', { left: 0, top: 160, width: 1080, height: 1440 }, 900),
  extra('cover14.jpg', 'galeria-reel-3', { left: 0, top: 160, width: 1080, height: 1440 }, 900),
  extra('cover40.jpg', 'galeria-reel-4', { left: 0, top: 160, width: 1080, height: 1440 }, 900),
  extra('boj2610.jpg', 'galeria-bojarda', { left: 0, top: 560, width: 2160, height: 2880 }, 900),
  extra('insta-helper.jpg', 'galeria-fora-da-bolha', { left: 0, top: 0, width: 1440, height: 900 }, 1440),
  extra('portrait.jpg', 'retrato', { left: 857, top: 380, width: 2475, height: 3300 }, 900),
])

// Avatar: cabeça em 40×44, paleta curta, ampliada sem suavizar.
const cabeca = await sharp(join(src, 'portrait.jpg'))
  .rotate()
  .extract({ left: 600, top: 150, width: 3090, height: 3400 })
  .resize(40, 44, { kernel: 'lanczos3' })
  .modulate({ saturation: 1.15 })
  .png({ palette: true, colours: 14, dither: 0 })
  .toBuffer()
await sharp(cabeca).resize(320, 352, { kernel: 'nearest' }).png().toFile(join(out, 'ciber-goncalo.png'))
await sharp(cabeca).png().toFile(join(out, 'ciber-goncalo-40.png'))
console.log('Imagens prontas em', out)
