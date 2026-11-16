// Ponte entre o herói (que tem o scroll) e quem o quer comandar: o avatar, a grelha e a página de placa.
// O Hero preenche estas funções quando monta. Os índices são os de PLATES (globais).
export const hero = {
  goTo: (_i: number) => {},
  jump: (_i: number) => {},
  toTop: () => {},
  lock: () => {},
  unlock: () => {},
  cardRect: (_i: number): DOMRect | null => null,
  focusCard: (_i: number) => {},
  // cartões da grelha estática, registados pelo Mosaico (índice global → elemento)
  gridCards: new Map<number, HTMLElement>(),
}
