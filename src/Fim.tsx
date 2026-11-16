import { useEffect, useRef } from 'react'
import { PERSON } from './content'
import { useT } from './i18n'
import CopyEmail from './CopyEmail'
import { hero } from './lib/hero'

// Fecho da página: contactos. Fica no fluxo normal, depois da grelha.
export default function Fim({ onSeen }: { onSeen: () => void }) {
  const T = useT()
  const ref = useRef<HTMLElement>(null)
  const seen = useRef(onSeen)
  seen.current = onSeen

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && seen.current(), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <footer ref={ref} className="fim">
      <h2 className="fim__title">
        {T.finalTitle1}
        <br />
        <em>{T.finalTitle2}</em>
      </h2>
      <p className="fim__body">{T.finalBody}</p>
      <div className="fim__actions">
        <CopyEmail className="fim__btn is-solid" />
        <a className="fim__btn" href={PERSON.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className="fim__btn" href={PERSON.instagram} target="_blank" rel="noreferrer">
          Instagram
        </a>
        <a className="fim__btn" href={PERSON.tiktok} target="_blank" rel="noreferrer">
          TikTok
        </a>
        <button type="button" className="fim__btn" onClick={() => hero.toTop()}>
          {T.btnTop} <span aria-hidden="true">↑</span>
        </button>
      </div>
      <p className="fim__foot">
        {PERSON.name} · {T.topDate}
      </p>
    </footer>
  )
}
