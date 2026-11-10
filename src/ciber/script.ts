// O que o Ciber Gonçalo diz e quando. As falas de cada placa estão em content.ts.
import { LENTES, N, PERSON, PLATES, type Lente } from '../content'
import { hero } from '../lib/hero'
import { closePlate, openPlate, replacePlate } from '../lib/route'
import { say, type Chip } from './store'

const compact = () => window.innerWidth < 700
// abaixo disto o balão aberto tapa o relógio ou a placa central: durante o scroll só avisa
const narrow = () => window.innerWidth < 1340

const lensChips = (except?: Lente): Chip[] =>
  (['codigo', 'camara', 'causa'] as Lente[])
    .filter((l) => l !== except)
    .map((l) => ({ label: LENTES[l].label, run: () => lens(l) }))

export const greet = () =>
  say(
    'Olá, sou o Ciber Gonçalo, a versão do Gonçalo que não se cansa de explicar. Faz scroll e eu dou-te o contexto de cada fase do percurso.',
    [{ label: 'Quem é o Gonçalo?', run: whoIs }, ...lensChips()],
    { open: true },
  )

export const whoIs = () =>
  say(
    'Programador há mais de sete anos, gestor de produto, comunicador com 19 mil seguidores, editor de vídeo e assessor político no Parlamento Europeu. Vive em Lisboa. Por onde queres começar?',
    lensChips(),
    { echo: 'Quem é o Gonçalo?', open: true },
  )

export const lens = (l: Lente) => {
  const target = PLATES.findIndex((p) => p.slug === LENTES[l].first)
  say(LENTES[l].text, [{ label: 'Leva-me lá', run: () => hero.goTo(target) }, ...lensChips(l)], { echo: LENTES[l].label, open: true })
}

export const plateIntro = (i: number) => {
  const p = PLATES[i]
  const chips: Chip[] = [
    { label: 'Abrir', run: () => openPlate(p.slug) },
    { label: 'Conta-me mais', run: () => plateMore(i) },
  ]
  if (i < N - 1) chips.push({ label: 'Próxima →', run: () => hero.goTo(i + 1) })
  say(p.cg.intro, chips, { open: narrow() ? false : undefined })
}

export const plateMore = (i: number) => {
  const p = PLATES[i]
  const chips: Chip[] = [{ label: 'Abrir', run: () => openPlate(p.slug) }]
  if (i < N - 1) chips.push({ label: 'Próxima →', run: () => hero.goTo(i + 1) })
  say(p.cg.more, chips, { echo: 'Conta-me mais', open: true })
}

const OPENERS = [
  (t: string) => `Abriste «${t}». Escolhe uma pergunta e eu respondo.`,
  (t: string) => `«${t}», com mais calma. Pergunta-me o que quiseres.`,
  (t: string) => `Aqui está tudo sobre «${t}». Tenho respostas preparadas para estas perguntas.`,
]

const pageChips = (i: number, asked: number[] = []): Chip[] => {
  const p = PLATES[i]
  const chips: Chip[] = p.cg.qa
    .map((qa, k) => ({ qa, k }))
    .filter(({ k }) => !asked.includes(k))
    .map(({ qa, k }) => ({ label: qa.q, run: () => answer(i, k, asked) }))
  if (i < N - 1) chips.push({ label: `Próxima: ${PLATES[i + 1].title} →`, run: () => replacePlate(PLATES[i + 1].slug) })
  else chips.push({ label: 'Falar com o Gonçalo', run: contact })
  chips.push({ label: '← Voltar ao Início', run: closePlate })
  return chips
}

export const pageContext = (i: number) => {
  const p = PLATES[i]
  say(p.cg.context ?? OPENERS[i % OPENERS.length](p.title), pageChips(i), { open: !compact() })
}

export const answer = (i: number, k: number, asked: number[] = []) => {
  const qa = PLATES[i].cg.qa[k]
  say(qa.a, pageChips(i, [...asked, k]), { echo: qa.q, open: true })
}

export const contact = () =>
  say(
    `O email é ${PERSON.email}. Eu respondo logo; o Gonçalo responde a sério.`,
    [
      { label: 'Escrever email', run: () => {}, href: `mailto:${PERSON.email}` },
      { label: 'LinkedIn', run: () => {}, href: PERSON.linkedin },
      { label: 'CV em PDF', run: () => {}, href: PERSON.cvPt },
    ],
    { echo: 'Falar com o Gonçalo', open: true },
  )

export const finale = () =>
  say(
    'Chegaste ao fim. Se alguma coisa te fez sentido, o Gonçalo gostava de saber.',
    [
      { label: 'Como falo com ele?', run: contact },
      { label: 'Abrir «Bojarda»', run: () => openPlate('bojarda') },
      { label: 'Voltar ao início', run: () => hero.toTop() },
    ],
    { open: narrow() ? false : undefined },
  )

export const hint = () =>
  say('Dica: clica numa imagem e eu abro-te a página dela. Com as setas ← → também andas para a frente e para trás.', lensChips())
