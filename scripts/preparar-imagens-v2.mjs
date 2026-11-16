// Segunda leva de imagens das placas (enviadas pelo Gonçalo a 2026-11-16). Tudo sai em 3:4, WebP.
// Uso: node scripts/preparar-imagens-v2.mjs <pasta-com-os-originais>
// Nomes esperados: noesis-selfie.jpg, outsystems.jpg, diaspora-logo.png, parlamento.jpg,
// puzzle.jpg, comunicador-mic.png, editor-video.jpg
import sharp from 'sharp'
import { join } from 'node:path'

const src = process.argv[2]
if (!src) throw new Error('Indica a pasta dos originais')
const out = new URL('../assets/', import.meta.url).pathname
const S = (f) => join(src, f)
const O = (f) => join(out, f)

// Ilustrações de fundo liso: prolonga o fundo até ficar 3:4 em vez de cortar o desenho.
const extend = async (file, name, bg, crop, width = 1200) => {
  let img = sharp(S(file))
  if (crop) img = img.extract(crop)
  const buf = await img.toBuffer()
  const { width: w, height: h } = await sharp(buf).metadata()
  const H = Math.round((w * 4) / 3)
  const pad = Math.max(0, Math.round((H - h) / 2))
  await sharp(buf)
    .extend({ top: pad, bottom: H - h - pad, background: bg })
    .resize(width, Math.round((width * 4) / 3), { kernel: 'lanczos3' })
    .webp({ quality: 84 })
    .toFile(O(name))
}

await Promise.all([
  // selfie à porta da Noesis (vem deitada no ficheiro; rotate() endireita)
  sharp(S('noesis-selfie.jpg')).rotate().extract({ left: 0, top: 760, width: 2160, height: 2880 }).resize(1200, 1600).webp({ quality: 80 }).toFile(O('noesis.webp')),
  // secretária OutSystems em fundo vermelho
  extend('outsystems.jpg', 'act-digital.webp', '#a61c01', { left: 110, top: 0, width: 540, height: 414 }),
  // puzzle visto de cima: fundo creme por todo o lado, para poder rodar sem se ver o canto
  extend('puzzle.jpg', 'produto.webp', '#f5f2e9'),
  // hemiciclo: corte central 3:4
  sharp(S('parlamento.jpg')).extract({ left: 212, top: 0, width: 310, height: 413 }).resize(900, 1200, { kernel: 'lanczos3' }).webp({ quality: 82 }).toFile(O('parlamento.webp')),
  // Gonçalo de camisa azul com o microfone
  sharp(S('comunicador-mic.png')).extract({ left: 0, top: 100, width: 746, height: 995 }).resize(1200, 1600).webp({ quality: 80 }).toFile(O('comunicador-mic.webp')),
  // logótipo da Diáspora, branco com transparência
  sharp(S('diaspora-logo.png')).extract({ left: 0, top: 240, width: 1080, height: 1440 }).resize(900, 1200).webp({ quality: 90, alphaQuality: 100 }).toFile(O('diaspora-logo.webp')),
])

// editor de vídeo: o fundo é um degradé dentro da própria imagem; prolonga-se com a cor exata
// da primeira linha (em cima) e da última (em baixo), para não haver costura
{
  const H = Math.round((626 * 4) / 3)
  const top = Math.round((H - 489) / 2)
  const step = await sharp(S('editor-video.jpg')).extend({ top, background: '#d6bcfb' }).png().toBuffer()
  const flat = await sharp(step).extend({ bottom: H - 489 - top, background: '#6c62f7' }).png().toBuffer()
  await sharp(flat).resize(1200, 1600, { kernel: 'lanczos3' }).webp({ quality: 84 }).toFile(O('video-editor.webp'))
}
console.log('Imagens v2 prontas em', out)
