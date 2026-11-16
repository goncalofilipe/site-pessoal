import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { NC, PERSON, PLATES } from './content'
import PlateArt from './PlateArt'
import PlateFx from './PlateFx'
import imgIntro from '../assets/apresentacao.webp'
import { clamp, lerp, smooth, usePrefersReducedMotion } from './lib/motion'
import { hero } from './lib/hero'
import { useLang, usePlates, useT } from './i18n'

gsap.registerPlugin(ScrollTrigger)

// O carrossel só tem as placas de programação (as primeiras NC). Distâncias de scroll em vh:
const INTRO_VH = 55 // a apresentação sai e o carrossel ganha o ecrã
const STEP_VH = 60 // de uma placa à seguinte
const HOLD_VH = 35 // pausa na última placa antes de a página seguir para a grelha
const RANGE_VH = INTRO_VH + (NC - 1) * STEP_VH + HOLD_VH
const INTRO_END = INTRO_VH / RANGE_VH
const STRIP_END = (INTRO_VH + (NC - 1) * STEP_VH) / RANGE_VH
const CAROUSEL = PLATES.slice(0, NC)
const YEARS = CAROUSEL.map((p) => p.year)

// No telemóvel o carrossel anda na horizontal (com o dedo) e o scroll vertical segue logo para a grelha.
const MOBILE_QUERY = '(max-width: 699px)'
function useHorizontal() {
  const [h, setH] = useState(() => window.matchMedia(MOBILE_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY)
    const on = () => setH(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return h
}

type Props = {
  onOpen: (i: number) => void
  onActive: (i: number) => void
  onInHero: (inside: boolean) => void // falso quando a página já passou o carrossel
  onReady: () => void
  paused: boolean
}

export default function Hero({ paused, onOpen, onActive, onInHero, onReady }: Props) {
  const trackRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([])
  const mediaRef = useRef<(HTMLSpanElement | null)[]>([])
  const timeRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const timeWrapRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const eraRef = useRef<HTMLParagraphElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const lenisRef = useRef<Lenis | null>(null)
  const cb = useRef({ onActive, onInHero })
  cb.current = { onActive, onInHero }
  const reduced = usePrefersReducedMotion()
  const horizontal = useHorizontal()
  const lang = useLang()
  const L = usePlates().slice(0, NC)
  const T = useT()

  const [active, setActive] = useState(0)
  const [loaded, setLoaded] = useState<boolean[]>(() => CAROUSEL.map((p) => !p.src))
  const [failed, setFailed] = useState<boolean[]>(() => CAROUSEL.map(() => false))
  const loadedCount = loaded.filter(Boolean).length + failed.filter(Boolean).length
  const [ready, setReady] = useState(false)

  // Revela quando todas as placas assentaram (carregadas ou falhadas), ou ao fim de 6 s.
  useEffect(() => {
    if (loadedCount >= NC) setReady(true)
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
    // no telemóvel o scroll é sempre nativo (o Lenis não suaviza o toque e só atrapalharia os ajustes abaixo)
    if (reduced || horizontal) return
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
  }, [reduced, horizontal])

  /* ------------------------------------------- layout fisheye por frame */
  useLayoutEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    if (!track || !stage) return

    const st = ScrollTrigger.create({ trigger: track, start: 'top top', end: 'bottom bottom' })
    stRef.current = st

    let vw = stage.clientWidth
    let vh = stage.clientHeight
    // margem direita do bloco de apresentação (foto + texto), sem as transformações do scroll
    let introRight = 0
    const measure = () => {
      vw = stage.clientWidth
      vh = stage.clientHeight
      const el = introRef.current
      introRight = el && el.offsetWidth ? el.offsetLeft + el.offsetWidth : 0
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    if (introRef.current) ro.observe(introRef.current)

    let skew = 0
    let lastActive = -1
    let lastInside = true
    let locked = false

    // Telemóvel: a fronteira entre o carrossel e a grelha tem só dois estados. Quando o scroll vertical
    // para a meio caminho, a página acaba o movimento na direção em que ia: a subir, volta ao carrossel
    // inteiro; a descer, vai para o início da grelha. Assim o carrossel nunca fica cortado.
    let lastWinScroll = 0
    let lastY = window.scrollY
    let dir = 0
    let touching = false
    let settleTimer: number | undefined
    const settle = () => {
      if (!horizontal || touching) return
      const h = track.offsetHeight
      const y = window.scrollY
      if (y <= 2 || y >= h - 2) return
      window.scrollTo({ top: dir < 0 ? 0 : h, behavior: reduced ? 'auto' : 'smooth' })
    }
    const onWinScroll = () => {
      lastWinScroll = performance.now()
      const y = window.scrollY
      if (y !== lastY) dir = y < lastY ? -1 : 1
      lastY = y
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(settle, 160)
    }
    const onWinTouchStart = () => {
      touching = true
      window.clearTimeout(settleTimer)
    }
    const onWinTouchEnd = () => {
      touching = false
      window.clearTimeout(settleTimer)
      settleTimer = window.setTimeout(settle, 220)
    }
    if (horizontal) {
      window.addEventListener('scroll', onWinScroll, { passive: true })
      window.addEventListener('touchstart', onWinTouchStart, { passive: true })
      window.addEventListener('touchend', onWinTouchEnd, { passive: true })
      window.addEventListener('touchcancel', onWinTouchEnd, { passive: true })
    }

    // Tentativas de scroll vertical com a página presa: a roda passa a andar no carrossel e um gesto
    // vertical com o dedo faz as placas abanar para o lado, a mostrar o caminho.
    const sc = horizontal ? scrollerRef.current : null
    let nudgeAt = 0
    const nudge = () => {
      const strip = stripRef.current
      if (!strip || reduced || performance.now() - nudgeAt < 1500) return
      nudgeAt = performance.now()
      strip.classList.remove('is-nudge')
      void strip.offsetWidth
      strip.classList.add('is-nudge')
    }
    const onWheel = (e: WheelEvent) => {
      if (!locked || !sc || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      e.stopPropagation() // o Lenis está à escuta na janela
      sc.scrollBy({ left: e.deltaY })
    }
    let touch: { x: number; y: number } | null = null
    const onTouchStart = (e: TouchEvent) => {
      touch = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
    const onTouchMove = (e: TouchEvent) => {
      if (!locked || !touch) return
      const dx = e.touches[0].clientX - touch.x
      const dy = e.touches[0].clientY - touch.y
      if (dy < -30 && Math.abs(dy) > Math.abs(dx) * 1.5) nudge()
    }
    sc?.addEventListener('wheel', onWheel, { passive: false })
    sc?.addEventListener('touchstart', onTouchStart, { passive: true })
    sc?.addEventListener('touchmove', onTouchMove, { passive: true })
    const X = new Array<number>(NC).fill(0)
    const W = new Array<number>(NC).fill(0)
    const H = new Array<number>(NC).fill(0)

    // progresso do carrossel: o scroll vertical da página (computador) ou o horizontal do carrossel (telemóvel)
    const progress = () => {
      const sc = scrollerRef.current
      if (!horizontal || !sc) return st.progress
      const max = sc.scrollWidth - sc.clientWidth
      return max > 0 ? clamp(sc.scrollLeft / max) : 0
    }

    const frame = () => {
      const p = progress()
      const f = clamp((p - INTRO_END) / (STRIP_END - INTRO_END)) * (NC - 1)
      const mobile = vw < 700
      // Espaço do carrossel: no início só a metade direita (a esquerda é da apresentação) e, com o scroll,
      // o ecrã todo. No telemóvel a apresentação ocupa o ecrã inteiro e o carrossel entra pela direita.
      const intro = smooth(0, INTRO_END, p)
      const full = introRight > vw * 0.7
      const left = full ? 0 : introRight * (1 - intro)
      const availW = vw - left
      const centerX = left + availW / 2 + (full ? vw * (1 - intro) : 0)
      const widthFactor = mobile ? 0.66 : lerp(0.52, 0.34, intro)
      const H0 = Math.min(vh * (mobile ? 0.5 : 0.48), (availW * widthFactor) / 0.75, 620)
      const gap = Math.max(12, vw * 0.018)
      const centerY = vh * (mobile ? 0.44 : 0.45)

      // tamanhos: queda gaussiana à volta do índice focado (contínuo)
      let acc = 0
      for (let i = 0; i < NC; i++) {
        const d = i - f
        const s = 0.42 + 0.58 * Math.exp(-(d * d) / 0.7)
        H[i] = H0 * s
        W[i] = H[i] * 0.75
        X[i] = acc + W[i] / 2
        acc += W[i] + gap
      }
      const i0 = Math.floor(f)
      const i1 = Math.min(NC - 1, i0 + 1)
      const focusX = lerp(X[i0], X[i1], f - i0)
      const offset = centerX - focusX
      // a faceta, a legenda, o relógio e a dica aparecem à medida que o carrossel ganha espaço
      const reveal = smooth(0.25, 1, intro)

      // skew pela velocidade (a do Lenis é em px por frame)
      const v = lenisRef.current?.velocity ?? 0
      skew = lerp(skew, reduced ? 0 : clamp(v * 0.12, -6, 6), 0.1)

      for (let i = 0; i < NC; i++) {
        const el = cardsRef.current[i]
        if (!el) continue
        const x = X[i] + offset
        el.style.width = `${W[i]}px`
        el.style.height = `${H[i]}px`
        el.style.transform = `translate3d(${x - W[i] / 2}px, ${centerY - H[i] / 2}px, 0) skewX(${skew.toFixed(2)}deg)`
        const media = mediaRef.current[i]
        if (media) {
          // as ilustrações têm texto junto às margens: paralaxe mais curta e sem zoom
          const art = !!CAROUSEL[i].art
          const tx = clamp(-(i - f) * 7, -10, 10) * (art ? 0.25 : 1)
          media.style.transform = `translate3d(${tx}%, 0, 0) scale(${art ? 1 : 1.22})`
        }
      }

      // a faceta fica centrada por cima da placa ativa
      if (eraRef.current) {
        eraRef.current.style.transform = `translate3d(calc(-50% + ${centerX - vw / 2}px), calc(${centerY - H0 / 2}px - 100% - ${mobile ? 14 : 22}px), 0)`
        eraRef.current.style.opacity = `${reveal}`
      }
      // relógio: interpola o ano entre placas
      const year = lerp(YEARS[i0], YEARS[i1], f - i0)
      if (timeRef.current) timeRef.current.textContent = String(Math.round(year))
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${f / (NC - 1)})`
      if (captionRef.current) {
        captionRef.current.style.transform = `translate3d(${centerX - vw / 2}px, 0, 0)`
        captionRef.current.style.opacity = `${reveal}`
      }
      // na última placa o relógio dá lugar ao balão «Há mais, faz scroll»
      if (timeWrapRef.current) timeWrapRef.current.style.opacity = `${reveal * (1 - smooth(NC - 1.6, NC - 1.05, f))}`
      if (subRef.current) subRef.current.style.opacity = `${reveal}`
      if (introRef.current) {
        // a metade esquerda sai inteira pela esquerda
        introRef.current.style.transform = `translate3d(${-intro * introRight}px, 0, 0)`
        introRef.current.style.opacity = `${1 - intro * 0.5}`
        introRef.current.style.visibility = intro > 0.995 ? 'hidden' : 'visible'
      }

      // Telemóvel: enquanto o carrossel não chega à última placa, a página não desce
      // (só com o carrossel no topo, para nunca prender quem já está a meio da página).
      // só prende com a página parada: mudar o overflow a meio de um movimento pode cancelar o gesto
      const settled = performance.now() - lastWinScroll > 200 && !touching
      const lock = horizontal && f < NC - 1.1 && window.scrollY < 4 && (locked || settled)
      if (lock !== locked) {
        locked = lock
        document.documentElement.classList.toggle('is-hlock', lock)
        const sc = scrollerRef.current
        if (sc) sc.style.touchAction = lock ? 'pan-x' : 'pan-x pan-y'
      }

      const inside = horizontal ? track.getBoundingClientRect().bottom > vh * 0.45 : p < 0.985
      if (inside !== lastInside) {
        lastInside = inside
        cb.current.onInHero(inside)
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
      sc?.removeEventListener('wheel', onWheel)
      sc?.removeEventListener('touchstart', onTouchStart)
      sc?.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('scroll', onWinScroll)
      window.removeEventListener('touchstart', onWinTouchStart)
      window.removeEventListener('touchend', onWinTouchEnd)
      window.removeEventListener('touchcancel', onWinTouchEnd)
      window.clearTimeout(settleTimer)
      document.documentElement.classList.remove('is-hlock')
      st.kill()
      stRef.current = null
    }
  }, [reduced, horizontal])

  /* ------------------------------------------------------------- intro */
  useLayoutEffect(() => {
    if (!ready || reduced) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.fl-card__clip', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, stagger: { each: 0.06, from: 'center' } })
        .from('.fl-top > *', { opacity: 0, y: -10, duration: 1, stagger: 0.08 }, 0.3)
        .from('.fl-time > *', { yPercent: 100, opacity: 0, duration: 1.4, stagger: 0.08 }, 0.4)
        .from('.fl-intro__photo', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4 }, 0.1)
        .from('.fl-intro__text > *', { opacity: 0, y: 16, duration: 1, stagger: 0.1 }, 0.35)
    }, stageRef)
    return () => ctx.revert()
  }, [ready, reduced])

  /* ------------------------------------------------------------ ações */
  const scrollToY = (y: number, immediate = false) => {
    if (lenisRef.current) lenisRef.current.scrollTo(y, immediate ? { immediate: true, force: true } : { duration: 1.4, force: true })
    else window.scrollTo({ top: y, behavior: immediate || reduced ? 'auto' : 'smooth' })
  }
  const scrollToProgress = (p: number, immediate = false) => {
    const sc = scrollerRef.current
    if (horizontal && sc) {
      sc.scrollTo({ left: p * (sc.scrollWidth - sc.clientWidth), behavior: immediate || reduced ? 'auto' : 'smooth' })
      return
    }
    const st = stRef.current
    if (st) scrollToY(st.start + p * (st.end - st.start), immediate)
  }
  // placas da grelha (e a própria grelha): sobe-as até um pouco abaixo do topo do ecrã
  const scrollToEl = (el: Element | null, immediate = false, margin = window.innerHeight * 0.12) => {
    if (el) scrollToY(window.scrollY + el.getBoundingClientRect().top - margin, immediate)
  }
  const progressOf = (i: number) => INTRO_END + (clamp(i, 0, NC - 1) / (NC - 1)) * (STRIP_END - INTRO_END)
  // último destino pedido: teclas seguidas somam-se em vez de partirem sempre da placa atual
  const target = useRef({ i: 0, at: 0 })
  const goTo = (i: number) => {
    if (i >= NC) {
      target.current = { i: NC, at: performance.now() }
      // a primeira placa da grelha (e a seta depois da última do carrossel) abre a secção pelo título
      if (i === NC) scrollToEl(document.getElementById('camara-e-causa'), false, 0)
      else scrollToEl(hero.gridCards.get(i) ?? null)
      return
    }
    const c = clamp(i, 0, NC - 1)
    target.current = { i: c, at: performance.now() }
    scrollToProgress(progressOf(c))
  }
  const stepFrom = () => (performance.now() - target.current.at < 1400 ? target.current.i : active)

  useEffect(() => {
    hero.goTo = goTo
    hero.jump = (i) => (i < NC ? scrollToProgress(progressOf(i), true) : scrollToEl(hero.gridCards.get(i) ?? null, true))
    hero.toTop = () => {
      if (horizontal) scrollToY(0)
      scrollToProgress(0)
    }
    hero.lock = () => {
      lenisRef.current?.stop()
      document.documentElement.classList.add('is-locked')
    }
    hero.unlock = () => {
      document.documentElement.classList.remove('is-locked')
      lenisRef.current?.start()
    }
    hero.cardRect = (i) => (i < NC ? cardsRef.current[i] : hero.gridCards.get(i))?.getBoundingClientRect() ?? null
    hero.focusCard = (i) => (i < NC ? cardsRef.current[i] : hero.gridCards.get(i))?.focus({ preventScroll: true })
  })

  // setas para cima e para baixo avançam entre placas enquanto o carrossel está no ecrã
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = stRef.current
      // no topo (scroll 0) o ScrollTrigger ainda não está «ativo»: conta com os limites inclusivos
      if (paused || !st || window.scrollY < st.start - 1 || window.scrollY > st.end - 1) return
      if ((e.target as Element | null)?.closest?.('input, textarea')) return
      const recent = performance.now() - target.current.at < 1400
      const atIntro = st.progress < INTRO_END - 0.005 && !recent
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        // da apresentação, a primeira seta só abre o carrossel (placa 1); depois da última, desce para a grelha
        if (atIntro) goTo(0)
        else goTo(stepFrom() + 1)
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        // na placa 1, a seta para cima volta à apresentação
        if (!atIntro && stepFrom() === 0) {
          target.current = { i: 0, at: 0 }
          scrollToProgress(0)
        } else goTo(Math.min(stepFrom(), NC) - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused])

  const plate = L[active]
  // no modo horizontal o carrossel fica por baixo da camada que recebe o dedo: um toque abre a placa que está ali
  // (pela posição de cada carta: elementsFromPoint ignora elementos com pointer-events: none)
  const onScrollerClick = (e: React.MouseEvent) => {
    const i = cardsRef.current.findIndex((el) => {
      const r = el?.getBoundingClientRect()
      return !!r && e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
    })
    if (i >= 0) onOpen(i)
  }

  return (
    <section ref={trackRef} className={`fl-track${horizontal ? ' is-hscroll' : ''}`} style={{ height: horizontal ? undefined : `${100 + RANGE_VH}vh` }} aria-label={T.sectionAria}>
      <div ref={stageRef} className="fl-stage">
        {horizontal && (
          <div ref={scrollerRef} className="fl-hscroll" onClick={onScrollerClick} aria-hidden="true">
            {/* largura = área visível + percurso, para o fim do scroll bater exatamente na última paragem */}
            <div className="fl-hscroll__inner" style={{ width: `calc(100% + ${RANGE_VH * 1.1}vw)` }}>
              {/* pontos de paragem: a apresentação e cada placa */}
              {[0, ...CAROUSEL.map((_, i) => progressOf(i))].map((p, k) => (
                <span key={k} className="fl-hscroll__snap" style={{ left: `${(p * RANGE_VH * 1.1).toFixed(3)}vw` }} />
              ))}
            </div>
          </div>
        )}
        <div className="fl-chrome">
          <header className="fl-top">
            <span className="fl-top__l">
              {T.topLeft} <em>{T.topDate}</em>
            </span>
            <span className="fl-logo">{PERSON.name}</span>
            <span className="fl-top__r">{T.topRight}</span>
          </header>

          <p ref={eraRef} className="fl-era" aria-hidden="true">
            <span key={`${active}-${lang}`} className="fl-era__t">
              {plate.era}
            </span>
          </p>

          <div ref={captionRef} className="fl-caption" aria-live="polite">
            <span className="fl-sr">{plate.era}. </span>
            <span className="fl-caption__no">
              {T.codeLabel} · {String(active + 1).padStart(2, '0')} / {String(NC).padStart(2, '0')}
            </span>
            <span key={`${active}-${lang}`} className="fl-caption__title">
              {plate.title}
            </span>
            <span className="fl-caption__note">{plate.note}</span>
            {active === NC - 1 && (
              <button type="button" className="fl-more" onClick={() => goTo(NC)}>
                {T.moreBelow} <span aria-hidden="true">↓</span>
              </button>
            )}
          </div>

          <div ref={timeWrapRef} className="fl-time" aria-hidden="true">
            <span className="fl-time__now" ref={timeRef}>
              {YEARS[0]}
            </span>
            <span className="fl-time__line">
              <i ref={fillRef} />
            </span>
            <span className="fl-time__end">{YEARS[NC - 1]}</span>
          </div>
          <div ref={introRef} className="fl-intro">
            <figure className="fl-intro__photo">
              <img src={imgIntro} alt={T.introPhotoAlt} decoding="async" loading="eager" draggable={false} />
            </figure>
            <div className="fl-intro__text">
              <p className="fl-intro__lead">{T.introLead}</p>
              <p className="fl-intro__body">{T.introBody}</p>
              <p className="fl-intro__more">{T.introMore}</p>
              <p className="fl-intro__cue">
                {horizontal ? T.introCueTouch : T.introCue} <span aria-hidden="true">→</span>
              </p>
            </div>
          </div>
          <p ref={subRef} className="fl-sub">
            {T.hint}
          </p>
        </div>

        <div ref={stripRef} className="fl-strip">
          {L.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              ref={(el) => {
                cardsRef.current[i] = el
              }}
              data-index={i}
              className={`fl-card${i === active ? ' is-active' : ''}${p.dark ? ' is-dark' : ''}`}
              style={{ background: p.tint }}
              aria-label={T.cardAria(i + 1, NC, p.era, p.title, p.note)}
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
                    <>
                      <img
                        src={p.src}
                        alt=""
                        decoding="async"
                        loading="eager"
                        draggable={false}
                        style={p.focus ? { objectPosition: p.focus } : undefined}
                        className={`${p.fx ? `fx-${p.fx}` : ''}${loaded[i] ? ' is-loaded' : ''}`}
                        onLoad={() => setLoaded((l) => l.map((v, j) => (j === i ? true : v)))}
                        onError={() => setFailed((l) => l.map((v, j) => (j === i ? true : v)))}
                      />
                      <PlateFx fx={p.fx} />
                    </>
                  ) : (
                    <span className="fl-card__fallback">
                      {String(i + 1).padStart(2, '0')}
                      <br />
                      {p.when}
                    </span>
                  )}
                </span>
                {!p.art && !failed[i] && <PlateFx fx={p.fx} layer="card" />}
                <span className="fl-card__open" aria-hidden="true">
                  {T.open}
                </span>
              </span>
            </button>
          ))}
        </div>

        {!ready && (
          <div className="fl-loader" role="status">
            {T.loading} {String(loadedCount).padStart(2, '0')} / {NC}
          </div>
        )}
      </div>
    </section>
  )
}
