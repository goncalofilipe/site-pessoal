import type { ReactNode } from 'react'
import type { Art } from './content'
import avatar from '../assets/ciber-goncalo-40.png'

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

function Formacao() {
  const ink = '#24221e'
  return (
    <Frame ink={ink} label="ISTEC · LOURES · MADRID" year="2012/2020">
      {Array.from({ length: 22 }, (_, k) => (
        <line key={k} x1="18" x2="282" y1={60 + k * 14} y2={60 + k * 14} stroke={ink} strokeOpacity="0.07" strokeWidth="0.6" />
      ))}
      <text x="18" y="150" fill={ink} fontSize="56" style={serif}>Olá,</text>
      <text x="18" y="212" fill={ink} fontSize="56" style={{ ...serif, fontStyle: 'italic' }}>mundo.</text>
      <rect x="214" y="172" width="4" height="42" fill="#c8452c">
        <animate attributeName="opacity" values="1;1;0;0" dur="1.1s" repeatCount="indefinite" />
      </rect>
      {['Visual Basic', 'Java', 'Swift', 'C#', 'SQL'].map((l, k) => (
        <text key={l} x="18" y={268 + k * 18} fill={ink} fontSize="8.5" style={mono} opacity={0.85 - k * 0.12}>
          {String(k + 1).padStart(2, '0')}  {l.toUpperCase()}
        </text>
      ))}
    </Frame>
  )
}

function Pulso() {
  const ink = '#efe9dc'
  const d = 'M0 200 H70 l8 -6 l8 6 H112 l6 18 l12 -96 l12 120 l8 -42 H190 l8 -8 l8 8 H300'
  return (
    <Frame ink={ink} label="NOESIS · OUTSYSTEMS" year="2019/2020">
      <path d={d} fill="none" stroke={ink} strokeOpacity="0.12" strokeWidth="1" transform="translate(0 0)" />
      <path d={d} fill="none" stroke="#7fd1b9" strokeWidth="1.6" strokeLinejoin="round" pathLength={1} strokeDasharray="1" className="art-pulse" />
      <text x="18" y="96" fill={ink} fontSize="28" style={{ ...serif, fontStyle: 'italic' }}>três setores,</text>
      <text x="18" y="130" fill={ink} fontSize="28" style={serif}>um batimento.</text>
      {['MEDTRONIC · SAÚDE', 'WORTEN · RETALHO', 'PARQUES DE SINTRA · PÚBLICO'].map((l, k) => (
        <g key={l}>
          <line x1="18" x2="282" y1={292 + k * 30} y2={292 + k * 30} stroke={ink} strokeOpacity="0.2" strokeWidth="0.6" />
          <text x="18" y={310 + k * 30} fill={ink} fontSize="8.5" style={mono}>{l}</text>
        </g>
      ))}
    </Frame>
  )
}

function Fluxo() {
  const ink = '#24221e'
  const accent = '#c8452c'
  const node = (y: number, label: string) => (
    <g>
      <rect x="96" y={y} width="108" height="30" rx="3" fill="none" stroke={ink} strokeWidth="0.9" />
      <text x="150" y={y + 19} fill={ink} fontSize="8.5" style={mono} textAnchor="middle">{label}</text>
    </g>
  )
  return (
    <Frame ink={ink} label="ACT DIGITAL · RANDSTAD" year="2020/2025">
      <circle cx="150" cy="66" r="9" fill="none" stroke={ink} strokeWidth="0.9" />
      <line x1="150" y1="75" x2="150" y2="92" stroke={ink} strokeWidth="0.9" />
      {node(92, 'GETVAGAS')}
      <line x1="150" y1="122" x2="150" y2="140" stroke={ink} strokeWidth="0.9" />
      <path d="M150 140 L178 162 L150 184 L122 162 Z" fill="none" stroke={accent} strokeWidth="1.1" />
      <text x="150" y="165" fill={accent} fontSize="8" style={mono} textAnchor="middle">IF</text>
      <path d="M122 162 H62 V206" fill="none" stroke={ink} strokeWidth="0.9" />
      <path d="M178 162 H238 V206" fill="none" stroke={ink} strokeWidth="0.9" />
      <rect x="22" y="206" width="80" height="30" rx="3" fill="none" stroke={ink} strokeWidth="0.9" />
      <text x="62" y="225" fill={ink} fontSize="8" style={mono} textAnchor="middle">BPT</text>
      <rect x="198" y="206" width="80" height="30" rx="3" fill="none" stroke={ink} strokeWidth="0.9" />
      <text x="238" y="225" fill={ink} fontSize="8" style={mono} textAnchor="middle">REST</text>
      <path d="M62 236 V262 H150 M238 236 V262 H150 V276" fill="none" stroke={ink} strokeWidth="0.9" />
      <circle cx="150" cy="285" r="9" fill={ink} />
      <text x="18" y="352" fill={ink} fontSize="34" style={{ ...serif, fontStyle: 'italic' }}>low-code,</text>
      <text x="18" y="384" fill={ink} fontSize="22" style={serif}>alto volume.</text>
    </Frame>
  )
}

function Hemiciclo() {
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
    <Frame ink={ink} label="PARLAMENTO EUROPEU" year="2025/">
      <text x="18" y="100" fill={ink} fontSize="52" style={serif}>AI Act</text>
      <text x="18" y="150" fill={ink} fontSize="38" style={{ ...serif, fontStyle: 'italic' }}>&amp; DSA</text>
      {seats}
      <line x1="40" x2="260" y1="338" y2="338" stroke={ink} strokeOpacity="0.25" strokeWidth="0.6" />
      <text x="150" y="370" fill={ink} fontSize="8" style={mono} textAnchor="middle" opacity="0.7">ASSESSORIA POLÍTICA · REGULAÇÃO DIGITAL</text>
    </Frame>
  )
}

function Arquitetura() {
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
    <Frame ink={ink} label="PRODUTO · ARQUITETURA" year="2025/2026">
      <text x="18" y="88" fill={ink} fontSize="32" style={serif}>Gerir e</text>
      <text x="18" y="122" fill={ink} fontSize="32" style={{ ...serif, fontStyle: 'italic' }}>programar.</text>
      <text x="22" y="160" fill={ink} fontSize="6.5" style={mono} opacity="0.6">REDE PÚBLICA</text>
      <text x="278" y="160" fill={accent} fontSize="6.5" style={mono} textAnchor="end">REDE INTERNA</text>
      <line x1="150" y1="150" x2="150" y2="380" stroke={accent} strokeWidth="0.9" strokeDasharray="3 3" />
      {box(22, 172, 104, 'WEB', 'REACT · MOBILE')}
      {box(22, 262, 104, 'API', 'CONTAS · FILA')}
      {box(174, 262, 104, 'SERVIÇO', 'SÓ LIGA PARA FORA')}
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
      <text x="18" y="350" fill={ink} fontSize="7.5" style={mono}>2 SITES · 1 CMS · 1 APP</text>
      <text x="18" y="366" fill={ink} fontSize="7.5" style={mono} opacity="0.6">~10 000 PESSOAS</text>
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
  const ink = '#d7e5d0'
  const lines: [string, string][] = [
    ['$', 'claude'],
    ['>', 'desenha a fila com reentregas'],
    ['●', 'a ler apps/api/src/ponte.ts'],
    ['●', '39 testes a passar'],
    ['>', 'revê a fronteira de rede'],
    ['●', 'só liga para fora. ok'],
  ]
  return (
    <Frame ink={ink} label="CLAUDE CODE · AGENTES" year="2025/">
      <text x="18" y="88" fill={ink} fontSize="32" style={serif}>Eu decido,</text>
      <text x="18" y="124" fill={ink} fontSize="30" style={{ ...serif, fontStyle: 'italic' }}>eles escrevem.</text>
      {lines.map(([p, t], k) => (
        <text key={k} x="18" y={172 + k * 20} fill={p === '>' ? '#9fe0a8' : ink} fontSize="8.5" style={{ ...mono, letterSpacing: '0.02em' }} opacity={p === '●' ? 0.7 : 1}>
          {p}  {t}
        </text>
      ))}
      <rect x="18" y="292" width="6" height="10" fill="#9fe0a8">
        <animate attributeName="opacity" values="1;1;0;0" dur="1s" repeatCount="indefinite" />
      </rect>
      <image href={avatar} x="214" y="306" width="66" height="72.6" style={{ imageRendering: 'pixelated' }} />
      <text x="18" y="374" fill={ink} fontSize="7" style={mono} opacity="0.6">CIBER GONÇALO · ONLINE</text>
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
