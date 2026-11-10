import imgDiaspora from '../assets/diaspora.webp'
import imgComunicador from '../assets/comunicador.webp'
import imgVideo from '../assets/video.webp'
import imgEstrategia from '../assets/estrategia.webp'
import imgBojarda from '../assets/bojarda.webp'
import imgReel1 from '../assets/galeria-reel-1.webp'
import imgReel2 from '../assets/galeria-reel-2.webp'
import imgReel3 from '../assets/galeria-reel-3.webp'
import imgReel4 from '../assets/galeria-reel-4.webp'
import imgBojarda2 from '../assets/galeria-bojarda.webp'
import imgForaDaBolha from '../assets/galeria-fora-da-bolha.webp'

export type Art = 'formacao' | 'pulso' | 'fluxo' | 'hemiciclo' | 'arquitetura' | 'reel' | 'terminal'
export type Lente = 'codigo' | 'camara' | 'causa' | 'vida'

export type Plate = {
  slug: string
  era: string // faceta mostrada por cima das imagens: «Era …»
  year: number // ano em que a placa começa; o relógio interpola entre placas
  when: string
  title: string
  note: string
  tint: string
  dark?: boolean // fundo escuro: texto claro na arte e na página
  src?: string
  art?: Art
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
  cvPt: './cv/CV_Goncalo_Filipe_PT.pdf',
  cvEn: './cv/CV_Goncalo_Filipe_EN.pdf',
}

export const LENTES: Record<Lente, { label: string; first: string; text: string }> = {
  codigo: {
    label: 'Código',
    first: 'noesis',
    text: 'Para o lado do código, começa na Noesis e segue até aos agentes de IA. São sete anos de OutSystems e um de TypeScript com agentes.',
  },
  camara: {
    label: 'Câmara',
    first: 'comunicador',
    text: 'Para o lado da câmara há três seguidas: a minha conta, a assessoria de comunicação e a edição de vídeo.',
  },
  causa: {
    label: 'Causa',
    first: 'parlamento',
    text: 'Para o lado da causa, começa no Parlamento Europeu. Depois vêm a estratégia organizativa e a Diáspora.',
  },
  vida: {
    label: 'Vida',
    first: 'bojarda',
    text: 'Fora do ecrã há música, andebol e livros.',
  },
}

export const PLATES: Plate[] = [
  {
    slug: 'formacao',
    era: 'Era estudante',
    year: 2012,
    when: '2012 a 2020',
    title: 'Do Visual Basic ao Swift',
    note: 'Formação · Lisboa e Madrid',
    tint: '#e6e1d5',
    art: 'formacao',
    lente: 'codigo',
    page: {
      kicker: '2012 a 2020 · Formação',
      heading: 'Aprendi a programar no secundário e nunca mais parei.',
      lead: 'Comecei num curso profissional de Informática de Gestão, passei por um CTeSP em desenvolvimento para dispositivos móveis e acabei a licenciatura em Informática no ISTEC. Pelo meio houve um Erasmus em Madrid, uma startup e um part-time na Domino’s para pagar as contas.',
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
      intro: 'Aqui estão as origens: Visual Basic aos 15 anos, Swift aos 18 e um Erasmus em Madrid pelo meio.',
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
    era: 'Era consultor',
    year: 2019,
    when: '2019 a 2020',
    title: 'Pacemakers, bilhetes e lojas',
    note: 'OutSystems · Noesis',
    tint: '#1f2726',
    dark: true,
    art: 'pulso',
    lente: 'codigo',
    page: {
      kicker: 'Jan. 2019 a nov. 2020 · OutSystems Developer · Noesis',
      heading: 'O primeiro emprego levou-me à saúde, ao retalho e ao património.',
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
          items: [
            'App mobile em OutSystems, para iOS e Android, usada pelas equipas de loja na gestão diária.',
            'Fiquei com as animações de front-end feitas à medida.',
          ],
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
      intro: 'Primeiro emprego: um portal para ler pacemakers, uma app para as lojas da Worten e a bilheteira dos monumentos de Sintra.',
      more: 'No portal da Medtronic os dados vinham de leituras de pacemakers e seguiam para médicos. Isso obriga a outro cuidado com validações e permissões.',
      qa: [
        {
          q: 'O que é migrar de Traditional para Reactive?',
          a: 'São duas gerações de interface do OutSystems. A Traditional Web gera as páginas no servidor; a Reactive corre no browser, em React. Migrar obriga a refazer ecrãs e lógica de cliente sem partir os dados nem as integrações.',
        },
        {
          q: 'O que fazias na app da Worten?',
          a: 'A app servia as equipas de loja na gestão diária, em iOS e Android. A minha parte mais visível foram as animações de front-end feitas à medida.',
        },
        {
          q: 'Como era o contacto com os clientes?',
          a: 'Direto, nas fases de análise e nos testes de aceitação. Esclarecia dúvidas com quem ia usar a aplicação e acompanhava a validação.',
        },
      ],
    },
  },
  {
    slug: 'act-digital',
    era: 'Era consultor sénior',
    year: 2020,
    when: '2020 a 2025',
    title: 'Quatro anos e meio na Randstad',
    note: 'Senior OutSystems · act digital',
    tint: '#dcd7cb',
    art: 'fluxo',
    lente: 'codigo',
    page: {
      kicker: 'Nov. 2020 a jun. 2025 · Senior OutSystems Developer · Alter Solutions / act digital',
      heading: 'Aplicações para a Randstad e para os clientes dela, do modelo de dados à produção.',
      lead: 'Na Alter Solutions, hoje act digital, fiz o ciclo completo de aplicações Reactive Web e Mobile em OutSystems 11, em equipas Scrum multinacionais. O cliente era a Randstad e os clientes dela nas telecomunicações e na energia.',
      stats: [
        { value: '4,5', label: 'anos no projeto Randstad' },
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
      intro: 'Quatro anos e meio na Randstad. Aqui fui developer principal de uma plataforma global de team building.',
      more: 'Uma das peças mais curiosas desta fase: uma ferramenta que cruza vagas com trabalhadores usando polígonos no mapa. Um problema geográfico resolvido em low-code.',
      qa: [
        {
          q: 'O que é multi-tenancy?',
          a: 'Uma só aplicação a servir várias organizações ao mesmo tempo, cada uma com os seus dados separados. Cada organização vê só o que é seu, e eu mantenho uma única base de código.',
        },
        {
          q: 'O que é BPT?',
          a: 'Business Process Technology, o motor de processos do OutSystems. Serve para fluxos longos, com passos humanos e automáticos, que podem durar dias. Usei-o nos processos do contact center.',
        },
        {
          q: 'Como tratavas a performance?',
          a: 'Procurava os ecrãs e as consultas lentas no Service Center e nos logs, reescrevia as consultas e voltava a medir.',
        },
      ],
    },
  },
  {
    slug: 'diaspora',
    era: 'Era dirigente associativo',
    year: 2024,
    when: '2024 até hoje',
    title: 'Raízes com rumo',
    note: 'Presidente · Associação Diáspora',
    tint: '#1d6f86',
    dark: true,
    src: imgDiaspora,
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
            'Dirijo a associação com os outros dois membros da direção e trato da gestão corrente: burocracia, contas, atas e comunicação.',
            'Fiz o site da associação, com área pública e backoffice, em Next.js, TypeScript e Prisma.',
          ],
        },
        {
          title: 'Rádio',
          items: [
            'Propus à Rádio Movimento PT o programa Raízes: quinzenal, em direto, com conversas com imigrantes e descendentes que criam projetos, negócios e comunidade em Lisboa.',
            'Apresentado por mim e pela María Molina, também da direção.',
          ],
        },
      ],
      tools: ['Produção de eventos', 'Gestão associativa', 'Next.js', 'TypeScript', 'Prisma', 'Instagram'],
      links: [{ label: 'Instagram @diasporalx', href: 'https://www.instagram.com/diasporalx/' }],
    },
    cg: {
      intro: 'A Diáspora é a associação cultural a que presido. Festas, concertos e forró no miradouro, com e para quem veio de fora.',
      more: 'Também fiz o site da associação, com backoffice. E propus um programa de rádio, o Raízes, para dar voz a quem constrói a comunidade.',
      qa: [
        {
          q: 'Qual é o objetivo da associação?',
          a: 'Os estatutos dizem-no bem: inclusão cultural e social de pessoas imigrantes, com atividades culturais e suporte psicossocial. As festas são a porta de entrada.',
        },
        {
          q: 'Como seria o programa de rádio?',
          a: 'Cinquenta minutos, de quinze em quinze dias, em direto na internet. Uma conversa longa com o convidado, a rubrica «Uma música, uma origem», a agenda cultural da cidade e respostas a quem comentou.',
        },
        {
          q: 'Que tecnologia tem o site?',
          a: 'Next.js 16 com TypeScript e Prisma, e um backoffice com autenticação onde a direção gere os conteúdos.',
        },
      ],
    },
  },
  {
    slug: 'parlamento',
    era: 'Era assessor político',
    year: 2025,
    when: '2025 até hoje',
    title: 'IA e plataformas na lei europeia',
    note: 'Assessor político · Parlamento Europeu',
    tint: '#23293a',
    dark: true,
    art: 'hemiciclo',
    lente: 'causa',
    page: {
      kicker: 'Desde jun. 2025 · Assistente parlamentar · Parlamento Europeu',
      heading: 'Assessoria política no Parlamento Europeu, com a regulação digital como especialidade.',
      lead: 'Desde junho de 2025 trabalho num gabinete do Parlamento Europeu. Faço assessoria política em inteligência artificial e regulação de plataformas digitais, giro as redes sociais do gabinete e organizo o trabalho da equipa em Agile.',
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
            'Acompanho estes dossiês e traduzo-os em posições políticas e em conteúdo para o público.',
          ],
        },
        {
          title: 'Organização do gabinete',
          items: [
            'Gestão do trabalho da equipa com práticas Agile.',
            'Ponte entre a parte política e a parte técnica: sites, CMS e redes sociais.',
          ],
        },
        {
          title: 'Onde isto se liga ao resto',
          items: [
            'A gestão de produto e o desenvolvimento estão em «Dois sites, um CMS e uma app».',
            'As redes e os vídeos estão em «A voz de um gabinete».',
          ],
        },
      ],
      tools: ['AI Act', 'Digital Services Act', 'Regulação de plataformas', 'Agile', 'Jira'],
    },
    cg: {
      intro: 'Desde 2025 estou no Parlamento Europeu. A minha especialidade é a regulação digital: AI Act e Digital Services Act.',
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
    era: 'Era gestor de produto',
    year: 2025,
    when: '2025 até hoje',
    title: 'Dois sites, um CMS e uma app',
    note: 'Gestor de produto e developer',
    tint: '#e8e4da',
    art: 'arquitetura',
    lente: 'codigo',
    page: {
      kicker: 'Desde 2025 · Project Manager, Product Manager e developer',
      heading: 'Gestão de produto com as mãos no código.',
      lead: 'Para uma organização política com cerca de 10 000 pessoas, faço gestão de produto e desenvolvimento ao mesmo tempo. Levanto requisitos com quem não é técnico, desenho a solução, programo, ponho em produção e mantenho a infraestrutura.',
      stats: [
        { value: '~10 000', label: 'pessoas na organização' },
        { value: '2 + 1', label: 'sites institucionais e um CMS headless' },
        { value: '39', label: 'testes de ponta a ponta na app' },
      ],
      sections: [
        {
          title: 'Sites e CMS',
          items: [
            'Dois sites institucionais e um CMS headless em Directus, a correr em Docker.',
            'Defini os modelos de conteúdo, os papéis de utilizador e as regras de governação.',
            'Extensões do Directus para recibos em PDF em lote, validação de listas e o fluxo mensal de recibos.',
          ],
        },
        {
          title: 'App de militância · beta em outubro de 2026',
          items: [
            'Feed, agenda, área pessoal com quotas e pagamentos, e um backoffice para organizadores com papéis e aprovação de eventos.',
            'Pensada primeiro para o telemóvel, a correr no browser.',
            'Uma regra de segurança no centro do desenho: a app nunca escreve na plataforma interna e nada de fora entra na rede interna. Um serviço interno vai buscar o trabalho a uma fila e devolve os resultados.',
            'Fila com estados, contagem de tentativas e reentrega depois de timeout.',
            '39 testes de ponta a ponta, da interface à plataforma simulada, incluindo as regras de permissões.',
          ],
        },
        {
          title: 'Outros projetos',
          items: ['Site de uma candidatura presidencial em 2026, com recolha de assinaturas e de voluntários.'],
        },
      ],
      tools: ['Directus', 'Docker', 'Caddy', 'TypeScript', 'React', 'Bun', 'Hono', 'zod', 'Tailwind', 'Next.js', 'SQLite', 'Gestão de stakeholders'],
    },
    cg: {
      intro: 'Aqui sou gestor de produto e programador ao mesmo tempo. Dois sites, um CMS em Docker e uma app em beta.',
      more: 'A decisão de arquitetura de que mais gosto: o serviço interno só faz ligações para fora. Se a app pública cair ou for atacada, a rede interna continua fechada.',
      qa: [
        {
          q: 'Porquê um CMS headless?',
          a: 'Separa os conteúdos da apresentação. A equipa edita num só sítio e os sites, a app ou uma newsletter vão buscar o mesmo conteúdo por API.',
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
    era: 'Era comunicador',
    year: 2025,
    when: 'Instagram, televisão e rádio',
    title: '19 mil pessoas do outro lado',
    note: 'Comunicador · @goncalopmfilipe',
    tint: '#2b2a33',
    dark: true,
    src: imgComunicador,
    lente: 'camara',
    page: {
      kicker: 'Comunicador · @goncalopmfilipe',
      heading: 'Comentário político em voz própria, direto para a câmara.',
      lead: 'Na minha conta de Instagram explico leis, custo de vida, habitação e salários em Reels curtos, com as fontes na legenda. Falo para quem sente a vida a apertar e quer perceber quem decide e quem ganha com isso.',
      stats: [
        { value: '19 mil', label: 'seguidores' },
        { value: '5,8 M', label: 'visualizações nos últimos 12 meses' },
        { value: '224 mil', label: 'contas alcançadas pelo Reel mais visto' },
        { value: '150', label: 'Reels publicados' },
      ],
      statsNote: 'Dados da API do Instagram a 30 de outubro de 2026.',
      sections: [
        {
          title: 'Como trabalho',
          items: [
            'Um tema por vídeo, 30 a 45 segundos, e o gancho logo na primeira frase.',
            'Leio a lei ou a medida ao pormenor e digo quem ganha e quem perde.',
            'Nenhum número sem fonte: as fontes vão na legenda.',
            'Guião, gravação e edição feitos por mim.',
          ],
        },
        {
          title: 'Onde mais',
          items: ['Comentário em painéis de televisão.', 'A proposta de um programa de rádio quinzenal, o Raízes, com a Diáspora.'],
        },
      ],
      gallery: [
        { src: imgReel1, alt: 'Gonçalo a falar para a câmara num Reel, com microfone de lapela na mão' },
        { src: imgReel4, alt: 'Gonçalo num Reel gravado em casa, com plantas ao fundo' },
      ],
      tools: ['Guião', 'Apresentação', 'CapCut', 'Remotion', 'Instagram'],
      links: [{ label: 'Instagram @goncalopmfilipe', href: 'https://www.instagram.com/goncalopmfilipe/' }],
    },
    cg: {
      intro: 'Este sou eu em modo câmara: 19 mil seguidores e quase 6 milhões de visualizações num ano, a explicar política sem jargão.',
      more: 'Os Reels que chegam mais longe falam de bolso e de poder. Um apoio com limite de património de 16 mil euros, a elite económica nos corredores do poder.',
      qa: [
        {
          q: 'Como escolhes os temas?',
          a: 'Pela vida material de quem tem entre 18 e 30 anos: renda, salário, precariedade, transportes. Se uma medida mexe nisso, merece um vídeo.',
        },
        {
          q: 'Porquê sempre fontes?',
          a: 'Porque uma posição forte não dispensa rigor. E dá credibilidade: quem discorda pode ir verificar.',
        },
        {
          q: 'Fazes tudo sozinho?',
          a: 'Guião, gravação e edição, sim. Até as ferramentas de análise da conta fui eu que as fiz.',
        },
      ],
    },
  },
  {
    slug: 'assessoria',
    era: 'Era assessor de comunicação',
    year: 2025,
    when: '2025 até hoje',
    title: 'A voz de um gabinete',
    note: 'Assessor de comunicação',
    tint: '#d8c7ad',
    art: 'reel',
    lente: 'camara',
    page: {
      kicker: 'Desde 2025 · Assessoria de comunicação',
      heading: 'Transformar trabalho político em vídeos que as pessoas veem até ao fim.',
      lead: 'No gabinete giro as redes sociais e edito os vídeos. Uma intervenção em plenário ou em comissão passa a Reel com título, legendas e uma frase de abertura que segura nos primeiros segundos.',
      sections: [
        {
          title: 'O que faço',
          items: [
            'Gestão das redes sociais do gabinete.',
            'Edição de intervenções e de vídeos à câmara em formato vertical, com legendas e títulos.',
            'Escolha do ângulo: a frase que faz alguém parar o scroll.',
          ],
        },
        {
          title: 'Com dados',
          items: [
            'Fiz um painel próprio, o Fora da Bolha, que junta várias contas: alcance, retenção, seguidores e moderação de comentários.',
            'Mostra que vídeos chegam a quem não segue a conta, e quais ficam dentro da bolha.',
          ],
        },
      ],
      gallery: [{ src: imgForaDaBolha, alt: 'Ecrã do painel Fora da Bolha, com alcance, contas que interagiram e uma galeria de Reels ordenada por alcance', wide: true }],
      tools: ['Gestão de redes sociais', 'CapCut', 'Remotion', 'API do Instagram', 'Python'],
    },
    cg: {
      intro: 'Do outro lado da câmara: sou eu quem edita os vídeos e gere as redes do gabinete.',
      more: 'Para não decidir às cegas, fiz um painel com os dados das contas: alcance, retenção e os vídeos que furam a bolha.',
      qa: [
        {
          q: 'O que é furar a bolha?',
          a: 'Chegar a quem ainda não te segue. No painel comparo, vídeo a vídeo, o alcance entre seguidores e não seguidores.',
        },
        {
          q: 'Como transformas uma intervenção em Reel?',
          a: 'Encontro a frase mais forte e ponho-a no início. Depois corto o que sobra, junto legendas e um título que diga o tema em poucas palavras.',
        },
        {
          q: 'Que ferramentas usas?',
          a: 'CapCut para a edição rápida, Remotion quando quero gráficos e legendas programados, e scripts em Python para ir buscar os dados à API do Instagram.',
        },
      ],
    },
  },
  {
    slug: 'video',
    era: 'Era editor de vídeo',
    year: 2025,
    when: '2025 até hoje',
    title: 'Edição com código',
    note: 'Editor de vídeo · CapCut e Remotion',
    tint: '#3a2f2a',
    dark: true,
    src: imgVideo,
    lente: 'camara',
    page: {
      kicker: 'Editor de vídeo · CapCut e Remotion',
      heading: 'Edito vídeo à mão e com código.',
      lead: 'Uso o CapCut para o ritmo e o Remotion, que é React, para tudo o que dá para programar: legendas, cartões com dados, inserções de notícias e animações sincronizadas com a fala.',
      stats: [{ value: '97', label: 'projetos de vídeo no CapCut' }],
      sections: [
        {
          title: 'Peças',
          items: [
            '«Décadas», um ensaio sobre habitação, com rótulos em papel por cima da cabeça e cartões na camisola.',
            '«Cantona»: imagens projetadas na folha de um caderno em cena. Segui os cantos da folha com OpenCV e projetei as animações em perspetiva.',
            '«Tendas», em estilo jornalístico escuro, com legendas e notas de fontes.',
            'Um teaser de 15 segundos para uma festa da Bojarda, com cortes rápidos.',
          ],
        },
        {
          title: 'Automatizar o que se repete',
          items: [
            'Legendas a partir de transcrição automática com Whisper, a correr no meu computador.',
            'Num podcast, separei automaticamente as vozes de cada orador e gerei os cortes a partir daí.',
          ],
        },
      ],
      gallery: [
        { src: imgReel2, alt: 'Fotograma de um Reel com a legenda «o que está»' },
        { src: imgReel3, alt: 'Fotograma de um Reel com um círculo vermelho animado' },
      ],
      tools: ['CapCut', 'Remotion', 'React', 'TypeScript', 'whisper.cpp', 'OpenCV', 'Python', 'ffmpeg'],
    },
    cg: {
      intro: 'Edição de vídeo. Às vezes no CapCut, às vezes em React, com o Remotion.',
      more: 'No vídeo «Cantona» projetei animações numa folha de caderno que se mexe na mão. Os cantos da folha foram seguidos fotograma a fotograma com OpenCV.',
      qa: [
        {
          q: 'O que é o Remotion?',
          a: 'Uma biblioteca para fazer vídeo com React. Cada fotograma é um componente, por isso legendas, gráficos e animações saem de dados e de código.',
        },
        {
          q: 'Porquê programar vídeo?',
          a: 'Há trabalho que se repete em todos os vídeos: legendas, cartões, fontes no ecrã. Programado uma vez, fica feito para os próximos.',
        },
        {
          q: 'Para quem editas?',
          a: 'Para a minha conta, para o gabinete no Parlamento Europeu, para a Diáspora e para a Bojarda.',
        },
      ],
    },
  },
  {
    slug: 'ia',
    era: 'Era programador',
    year: 2026,
    when: '2025 até hoje',
    title: 'Agentes que trabalham comigo',
    note: 'Engenharia com IA · Claude Code',
    tint: '#141915',
    dark: true,
    art: 'terminal',
    lente: 'codigo',
    page: {
      kicker: 'Desde 2025 · Desenvolvimento full-stack assistido por IA',
      heading: 'Software feito com agentes de IA, comigo ao volante.',
      lead: 'Construo aplicações completas com o Claude Code. Eu decido a arquitetura, escrevo as regras e reviso; os agentes escrevem grande parte do código. Este site foi feito assim.',
      stats: [
        { value: '14', label: 'projetos com o Claude Code desde maio de 2026' },
        { value: '1 700', label: 'ações registadas dos agentes, de maio a outubro' },
      ],
      sections: [
        {
          title: 'Projetos',
          items: [
            'Sede Virtual: um mundo em pixel art onde vivem os agentes de IA de uma organização. Andas pelo mapa, chegas perto de um agente e falas com ele. Cada agente tem ferramentas, memória e acesso a uma biblioteca de documentos. A voz corre localmente.',
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
      intro: 'Construo software com agentes de IA: eu decido, eles escrevem, eu reviso.',
      more: 'Os agentes da Sede Virtual são primos afastados meus, só que com um modelo por trás. As minhas respostas foram escritas à mão pelo Gonçalo.',
      qa: [
        {
          q: 'Isso não é batota?',
          a: 'É ferramenta. As decisões difíceis continuam a ser minhas: onde passa a fronteira de segurança, o que fica em fila, o que se testa. O agente acelera a escrita; a responsabilidade é minha.',
        },
        {
          q: 'Tu és uma IA?',
          a: 'Não. Sou um avatar com respostas escritas pelo Gonçalo. Nada do que fazes nesta página é enviado para lado nenhum.',
        },
        {
          q: 'Que modelos usas?',
          a: 'Sobretudo Claude, pelo Claude Code e pela API. Na Sede Virtual e no Portal Docker o fornecedor é intercambiável: pode ser outro serviço compatível ou um modelo local.',
        },
      ],
    },
  },
  {
    slug: 'estrategia',
    era: 'Era organizador',
    year: 2026,
    when: '2025 até hoje',
    title: 'Da rua à estrutura',
    note: 'Estratégia organizativa',
    tint: '#c9cbc3',
    src: imgEstrategia,
    focus: '50% 30%',
    lente: 'causa',
    page: {
      kicker: 'Estratégia organizativa',
      heading: 'Mais gente a participar e menos papel pelo caminho.',
      lead: 'Penso uma organização como penso um produto: quem chega, como entra, o que pode fazer sozinho e o que precisa de aprovação. Trabalhei nisso numa proposta de estrutura digital para uma organização política e na direção da Diáspora. E vou para a rua quando é preciso.',
      sections: [
        {
          title: 'Estrutura digital',
          items: [
            'Contribuí para uma proposta de estrutura digital para uma organização política: diagnóstico, visão em três camadas e um plano por fases.',
            'As três camadas: gestão interna para dirigentes, autogestão para militantes e mobilização para simpatizantes.',
            'Princípios: abertura a quem não é filiado, descentralização, integração entre ferramentas, automatização da burocracia e segurança por papel.',
            'Estudei exemplos europeus: Action Populaire, Zetkin, Participa.',
            'A fase seguinte passou do papel ao código, na app de militância.',
          ],
        },
        {
          title: 'Na rua',
          items: ['Acampadas e manifestações pela habitação.', 'Comentário sobre elas na televisão e no Instagram.'],
        },
      ],
      tools: ['Diagnóstico organizacional', 'Desenho de processos', 'Papéis e permissões', 'Benchmarking', 'Mobilização'],
    },
    cg: {
      intro: 'A causa. Penso organizações como penso produtos: onde é que as pessoas desistem e como se abre a porta.',
      more: 'Numa organização política, cada passo burocrático a mais é alguém que não volta. A proposta em que trabalhei começa precisamente por aí.',
      qa: [
        {
          q: 'O que são as três camadas?',
          a: 'Ferramentas de gestão interna para dirigentes e organizadores; ferramentas de autogestão para todos os militantes; e ferramentas de mobilização abertas a simpatizantes e a quem ainda pode vir a sê-lo.',
        },
        {
          q: 'Porquê tecnologia na militância?',
          a: 'Porque a participação baixa tem causas concretas: adesões longas e em papel, canais espalhados, pouca autonomia local. A tecnologia tira obstáculos do caminho. A política continua a ser feita por pessoas.',
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
    era: 'Era DJ',
    year: 2026,
    when: 'Fora do ecrã',
    title: 'Bojarda',
    note: 'Fora do ecrã · DJ',
    tint: '#140b0b',
    dark: true,
    src: imgBojarda,
    focus: '50% 18%',
    lente: 'vida',
    page: {
      kicker: 'Fora do ecrã',
      heading: 'Fora do ecrã há música, andebol e livros.',
      lead: 'Com a Bojarda passo música e faço festas. Sou andebolista federado e leio muito.',
      sections: [
        {
          title: 'Bojarda',
          items: ['Projeto de DJ com festas próprias.', 'Os teasers em vídeo também são meus, feitos em Remotion.'],
        },
        {
          title: 'O resto',
          items: ['Andebol federado: trabalho de equipa, disciplina e resiliência.', 'Leitura e música, sempre.', 'Tecnologia ao serviço do progresso social.'],
        },
      ],
      gallery: [{ src: imgBojarda2, alt: 'Cabine de DJ da Bojarda iluminada a vermelho, com o letreiro BOJARDA ao fundo' }],
    },
    cg: {
      intro: 'Fora do ecrã: a Bojarda. Passo música e faço festas.',
      more: 'Também jogo andebol federado. Trabalho de equipa aprende-se melhor num pavilhão do que numa retrospetiva de sprint.',
      qa: [
        {
          q: 'Quem fez o teaser?',
          a: 'Eu, em Remotion: 15 segundos de cortes rápidos, quase tudo com os DJs e um pouco de público e luzes.',
        },
        {
          q: 'E o andebol?',
          a: 'Sou andebolista federado. É de lá que vem muito do que sei sobre trabalho de equipa.',
        },
      ],
    },
  },
]

export const N = PLATES.length
export const indexOf = (slug: string) => PLATES.findIndex((p) => p.slug === slug)
