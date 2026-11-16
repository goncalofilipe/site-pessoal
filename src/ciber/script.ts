// O que o Ciber Gonçalo diz e quando. As falas de cada placa estão em content.ts (e content.en.ts);
// as falas gerais e os botões estão em i18n.ts. A língua é lida no momento em que ele fala.
import { N, PERSON, type Lente } from '../content'
import { getLang, lentesFor, platesFor, t } from '../i18n'
import { hero } from '../lib/hero'
import { closePlate, openPlate, replacePlate } from '../lib/route'
import { copyText } from '../lib/clipboard'
import { say, type Chip } from './store'

const compact = () => window.innerWidth < 700
// abaixo disto o balão aberto tapa o relógio ou a placa central: durante o scroll só avisa
const narrow = () => window.innerWidth < 1340
const plates = () => platesFor(getLang())
const lentes = () => lentesFor(getLang())

const lensChips = (except?: Lente): Chip[] =>
  (['codigo', 'camara', 'causa'] as Lente[])
    .filter((l) => l !== except)
    .map((l) => ({ label: lentes()[l].label, run: () => lens(l) }))

// No arranque a apresentação (foto e texto) ocupa a esquerda e o carrossel está empurrado para a direita:
// o balão só abre sozinho em ecrãs muito largos; nos outros fica o aviso de mensagem nova no avatar.
export const greet = () => say(t().greet, [{ label: t().whoQ, run: whoIs }, ...lensChips()], { open: window.innerWidth >= 1700 })

export const whoIs = () => say(t().whoA, lensChips(), { echo: t().whoQ, open: true })

export const lens = (l: Lente) => {
  const L = lentes()[l]
  const target = plates().findIndex((p) => p.slug === L.first)
  say(L.text, [{ label: t().takeMe, run: () => hero.goTo(target) }, ...lensChips(l)], { echo: L.label, open: true })
}

export const plateIntro = (i: number, opts: { open?: boolean } = {}) => {
  const p = plates()[i]
  const chips: Chip[] = [
    { label: t().chipOpen, run: () => openPlate(p.slug) },
    { label: t().chipMore, run: () => plateMore(i) },
  ]
  if (i < N - 1) chips.push({ label: t().chipNext, run: () => hero.goTo(i + 1) })
  say(p.cg.intro, chips, { open: opts.open ?? (narrow() ? false : undefined) })
}

export const plateMore = (i: number) => {
  const p = plates()[i]
  const chips: Chip[] = [{ label: t().chipOpen, run: () => openPlate(p.slug) }]
  if (i < N - 1) chips.push({ label: t().chipNext, run: () => hero.goTo(i + 1) })
  say(p.cg.more, chips, { echo: t().chipMore, open: true })
}

const pageChips = (i: number, asked: number[] = []): Chip[] => {
  const P = plates()
  const chips: Chip[] = P[i].cg.qa
    .map((qa, k) => ({ qa, k }))
    .filter(({ k }) => !asked.includes(k))
    .map(({ qa, k }) => ({ label: qa.q, run: () => answer(i, k, asked) }))
  if (i < N - 1) chips.push({ label: t().chipNextPage(P[i + 1].title), run: () => replacePlate(P[i + 1].slug) })
  else chips.push({ label: t().chipTalk, run: contact })
  chips.push({ label: t().chipBack, run: closePlate })
  return chips
}

export const pageContext = (i: number) => {
  const p = plates()[i]
  const openers = t().openers
  say(p.cg.context ?? openers[i % openers.length](p.title), pageChips(i), { open: !compact() })
}

export const answer = (i: number, k: number, asked: number[] = []) => {
  const qa = plates()[i].cg.qa[k]
  say(qa.a, pageChips(i, [...asked, k]), { echo: qa.q, open: true })
}

export const contact = () =>
  say(
    t().contact(PERSON.email),
    [
      { label: t().chipCopy, run: copyEmail },
      { label: 'LinkedIn', run: () => {}, href: PERSON.linkedin },
    ],
    { echo: t().chipTalk, open: true },
  )

const copyEmail = async () => {
  const ok = await copyText(PERSON.email)
  say(ok ? t().chipCopied(PERSON.email) : t().emailCopyFailed + ': ' + PERSON.email, [{ label: 'LinkedIn', run: () => {}, href: PERSON.linkedin }], { echo: t().chipCopy, open: true })
}

export const finale = () =>
  say(
    t().finale,
    [
      { label: t().chipHow, run: contact },
      { label: t().chipBojarda, run: () => openPlate('bojarda') },
      { label: t().chipTop, run: () => hero.toTop() },
    ],
    { open: narrow() ? false : undefined },
  )

export const hint = () => say(t().tip, lensChips())

// Quando a grelha «Câmara e causa» entra no ecrã
export const gridIntro = () => say(t().gridIntro, lensChips('codigo'), { open: narrow() ? false : undefined })

// Depois de mudar de língua: confirma na nova língua e retoma a placa ativa.
export const languageChanged = (active: number) =>
  say(t().langSwitched, [{ label: t().chipOpen, run: () => openPlate(plates()[active].slug) }, ...lensChips()], { open: !compact() })
