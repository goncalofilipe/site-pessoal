import type { Fx } from './content'

// Camadas animadas por cima das imagens das placas. A animação da própria imagem é uma classe (fx-<nome>)
// em styles/fx.css; aqui ficam só os elementos extra (ondas, estrelas, REC).

// posição das estrelas na imagem do hemiciclo (percentagens do recorte 3:4)
const STARS: [number, number][] = [
  [10.6, 45],
  [16, 30.8],
  [30, 19.9],
  [50, 16],
  [70, 19.9],
  [84.5, 30.8],
  [89.7, 45],
]

// layer 'image': acompanha o zoom e a paralaxe da imagem (ondas, estrelas).
// layer 'card': fica parado em relação ao cartão (selos de interface como o REC).
export default function PlateFx({ fx, layer = 'image' }: { fx?: Fx; layer?: 'image' | 'card' }) {
  if (layer === 'card') {
    if (fx === 'rec')
      return (
        <span className="fx-layer" aria-hidden="true">
          <span className="fx-recbadge">
            <i /> REC
          </span>
        </span>
      )
    return null
  }
  if (fx === 'rings')
    return (
      <span className="fx-layer" aria-hidden="true">
        {[0, 1, 2].map((k) => (
          <i key={k} className="fx-ring" style={{ animationDelay: `${k * 1.2}s` }} />
        ))}
      </span>
    )
  if (fx === 'stars')
    return (
      <span className="fx-layer" aria-hidden="true">
        {STARS.map(([x, y], k) => (
          <i key={k} className="fx-star" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(k * 0.37) % 2.4}s` }} />
        ))}
      </span>
    )
  return null
}
