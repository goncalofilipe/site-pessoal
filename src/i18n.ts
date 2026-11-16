import { useSyncExternalStore } from 'react'
import { LENTES, PLATES, type Lentes, type Plate } from './content'
import { LENTES_EN, PLATES_EN } from './content.en'

export type Lang = 'pt' | 'en'

/* ---------------------------------------------------------- língua */
const KEY = 'gf-lang'
const initial = (): Lang => {
  const q = new URLSearchParams(window.location.search).get('lang')
  if (q === 'pt' || q === 'en') return q
  try {
    const s = localStorage.getItem(KEY)
    if (s === 'pt' || s === 'en') return s
  } catch {
    /* sem armazenamento: segue para o idioma do browser */
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

let lang: Lang = initial()
document.documentElement.lang = lang === 'pt' ? 'pt-PT' : 'en'
const listeners = new Set<() => void>()

export const getLang = () => lang
export const setLang = (l: Lang) => {
  if (l === lang) return
  lang = l
  document.documentElement.lang = l === 'pt' ? 'pt-PT' : 'en'
  try {
    localStorage.setItem(KEY, l)
  } catch {
    /* ignora */
  }
  listeners.forEach((f) => f())
}
export const onLangChange = (f: () => void) => {
  listeners.add(f)
  return () => {
    listeners.delete(f)
  }
}
export const useLang = () => useSyncExternalStore(onLangChange, getLang)

/* -------------------------------------------------------- conteúdo */
const merge = (p: Plate): Plate => {
  const e = PLATES_EN[p.slug]
  if (!e) return p
  return {
    ...p,
    era: e.era,
    when: e.when,
    title: e.title,
    note: e.note,
    page: {
      ...p.page,
      kicker: e.page.kicker,
      heading: e.page.heading,
      lead: e.page.lead,
      stats: e.page.stats ?? p.page.stats,
      statsNote: e.page.statsNote ?? p.page.statsNote,
      sections: e.page.sections,
      tools: e.page.tools ?? p.page.tools,
      gallery: p.page.gallery?.map((g, i) => ({ ...g, alt: e.page.galleryAlt?.[i] ?? g.alt })),
      links: p.page.links?.map((l, i) => ({ ...l, label: e.page.linkLabels?.[i] ?? l.label })),
    },
    cg: e.cg,
  }
}
const EN = PLATES.map(merge)
export const platesFor = (l: Lang): Plate[] => (l === 'en' ? EN : PLATES)
export const lentesFor = (l: Lang): Lentes => (l === 'en' ? LENTES_EN : LENTES)
export const usePlates = () => platesFor(useLang())


/* ------------------------------------------------ textos da interface */
const pt = {
  topLeft: '(Portefólio)',
  topDate: 'Lisboa, 2026',
  topRight: 'Código · Câmara · Causa',
  introLead: 'Olá, sou o Gonçalo.',
  introBody: 'Programo, faço gestão de produto, comunico, edito vídeo e dou assessoria em política, comunicação e organização. De 2012 até hoje.',
  introMore: 'Fica a conhecer a minha experiência enquanto consultor informático e ativista político.',
  introCue: 'Faz scroll para veres o percurso',
  introCueTouch: 'Desliza para veres o percurso',
  moreBelow: 'Há mais, faz scroll',
  introPhotoAlt: 'Gonçalo de fato e gravata, a comer ramen com pauzinhos num restaurante',
  hint: 'Faz scroll · ↑ ↓ para avançar · clica para abrir',
  open: 'Abrir ↗',
  loading: 'A carregar',
  sectionAria: 'Gonçalo Filipe, percurso de 2012 até hoje',
  cardAria: (i: number, n: number, era: string, title: string, note: string) => `${i} de ${n}: ${era}. ${title}, ${note}. Abrir página.`,
  finalTitle1: 'Código, câmara',
  finalTitle2: 'e causa.',
  finalBody: 'Programo, faço gestão de produto, comunico, edito vídeo e faço assessoria política, comunicação e organização. Estou aberto a projetos de várias áreas que valorizem capacidade de adaptação, criatividade e envolvimento social.',
  copyEmail: 'Copiar email',
  emailCopied: 'Email copiado',
  emailCopyFailed: 'Não foi possível copiar; seleciona o email à mão',
  btnTop: 'Voltar ao início',
  codeLabel: 'Código',
  gridKicker: '(Fora do código)',
  gridTitle1: 'Câmara',
  gridTitle2: 'e causa.',
  gridLead: 'Comunicação, edição de vídeo, assessoria política, vida associativa, organização e música. Clica numa para abrir a página.',
  gridIntro: 'Saímos do código. Aqui estão a câmara e a causa: comunicação, vídeo, assessoria política, a Diáspora, a organização e a música. Clica numa e eu conto-te o resto.',
  docHome: 'Início',
  pageHome: 'Início',
  pageNav: 'Navegação',
  pagePrev: 'Anterior',
  pageNext: 'Seguinte',
  pageNoPrev: 'Sem anterior',
  pageNoNext: 'Sem seguinte',
  pageFigures: 'Números',
  pageImages: 'Imagens',
  pageTools: 'Ferramentas e temas',
  pageEnd: 'Fim · fala comigo',
  cgName: 'Ciber Gonçalo',
  cgAria: 'Ciber Gonçalo, guia do site',
  cgMin: 'Minimizar o Ciber Gonçalo',
  cgOpen: 'Abrir o Ciber Gonçalo',
  cgOpenNew: 'Abrir o Ciber Gonçalo: tem uma mensagem nova',
  greet: 'Olá, sou o Ciber Gonçalo, a versão pixelizada do Gonçalo que te pode dar mais contexto. Faz scroll e eu dou-te o contexto de cada fase do meu percurso.',
  whoQ: 'Quem é o Gonçalo?',
  whoA: 'Programador há mais de 7 anos, gestor de produto, comunicador com 36 mil seguidores, editor de vídeo e assessor político no Parlamento Europeu. Vive em Lisboa. Por onde queres começar?',
  takeMe: 'Leva-me lá',
  chipOpen: 'Abrir',
  chipMore: 'Conta-me mais',
  chipNext: 'Próxima →',
  openers: [
    (t: string) => `Abriste «${t}». Escolhe uma pergunta e eu respondo.`,
    (t: string) => `«${t}», com mais calma. Pergunta-me o que quiseres.`,
    (t: string) => `Aqui está tudo sobre «${t}». Tenho respostas preparadas para estas perguntas.`,
  ],
  chipNextPage: (t: string) => `Próxima: ${t} →`,
  chipTalk: 'Falar com o Gonçalo',
  chipBack: '← Voltar ao Início',
  contact: (email: string) => `O email é ${email}. Eu respondo de cor; o Gonçalo responde a sério.`,
  chipCopy: 'Copiar email',
  chipCopied: (email: string) => `Copiei ${email} para a tua área de transferência. Agora é só colar.`,
  finale: 'Chegaste ao fim. Se quiseres propor alguma coisa, o Gonçalo gostava de te ouvir.',
  chipHow: 'Como falo com ele?',
  chipBojarda: 'Abrir «Bojarda»',
  chipTop: 'Voltar ao início',
  tip: 'Dica: clica numa imagem e eu abro-te a página dela. Com o scroll ou as setas ↑ ↓ andas para a frente e para trás.',
  langSwitched: 'Agora falo português. Faz scroll e eu continuo a dar-te o contexto.',
  prefsAria: 'Preferências',
  prefsColours: 'Esquema de cores',
  prefsLang: 'Língua',
}

type Dict = typeof pt

const en: Dict = {
  topLeft: '(Portfolio)',
  topDate: 'Lisbon, 2026',
  topRight: 'Code · Camera · Cause',
  introLead: 'Hi, I’m Gonçalo.',
  introBody: 'I code, manage products, communicate, edit video and advise on politics, communication and organising. From 2012 to today.',
  introMore: 'Get to know my experience as an IT consultant and political activist.',
  introCue: 'Scroll to see the journey',
  introCueTouch: 'Swipe to see the journey',
  moreBelow: 'There’s more, keep scrolling',
  introPhotoAlt: 'Gonçalo in a suit and tie, eating ramen with chopsticks at a restaurant',
  hint: 'Scroll · ↑ ↓ to move · click to open',
  open: 'Open ↗',
  loading: 'Loading',
  sectionAria: 'Gonçalo Filipe, a path from 2012 to today',
  cardAria: (i, n, era, title, note) => `${i} of ${n}: ${era}. ${title}, ${note}. Open page.`,
  finalTitle1: 'Code, camera',
  finalTitle2: 'and cause.',
  finalBody: 'I code, manage products, communicate, edit video and advise on politics, communication and organising. I am open to projects in many fields that value adaptability, creativity and social engagement.',
  copyEmail: 'Copy email',
  emailCopied: 'Email copied',
  emailCopyFailed: 'Could not copy; select the email by hand',
  btnTop: 'Back to the start',
  codeLabel: 'Code',
  gridKicker: '(Beyond code)',
  gridTitle1: 'Camera',
  gridTitle2: 'and cause.',
  gridLead: 'Communication, video editing, political advice, association life, organising and music. Click one to open its page.',
  gridIntro: 'We have left the code. Here are the camera and the cause: communication, video, political advice, Diáspora, organising and music. Click one and I’ll tell you the rest.',
  docHome: 'Home',
  pageHome: 'Home',
  pageNav: 'Navigation',
  pagePrev: 'Previous',
  pageNext: 'Next',
  pageNoPrev: 'No previous',
  pageNoNext: 'No next',
  pageFigures: 'Figures',
  pageImages: 'Images',
  pageTools: 'Tools and topics',
  pageEnd: 'The end · get in touch',
  cgName: 'Cyber Gonçalo',
  cgAria: 'Cyber Gonçalo, site guide',
  cgMin: 'Minimise Cyber Gonçalo',
  cgOpen: 'Open Cyber Gonçalo',
  cgOpenNew: 'Open Cyber Gonçalo: there is a new message',
  greet: 'Hi, I’m Cyber Gonçalo, the pixelated version of Gonçalo who can give you more context. Scroll and I’ll explain each stage of my path.',
  whoQ: 'Who is Gonçalo?',
  whoA: 'A programmer for more than 7 years, product manager, communicator with 36,000 followers, video editor and political adviser at the European Parliament. He lives in Lisbon. Where do you want to start?',
  takeMe: 'Take me there',
  chipOpen: 'Open',
  chipMore: 'Tell me more',
  chipNext: 'Next →',
  openers: [
    (t) => `You opened “${t}”. Pick a question and I’ll answer.`,
    (t) => `“${t}”, in more depth. Ask me anything.`,
    (t) => `Here is everything about “${t}”. I have answers ready for these questions.`,
  ],
  chipNextPage: (t) => `Next: ${t} →`,
  chipTalk: 'Talk to Gonçalo',
  chipBack: '← Back to Home',
  contact: (email) => `The email is ${email}. I answer from memory; Gonçalo answers for real.`,
  chipCopy: 'Copy email',
  chipCopied: (email) => `I copied ${email} to your clipboard. Just paste it.`,
  finale: 'You reached the end. If you want to propose something, Gonçalo would like to hear from you.',
  chipHow: 'How do I reach him?',
  chipBojarda: 'Open “Bojarda”',
  chipTop: 'Back to the start',
  tip: 'Tip: click an image and I’ll open its page. Scroll or use the ↑ ↓ keys to move forward and back.',
  langSwitched: 'I speak English now. Scroll and I’ll keep giving you the context.',
  prefsAria: 'Preferences',
  prefsColours: 'Colour scheme',
  prefsLang: 'Language',
}

const DICTS: Record<Lang, Dict> = { pt, en }
export const t = () => DICTS[lang]
export const useT = () => DICTS[useLang()]
