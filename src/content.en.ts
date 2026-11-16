// English version of content.ts. Only the texts: images, colours and order come from content.ts.
// Lists (stats, sections, gallery alts, links) follow the same order as the Portuguese ones.
import type { Lentes } from './content'

export type PlateText = {
  era: string
  when: string
  title: string
  note: string
  page: {
    kicker: string
    heading: string
    lead: string
    stats?: { value: string; label: string }[]
    statsNote?: string
    sections: { title: string; items: string[] }[]
    tools?: string[]
    galleryAlt?: string[]
    linkLabels?: string[]
  }
  cg: { intro: string; more: string; context?: string; qa: { q: string; a: string }[] }
}

export const LENTES_EN: Lentes = {
  codigo: {
    label: 'Code',
    first: 'noesis',
    text: 'For the code side, start at Noesis and carry on to the AI agents. Seven years of OutSystems and one of TypeScript with AI assistants.',
  },
  camara: {
    label: 'Camera',
    first: 'comunicador',
    text: 'For the camera side there are two in a row: my own account and video editing.',
  },
  causa: {
    label: 'Cause',
    first: 'parlamento',
    text: 'For the cause side, start at the European Parliament. Then come organising strategy and Diáspora.',
  },
  vida: {
    label: 'Life',
    first: 'bojarda',
    text: 'Off screen there is music, sport and festivals.',
  },
}

export const PLATES_EN: Record<string, PlateText> = {
  formacao: {
    era: 'my education',
    when: '2012 to 2020',
    title: 'From fixing friends’ computers to consulting',
    note: 'Education · Lisbon and Madrid',
    page: {
      kicker: '2012 to 2020 · Education',
      heading: 'I fixed everyone’s computers, learned to code and never stopped being the IT guy.',
      lead: 'I started with a vocational course in Business Computing, went on to a higher technical diploma in mobile development and finished a degree in Computer Science at ISTEC. Along the way there was an Erasmus in Madrid, a startup and a part-time job at Domino’s Pizza to pay the bills.',
      stats: [
        { value: '3', label: 'OutSystems certifications' },
        { value: 'C1', label: 'English' },
      ],
      sections: [
        {
          title: 'Path',
          items: [
            '2012 to 2015: vocational course in Business Computing at Escola Secundária Dr. António Carvalho Figueiredo. Visual Basic, advanced Office, economics and management.',
            '2015: four-month internship at Loures City Council, organising data and document archives.',
            '2015 to 2017: higher technical diploma (CTeSP) in Mobile Device Development at ISTEC. Android in Java, iOS in Swift, C#, networks, UI/UX, web and 3D modelling.',
            '2017: three-month Erasmus+ internship at Universidad Rey Juan Carlos, Madrid, in the IT department, on Java and WordPress projects.',
            '2017: three months at the startup RightCo, also in Java and WordPress.',
            '2017 to 2020: degree in Computer Science at ISTEC. Networks, databases, multimedia, Big Data and IoT, statistics, entrepreneurship and communication methods.',
          ],
        },
        {
          title: 'OutSystems certifications',
          items: ['Associate Developer (O11)', 'Associate Traditional Web Developer (O11)', 'Mobile Developer Specialist (O11 and ODC)'],
        },
        { title: 'Languages', items: ['Portuguese, native', 'English, C1', 'Spanish, A2'] },
      ],
      tools: ['Java', 'Swift', 'C#', 'Visual Basic', 'SQL', 'PHP', 'WordPress'],
    },
    cg: {
      intro: 'Here are the origins: Visual Basic at 15, Java and Swift at 18, and an Erasmus in Madrid along the way.',
      more: 'My degree had a course called Communication Methods. Back then it felt like an extra. Today it is half of my work.',
      qa: [
        {
          q: 'Which certifications do you have?',
          a: 'Three from OutSystems: Associate Developer and Associate Traditional Web Developer, both on O11, and Mobile Developer Specialist, on O11 and ODC.',
        },
        {
          q: 'What did you do in Madrid?',
          a: 'A three-month Erasmus+ internship at Universidad Rey Juan Carlos, in the IT department. I worked on Java and WordPress projects.',
        },
        {
          q: 'Which languages do you speak?',
          a: 'Portuguese is my native language. English at C1 level, which I used for years in multinational Scrum teams, and Spanish at A2.',
        },
      ],
    },
  },
  noesis: {
    era: 'consultant',
    when: '2019 to 2020',
    title: 'First OutSystems projects',
    note: 'OutSystems · Noesis',
    page: {
      kicker: 'Jan 2019 to Nov 2020 · OutSystems Developer · Noesis',
      heading: 'My first consultancy trained me in OutSystems and Agile Scrum, and took me into healthcare, retail and heritage.',
      lead: 'At Noesis I built Web and Mobile applications in OutSystems for three clients. I worked in Agile teams and talked directly with clients during analysis and acceptance.',
      stats: [
        { value: '3', label: 'clients: Medtronic, Worten and Parques de Sintra' },
        { value: '2', label: 'generations of OutSystems: Traditional and Reactive' },
      ],
      sections: [
        {
          title: 'Medtronic · healthcare',
          items: [
            'I took part in the migration from Traditional to Reactive Web of the portal for pacemaker readings and patient triage.',
            'I integrated clinical data over REST, with JSON and OAuth, from Medtronic’s internal reading systems.',
            'I built new screens, custom dashboard queries and the automatic email reports sent to doctors.',
          ],
        },
        {
          title: 'Worten · retail',
          items: ['An OutSystems mobile app, for iOS and Android, used by store teams in their daily operations.', 'I owned the custom front-end animations.'],
        },
        {
          title: 'Parques de Sintra · public sector',
          items: [
            'A closed ticketing, opening hours and capacity system for the monuments and museums of Sintra, in Traditional Web.',
            'I built it from the data model to the public screens, including ticket generation from back-office data.',
          ],
        },
      ],
      tools: ['OutSystems 11', 'Traditional Web', 'Reactive Web', 'Mobile iOS/Android', 'REST', 'OAuth', 'SQL'],
    },
    cg: {
      intro: 'First consultancy: a portal to read pacemakers, an app for Worten’s stores and the ticketing for the monuments of Sintra.',
      more: 'In the Medtronic portal the data came from pacemaker readings and went to doctors. That calls for a different level of care with validation and permissions.',
      qa: [
        {
          q: 'What does migrating from Traditional to Reactive mean?',
          a: 'They are two generations of OutSystems interfaces. Traditional Web renders pages on the server; Reactive runs in the browser, in React. Migrating means rebuilding screens and client logic without breaking the data or the integrations.',
        },
        {
          q: 'What did you do on the Worten app?',
          a: 'The app served store teams in their daily operations, on iOS and Android. My most visible parts were the front-end animations and the login authorisation system.',
        },
        {
          q: 'How did you work with clients?',
          a: 'Directly, during analysis and acceptance testing. I cleared up questions with the people who would use the application and followed the validation, always with an Agile approach.',
        },
      ],
    },
  },
  'act-digital': {
    era: 'senior consultant',
    when: '2020 to 2025',
    title: 'Five years at Alter Solutions / act digital',
    note: 'Senior OutSystems · act digital · Randstad',
    page: {
      kicker: 'Nov 2020 to Jun 2025 · Senior OutSystems Developer · Alter Solutions / act digital · Randstad',
      heading: 'Applications for Randstad and its clients, in OutSystems factories in Portugal and abroad.',
      lead: 'At Alter Solutions, now act digital, I worked across the full cycle of Reactive Web and Mobile applications in OutSystems 11, in multinational Scrum teams. The client was Randstad and its clients in telecoms and energy, covering their contact centre services.',
      stats: [
        { value: '5', label: 'years on the Randstad project' },
        { value: '3', label: 'apps in the Team Building platform: back office, web and mobile' },
      ],
      sections: [
        {
          title: 'Global Team Building platform',
          items: [
            'I was the lead developer.',
            'Web back office, Reactive Web app for users and Mobile app.',
            'OAuth authentication, points and rewards management, multi-tenancy and deployment across several environments.',
          ],
        },
        {
          title: 'Contact centre for telecoms and energy',
          items: [
            'Working time tracking, call logging and integration with audio recordings.',
            'Daily operational forms, BPT processes, Timers and integration with external databases.',
          ],
        },
        {
          title: 'Matching vacancies with workers',
          items: ['An internal Randstad tool that matches job vacancies with contracted workers, using polygons on Google Maps.'],
        },
        {
          title: 'Day to day',
          items: [
            'Architecture and data modelling.',
            'REST integrations with external systems.',
            'Optimising slow screens and queries, with Service Center and logs.',
            'Code review and quality assurance in production.',
          ],
        },
      ],
      galleryAlt: ['Illustration of an OutSystems workstation on a red background'],
      tools: ['OutSystems 11', 'BPT', 'Timers', 'Multi-tenancy', 'OAuth', 'REST', 'Google Maps API', 'Advanced SQL', 'LifeTime', 'Scrum'],
    },
    cg: {
      intro: 'Five years at Randstad. I learned a lot: discussing architecture, gathering requirements, building features on my own.',
      more: 'One of the most curious pieces of this period: a tool that matches vacancies with workers using polygons on a map. A geographic problem solved in low-code.',
      qa: [
        {
          q: 'Why multi-tenancy?',
          a: 'One application serving several organisations at once, each with its data kept apart. Because of its global size, Randstad needed areas that only saw their own data, with a single codebase.',
        },
        {
          q: 'Why BPT?',
          a: 'Business Process Technology, the OutSystems process engine. It is meant for long flows, with human and automatic steps, that can take days. I used it in complex contact centre processes.',
        },
        {
          q: 'As a senior, did you deal with performance?',
          a: 'I tracked down slow screens and queries in Service Center and the logs, rewrote the queries and measured again.',
        },
      ],
    },
  },
  diaspora: {
    era: 'association leader',
    when: '2024 to today',
    title: 'Diáspora',
    note: 'President · Diáspora Association',
    page: {
      kicker: 'Since Oct 2024 · President of the board · Associação Cultural Raízes Com Rumo',
      heading: 'An association for people who came to live in Lisbon and made it home.',
      lead: 'I am president of the board of Associação Cultural Raízes Com Rumo, known as Diáspora, founded in Lisbon in October 2024. We work on the cultural and social inclusion of immigrants through parties, concerts, dance and workshops.',
      stats: [
        { value: '2024', label: 'founded' },
        { value: '2,200', label: 'followers on @diasporalx' },
      ],
      sections: [
        {
          title: 'What we organise',
          items: ['Festa Raízes, Barulho Bom and Forró no Miradouro.', 'Workshops throughout the year.', 'Our events have already brought together hundreds of people.'],
        },
        {
          title: 'What I do',
          items: [
            'I run the association with the other 9 members of its governing bodies and handle day-to-day management: paperwork, accounts, minutes and communication.',
            'I built the association’s website, with a public area and a back office, in Next.js, TypeScript and Prisma.',
          ],
        },
      ],
      galleryAlt: ['Gonçalo playing a tambourine at a street party, with glitter on his face', 'Barulho Bom poster, with musicians at a Lisbon viewpoint'],
      tools: ['Event production', 'Association management', 'Instagram', 'Business accounting'],
      linkLabels: ['Instagram @diasporalx'],
    },
    cg: {
      intro: 'Diáspora is the cultural association I chair. Parties, concerts and forró at the viewpoint, with and for people who came from elsewhere.',
      more: 'I also built the association’s website, with a back office.',
      qa: [
        {
          q: 'What is the association for?',
          a: 'The statutes put it well: the cultural and social inclusion of immigrants, through cultural activities and psychosocial support. The parties are the way in.',
        },
        {
          q: 'What is the website built with?',
          a: 'Next.js 16 with TypeScript and SQL, and an authenticated back office where the board manages the content.',
        },
      ],
    },
  },
  parlamento: {
    era: 'political adviser',
    when: '2025 to 2026',
    title: 'Political advice',
    note: 'Political adviser · European Parliament',
    page: {
      kicker: 'Since Jun 2025 · Local assistant · European Parliament',
      heading: 'Political advice at the European Parliament, specialising in digital regulation and social media management.',
      lead: 'Political advice on communication, social media, artificial intelligence and the regulation of digital platforms. I also brought Agile into how the team organises its work.',
      stats: [
        { value: 'AI Act', label: 'the EU regulation on artificial intelligence' },
        { value: 'DSA', label: 'Digital Services Act, the rules for platforms' },
      ],
      sections: [
        {
          title: 'Political advice',
          items: [
            'AI Act: the regulation that classifies AI systems by level of risk.',
            'Digital Services Act: the responsibilities of platforms for the content that circulates on them.',
            'I followed these files and turned them into political positions and content for the public.',
          ],
        },
        {
          title: 'Running the office',
          items: ['Managing the team’s work with Agile practices.', 'Managing communication on social media.'],
        },
      ],
      tools: ['AI Act', 'Digital Services Act', 'Platform regulation', 'Agile', 'Jira', 'CapCut'],
    },
    cg: {
      intro: 'In 2025, a change: I am at the European Parliament. My speciality is digital regulation, with the AI Act and the Digital Services Act, and my job is social media management.',
      more: 'This is where everything else meets: I understand the code the laws want to regulate and I can explain it in a 40-second Reel.',
      qa: [
        {
          q: 'What is the AI Act?',
          a: 'The EU regulation on artificial intelligence. It classifies systems by level of risk and sets obligations for those who build and use them. Uses with unacceptable risk are banned.',
        },
        {
          q: 'And the Digital Services Act?',
          a: 'It sets out the responsibilities of online platforms: illegal content, transparency of recommendation algorithms and of advertising. Very large platforms face stricter rules.',
        },
        {
          q: 'Why does a programmer do political advice?',
          a: 'Because much of the politics that will affect people’s lives is written about technology. It helps to have someone in the room who has built OAuth integrations and knows what a recommendation algorithm does.',
        },
      ],
    },
  },
  produto: {
    era: 'product manager',
    when: 'Since 2025',
    title: 'Digital infrastructure manager',
    note: 'Product manager and developer for a political organisation of 10,000 people',
    page: {
      kicker: 'Since 2025 · Project Manager, Product Manager and developer',
      heading: 'Product management with my hands in the code.',
      lead: 'For a political organisation of about 10,000 people, I do product management and development at the same time. I gather requirements from non-technical people, design the solution, write the code, ship it to production and maintain the infrastructure as a volunteer.',
      stats: [
        { value: '~10,000', label: 'people in the organisation' },
        { value: '5', label: 'institutional apps and an open source CMS for internal governance' },
        { value: '5', label: 'Docker containers, the base of this setup on its own servers' },
      ],
      sections: [
        {
          title: 'Membership app · beta in October 2026',
          items: [
            'Feed, calendar, personal area with membership fees and payments, and a back office for organisers with roles and event approval.',
            'Designed mobile first, running in the browser.',
            'One security rule at the centre of the design: the app never writes to the internal platform and nothing from outside gets into the internal network. An internal service fetches work from a queue and sends back the results.',
            'A queue with states, attempt counting and redelivery after a timeout.',
            'End-to-end tests, from the interface to the simulated platform, including the permission rules.',
          ],
        },
      ],
      tools: ['Directus', 'Docker', 'TypeScript', 'React', 'Bun', 'zod', 'Tailwind', 'Next.js', 'SQLite', 'Stakeholder management'],
    },
    cg: {
      intro: 'Here I am product manager and programmer at the same time. Two websites, a CMS on Docker and an app in beta.',
      more: 'The architecture decision I like most: the internal service only makes outbound connections. If the public app goes down or gets attacked, the internal network stays closed.',
      qa: [
        {
          q: 'Why a headless, open source CMS?',
          a: 'It separates content from presentation. The team edits in one place, and the websites, the app or a newsletter all pull the same content through an API. All of it open source and maintained by the community.',
        },
        {
          q: 'How do you manage and code at the same time?',
          a: 'With a short, visible backlog, small deliveries and a lot of contact with the people who will use it. AI agents write part of the code; I decide the architecture and review.',
        },
        {
          q: 'Why is there a queue?',
          a: 'The internal service cannot accept connections from outside. So it is the one that fetches operations from the API, runs them on the platform and sends back the result. If it is offline, requests stay “processing” until it returns.',
        },
      ],
    },
  },
  comunicador: {
    era: 'communicator',
    when: 'Instagram and TikTok',
    title: '36,000 people follow part of who I am',
    note: 'Communicator · @goncalopmfilipe',
    page: {
      kicker: 'Communicator · @goncalopmfilipe',
      heading: 'Political commentary in my own voice, opinions about our times.',
      lead: 'On my Instagram and TikTok accounts I explain laws, cost of living, housing, wages and cultural issues in short Reels, with sources and in an engaging way. I speak to people who feel life getting tighter and want to understand who decides and who profits.',
      stats: [
        { value: '24.5k', label: 'followers on Instagram' },
        { value: '12k', label: 'followers on TikTok' },
        { value: '4.3M', label: 'views in the last 3 months (Instagram)' },
        { value: '901k', label: 'accounts reached in the last 3 months (Instagram)' },
        { value: '157', label: 'Reels published' },
      ],
      statsNote: 'Instagram API data as of 11 November 2026.',
      sections: [
        {
          title: 'How I work',
          items: [
            'One topic per video, 30 to 45 seconds, with the hook in the first sentence.',
            'I read the law or the measure in detail and say who wins and who loses.',
            'No number without a source: sources go in the caption or on screen.',
            'Script, filming and editing, all done by me.',
          ],
        },
        {
          title: 'Where more content comes from',
          items: ['Commentary on television panels.', 'Reporting on street activism.'],
        },
      ],
      galleryAlt: ['Gonçalo on a television commentary panel about the clashes in Porto, with his name on the caption', 'Gonçalo in a Reel filmed at home, with plants in the background'],
      tools: ['Scripting', 'Presenting', 'CapCut', 'Remotion', 'Instagram', 'TikTok'],
      linkLabels: ['Instagram @goncalopmfilipe', 'TikTok @goncalopmfilipe'],
    },
    cg: {
      intro: '36,000 followers combined and more than 8 million views since I started doing political communication on Instagram.',
      more: 'The Reels that travel furthest are about people’s pockets and about power. My audience seems to like opinions backed by data and real glimpses of my political activity.',
      qa: [
        {
          q: 'How do you pick your topics?',
          a: 'By the material life of people aged 18 to 40: rent, wages, precarious work, transport. If a measure touches that, it deserves a video.',
        },
        {
          q: 'Why always sources?',
          a: 'Because a strong position does not excuse a lack of rigour. And at a time when lies travel fast, telling the truth in an engaging way is a trademark I want to keep.',
        },
        {
          q: 'Do you do it all yourself?',
          a: 'Script, filming and editing, yes. I even built the tools that analyse the account.',
        },
      ],
    },
  },
  video: {
    era: 'video editor',
    when: 'Since 2022',
    title: 'Video editing',
    note: 'Video editor · CapCut and Remotion',
    page: {
      kicker: 'Video editor · CapCut and Remotion',
      heading: 'I edit video by hand and with code.',
      lead: 'I use CapCut for pacing and Remotion, which is React, for everything that can be programmed: captions, data cards, news inserts and animations synced with speech.',
      stats: [{ value: '150+', label: 'video projects in CapCut' }],
      sections: [
        {
          title: 'Formats',
          items: [
            'Yapper: I grab my phone and give an opinion. Something on my mind that can spark healthy reflection.',
            'Home video with a teleprompter. It’s true. People research and write content when the topic needs that care. Or at least I do.',
            'Vox pop: handing over the microphone can be good for debate. And it works on social media.',
            'Show reels synced to music for Bojarda.',
          ],
        },
        {
          title: 'Where Remotion (with Claude) helps',
          items: [
            'Captions from automatic transcription with Whisper.',
            'On a podcast, I automatically separated each speaker’s voice and generated the cuts from there. I edited in 10 minutes what would have taken hours.',
          ],
        },
      ],
      galleryAlt: ['Frame from an edited Reel, with captions and a news clip inserted on top', 'Frame from a Reel with the caption “o que está”', 'Frame from a Reel with an animated red circle'],
      tools: ['CapCut', 'Remotion', 'React', 'whisper.cpp', 'ffmpeg'],
    },
    cg: {
      intro: 'I am also on social media as a content creator and I edit my own videos. Sometimes in CapCut, sometimes in React, with Remotion.',
      more: 'In the video “Cantona” I projected animations onto a notebook page moving in my hand. The page corners were tracked frame by frame with OpenCV.',
      qa: [
        {
          q: 'What is Remotion?',
          a: 'A library for making video with React. Each frame is a component, so captions, charts and animations come from data and code.',
        },
        {
          q: 'Why program video?',
          a: 'Some work repeats in every video: captions, cards, sources on screen. Programmed once, it is done for the next ones, and it frees up time for other things.',
        },
        {
          q: 'Who do you edit for?',
          a: 'For my own account. But I edited for the office at the European Parliament for a year, and also for Diáspora and for Bojarda.',
        },
      ],
    },
  },
  ia: {
    era: 'coding with AI',
    when: '2025 to today',
    title: 'Being an independent consultant in the 21st century',
    note: 'AI engineering · Claude Code · open LLMs',
    page: {
      kicker: 'Since 2025 · AI-assisted full-stack development',
      heading: 'Technical challenges get solved faster. That leaves room for creativity.',
      lead: 'I build complete applications with Claude Code. I decide the architecture, write the rules and review. This website was made that way.',
      stats: [
        { value: '14', label: 'projects with Claude Code since May 2026' },
        { value: '1,700', label: 'logged agent actions, May to October' },
      ],
      sections: [
        {
          title: 'Some projects',
          items: [
            'Docker Portal: managing an internal server, with script-based diagnostics and an AI assistant that only proposes changes. Nothing runs without written confirmation, and personal data is stripped before anything is sent to an AI provider.',
            'Central Claude: a local dashboard to see and change the whole Claude Code and Claude Desktop configuration.',
            'Fora da Bolha: analysis of Instagram accounts with comment classification and AI diagnostics.',
          ],
        },
        {
          title: 'How I work with agents',
          items: [
            'A CLAUDE.md per project, with the rules and the boundaries between modules.',
            'My own subagents, for example a read-only reviewer.',
            'Visual review with Playwright and automatically recorded demos.',
            'Interchangeable AI provider: Anthropic API, compatible services or local models.',
          ],
        },
      ],
      tools: ['Claude Code', 'Anthropic API', 'TypeScript', 'Bun', 'Node.js', 'Phaser', 'Playwright', 'Docker', 'Python'],
    },
    cg: {
      intro: 'I build software with AI assistants: I decide, they write, I review and steer.',
      more: 'Some projects I develop pro bono, and others I develop before getting paid anything for them.',
      qa: [
        {
          q: 'Isn’t that cheating?',
          a: 'It’s a tool. The hard decisions are still mine: where the security boundary goes, what sits in a queue, what gets tested. The assistant speeds up the writing; the responsibility is mine.',
        },
        {
          q: 'Are you an AI?',
          a: 'No. I am an avatar with answers written by Gonçalo. Nothing you do on this page is sent anywhere.',
        },
        {
          q: 'Which models do you use?',
          a: 'Mostly Claude, through Claude Code and the API.',
        },
      ],
    },
  },
  estrategia: {
    era: 'organiser',
    when: '2022 to today',
    title: 'Organising the street',
    note: 'Organising strategy',
    page: {
      kicker: 'Organising strategy',
      heading: 'Sound political analysis and the ability to build useful tools.',
      lead: 'I think about an organisation with the same search for the big picture as I think about a product: what is the goal, what are my tools, how do we organise the collective around a goal. I have already built the entire digital structure for a political organisation. I take part in building collective solutions in struggles for social justice.',
      sections: [
        {
          title: 'Digital structure',
          items: [
            'I developed the entire digital structure for a political organisation: diagnosis, architecture, phased development and management of volunteer programmers.',
            'Layout: internal governance for leaders, self-management for members and mobilisation for supporters.',
            'Principles: open to non-members, decentralisation, integration between tools, automating paperwork and role-based security.',
            'I studied European examples: Action Populaire, Zetkin and Participa.',
            'Internal governance applications and public-facing applications are kept technically separate and communicate asynchronously.',
          ],
        },
        {
          title: 'On the street',
          items: ['Housing demonstrations and grassroots organising for the political empowerment of communities.', 'Communication and taking part in the battle over the national political narrative.'],
        },
      ],
      galleryAlt: ['Gonçalo speaking at a night-time street action, fist raised, with a red carnation on his chest'],
      tools: ['Organisational diagnosis', 'Process design', 'Roles and permissions', 'Political analysis', 'Mobilisation'],
    },
    cg: {
      intro: 'The cause. Activism also tests organising skills: where people give up, how doors open, the art of persuasion.',
      more: 'In a political organisation, every extra bureaucratic step is someone who doesn’t come back. An organisation that welcomes people with good tools is good news for democracy.',
      qa: [
        {
          q: 'Which applications did you build?',
          a: 'Internal management tools for leaders and organisers; self-management tools for all members; and mobilisation tools open to supporters and to people who might become supporters.',
        },
        {
          q: 'Why technology in politics and activism?',
          a: 'Because low participation has concrete causes: long, paper-based sign-ups, scattered channels with little management capacity and little local autonomy. Technology clears obstacles so people can do politics and take part in democracy.',
        },
        {
          q: 'Do you take to the streets too?',
          a: 'I do. This photo was taken at a housing encampment in Rossio, Lisbon.',
        },
      ],
    },
  },
  bojarda: {
    era: 'DJ',
    when: '2026',
    title: 'Bojarda',
    note: 'Music and performance · DJ',
    page: {
      kicker: 'Sometimes you have to break everything.',
      heading: 'Music, sport and festivals.',
      lead: 'Life can’t be all work, right?',
      sections: [
        {
          title: 'Bojarda',
          items: ['A DJ project with its own parties.', 'The video teasers are mine too, made in Remotion.'],
        },
      ],
      galleryAlt: ['Bojarda’s DJ booth lit in red, with the BOJARDA sign in the background'],
    },
    cg: {
      intro: 'BOJARDA. I play music and throw parties.',
      more: 'I also played federated handball and football. Teamwork is learned better on a pitch than in a sprint retrospective.',
      qa: [
        {
          q: 'Who made the teaser?',
          a: 'I did, in Remotion: 15 seconds of fast cuts, mostly the DJs and a bit of crowd and lights.',
        },
        {
          q: 'And sport?',
          a: 'I played handball and football. That is where much of what I know about teamwork and handling pressure comes from.',
        },
      ],
    },
  },
}
