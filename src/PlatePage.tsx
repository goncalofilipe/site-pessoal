import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { N, PERSON, PLATES } from './content'
import PlateArt from './PlateArt'
import { prefersReducedMotion } from './lib/motion'
import { closePlate, replacePlate } from './lib/route'

type Props = { index: number; from: DOMRect | null }

export default function PlatePage({ index, from }: Props) {
  const p = PLATES[index]
  const rootRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prev = index > 0 ? PLATES[index - 1] : null
  const next = index < N - 1 ? PLATES[index + 1] : null
  const first = useRef(true)

  // Entrada: recorte a partir da placa clicada. Ao mudar de placa, só o conteúdo desliza.
  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    scrollRef.current?.scrollTo(0, 0)
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      if (first.current && from) {
        const vw = window.innerWidth
        const vh = window.innerHeight
        const inset = `inset(${from.top}px ${vw - from.right}px ${vh - from.bottom}px ${from.left}px round 2px)`
        gsap.fromTo(root, { clipPath: inset }, { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 0.9, ease: 'expo.inOut', clearProps: 'clipPath' })
      } else if (first.current) {
        gsap.from(root, { opacity: 0, duration: 0.5, ease: 'power2.out' })
      }
      gsap.from('.pg-reveal', { y: 24, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05, delay: first.current && from ? 0.45 : 0.05 })
      first.current = false
    }, root)
    return () => ctx.revert()
  }, [index, from])

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
  }, [index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea')) return
      if (e.key === 'Escape') closePlate()
      if (e.key === 'ArrowRight' && next) replacePlate(next.slug)
      if (e.key === 'ArrowLeft' && prev) replacePlate(prev.slug)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const titleId = `pg-title-${p.slug}`

  return (
    <div ref={rootRef} className={`pg${p.dark ? ' is-dark' : ''}`} role="dialog" aria-modal="true" aria-labelledby={titleId} style={{ ['--pg-tint' as string]: p.tint }}>
      <div ref={scrollRef} className="pg-scroll" data-lenis-prevent>
        <div className="pg-media">
          <div className="pg-media__inner">
            {p.art ? <PlateArt art={p.art} /> : <img src={p.src} alt="" style={p.focus ? { objectPosition: p.focus } : undefined} />}
          </div>
          <p className="pg-media__cap">
            {String(index + 1).padStart(2, '0')} / {N} · {p.when}
          </p>
        </div>

        <article className="pg-body">
          <nav className="pg-bar" aria-label="Navegação">
            <button ref={closeRef} type="button" className="pg-btn" onClick={closePlate}>
              <span aria-hidden="true">←</span> Início
            </button>
            <span className="pg-bar__no">
              {String(index + 1).padStart(2, '0')} / {N}
            </span>
            <span className="pg-bar__step">
              <button type="button" className="pg-btn is-icon" disabled={!prev} onClick={() => prev && replacePlate(prev.slug)} aria-label={prev ? `Anterior: ${prev.title}` : 'Sem anterior'}>
                ←
              </button>
              <button type="button" className="pg-btn is-icon" disabled={!next} onClick={() => next && replacePlate(next.slug)} aria-label={next ? `Seguinte: ${next.title}` : 'Sem seguinte'}>
                →
              </button>
            </span>
          </nav>

          <header className="pg-head">
            <p className="pg-era pg-reveal">{p.era}</p>
            <p className="pg-kicker pg-reveal">{p.page.kicker}</p>
            <h1 id={titleId} className="pg-title pg-reveal">
              {p.title}
            </h1>
            <p className="pg-heading pg-reveal">{p.page.heading}</p>
            <p className="pg-lead pg-reveal">{p.page.lead}</p>
          </header>

          {p.page.stats && (
            <section className="pg-stats pg-reveal" aria-label="Números">
              {p.page.stats.map((s) => (
                <div key={s.label} className="pg-stat">
                  <span className="pg-stat__v">{s.value}</span>
                  <span className="pg-stat__l">{s.label}</span>
                </div>
              ))}
              {p.page.statsNote && <p className="pg-stats__note">{p.page.statsNote}</p>}
            </section>
          )}

          {p.page.sections.map((s) => (
            <section key={s.title} className="pg-sec pg-reveal">
              <h2 className="pg-sec__t">{s.title}</h2>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </section>
          ))}

          {p.page.gallery && (
            <section className="pg-gallery pg-reveal" aria-label="Imagens">
              {p.page.gallery.map((g) => (
                <figure key={g.src} className={g.wide ? 'is-wide' : ''}>
                  <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
                </figure>
              ))}
            </section>
          )}

          {p.page.tools && (
            <section className="pg-sec pg-reveal">
              <h2 className="pg-sec__t">Ferramentas e temas</h2>
              <p className="pg-tags">
                {p.page.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </p>
            </section>
          )}

          {p.page.links && (
            <p className="pg-links pg-reveal">
              {p.page.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </p>
          )}

          <footer className="pg-foot">
            {next ? (
              <button type="button" className="pg-next" onClick={() => replacePlate(next.slug)}>
                <span className="pg-next__k">Seguinte · {next.era}</span>
                <span className="pg-next__t">
                  {next.title} <span aria-hidden="true">→</span>
                </span>
              </button>
            ) : (
              <a className="pg-next" href={`mailto:${PERSON.email}`}>
                <span className="pg-next__k">Fim · fala comigo</span>
                <span className="pg-next__t">
                  {PERSON.email} <span aria-hidden="true">→</span>
                </span>
              </a>
            )}
          </footer>
        </article>
      </div>
    </div>
  )
}
