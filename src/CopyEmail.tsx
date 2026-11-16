import { useEffect, useRef, useState } from 'react'
import { PERSON } from './content'
import { useT } from './i18n'
import { copyText } from './lib/clipboard'

// Botão com o email: um clique copia-o para a área de transferência e confirma durante uns segundos.
export default function CopyEmail({ className }: { className?: string }) {
  const T = useT()
  const [state, setState] = useState<'idle' | 'ok' | 'fail'>('idle')
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onClick = async () => {
    const ok = await copyText(PERSON.email)
    setState(ok ? 'ok' : 'fail')
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2400)
  }

  return (
    <button type="button" className={`${className ?? ''}${state === 'ok' ? ' is-copied' : ''}`} onClick={onClick} title={T.copyEmail} aria-label={`${T.copyEmail}: ${PERSON.email}`}>
      <span aria-hidden="true">{state === 'ok' ? '✓' : '⧉'}</span>
      <span>{state === 'ok' ? T.emailCopied : PERSON.email}</span>
      <span className="sr-live" aria-live="polite">
        {state === 'ok' ? T.emailCopied : state === 'fail' ? T.emailCopyFailed : ''}
      </span>
    </button>
  )
}
