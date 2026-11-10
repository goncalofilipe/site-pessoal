import { useEffect, useRef, useState } from 'react'
import avatar from '../../assets/ciber-goncalo.png'
import { prefersReducedMotion } from '../lib/motion'
import { setOpen, useCiber } from './store'

// Escreve o texto letra a letra; um clique no texto mostra-o todo.
function useTypewriter(text: string, id: number) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) {
      setN(text.length)
      return
    }
    setN(0)
    let i = 0
    const t = setInterval(() => {
      i += text[i] === ' ' ? 2 : 1
      setN(i)
      if (i >= text.length) clearInterval(t)
    }, 16)
    return () => clearInterval(t)
  }, [text, id])
  return { shown: text.slice(0, n), done: n >= text.length, finish: () => setN(text.length) }
}

export default function CiberGoncalo({ placement }: { placement: 'home' | 'page' }) {
  const { msg, open, unread } = useCiber()
  const { shown, done, finish } = useTypewriter(msg?.text ?? '', msg?.id ?? 0)
  const bubbleRef = useRef<HTMLDivElement>(null)

  if (!msg) return null

  return (
    <aside className={`cg cg--${placement}${open ? ' is-open' : ''}${done ? '' : ' is-talking'}`} aria-label="Ciber Gonçalo, guia do site">
      {open && (
        <div ref={bubbleRef} className="cg-bubble" key={msg.id}>
          <div className="cg-head">
            <span className="cg-name">
              Ciber Gonçalo <i className="cg-dot" aria-hidden="true" />
            </span>
            <button type="button" className="cg-min" onClick={() => setOpen(false)} aria-label="Minimizar o Ciber Gonçalo">
              –
            </button>
          </div>
          {msg.echo && <p className="cg-echo">&gt; {msg.echo}</p>}
          <p className="cg-text" onClick={finish} aria-hidden="true">
            {shown}
            {!done && <span className="cg-caret" />}
          </p>
          <p className="cg-sr" aria-live="polite">
            {msg.text}
          </p>
          {msg.chips.length > 0 && (
            <div className={`cg-chips${done ? ' is-in' : ''}`}>
              {msg.chips.map((c) =>
                c.href ? (
                  <a key={c.label} className="cg-chip" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {c.label}
                  </a>
                ) : (
                  <button key={c.label} type="button" className="cg-chip" onClick={c.run}>
                    {c.label}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      )}
      <button
        type="button"
        className="cg-avatar"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? 'Minimizar o Ciber Gonçalo' : unread ? 'Abrir o Ciber Gonçalo: tem uma mensagem nova' : 'Abrir o Ciber Gonçalo'}
      >
        <img src={avatar} alt="" draggable={false} />
        <span className="cg-scan" aria-hidden="true" />
        {unread && !open && <span className="cg-badge" aria-hidden="true" />}
      </button>
    </aside>
  )
}
