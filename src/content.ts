import imgDiaspora from '../assets/diaspora.webp'
import imgNoesis from '../assets/noesis.webp'
import imgAct from '../assets/act-digital.webp'
import imgDiasporaLogo from '../assets/diaspora-logo.webp'
import imgParlamento from '../assets/parlamento.webp'
import imgProduto from '../assets/produto.webp'
import imgComunicador from '../assets/comunicador-mic.webp'
import imgVideoEditor from '../assets/video-editor.webp'
import imgVideo from '../assets/video.webp'
import imgEstrategia from '../assets/estrategia.webp'
import imgBojarda from '../assets/bojarda.webp'
import imgReel1 from '../assets/galeria-reel-1.webp'
import imgReel2 from '../assets/galeria-reel-2.webp'
import imgReel3 from '../assets/galeria-reel-3.webp'
import imgReel4 from '../assets/galeria-reel-4.webp'
import imgBojarda2 from '../assets/galeria-bojarda.webp'

// Conteúdo em português. A versão inglesa está em content.en.ts e é sobreposta a esta (ver i18n.ts).

export type Art = 'formacao' | 'pulso' | 'fluxo' | 'hemiciclo' | 'arquitetura' | 'reel' | 'terminal'
export type Lente = 'codigo' | 'camara' | 'causa' | 'vida'
// Animação da imagem (ver PlateFx.tsx e styles/fx.css)
export type Fx = 'kenburns' | 'float' | 'rings' | 'stars' | 'spin' | 'rec'

export type Plate = {
  slug: string
  era: string // faceta mostrada por cima das imagens, tal como está escrita
  year: number // ano em que a placa começa; o relógio interpola entre placas
  when: string
  title: string
  note: string
  tint: string
  dark?: boolean // fundo escuro: texto claro na arte e na página
  src?: string
  art?: Art
  fx?: Fx
  focus?: string
  lente: Lente
  page: {
    kicker: string
    heading: string
    lead: string
    stats?: { value: string; label: string }[]
    statsNote?: string
    sections: { title: string; items: string[] }[]
    tools?: string[]
    gallery?: { src: string; alt: string; wide?: boolean }[]
    links?: { label: string; href: string }[]
  }
  cg: {
    intro: string // quando a placa fica ao centro
    more: string // "Conta-me mais"
    context?: string // ao abrir a página
    qa: { q: string; a: string }[]
  }
}

export const PERSON = {
  name: 'Gonçalo Filipe',
  fullName: 'Gonçalo Pereira Marques Filipe',
  email: 'goncalo.p.m.filipe@gmail.com',
  linkedin: 'https://www.linkedin.com/in/goncalo-p-m-filipe',
  instagram: 'https://www.instagram.com/goncalopmfilipe/',
  tiktok: 'https://www.tiktok.com/@goncalopmfilipe',
  cv: { pt: './cv/CV_Goncalo_Filipe_PT.pdf', en: './cv/CV_Goncalo_Filipe_EN.pdf' },
}

export type Lentes = Record<Lente, { label: string; first: string; text: string }>

export const LENTES: Lentes = {
  codigo: {
    label: 'Código',
    first: 'noesis',
    text: 'Para o lado do código, começa na Noesis e segue até aos agentes de IA. São sete anos de OutSystems e um de TypeScript com assistentes de IA.',
  },
  camara: {
    label: 'Câmara',
    first: 'comunicador',
    text: 'Para o lado da câmara há duas seguidas: a minha conta e a edição de vídeo.',
  },
  causa: {
    label: 'Causa',
    first: 'parlamento',
    text: 'Para o lado da causa, começa no Parlamento Europeu. Depois vêm a estratégia organizativa e a Diáspora.',
  },
  vida: {
    label: 'Vida',
    first: 'bojarda',
    text: 'Fora do ecrã há música, desporto e festivais.',
  },
}

export const PLATES: Plate[] = [
  {
    slug: 'formacao',
    era: 'As minhas habilitações',
    year: 2012,
    when: '2012 a 2020',
    title: 'Dos computadores dos amigos à consultoria',
    note: 'Formação · Lisboa e Madrid',
    tint: '#e6e1d5',
    art: 'formacao',
    lente: 'codigo',
    page: {
      kicker: '2012 a 2020 · Formação',
      heading: 'Arranjava os computadores da malta, aprendi a programar e não parei de ser do IT.',
      lead: 'Comecei num curso profissional de Informática de Gestão, passei por um CTeSP em desenvolvimento para dispositivos móveis e acabei a licenciatura em Informática no ISTEC. Pelo meio houve um Erasmus em Madrid, uma startup e um part-time na Domino’s Pizza para pagar as contas.',
      stats: [
        { value: '3', label: 'certificações OutSystems' },
        { value: 'C1', label: 'inglês' },
      ],
      sections: [
        {
          title: 'Percurso',
          items: [
            '2012 a 2015: Curso Profissional de Informática de Gestão, na Escola Secundária Dr. António Carvalho Figueiredo. Visual Basic, Office avançado, economia e gestão.',
            '2015: estágio curricular de quatro meses na Câmara Municipal de Loures, a organizar dados e arquivo documental.',
            '2015 a 2017: CTeSP em Desenvolvimento de Dispositivos Móveis, no ISTEC. Android em Java, iOS em Swift, C#, redes, UI/UX, web e modelação 3D.',
            '2017: estágio Erasmus+ de três meses na Universidad Rey Juan Carlos, em Madrid, no departamento de informática, com projetos em Java e WordPress.',
            '2017: três meses na startup RightCo, também em Java e WordPress.',
            '2017 a 2020: licenciatura em Informática, no ISTEC. Redes, bases de dados, multimédia, Big Data e IoT, estatística, empreendedorismo e métodos de comunicação.',
          ],
        },
        {
          title: 'Certificações OutSystems',
          items: ['Associate Developer (O11)', 'Associate Traditional Web Developer (O11)', 'Mobile Developer Specialist (O11 e ODC)'],
        },
        { title: 'Línguas', items: ['Português, língua materna', 'Inglês, C1', 'Espanhol, A2'] },
      ],
      tools: ['Java', 'Swift', 'C#', 'Visual Basic', 'SQL', 'PHP', 'WordPress'],
    },
    cg: {
      intro: 'Aqui estão as origens: Visual Basic aos 15 anos, Java e Swift aos 18 e um Erasmus em Madrid pelo meio.',
      more: 'Na licenciatura havia uma cadeira de Métodos de Comunicação. Na altura parecia um extra. Hoje é metade do meu trabalho.',
      qa: [
        {
          q: 'Que certificações tens?',
          a: 'Três da OutSystems: Associate Developer e Associate Traditional Web Developer, as duas em O11, e Mobile Developer Specialist, em O11 e ODC.',
        },
        {
          q: 'O que fizeste em Madrid?',
          a: 'Um estágio Erasmus+ de três meses na Universidad Rey Juan Carlos, no departamento de informática. Trabalhei em projetos de Java e WordPress.',
        },
        {
          q: 'Que línguas falas?',
          a: 'Português é a minha língua materna. Inglês a nível C1, que usei durante anos em equipas Scrum multinacionais, e espanhol A2.',
        },
      ],
    },
  },
  {
    slug: 'noesis',
    era: 'Consultor',
    year: 2019,
    when: '2019 a 2020',
    title: 'Primeiros projetos em OutSystems',
    note: 'OutSystems · Noesis',
    tint: '#2a2622',
    dark: true,
    src: imgNoesis,
    fx: 'kenburns',
    lente: 'codigo',
    page: {
      kicker: 'Jan. 2019 a nov. 2020 · OutSystems Developer · Noesis',
      heading: 'A primeira consultora formou-me em OutSystems e Agile Scrum, e levou-me à saúde, ao retalho e ao património.',
      lead: 'Na Noesis desenvolvi aplicações Web e Mobile em OutSystems para três clientes. Trabalhei em equipas Agile e falei diretamente com os clientes nas fases de análise e de aceitação.',
      stats: [
        { value: '3', label: 'clientes: Medtronic, Worten e Parques de Sintra' },
        { value: '2', label: 'gerações de OutSystems: Traditional e Reactive' },
      ],
      sections: [
        {
          title: 'Medtronic · saúde',
          items: [
            'Participei na migração de Traditional para Reactive Web do portal de leitura de pacemakers e triagem de doentes.',
            'Integrei dados clínicos por REST, com JSON e OAuth, a partir dos sistemas internos de leitura da Medtronic.',
            'Fiz ecrãs novos, consultas à medida para dashboards e os relatórios automáticos enviados por email aos médicos.',
          ],
        },
        {
          title: 'Worten · retalho',
          items: ['App mobile em OutSystems, para iOS e Android, usada pelas equipas de loja na gestão diária.', 'Fiquei com as animações de front-end feitas à medida.'],
        },
        {
          title: 'Parques de Sintra · setor público',
          items: [
            'Sistema de bilheteira fechada, horários e lotação para os monumentos e museus de Sintra, em Traditional Web.',
            'Fiz do modelo de dados aos ecrãs públicos, incluindo a geração de bilhetes a partir dos dados do backoffice.',
          ],
        },
      ],
      tools: ['OutSystems 11', 'Traditional Web', 'Reactive Web', 'Mobile iOS/Android', 'REST', 'OAuth', 'SQL'],
    },
    cg: {
      intro: 'Primeira consultora: um portal para ler pacemakers, uma app para as lojas da Worten e a bilheteira dos monumentos de Sintra.',
      more: 'No portal da Medtronic os dados vinham de leituras de pacemakers e seguiam para médicos. Isso obriga a outro cuidado com validações e permissões.',
      qa: [
        {
          q: 'O que é migrar de Traditional para Reactive?',
          a: 'São duas gerações de interface do OutSystems. A Traditional Web gera as páginas no servidor; a Reactive corre no browser, em React. Migrar obriga a refazer ecrãs e lógica de cliente sem partir os dados nem as integrações.',
        },
        {
          q: 'O que fazias na app da Worten?',
          a: 'A app servia as equipas de loja na gestão diária, em iOS e Android. A minha parte mais visível foram as animações de front-end e o sistema de autorização de login.',
        },
        {
          q: 'Como era o contacto com os clientes?',
          a: 'Direto, nas fases de análise e nos testes de aceitação. Esclarecia dúvidas com quem ia usar a aplicação e acompanhava a validação, sempre em metodologia Agile.',
        },
      ],
    },
  },
  {
    slug: 'act-digital',
    era: 'consultor sénior',
    year: 2020,
    when: '2020 a 2025',
    title: 'Cinco anos na Alter Solutions / act digital',
    note: 'Senior OutSystems · act digital · Randstad',
    tint: '#a61c01',
    dark: true,
    src: imgAct,
    fx: 'float',
    lente: 'codigo',
    page: {
      kicker: 'Nov. 2020 a jun. 2025 · Senior OutSystems Developer · Alter Solutions / act digital · Randstad',
      heading: 'Aplicações para a Randstad e para os clientes dela, nas fábricas OutSystems de Portugal e internacionais.',
      lead: 'Na Alter Solutions, hoje act digital, fiz o ciclo completo de aplicações Reactive Web e Mobile em OutSystems 11, em equipas Scrum multinacionais. O cliente era a Randstad e os clientes dela nas telecomunicações e na energia, cobrindo os seus serviços de contact center.',
      stats: [
        { value: '5', label: 'anos no projeto Randstad' },
        { value: '3', label: 'apps na plataforma de Team Building: backoffice, web e mobile' },
      ],
      sections: [
        {
          title: 'Plataforma global de Team Building',
          items: [
            'Fui o developer principal.',
            'Backoffice web, app Reactive Web para os utilizadores e app Mobile.',
            'Autenticação OAuth, gestão de pontos e recompensas, multi-tenancy e deploy em vários ambientes.',
          ],
        },
        {
          title: 'Contact center para telecomunicações e energia',
          items: [
            'Registo de tempo de trabalho, registo de chamadas e integração com gravações de áudio.',
            'Formulários operacionais diários, processos em BPT, Timers e integração com bases de dados externas.',
          ],
        },
        {
          title: 'Cruzar vagas com trabalhadores',
          items: ['Ferramenta interna da Randstad que liga vagas de emprego a trabalhadores contratados, com polígonos no Google Maps.'],
        },
        {
          title: 'No dia a dia',
          items: [
            'Arquitetura e modelação de dados.',
            'Integrações REST com sistemas externos.',
            'Otimização de ecrãs e de consultas lentas, com Service Center e logs.',
            'Code review e garantia de qualidade em produção.',
          ],
        },
      ],
      tools: ['OutSystems 11', 'BPT', 'Timers', 'Multi-tenancy', 'OAuth', 'REST', 'Google Maps API', 'SQL avançado', 'LifeTime', 'Scrum'],
    },
    cg: {
      intro: 'Cinco anos na Randstad. Aprendi muito: discutir arquitetura, levantar requisitos, desenvolver funcionalidades sozinho.',
      more: 'Uma das peças mais curiosas desta fase: uma ferramenta que cruza vagas com trabalhadores usando polígonos no mapa. Um problema geográfico resolvido em low-code.',
      qa: [
        {
          q: 'Porquê o multi-tenancy?',
          a: 'Uma só aplicação a servir várias organizações ao mesmo tempo, cada uma com os seus dados separados. Devido à sua dimensão global, a Randstad precisava de áreas que só vissem o que é seu, com uma única base de código.',
        },
        {
          q: 'Porquê BPTs?',
          a: 'Business Process Technology, o motor de processos do OutSystems. Serve para fluxos longos, com passos humanos e automáticos, que podem durar dias. Usei-o em processos complexos do contact center.',
        },
        {
          q: 'Se és sénior, lidaste com performance?',
          a: 'Procurava os ecrãs e as consultas lentas no Service Center e nos logs, reescrevia as consultas e voltava a medir.',
        },
      ],
    },
  },
  {
    slug: 'diaspora',
    era: 'dirigente associativo',
    year: 2024,
    when: '2024 até hoje',
    title: 'Diáspora',
    note: 'Presidente · Associação Diáspora',
    tint: '#1d6f86',
    dark: true,
    src: imgDiasporaLogo,
    fx: 'rings',
    lente: 'causa',
    page: {
      kicker: 'Desde out. 2024 · Presidente da direção · Associação Cultural Raízes Com Rumo',
      heading: 'Uma associação para quem veio viver para Lisboa e fez dela casa.',
      lead: 'Sou presidente da direção da Associação Cultural Raízes Com Rumo, a Diáspora, criada em Lisboa em outubro de 2024. Trabalhamos a inclusão cultural e social de pessoas imigrantes com festas, concertos, dança e workshops.',
      stats: [
        { value: '2024', label: 'ano de fundação' },
        { value: '2 200', label: 'seguidores em @diasporalx' },
      ],
      sections: [
        {
          title: 'O que organizamos',
          items: ['Festa Raízes, Barulho Bom e Forró no Miradouro.', 'Workshops ao longo do ano.', 'Os eventos já juntaram centenas de pessoas.'],
        },
        {
          title: 'O que faço',
          items: [
            'Dirijo a associação com os outros 9 membros da direção e trato da gestão corrente: burocracia, contas, atas e comunicação.',
            'Fiz o site da associação, com área pública e backoffice, em Next.js, TypeScript e Prisma.',
          ],
        },
      ],
      gallery: [{ src: imgDiaspora, alt: 'Cartaz do Barulho Bom, com músicos num miradouro de Lisboa' }],
      tools: ['Produção de eventos', 'Gestão associativa', 'Instagram', 'Contabilidade empresarial'],
      links: [{ label: 'Instagram @diasporalx', href: 'https://www.instagram.com/diasporalx/' }],
    },
    cg: {
      intro: 'A Diáspora é a associação cultural a que presido. Festas, concertos e forró no miradouro, com e para quem veio de fora.',
      more: 'Também fiz o site da associação, com backoffice.',
      qa: [
        {
          q: 'Qual é o objetivo da associação?',
          a: 'Os estatutos dizem-no bem: inclusão cultural e social de pessoas imigrantes, com atividades culturais e suporte psicossocial. As festas são a porta de entrada.',
        },
        {
          q: 'Que tecnologia tem o site?',
          a: 'Next.js 16 com TypeScript e SQL, e um backoffice com autenticação onde a direção gere os conteúdos.',
        },
      ],
    },
  },
  {
    slug: 'parlamento',
    era: 'assessor político',
    year: 2025,
    when: '2025 a 2026',
    title: 'Assessoria política',
    note: 'Assessor político · Parlamento Europeu',
    tint: '#efe6c2',
    src: imgParlamento,
    fx: 'stars',
    lente: 'causa',
    page: {
      kicker: 'Desde jun. 2025 · Assistente local · Parlamento Europeu',
      heading: 'Assessoria política no Parlamento Europeu, com a regulação digital como especialidade e a gestão de redes sociais.',
      lead: 'Assessoria política em comunicação, redes sociais, inteligência artificial e regulação de plataformas digitais. Introduzi também a organização do trabalho da equipa em Agile.',
      stats: [
        { value: 'AI Act', label: 'regulamento europeu da inteligência artificial' },
        { value: 'DSA', label: 'Digital Services Act, as regras das plataformas' },
      ],
      sections: [
        {
          title: 'Assessoria política',
          items: [
            'AI Act: o regulamento que classifica os sistemas de IA por nível de risco.',
            'Digital Services Act: as responsabilidades das plataformas sobre o conteúdo que circula nelas.',
            'Acompanhei estes dossiês e traduzi-os em posições políticas e em conteúdo para o público.',
          ],
        },
        {
          title: 'Organização do gabinete',
          items: ['Gestão do trabalho da equipa com práticas Agile.', 'Gestão da comunicação em redes sociais.'],
        },
      ],
      tools: ['AI Act', 'Digital Services Act', 'Regulação de plataformas', 'Agile', 'Jira', 'CapCut'],
    },
    cg: {
      intro: 'Em 2025, uma mudança: estou no Parlamento Europeu. A minha especialidade é a regulação digital, com o AI Act e o Digital Services Act, e a minha função é a gestão de redes sociais.',
      more: 'É aqui que tudo o resto se cruza: percebo o código que as leis querem regular e sei explicá-lo em 40 segundos num Reel.',
      qa: [
        {
          q: 'O que é o AI Act?',
          a: 'O regulamento europeu sobre inteligência artificial. Classifica os sistemas por nível de risco e impõe obrigações a quem os desenvolve e usa. Os usos de risco inaceitável ficam proibidos.',
        },
        {
          q: 'E o Digital Services Act?',
          a: 'Define as responsabilidades das plataformas online: conteúdo ilegal, transparência dos algoritmos de recomendação e da publicidade. As plataformas muito grandes têm regras mais apertadas.',
        },
        {
          q: 'Porque é que um programador faz assessoria política?',
          a: 'Porque muita da política que vai mexer na vida das pessoas é escrita sobre tecnologia. Ajuda ter na sala alguém que já fez integrações OAuth e sabe o que um algoritmo de recomendação faz.',
        },
      ],
    },
  },
  {
    slug: 'produto',
    era: 'gestor de produto',
    year: 2025,
    when: 'Desde 2025',
    title: 'Gestor de infraestrutura digital',
    note: 'Gestor de produto e developer de uma organização política de 10 mil pessoas',
    tint: '#f5f2e9',
    src: imgProduto,
    fx: 'spin',
    lente: 'codigo',
    page: {
      kicker: 'Desde 2025 · Project Manager, Product Manager e developer',
      heading: 'Gestão de produto com as mãos no código.',
      lead: 'Para uma organização política com cerca de 10 000 pessoas, faço gestão de produto e desenvolvimento ao mesmo tempo. Levanto requisitos com quem não é técnico, desenho a solução, programo, ponho em produção e mantenho a infraestrutura de forma voluntária.',
      stats: [
        { value: '~10 000', label: 'pessoas na organização' },
        { value: '5', label: 'apps institucionais e um CMS open source de governança interna' },
        { value: '5', label: 'contentores em Docker, a base desta estrutura em servidores próprios' },
      ],
      sections: [
        {
          title: 'App de militância · beta em outubro de 2026',
          items: [
            'Feed, agenda, área pessoal com quotas e pagamentos, e um backoffice para organizadores com papéis e aprovação de eventos.',
            'Pensada primeiro para o telemóvel, a correr no browser.',
            'Uma regra de segurança no centro do desenho: a app nunca escreve na plataforma interna e nada de fora entra na rede interna. Um serviço interno vai buscar o trabalho a uma fila e devolve os resultados.',
            'Fila com estados, contagem de tentativas e reentrega depois de timeout.',
            'Testes de ponta a ponta, da interface à plataforma simulada, incluindo as regras de permissões.',
          ],
        },
      ],
      tools: ['Directus', 'Docker', 'TypeScript', 'React', 'Bun', 'zod', 'Tailwind', 'Next.js', 'SQLite', 'Gestão de stakeholders'],
    },
    cg: {
      intro: 'Aqui sou gestor de produto e programador ao mesmo tempo. Dois sites, um CMS em Docker e uma app em beta.',
      more: 'A decisão de arquitetura de que mais gosto: o serviço interno só faz ligações para fora. Se a app pública cair ou for atacada, a rede interna continua fechada.',
      qa: [
        {
          q: 'Porquê um CMS headless e open source?',
          a: 'Separa os conteúdos da apresentação. A equipa edita num só sítio e os sites, a app ou uma newsletter vão buscar o mesmo conteúdo por API. Tudo numa lógica de código aberto e mantido pela comunidade.',
        },
        {
          q: 'Como geres e programas ao mesmo tempo?',
          a: 'Com um backlog curto e visível, entregas pequenas e muito contacto com quem vai usar. Os agentes de IA escrevem parte do código; eu decido a arquitetura e reviso.',
        },
        {
          q: 'Porque é que há uma fila?',
          a: 'O serviço interno não pode receber ligações de fora. Por isso é ele que vai à API buscar as operações, executa-as na plataforma e devolve o resultado. Se estiver desligado, os pedidos ficam «a processar» até voltar.',
        },
      ],
    },
  },
  {
    slug: 'comunicador',
    era: 'comunicador',
    year: 2025,
    when: 'Instagram e TikTok',
    title: '36 mil pessoas seguem parte do que sou',
    note: 'Comunicador · @goncalopmfilipe',
    tint: '#2b2a33',
    dark: true,
    src: imgComunicador,
    fx: 'rec',
    lente: 'camara',
    page: {
      kicker: 'Comunicador · @goncalopmfilipe',
      heading: 'Comentário político em voz própria, opiniões sobre o nosso tempo.',
      lead: 'Nas minhas contas de Instagram e TikTok explico leis, custo de vida, habitação, salários e questões culturais em Reels curtos, com fontes e de forma apelativa. Falo para quem sente a vida a apertar e quer perceber quem decide e quem ganha com isso.',
      stats: [
        { value: '24,5 mil', label: 'seguidores no Instagram' },
        { value: '12 mil', label: 'seguidores no TikTok' },
        { value: '4,3 M', label: 'visualizações nos últimos 3 meses (Instagram)' },
        { value: '901 mil', label: 'contas alcançadas nos últimos 3 meses (Instagram)' },
        { value: '157', label: 'Reels publicados' },
      ],
      statsNote: 'Dados da API do Instagram a 11 de novembro de 2026.',
      sections: [
        {
          title: 'Como trabalho',
          items: [
            'Um tema por vídeo, 30 a 45 segundos, e o gancho logo na primeira frase.',
            'Leio a lei ou a medida ao pormenor e digo quem ganha e quem perde.',
            'Nenhum número sem fonte: as fontes vão na legenda ou no ecrã.',
            'Guião, gravação e edição feitos por mim.',
          ],
        },
        {
          title: 'De onde vem mais conteúdo',
          items: ['Comentário em painéis de televisão.', 'Transmissão de informação de ativismo na rua.'],
        },
      ],
      gallery: [
        { src: imgReel1, alt: 'Gonçalo a falar para a câmara num Reel, com microfone de lapela na mão' },
        { src: imgReel4, alt: 'Gonçalo num Reel gravado em casa, com plantas ao fundo' },
      ],
      tools: ['Guião', 'Apresentação', 'CapCut', 'Remotion', 'Instagram', 'TikTok'],
      links: [
        { label: 'Instagram @goncalopmfilipe', href: 'https://www.instagram.com/goncalopmfilipe/' },
        { label: 'TikTok @goncalopmfilipe', href: 'https://www.tiktok.com/@goncalopmfilipe' },
      ],
    },
    cg: {
      intro: '36 mil seguidores somados e mais de 8 milhões de visualizações desde que comecei a fazer comunicação política no Instagram.',
      more: 'Os Reels que chegam mais longe falam de bolso e de poder. O meu público parece gostar de opiniões fundamentadas com dados e de retratos reais da minha atividade política.',
      qa: [
        {
          q: 'Como escolhes os temas?',
          a: 'Pela vida material de quem tem entre 18 e 40 anos: renda, salário, precariedade, transportes. Se uma medida mexe nisso, merece um vídeo.',
        },
        {
          q: 'Porquê sempre fontes?',
          a: 'Porque uma posição forte não dispensa rigor. E em tempos em que a mentira viaja rápido, dizer a verdade de forma apelativa é uma marca que pretendo manter.',
        },
        {
          q: 'Fazes tudo sozinho?',
          a: 'Guião, gravação e edição, sim. Até as ferramentas de análise da conta fui eu que as fiz.',
        },
      ],
    },
  },
  {
    slug: 'video',
    era: 'editor de vídeo',
    year: 2025,
    when: 'Desde 2022',
    title: 'Edição de vídeo',
    note: 'Editor de vídeo · CapCut e Remotion',
    tint: '#a08cf9',
    dark: true,
    src: imgVideoEditor,
    fx: 'float',
    lente: 'camara',
    page: {
      kicker: 'Editor de vídeo · CapCut e Remotion',
      heading: 'Edito vídeo à mão e com código.',
      lead: 'Uso o CapCut para o ritmo e o Remotion, que é React, para tudo o que dá para programar: legendas, cartões com dados, inserções de notícias e animações sincronizadas com a fala.',
      stats: [{ value: '+150', label: 'projetos de vídeo no CapCut' }],
      sections: [
        {
          title: 'Formatos',
          items: [
            'Yapper: pego no telemóvel e dou uma opinião. Algo que me está na cabeça e pode gerar reflexões saudáveis.',
            'Vídeo caseiro com teleponto. É verdade. As pessoas pesquisam e escrevem conteúdo se o tema precisar desse cuidado. Ou pelo menos, eu faço-o.',
            'Vox pop: passar o microfone pode ser útil para o debate. E atrativo para as redes.',
            'Vídeos de apresentação sincronizados com música para a Bojarda.',
          ],
        },
        {
          title: 'Onde o Remotion (com o Claude) é útil',
          items: [
            'Legendas a partir de transcrição automática com Whisper.',
            'Num podcast, separei automaticamente as vozes de cada orador e gerei os cortes a partir daí. Editei em 10 minutos o que demoraria horas.',
          ],
        },
      ],
      gallery: [
        { src: imgVideo, alt: 'Fotograma de um Reel editado, com legenda e uma notícia inserida em cima' },
        { src: imgReel2, alt: 'Fotograma de um Reel com a legenda «o que está»' },
        { src: imgReel3, alt: 'Fotograma de um Reel com um círculo vermelho animado' },
      ],
      tools: ['CapCut', 'Remotion', 'React', 'whisper.cpp', 'ffmpeg'],
    },
    cg: {
      intro: 'Também estou nas redes como criador de conteúdo e edito os meus vídeos. Às vezes no CapCut, às vezes em React, com o Remotion.',
      more: 'No vídeo «Cantona» projetei animações numa folha de caderno que se mexe na mão. Os cantos da folha foram seguidos fotograma a fotograma com OpenCV.',
      qa: [
        {
          q: 'O que é o Remotion?',
          a: 'Uma biblioteca para fazer vídeo com React. Cada fotograma é um componente, por isso legendas, gráficos e animações saem de dados e de código.',
        },
        {
          q: 'Porquê programar vídeo?',
          a: 'Há trabalho que se repete em todos os vídeos: legendas, cartões, fontes no ecrã. Programado uma vez, fica feito para os próximos, e poupa-me tempo para outras coisas.',
        },
        {
          q: 'Para quem editas?',
          a: 'Para a minha conta. Mas editei para o gabinete no Parlamento Europeu durante um ano, e também para a Diáspora e para a Bojarda.',
        },
      ],
    },
  },
  {
    slug: 'ia',
    era: 'programar com IA',
    year: 2026,
    when: '2025 até hoje',
    title: 'Ser um consultor autónomo no século XXI',
    note: 'Engenharia com IA · Claude Code · LLMs abertos',
    tint: '#141915',
    dark: true,
    art: 'terminal',
    lente: 'codigo',
    page: {
      kicker: 'Desde 2025 · Desenvolvimento full-stack assistido por IA',
      heading: 'Os desafios técnicos são ultrapassados mais rapidamente. Fica o espaço para a criatividade.',
      lead: 'Construo aplicações completas com o Claude Code. Eu decido a arquitetura, escrevo as regras e revejo. Este site foi feito assim.',
      stats: [
        { value: '14', label: 'projetos com o Claude Code desde maio de 2026' },
        { value: '1 700', label: 'ações registadas dos agentes, de maio a outubro' },
      ],
      sections: [
        {
          title: 'Alguns projetos',
          items: [
            'Portal Docker: gestão de um servidor interno, com diagnóstico por scripts e um assistente de IA que só propõe alterações. Nada corre sem confirmação escrita e os dados pessoais saem antes de qualquer envio a um fornecedor de IA.',
            'Central Claude: um painel local para ver e mudar toda a configuração do Claude Code e do Claude Desktop.',
            'Fora da Bolha: análise de contas de Instagram com classificação de comentários e diagnósticos por IA.',
          ],
        },
        {
          title: 'Como trabalho com agentes',
          items: [
            'Um CLAUDE.md por projeto, com as regras e as fronteiras entre módulos.',
            'Subagentes próprios, por exemplo um revisor que só pode ler.',
            'Revisão visual com Playwright e demos gravadas automaticamente.',
            'Fornecedor de IA intercambiável: API da Anthropic, serviços compatíveis ou modelos locais.',
          ],
        },
      ],
      tools: ['Claude Code', 'API da Anthropic', 'TypeScript', 'Bun', 'Node.js', 'Phaser', 'Playwright', 'Docker', 'Python'],
    },
    cg: {
      intro: 'Construo software com assistentes de IA: eu decido, eles escrevem, eu revejo e direciono.',
      more: 'Há vários projetos que desenvolvo pro bono e outros que desenvolvo antes de receber qualquer remuneração por eles.',
      qa: [
        {
          q: 'Isso não é batota?',
          a: 'É ferramenta. As decisões difíceis continuam a ser minhas: onde passa a fronteira de segurança, o que fica em fila, o que se testa. O assistente acelera a escrita; a responsabilidade é minha.',
        },
        {
          q: 'Tu és uma IA?',
          a: 'Não. Sou um avatar com respostas escritas pelo Gonçalo. Nada do que fazes nesta página é enviado para lado nenhum.',
        },
        {
          q: 'Que modelos usas?',
          a: 'Sobretudo Claude, pelo Claude Code e pela API.',
        },
      ],
    },
  },
  {
    slug: 'estrategia',
    era: 'organizador',
    year: 2026,
    when: '2022 até hoje',
    title: 'Organizar a rua',
    note: 'Estratégia organizativa',
    tint: '#c9cbc3',
    src: imgEstrategia,
    focus: '50% 30%',
    lente: 'causa',
    page: {
      kicker: 'Estratégia organizativa',
      heading: 'Análise política acertada e capacidade de construir ferramentas úteis.',
      lead: 'Penso uma organização com a mesma procura pela big picture com que penso um produto: qual é o objetivo, quais são as minhas ferramentas, como organizar o coletivo em torno de um objetivo. Já construí toda a estrutura digital para uma organização política. Estou presente na construção de soluções coletivas em lutas por justiça social.',
      sections: [
        {
          title: 'Estrutura digital',
          items: [
            'Desenvolvi toda a estrutura digital para uma organização política: diagnóstico, arquitetura, desenvolvimento por fases e gestão de programadores voluntários.',
            'Composição: gestão de governança interna para dirigentes, autogestão para membros e mobilização para simpatizantes.',
            'Princípios: abertura a quem não é filiado, descentralização, integração entre ferramentas, automatização da burocracia e segurança por papel.',
            'Estudei exemplos europeus: Action Populaire, Zetkin e Participa.',
            'Existe uma separação técnica e assíncrona entre as aplicações de governança interna e as aplicações abertas ao público.',
          ],
        },
        {
          title: 'Na rua',
          items: [
            'Manifestações pela habitação e organização popular para o empoderamento político de comunidades.',
            'Comunicação e participação na disputa da narrativa política nacional.',
          ],
        },
      ],
      tools: ['Diagnóstico organizacional', 'Desenho de processos', 'Papéis e permissões', 'Análise política', 'Mobilização'],
    },
    cg: {
      intro: 'A causa. O ativismo também desafia competências organizativas: onde é que as pessoas desistem, como se abrem portas, a arte de convencer.',
      more: 'Numa organização política, cada passo burocrático a mais é alguém que não volta. Uma organização que sabe acolher com boas ferramentas é uma boa notícia para a democracia.',
      qa: [
        {
          q: 'Que aplicações desenvolveste?',
          a: 'Ferramentas de gestão interna para dirigentes e organizadores; ferramentas de autogestão para todos os membros; e ferramentas de mobilização abertas a simpatizantes e a quem ainda pode vir a sê-lo.',
        },
        {
          q: 'Porquê tecnologia na política e no ativismo?',
          a: 'Porque a participação baixa tem causas concretas: adesões longas e em papel, canais espalhados com pouca capacidade de gestão e pouca autonomia local. A tecnologia tira obstáculos do caminho para que as pessoas possam fazer política e exercer participação democrática.',
        },
        {
          q: 'Também vais à rua?',
          a: 'Vou. Esta foto foi tirada numa acampada pela habitação, no Rossio.',
        },
      ],
    },
  },
  {
    slug: 'bojarda',
    era: 'DJ',
    year: 2026,
    when: '2026',
    title: 'Bojarda',
    note: 'Música e performance · DJ',
    tint: '#140b0b',
    dark: true,
    src: imgBojarda,
    focus: '50% 18%',
    lente: 'vida',
    page: {
      kicker: 'Há que partir tudo às vezes.',
      heading: 'Música, desporto e festivais.',
      lead: 'A vida não pode ser só trabalho, né?',
      sections: [
        {
          title: 'Bojarda',
          items: ['Projeto de DJ com festas próprias.', 'Os teasers em vídeo também são meus, feitos em Remotion.'],
        },
      ],
      gallery: [{ src: imgBojarda2, alt: 'Cabine de DJ da Bojarda iluminada a vermelho, com o letreiro BOJARDA ao fundo' }],
    },
    cg: {
      intro: 'BOJARDA. Passo música e faço festas.',
      more: 'Também joguei andebol e futebol federado. Trabalho de equipa aprende-se melhor num campo do que numa retrospetiva de sprint.',
      qa: [
        {
          q: 'Quem fez o teaser?',
          a: 'Eu, em Remotion: 15 segundos de cortes rápidos, quase tudo com os DJs e um pouco de público e luzes.',
        },
        {
          q: 'E o desporto?',
          a: 'Joguei andebol e futebol. É de lá que vem muito do que sei sobre trabalho de equipa e sobre lidar com a pressão.',
        },
      ],
    },
  },
]

export const N = PLATES.length
export const indexOf = (slug: string) => PLATES.findIndex((p) => p.slug === slug)
