import { useSyncExternalStore } from 'react'

// Esquemas de cores. As cores em si estão em styles/florilegium.css, em :root[data-theme='…'].
export const THEMES = [
  { id: 'papel', pt: 'Papel', en: 'Paper', bg: '#eceae4', ink: '#24221e', accent: '#c8452c' },
  { id: 'salva', pt: 'Salva', en: 'Sage', bg: '#dde4d8', ink: '#1f2a22', accent: '#2f6f5e' },
  { id: 'barro', pt: 'Barro', en: 'Clay', bg: '#f2e2d8', ink: '#3a1f17', accent: '#c4462b' },
  { id: 'noite', pt: 'Noite', en: 'Night', bg: '#121413', ink: '#ece7dc', accent: '#e0704f' },
  { id: 'tinta', pt: 'Tinta', en: 'Ink', bg: '#142033', ink: '#eef0f4', accent: '#f2c94c' },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

const KEY = 'gf-tema'
const valid = (v: string | null): v is ThemeId => THEMES.some((x) => x.id === v)

let theme: ThemeId = (() => {
  try {
    const s = localStorage.getItem(KEY)
    if (valid(s)) return s
  } catch {
    /* sem armazenamento: tema por omissão */
  }
  return 'papel'
})()

const apply = () => {
  document.documentElement.dataset.theme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', THEMES.find((x) => x.id === theme)!.bg)
}
apply()

const listeners = new Set<() => void>()
export const setTheme = (id: ThemeId) => {
  theme = id
  apply()
  try {
    localStorage.setItem(KEY, id)
  } catch {
    /* ignora */
  }
  listeners.forEach((f) => f())
}
export const useTheme = () =>
  useSyncExternalStore(
    (f) => {
      listeners.add(f)
      return () => listeners.delete(f)
    },
    () => theme,
  )
