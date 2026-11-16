import { useCallback, useEffect, useRef, useState } from 'react'
import Hero from './Hero'
import PlatePage from './PlatePage'
import CiberGoncalo from './ciber/CiberGoncalo'
import Prefs from './Prefs'
import * as cg from './ciber/script'
import { indexOf, PLATES } from './content'
import { onLangChange, usePlates, useT } from './i18n'
import { hero } from './lib/hero'
import { openPlate, useRoute } from './lib/route'

export default function App() {
  const route = useRoute()
  const pageIndex = route.name === 'placa' ? indexOf(route.slug) : -1
  const onPage = pageIndex >= 0
  const fromRect = useRef<DOMRect | null>(null)
  const lastPage = useRef(-1)
  const ready = useRef(false)
  const introTimer = useRef<number | undefined>(undefined)
  const touched = useRef(false)
  const finaleOn = useRef(false)
  const onPageRef = useRef(onPage)
  onPageRef.current = onPage
  const [finale, setFinale] = useState(false)
  const active = useRef(0)
  const L = usePlates()
  const T = useT()

  // Abrir: guarda a posição da placa para o recorte de entrada.
  const onOpen = useCallback((i: number) => {
    fromRect.current = hero.cardRect(i)
    openPlate(PLATES[i].slug)
  }, [])

  useEffect(() => {
    document.title = onPage ? `${L[pageIndex].title} · Gonçalo Filipe` : `${T.docHome} · Gonçalo Filipe`
  }, [onPage, pageIndex, L, T])

  // Mudança de língua (só acontece no Início): o avatar confirma na nova língua.
  useEffect(
    () =>
      onLangChange(() => {
        if (ready.current && !onPageRef.current) cg.languageChanged(active.current)
      }),
    [],
  )

  // Entrar e sair das páginas: trancar o scroll do herói, deixá-lo na placa certa, devolver o foco.
  useEffect(() => {
    if (onPage) {
      touched.current = true
      hero.jump(pageIndex)
      hero.lock()
      cg.pageContext(pageIndex)
      lastPage.current = pageIndex
    } else {
      hero.unlock()
      if (lastPage.current >= 0) {
        hero.focusCard(lastPage.current)
        cg.plateIntro(lastPage.current)
      }
      fromRect.current = null
    }
  }, [onPage, pageIndex])

  const onActive = useCallback(
    (i: number) => {
      active.current = i
      if (!ready.current || onPage) return
      touched.current = true
      window.clearTimeout(introTimer.current)
      // espera que o scroll assente antes de falar
      introTimer.current = window.setTimeout(() => {
        if (!finaleOn.current) cg.plateIntro(i)
      }, 450)
    },
    [onPage],
  )

  const onFinale = useCallback(
    (on: boolean) => {
      finaleOn.current = on
      setFinale(on)
      if (on && !onPage) {
        window.clearTimeout(introTimer.current)
        cg.finale()
      }
    },
    [onPage],
  )

  const onReady = useCallback(() => {
    ready.current = true
    if (!onPageRef.current) cg.greet()
    // dica única se ninguém mexer
    window.setTimeout(() => {
      if (!touched.current && !onPageRef.current) cg.hint()
    }, 22000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Hero paused={onPage} onOpen={onOpen} onActive={onActive} onFinale={onFinale} onReady={onReady} />
      {onPage && <PlatePage index={pageIndex} from={fromRect.current} />}
      <Prefs visible={!onPage && !finale} />
      <CiberGoncalo placement={onPage ? 'page' : 'home'} />
    </>
  )
}
