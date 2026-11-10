// Ponte entre o herói (que tem o scroll) e quem o quer comandar: o avatar e a página de placa.
// O Hero preenche estas funções quando monta.
export const hero = {
  goTo: (_i: number) => {},
  jump: (_i: number) => {},
  toTop: () => {},
  lock: () => {},
  unlock: () => {},
  cardRect: (_i: number): DOMRect | null => null,
  focusCard: (_i: number) => {},
}
