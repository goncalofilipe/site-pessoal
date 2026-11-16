import { useEffect, useRef } from 'react'
import { NC } from './content'
import PlateArt from './PlateArt'
import PlateFx from './PlateFx'
import { usePlates, useT } from './i18n'
import { hero } from './lib/hero'

// Depois do carrossel do código: as restantes placas, todas à vista e clicáveis, sem scroll horizontal.
export default function Mosaico({ onOpen, onSeen }: { onOpen: (i: number) => void; onSeen: () => void }) {
  const T = useT()
  const plates = usePlates().slice(NC)
  const sectionRef = useRef<HTMLElement>(null)
  const seen = useRef(onSeen)
  seen.current = onSeen

  // avisa quando a grelha entra no ecrã (para o avatar a apresentar)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && seen.current(), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="camara-e-causa" className="mo" aria-labelledby="mo-title">
      <header className="mo-head">
        <p className="mo-kicker">{T.gridKicker}</p>
        <h2 id="mo-title" className="mo-title">
          {T.gridTitle1} <em>{T.gridTitle2}</em>
        </h2>
        <p className="mo-lead">{T.gridLead}</p>
      </header>
      <ul className="mo-grid">
        {plates.map((p, k) => {
          const i = NC + k
          return (
            <li key={p.slug}>
              <button
                type="button"
                className={`mo-card${p.dark ? ' is-dark' : ''}`}
                ref={(el) => {
                  if (el) hero.gridCards.set(i, el)
                  else hero.gridCards.delete(i)
                }}
                aria-label={T.cardAria(k + 1, plates.length, p.era, p.title, p.note)}
                onClick={() => onOpen(i)}
              >
                <span className="mo-card__media" style={{ background: p.tint }}>
                  {p.art ? (
                    <PlateArt art={p.art} />
                  ) : (
                    <>
                      <img src={p.src} alt="" loading="lazy" decoding="async" draggable={false} className={p.fx ? `fx-${p.fx}` : undefined} style={p.focus ? { objectPosition: p.focus } : undefined} />
                      <PlateFx fx={p.fx} />
                      <PlateFx fx={p.fx} layer="card" />
                    </>
                  )}
                  <span className="mo-card__open" aria-hidden="true">
                    {T.open}
                  </span>
                </span>
                <span className="mo-card__text">
                  <span className="mo-card__era">{p.era}</span>
                  <span className="mo-card__title">{p.title}</span>
                  <span className="mo-card__note">{p.note}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
