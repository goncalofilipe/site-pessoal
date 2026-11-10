import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { N, PERSON, PLATES } from './content'
import PlateArt from './PlateArt'
import { clamp, lerp, smooth, usePrefersReducedMotion } from './lib/motion'
import { hero } from './lib/hero'

gsap.registerPlugin(ScrollTrigger)

const STRIP_END = 0.84 // parte do scroll usada pela galeria; o resto expande a última placa
const YEARS = PLATES.map((p) => p.year)

type Props = {
  paused: boolean // há uma página de placa aberta por cima
  onOpen: (i: number) => void
  onActive: (i: number) => void
  onFinale: (on: boolean) => void
  onReady: () => void
}

export default function Hero({ paused, onOpen, onActive, onFinale, onReady }: Props) {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([])
  const mediaRef = useRef<(HTMLSpanElement | null)[]>([])
  const timeRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLElement>(null)
  const chromeRef = useRef<HTMLDivElement>(null)
  const finalRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const eraRef = useRef<HTMLParagraphElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cb = useRef({ onActive, onFinale })
  cb.current = { onActive, onFinale }
  const reduced = usePrefersReducedMotion()

  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<boolean[]>(() => PLATES.map((p) => !p.src))
  const [failed, setFailed] = useState<boolean[]>(() => PLATES.map(() => false))
  const loadedCount = loaded.filter(Boolean).length + failed.filter(Boolean).length
  const [ready, setReady] = useState(false)

  // Revela quando todas as placas assentaram (carregadas ou falhadas), ou ao fim de 6 s.
  useEffect(() => {
    if (loadedCount >= N) setReady(true)
  }, [loadedCount])
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 6000)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    if (ready) onReady()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  /* ------------------------------------------------------ smooth scroll */
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.08 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  /* ------------------------------------------- layout fisheye por frame */
  useLayoutEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return

    const st = ScrollTrigger.create({ trigger: track, start: 'top top', end: 'bottom bottom' })
    stRef.current = st

    let vw = stage.clientWidth
    let vh = stage.clientHeight
    const ro = new ResizeObserver(() => {
      vw = stage.clientWidth
      vh = stage.clientHeight
    })
    ro.observe(stage)

    let skew = 0
    let lastActive = -1
    let lastFinale = false
    const X = new Array<number>(N).fill(0)
    const W = new Array<number>(N).fill(0)
    const H = new Array<number>(N).fill(0)

    const frame = () => {
      const p = st.progress
      const f = clamp(p / STRIP_END) * (N - 1)
      const e = reduced ? 0 : smooth(STRIP_END + 0.02, 0.995, p)
      const fade = reduced ? smooth(STRIP_END + 0.02, 0.95, p) : e
      const mobile = vw < 700
      const H0 = Math.min(vh * (mobile ? 0.5 : 0.48), (vw * (mobile ? 0.66 : 0.34)) / 0.75, 620)
      const gap = Math.max(12, vw * 0.018)
      const centerY = vh * (mobile ? 0.44 : 0.45)

      // tamanhos: queda gaussiana à volta do índice focado (contínuo)
      let acc = 0
      for (let i = 0; i < N; i++) {
        const d = i - f
        const s = 0.42 + 0.58 * Math.exp(-(d * d) / 0.7)
        H[i] = H0 * s
        W[i] = H[i] * 0.75
        X[i] = acc + W[i] / 2
        acc += W[i] + gap
      }
      const i0 = Math.floor(f)
      const i1 = Math.min(N - 1, i0 + 1)
      const focusX = lerp(X[i0], X[i1], f - i0)
      const offset = vw / 2 - focusX

      // skew pela velocidade (a do Lenis é em px por frame)
      const v = lenisRef.current?.velocity ?? 0
      skew = lerp(skew, reduced ? 0 : clamp(v * 0.12, -6, 6), 0.1)

      for (let i = 0; i < N; i++) {
        const el = cardsRef.current[i]
        if (!el) continue
        let x = X[i] + offset
        let y = centerY
        let w = W[i]
        let h = H[i]
        let op = 1
        if (i === N - 1 && e > 0) {
          x = lerp(x, vw / 2, e)
          y = lerp(y, vh / 2, e)
          w = lerp(w, vw, e)
          h = lerp(h, vh, e)
        } else if (e > 0) {
          op = 1 - e * 1.6
          x += (x < vw / 2 ? -1 : 1) * e * vw * 0.2
        }
        el.style.width = `${w}px`
        el.style.height = `${h}px`
        el.style.opacity = `${clamp(op)}`
        el.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, 0) skewX(${(skew * (1 - e)).toFixed(2)}deg)`
        el.style.borderRadius = i === N - 1 ? `${lerp(2, 0, e)}px` : '2px'
        if (i === N - 1) el.toggleAttribute('data-expanded', e > 0.02)
        const media = mediaRef.current[i]
        if (media) {
          // as ilustrações têm texto junto às margens: paralaxe mais curta e sem zoom
          const art = !!PLATES[i].art
          const tx = clamp(-(i - f) * 7, -10, 10) * (1 - e) * (art ? 0.25 : 1)
          const sc = art ? 1 : lerp(1.22, 1, i === N - 1 ? e : 0)
          media.style.transform = `translate3d(${tx}%, 0, 0) scale(${sc})`
        }
      }

      // a faceta fica centrada por cima da placa ativa
      if (eraRef.current) eraRef.current.style.transform = `translate3d(-50%, calc(${centerY - (H0 / 2) * (1 - e)}px - 100% - ${mobile ? 14 : 22}px), 0)`

      // relógio: interpola o ano entre placas
      const year = lerp(YEARS[i0], YEARS[i1], f - i0)
      if (timeRef.current) timeRef.current.textContent = String(Math.round(year))
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${f / (N - 1)})`
      if (chromeRef.current) chromeRef.current.style.opacity = `${1 - fade}`
      if (introRef.current) {
        const t = smooth(0, 0.05, p)
        introRef.current.style.opacity = `${1 - t}`
        introRef.current.style.transform = `translate3d(${-t * 40}px, -50%, 0)`
      }
      if (finalRef.current) {
        const t = smooth(0.93, 1, p)
        const shown = reduced ? fade : t
        finalRef.current.style.opacity = `${shown}`
        finalRef.current.style.transform = `translate3d(0, ${(1 - t) * 30}px, 0)`
        finalRef.current.style.pointerEvents = shown > 0.5 ? 'auto' : 'none'
        finalRef.current.style.visibility = shown > 0.01 ? 'visible' : 'hidden'
        if (shown > 0.5 !== lastFinale) {
          lastFinale = shown > 0.5
          cb.current.onFinale(lastFinale)
        }
      }

      const idx = Math.round(f)
      if (idx !== lastActive) {
        lastActive = idx
        setActive(idx)
        cb.current.onActive(idx)
      }
    }

    gsap.ticker.add(frame)
    frame()
    return () => {
      gsap.ticker.remove(frame)
      ro.disconnect()
      st.kill()
      stRef.current = null
    }
  }, [reduced])

  /* ------------------------------------------------------------- intro */
  useLayoutEffect(() => {
    if (!ready || reduced) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.fl-card__clip', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, stagger: { each: 0.06, from: 'center' } })
        .from('.fl-top > *', { opacity: 0, y: -10, duration: 1, stagger: 0.08 }, 0.3)
        .from('.fl-time > *', { yPercent: 100, opacity: 0, duration: 1.4, stagger: 0.08 }, 0.4)
        .from('.fl-caption, .fl-sub', { opacity: 0, duration: 1 }, 0.8)
    }, stageRef)
    return () => ctx.revert()
  }, [ready, reduced])

  /* ------------------------------------------------------------ ações */
  const yFor = (p: number) => {
    const st = stRef.current
    return st ? st.start + p * (st.end - st.start) : 0
  }
  const scrollToProgress = (p: number, immediate = false) => {
    if (!stRef.current) return
    const y = yFor(p)
    if (lenisRef.current) lenisRef.current.scrollTo(y, immediate ? { immediate: true, force: true } : { duration: 1.4, force: true })
    else window.scrollTo({ top: y, behavior: immediate || reduced ? 'auto' : 'smooth' })
  }
  const progressOf = (i: number) => (clamp(i, 0, N - 1) / (N - 1)) * STRIP_END
  const goTo = (i: number) => scrollToProgress(progressOf(i))

  useEffect(() => {
    hero.goTo = goTo
    hero.jump = (i) => scrollToProgress(progressOf(i), true)
    hero.toTop = () => scrollToProgress(0)
    hero.lock = () => {
      lenisRef.current?.stop()
      document.documentElement.classList.add('is-locked')
    }
    hero.unlock = () => {
      document.documentElement.classList.remove('is-locked')
      lenisRef.current?.start()
    }
    hero.cardRect = (i) => cardsRef.current[i]?.getBoundingClientRect() ?? null
    hero.focusCard = (i) => cardsRef.current[i]?.focus({ preventScroll: true })
  })

  // setas avançam entre placas enquanto o herói está no ecrã
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = stRef.current
      if (paused || !st || !st.isActive) return
      if ((e.target as HTMLElement).closest('input, textarea')) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goTo(active + 1)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(active - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused])

  const plate = PLATES[active]
  const last = PLATES[N - 1]

  return (
    <main className="fl-root" data-ready={ready} aria-hidden={paused || undefined} inert={paused || undefined}>
      <section ref={trackRef} className="fl-track" style={{ height: `${N * 42 + 170}vh` }} aria-label="Gonçalo Filipe, percurso de 2012 até hoje">
        <div ref={stageRef} className="fl-stage">
          <div ref={chromeRef} className="fl-chrome">
            <header className="fl-top">
              <span className="fl-top__l">
                (Portefólio) <em>Lisboa, 2026</em>
              </span>
              <span className="fl-logo">{PERSON.name}</span>
              <span className="fl-top__r">Código · Câmara · Causa</span>
            </header>

            <p ref={eraRef} className="fl-era" aria-hidden="true">
              <span className="fl-era__e">Era</span>{' '}
              <span key={active} className="fl-era__t">
                {plate.era.replace(/^Era /, '')}
              </span>
            </p>

            <div className="fl-caption" aria-live="polite">
              <span className="fl-sr">{plate.era}. </span>
              <span className="fl-caption__no">
                {String(active + 1).padStart(2, '0')} / {N}
              </span>
              <span key={active} className="fl-caption__title">
                {plate.title}
              </span>
              <span className="fl-caption__note">{plate.note}</span>
            </div>

            <div className="fl-time" aria-hidden="true">
              <span className="fl-time__now" ref={timeRef}>
                {YEARS[0]}
              </span>
              <span className="fl-time__line">
                <i ref={fillRef} />
              </span>
              <span className="fl-time__end">{YEARS[N - 1]}</span>
            </div>
            <p ref={introRef} className="fl-intro">
              <span>Olá, sou o Gonçalo.</span> Programo, faço gestão de produto, comunico, edito vídeo e dou assessoria em política, comunicação e organização. De 2012 até hoje.
            </p>
            <p className="fl-sub">Faz scroll · ← → para avançar · clica para abrir</p>
          </div>

          <div className="fl-strip">
            {PLATES.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                ref={(el) => {
                  cardsRef.current[i] = el
                }}
                className={`fl-card${i === active ? ' is-active' : ''}${p.dark ? ' is-dark' : ''}`}
                style={{ background: p.tint }}
                aria-label={`${i + 1} de ${N}: ${p.era}. ${p.title}, ${p.note}. Abrir página.`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => onOpen(i)}
              >
                <span className="fl-card__clip">
                  <span
                    className="fl-card__media"
                    ref={(el) => {
                      mediaRef.current[i] = el
                    }}
                  >
                    {p.art ? (
                      <PlateArt art={p.art} />
                    ) : !failed[i] ? (
                      <img
                        src={p.src}
                        alt=""
                        decoding="async"
                        loading="eager"
                        draggable={false}
                        style={p.focus ? { objectPosition: p.focus } : undefined}
                        className={loaded[i] ? 'is-loaded' : ''}
                        onLoad={() => setLoaded((l) => l.map((v, j) => (j === i ? true : v)))}
                        onError={() => setFailed((l) => l.map((v, j) => (j === i ? true : v)))}
                      />
                    ) : (
                      <span className="fl-card__fallback">
                        {String(i + 1).padStart(2, '0')}
                        <br />
                        {p.when}
                      </span>
                    )}
                  </span>
                  <span className="fl-card__open" aria-hidden="true">
                    Abrir ↗
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div ref={finalRef} className="fl-final">
            <p className="fl-final__kicker">{N} / {N} · {last.title} · {last.when}</p>
            <h1 className="fl-final__title">
              Código, câmara
              <br />
              <em>e causa.</em>
            </h1>
            <p className="fl-final__body">
              Programo, faço gestão de produto, comunico, edito vídeo e dou assessoria em política, comunicação e organização. Procuro projetos que precisem de mais do que uma destas coisas ao mesmo tempo.
            </p>
            <div className="fl-final__actions">
              <a className="fl-final__btn is-solid" href={`mailto:${PERSON.email}`}>
                Escrever-me <span aria-hidden="true">→</span>
              </a>
              <a className="fl-final__btn" href={PERSON.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="fl-final__btn" href={PERSON.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="fl-final__btn" href={PERSON.cvPt} download>
                CV (PDF)
              </a>
              <button type="button" className="fl-final__btn" onClick={() => onOpen(N - 1)}>
                Ver a Bojarda
              </button>
              <button type="button" className="fl-final__btn" onClick={() => scrollToProgress(0)}>
                Voltar ao início <span aria-hidden="true">↑</span>
              </button>
            </div>
          </div>

          {!ready && (
            <div className="fl-loader" role="status">
              A carregar {String(loadedCount).padStart(2, '0')} / {N}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
