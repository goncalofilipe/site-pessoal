import { useId, type ReactNode } from 'react'
import type { Art } from './content'
import avatar from '../assets/ciber-goncalo-40.png'
import { useLang } from './i18n'
import { usePrefersReducedMotion } from './lib/motion'

const ART_TEXT = {
  pt: {
    hello: 'Olá,', world: 'mundo.', caretX: 212, formTop: 'ISTEC · LOURES · MADRID',
    sectors: 'três setores,', beat: 'um batimento.', noesisList: ['MEDTRONIC · SAÚDE', 'WORTEN · RETALHO', 'PARQUES DE SINTRA · PÚBLICO'],
    lowcode: 'low-code,', volume: 'alto volume.',
    parlTop: 'PARLAMENTO EUROPEU', parlFoot: 'ASSESSORIA POLÍTICA · REGULAÇÃO DIGITAL',
    manage: 'Gerir e', code: 'programar.', prodTop: 'PRODUTO · ARQUITETURA', netPublic: 'REDE PÚBLICA', netInternal: 'REDE INTERNA',
    apiSub: 'CONTAS · FILA', service: 'SERVIÇO', serviceSub: 'SÓ LIGA PARA FORA', prodFoot1: '5 APPS · 1 CMS · 5 CONTENTORES', prodFoot2: '~10 000 PESSOAS',
    decide: 'Eu decido,', write: 'eles escrevem.', iaTop: 'CLAUDE CODE · AGENTES', online: 'CIBER GONÇALO · ONLINE',
    t1: 'desenha a fila com reentregas', t2: 'os testes passam', t3: 'revê a fronteira de rede', t4: 'só liga para fora. ok',
  },
  en: {
    hello: 'Hello,', world: 'world.', caretX: 176, formTop: 'ISTEC · LOURES · MADRID',
    sectors: 'three sectors,', beat: 'one heartbeat.', noesisList: ['MEDTRONIC · HEALTH', 'WORTEN · RETAIL', 'PARQUES DE SINTRA · PUBLIC'],
    lowcode: 'low-code,', volume: 'high volume.',
    parlTop: 'EUROPEAN PARLIAMENT', parlFoot: 'POLITICAL ADVICE · DIGITAL REGULATION',
    manage: 'Manage and', code: 'code.', prodTop: 'PRODUCT · ARCHITECTURE', netPublic: 'PUBLIC NETWORK', netInternal: 'INTERNAL NETWORK',
    apiSub: 'ACCOUNTS · QUEUE', service: 'SERVICE', serviceSub: 'OUTBOUND ONLY', prodFoot1: '5 APPS · 1 CMS · 5 CONTAINERS', prodFoot2: '~10,000 PEOPLE',
    decide: 'I decide,', write: 'they write.', iaTop: 'CLAUDE CODE · AGENTS', online: 'CYBER GONÇALO · ONLINE',
    t1: 'design the queue with retries', t2: 'tests passing', t3: 'review the network boundary', t4: 'outbound only. ok',
  },
}
const useArt = () => ART_TEXT[useLang()]

// Composições em SVG (3:4) para as placas sem fotografia. Escalam com a placa.
const serif = { fontFamily: 'var(--fl-serif)' }
const mono = { fontFamily: 'var(--fl-mono)', fontWeight: 500, letterSpacing: '0.14em' }

function Frame({ ink, label, year, children }: { ink: string; label: string; year: string; children: ReactNode }) {
  return (
    <>
      <text x="18" y="28" fill={ink} fontSize="8" style={mono} opacity="0.7">{label}</text>
      <text x="282" y="28" fill={ink} fontSize="8" style={mono} opacity="0.7" textAnchor="end">{year}</text>
      <line x1="18" y1="36" x2="282" y2="36" stroke={ink} strokeOpacity="0.2" strokeWidth="0.6" />
      {children}
    </>
  )
}

// Animações em SMIL, em ciclo: cada elemento aparece numa fração `at` do ciclo e tudo recomeça no fim.
// Com movimento reduzido, mostra-se tudo parado.
function useLoop(dur: number) {
  const reduced = usePrefersReducedMotion()
  const id = useId().replace(/[^a-zA-Z0-9]/g, '')
  const appear = (at: number, to = 1) =>
    reduced ? null : <animate attributeName="opacity" values={`0;0;${to};${to};0`} keyTimes={`0;${at};${(at + 0.03).toFixed(3)};0.93;1`} dur={`${dur}s`} repeatCount="indefinite" />
  return { reduced, id, appear, dur: `${dur}s` }
}

function Formacao() {
  const a = useArt()
  const ink = '#24221e'
  const { reduced, id, appear, dur } = useLoop(8)
  // as duas linhas grandes escrevem-se da esquerda para a direita
  const reveal = (from: number, to: number, w: number) =>
    reduced ? null : <animate attributeName="width" values={`0;0;${w};${w};0`} keyTimes={`0;${from};${to};0.93;1`} dur={dur} repeatCount="indefinite" />
  return (
    <Frame ink={ink} label={a.formTop} year="2012/2020">
      <defs>
        <clipPath id={`${id}a`}>
          <rect x="14" y="96" height="68" width={reduced ? 280 : 0}>{reveal(0.04, 0.16, 280)}</rect>
        </clipPath>
        <clipPath id={`${id}b`}>
          <rect x="14" y="164" height="64" width={reduced ? 280 : 0}>{reveal(0.18, 0.36, 280)}</rect>
        </clipPath>
      </defs>
      {Array.from({ length: 22 }, (_, k) => (
        <line key={k} x1="18" x2="282" y1={60 + k * 14} y2={60 + k * 14} stroke={ink} strokeOpacity="0.07" strokeWidth="0.6" />
      ))}
      <text x="18" y="150" fill={ink} fontSize="56" style={serif} clipPath={`url(#${id}a)`}>{a.hello}</text>
      <text x="18" y="212" fill={ink} fontSize="56" style={{ ...serif, fontStyle: 'italic' }} clipPath={`url(#${id}b)`}>{a.world}</text>
      <g opacity={reduced ? 1 : 0}>
        {appear(0.36)}
        <rect x={a.caretX} y="172" width="4" height="42" fill="#c8452c">
          <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite" />
        </rect>
      </g>
      {['Visual Basic', 'Java', 'Swift', 'C#', 'SQL'].map((l, k) => (
        <text key={l} x="18" y={268 + k * 18} fill={ink} fontSize="8.5" style={mono} opacity={reduced ? 0.85 - k * 0.12 : 0}>
          {appear(0.42 + k * 0.06, 0.85 - k * 0.12)}
          {String(k + 1).padStart(2, '0')}  {l.toUpperCase()}
        </text>
      ))}
    </Frame>
  )
}

function Pulso() {
  const a = useArt()
  const ink = '#efe9dc'
  const d = 'M0 200 H70 l8 -6 l8 6 H112 l6 18 l12 -96 l12 120 l8 -42 H190 l8 -8 l8 8 H300'
  return (
    <Frame ink={ink} label="NOESIS · OUTSYSTEMS" year="2019/2020">
      <path d={d} fill="none" stroke={ink} strokeOpacity="0.12" strokeWidth="1" transform="translate(0 0)" />
      <path d={d} fill="none" stroke="#7fd1b9" strokeWidth="1.6" strokeLinejoin="round" pathLength={1} strokeDasharray="1" className="art-pulse" />
      <text x="18" y="96" fill={ink} fontSize="28" style={{ ...serif, fontStyle: 'italic' }}>{a.sectors}</text>
      <text x="18" y="130" fill={ink} fontSize="28" style={serif}>{a.beat}</text>
      {a.noesisList.map((l, k) => (
        <g key={l}>
          <line x1="18" x2="282" y1={292 + k * 30} y2={292 + k * 30} stroke={ink} strokeOpacity="0.2" strokeWidth="0.6" />
          <text x="18" y={310 + k * 30} fill={ink} fontSize="8.5" style={mono}>{l}</text>
        </g>
      ))}
    </Frame>
  )
}

// Fluxo de automação low-code: linhas brancas sobre preto que se desenham, impulsos de luz a percorrê-las
// e decisões (losangos) que acendem. Inspirado num diagrama de workflow; desenho próprio.
const FLOW_LINES = [
  'M31 125 H300',
  'M82 52 V125',
  'M176 125 C186 125 194 120 194 108 V36',
  'M194 78 H222 C230 78 234 84 234 92 V113 C234 121 238 125 246 125 H300',
  'M108 125 C116 125 121 130 121 138 V352',
  'M121 170 H94 C87 170 82 175 82 182 V217',
  'M0 217 H104 C114 217 121 222 121 232',
  'M121 255 C121 268 126 275 136 275 H194',
  'M194 170 V275',
  'M194 200 C194 210 200 217 210 217 H224 C230 217 234 222 234 230 V275',
  'M157 217 V300 C157 312 150 318 140 318 H132 C125 318 121 324 121 332',
  'M121 352 V362 C121 372 127 378 137 378 H300',
]
// percursos dos impulsos: [caminho, duração (s), início (s)]
const FLOW_PULSES: [string, number, number][] = [
  ['M31 125 H176 C186 125 194 120 194 108 V78 H222 C230 78 234 84 234 92 V113 C234 121 238 125 246 125 H300', 4.2, 0.4],
  ['M31 125 H108 C116 125 121 130 121 138 V255 C121 268 126 275 136 275 H194', 4, 1.5],
  ['M0 217 H104 C114 217 121 222 121 232 V362 C121 372 127 378 137 378 H300', 5, 0.9],
  ['M157 217 V300 C157 312 150 318 140 318 H132 C125 318 121 324 121 332 V362 C121 372 127 378 137 378 H300', 4.6, 2.6],
  ['M194 170 V200 C194 210 200 217 210 217 H224 C230 217 234 222 234 230 V275', 2.8, 2],
]
const FLOW_NODES: [number, number][] = [[82, 125], [194, 78], [121, 170], [194, 170], [157, 217]]
const FLOW_DIAMONDS: [number, number, number][] = [[158, 125, 0.3], [82, 217, 1.4], [194, 275, 2.1], [121, 348, 2.9]]
const FLOW_SQUARES: [number, number][] = [[82, 52], [234, 275]]

function Fluxo() {
  const a = useArt()
  const { reduced, id } = useLoop(4)
  const white = '#f4f4f0'
  return (
    <>
      <rect width="300" height="400" fill="#050505" />
      <defs>
        {/* as linhas esbatem-se junto às margens */}
        <linearGradient id={`${id}fh`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.08" stopColor="#fff" />
          <stop offset="0.86" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id={`${id}fv`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0.08" stopColor="#000" />
          <stop offset="0.16" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <mask id={`${id}mh`}>
          <rect width="300" height="400" fill={`url(#${id}fh)`} />
        </mask>
        <mask id={`${id}mv`}>
          <rect width="300" height="400" fill={`url(#${id}fv)`} />
        </mask>
        <pattern id={`${id}dots`} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.55" fill={white} opacity="0.35" />
        </pattern>
        <radialGradient id={`${id}glow`}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <text x="14" y="22" fill={white} fontSize="7.5" style={mono}>ACT DIGITAL · RANDSTAD</text>
      <rect x="128" y="14" width="160" height="12" fill={`url(#${id}dots)`} />

      <g mask={`url(#${id}mv)`}>
        <g mask={`url(#${id}mh)`} fill="none" stroke={white} strokeWidth="1.3" strokeLinecap="butt">
          {FLOW_LINES.map((d, k) => (
            <path key={k} d={d} pathLength={1} strokeDasharray="1" strokeDashoffset={reduced ? 0 : 1}>
              {!reduced && <animate attributeName="stroke-dashoffset" from="1" to="0" dur="1.3s" begin={`${0.15 + k * 0.1}s`} fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.3 0 0.2 1" />}
            </path>
          ))}
        </g>

        {/* impulsos de luz a percorrer o fluxo */}
        {!reduced &&
          FLOW_PULSES.map(([d, dur, begin], k) => (
            <g key={k} opacity="0">
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.88;1" dur={`${dur}s`} begin={`${begin + 1.4}s`} repeatCount="indefinite" />
              <animateMotion path={d} dur={`${dur}s`} begin={`${begin + 1.4}s`} repeatCount="indefinite" calcMode="linear" />
              <circle r="7" fill={`url(#${id}glow)`} opacity="0.5" />
              <circle r="2.3" fill="#fff" />
            </g>
          ))}
      </g>

      {/* nó de arranque */}
      <rect x="13" y="107" width="36" height="36" rx="9" fill={white} />
      <circle cx="31" cy="125" r="9.5" fill="#050505" />
      <circle cx="31" cy="125" r="4.2" fill={white}>
        {!reduced && <animate attributeName="r" values="4.2;5.2;4.2" dur="2.4s" repeatCount="indefinite" />}
      </circle>

      {FLOW_NODES.map(([x, y], k) => (
        <circle key={k} cx={x} cy={y} r="5.2" fill={white} />
      ))}
      {FLOW_SQUARES.map(([x, y], k) => (
        <rect key={k} x={x - 4.5} y={y - 4.5} width="9" height="9" rx="1.6" fill={white} />
      ))}
      {FLOW_DIAMONDS.map(([x, y, at], k) => (
        <rect key={k} x={x - 4.6} y={y - 4.6} width="9.2" height="9.2" fill="#050505" stroke={white} strokeWidth="1.3" transform={`rotate(45 ${x} ${y})`}>
          {!reduced && <animate attributeName="fill" values="#050505;#050505;#f4f4f0;#050505" keyTimes="0;0.7;0.78;1" dur="3.6s" begin={`${at + 1.4}s`} repeatCount="indefinite" />}
        </rect>
      ))}

      {/* à direita, por cima da última linha: o canto inferior direito é da pílula «Abrir» e o esquerdo do avatar */}
      <text x="286" y="362" fill={white} fontSize="13" fontWeight="700" textAnchor="end" style={{ letterSpacing: '-0.01em' }}>
        {a.lowcode} {a.volume}
      </text>
    </>
  )
}

function Hemiciclo() {
  const a = useArt()
  const ink = '#efe9dc'
  const seats: ReactNode[] = []
  const rows = 7
  for (let r = 0; r < rows; r++) {
    const radius = 54 + r * 14
    const count = 14 + r * 5
    for (let s = 0; s < count; s++) {
      const a = Math.PI - (s / (count - 1)) * Math.PI
      const lit = (r * 31 + s * 17) % 23 === 0
      seats.push(
        <circle
          key={`${r}-${s}`}
          cx={150 + Math.cos(a) * radius}
          cy={330 - Math.sin(a) * radius}
          r={2.1}
          fill={lit ? '#f2c94c' : ink}
          opacity={lit ? 1 : 0.32}
        />,
      )
    }
  }
  return (
    <Frame ink={ink} label={a.parlTop} year="2025/">
      <text x="18" y="100" fill={ink} fontSize="52" style={serif}>AI Act</text>
      <text x="18" y="150" fill={ink} fontSize="38" style={{ ...serif, fontStyle: 'italic' }}>&amp; DSA</text>
      {seats}
      <line x1="40" x2="260" y1="338" y2="338" stroke={ink} strokeOpacity="0.25" strokeWidth="0.6" />
      <text x="150" y="370" fill={ink} fontSize="8" style={mono} textAnchor="middle" opacity="0.7">{a.parlFoot}</text>
    </Frame>
  )
}

function Arquitetura() {
  const a = useArt()
  const ink = '#24221e'
  const accent = '#2f6f5e'
  const box = (x: number, y: number, w: number, label: string, sub: string) => (
    <g>
      <rect x={x} y={y} width={w} height="40" rx="3" fill="#f6f3ec" stroke={ink} strokeWidth="0.9" />
      <text x={x + w / 2} y={y + 18} fill={ink} fontSize="8.5" style={mono} textAnchor="middle">{label}</text>
      <text x={x + w / 2} y={y + 30} fill={ink} fontSize="6.5" style={mono} textAnchor="middle" opacity="0.55">{sub}</text>
    </g>
  )
  return (
    <Frame ink={ink} label={a.prodTop} year="2025/2026">
      <text x="18" y="88" fill={ink} fontSize="32" style={serif}>{a.manage}</text>
      <text x="18" y="122" fill={ink} fontSize="32" style={{ ...serif, fontStyle: 'italic' }}>{a.code}</text>
      <text x="22" y="160" fill={ink} fontSize="6.5" style={mono} opacity="0.6">{a.netPublic}</text>
      <text x="278" y="160" fill={accent} fontSize="6.5" style={mono} textAnchor="end">{a.netInternal}</text>
      <line x1="150" y1="150" x2="150" y2="380" stroke={accent} strokeWidth="0.9" strokeDasharray="3 3" />
      {box(22, 172, 104, 'WEB', 'REACT · MOBILE')}
      {box(22, 262, 104, 'API', a.apiSub)}
      {box(174, 262, 104, a.service, a.serviceSub)}
      {box(174, 172, 104, 'CMS', 'DIRECTUS · DOCKER')}
      <path d="M74 212 V258" stroke={ink} strokeWidth="0.9" markerEnd="url(#seta)" />
      <path d="M174 282 H130" stroke={accent} strokeWidth="1.1" markerEnd="url(#seta-v)" className="art-flow" strokeDasharray="4 3" />
      <path d="M226 262 V216" stroke={accent} strokeWidth="1.1" markerEnd="url(#seta-v)" />
      <defs>
        <marker id="seta" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill={ink} />
        </marker>
        <marker id="seta-v" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill={accent} />
        </marker>
      </defs>
      <text x="18" y="350" fill={ink} fontSize="7.5" style={mono}>{a.prodFoot1}</text>
      <text x="18" y="366" fill={ink} fontSize="7.5" style={mono} opacity="0.6">{a.prodFoot2}</text>
    </Frame>
  )
}

function Reel() {
  const ink = '#24221e'
  const steps = ['GUIÃO', 'CORTE', 'LEGENDA', 'PUBLICAR']
  return (
    <Frame ink={ink} label="ASSESSORIA DE COMUNICAÇÃO" year="2025/">
      <rect x="86" y="52" width="128" height="228" rx="14" fill="#1c1a17" />
      <rect x="92" y="58" width="116" height="216" rx="10" fill="#35302a" />
      <circle cx="150" cy="128" r="26" fill="#4a423a" />
      <path d="M106 274 Q150 176 194 274 Z" fill="#4a423a" />
      <rect x="104" y="72" width="92" height="38" rx="2" fill="#f2c94c" />
      <text x="150" y="88" fill={ink} fontSize="9" style={{ ...mono, letterSpacing: '0.04em' }} textAnchor="middle">VALE A</text>
      <text x="150" y="102" fill={ink} fontSize="9" style={{ ...mono, letterSpacing: '0.04em' }} textAnchor="middle">PENA?</text>
      <rect x="100" y="218" width="100" height="14" rx="2" fill="#f3efe4" />
      <text x="150" y="228" fill={ink} fontSize="6.5" style={{ ...mono, letterSpacing: '0.04em' }} textAnchor="middle">a frase que para o scroll</text>
      <rect x="100" y="262" width="100" height="2" fill="#f3efe4" opacity="0.25" />
      <rect x="100" y="262" width="62" height="2" fill="#f3efe4" className="art-progress" />
      {steps.map((s, k) => (
        <g key={s}>
          <circle cx={36 + k * 76} cy={318} r="4" fill={k < 3 ? ink : 'none'} stroke={ink} strokeWidth="0.9" />
          {k < 3 && <line x1={40 + k * 76} x2={108 + k * 76} y1="318" y2="318" stroke={ink} strokeWidth="0.9" />}
          <text x={36 + k * 76} y="340" fill={ink} fontSize="7" style={mono} textAnchor="middle">{s}</text>
        </g>
      ))}
      <text x="150" y="378" fill={ink} fontSize="19" style={{ ...serif, fontStyle: 'italic' }} textAnchor="middle">em menos de um minuto</text>
    </Frame>
  )
}

function Terminal() {
  const a = useArt()
  const ink = '#d7e5d0'
  const { reduced, appear, dur } = useLoop(9)
  const lines: [string, string][] = [
    ['$', 'claude'],
    ['>', a.t1],
    ['●', 'apps/api/src/ponte.ts'],
    ['●', a.t2],
    ['>', a.t3],
    ['●', a.t4],
  ]
  const at = (k: number) => 0.06 + k * 0.1
  // o cursor desce para a linha seguinte à medida que cada linha aparece
  const cursorY = [164, ...lines.map((_, k) => 172 + (k + 1) * 20 - 8), 164]
  const cursorT = [0, ...lines.map((_, k) => at(k).toFixed(3)), 0.93]
  return (
    <Frame ink={ink} label={a.iaTop} year="2025/">
      <text x="18" y="88" fill={ink} fontSize="32" style={serif}>{a.decide}</text>
      <text x="18" y="124" fill={ink} fontSize="30" style={{ ...serif, fontStyle: 'italic' }}>{a.write}</text>
      {lines.map(([p, t], k) => (
        <text key={k} x="18" y={172 + k * 20} fill={p === '>' ? '#9fe0a8' : ink} fontSize="8.5" style={{ ...mono, letterSpacing: '0.02em' }} opacity={reduced ? (p === '●' ? 0.7 : 1) : 0}>
          {appear(at(k), p === '●' ? 0.7 : 1)}
          {p}  {t}
        </text>
      ))}
      <rect x="18" y={reduced ? 292 : 164} width="6" height="10" fill="#9fe0a8">
        <animate attributeName="opacity" values="1;1;0;0" dur="1s" repeatCount="indefinite" />
        {!reduced && <animate attributeName="y" calcMode="discrete" values={cursorY.join(';')} keyTimes={cursorT.join(';')} dur={dur} repeatCount="indefinite" />}
      </rect>
      <image href={avatar} x="214" y="306" width="66" height="72.6" style={{ imageRendering: 'pixelated' }} />
      <text x="18" y="374" fill={ink} fontSize="7" style={mono} opacity="0.6">{a.online}</text>
    </Frame>
  )
}

const ARTS: Record<Art, () => ReactNode> = {
  formacao: Formacao,
  pulso: Pulso,
  fluxo: Fluxo,
  hemiciclo: Hemiciclo,
  arquitetura: Arquitetura,
  reel: Reel,
  terminal: Terminal,
}

export default function PlateArt({ art, className }: { art: Art; className?: string }) {
  const Comp = ARTS[art]
  return (
    <svg className={`plate-art ${className ?? ''}`} viewBox="0 0 300 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <Comp />
    </svg>
  )
}
