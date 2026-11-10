import { useSyncExternalStore } from 'react'

export type Chip = { label: string; run: () => void; href?: string }
export type Msg = { id: number; text: string; echo?: string; chips: Chip[] }
type State = { msg: Msg | null; open: boolean; unread: boolean }

let state: State = { msg: null, open: true, unread: false }
let seq = 0
const listeners = new Set<() => void>()
const set = (patch: Partial<State>) => {
  state = { ...state, ...patch }
  listeners.forEach((l) => l())
}

export const useCiber = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )

const compact = () => window.innerWidth < 700

// Em ecrãs pequenos o balão não abre sozinho a meio do scroll: fica um aviso no avatar.
export const say = (text: string, chips: Chip[] = [], opts: { echo?: string; open?: boolean } = {}) => {
  const open = opts.open ?? (state.open || !compact())
  set({ msg: { id: ++seq, text, echo: opts.echo, chips }, open, unread: !open })
}

export const setOpen = (open: boolean) => set({ open, unread: open ? false : state.unread })
export const getCiber = () => state
