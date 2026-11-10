import { useSyncExternalStore } from 'react'

export type Route = { name: 'home' } | { name: 'placa'; slug: string }

const parse = (hash: string): Route => {
  const m = hash.match(/^#\/placa\/([\w-]+)/)
  return m ? { name: 'placa', slug: m[1] } : { name: 'home' }
}

// O scroll é do herói: o browser não o deve repor ao voltar atrás no histórico.
history.scrollRestoration = 'manual'

let current = parse(window.location.hash)
const listeners = new Set<() => void>()
window.addEventListener('hashchange', () => {
  current = parse(window.location.hash)
  listeners.forEach((l) => l())
})

export const useRoute = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => current,
  )

export const openPlate = (slug: string) => {
  window.location.hash = `#/placa/${slug}`
}
// Fechar volta ao histórico quando a página foi aberta daqui; num link direto, substitui.
let openedHere = false
window.addEventListener('hashchange', (e) => {
  if (!e.newURL || !e.oldURL) return // eventos sintéticos de replacePlate/closePlate
  const to = parse(new URL(e.newURL).hash).name
  if (to === 'home') openedHere = false
  else if (parse(new URL(e.oldURL).hash).name === 'home') openedHere = true
})
export const closePlate = () => {
  if (openedHere) {
    openedHere = false
    history.back()
  } else {
    history.replaceState(null, '', window.location.pathname + window.location.search)
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }
}
// Navegar entre placas sem empilhar histórico.
export const replacePlate = (slug: string) => {
  history.replaceState(null, '', `#/placa/${slug}`)
  window.dispatchEvent(new HashChangeEvent('hashchange'))
}
