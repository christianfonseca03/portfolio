import type { Locale } from './i18n'

type L10n<T = string> = Record<Locale, T>

export const SECTIONS = ['inicio', 'protocolo', 'stack', 'work', 'log', 'blog', 'conexao'] as const
export type SectionId = (typeof SECTIONS)[number]

export type Project = {
  code:  string
  title: L10n
  desc:  L10n
  year:  string
  url:   string
  tags:  string[]
  image: string
}

export const PROJECTS: Project[] = [
  {
    code: 'KESHAI_',
    title: { pt: 'KeshAI — TCC da pós-graduação', en: 'KeshAI — Postgraduate capstone' },
    desc: {
      pt: 'Projeto final da pós-graduação: uma plataforma que reúne vários modelos de IA em um só lugar, com histórico de conversas salvo e acompanhamento de consumo em tempo real, pagando apenas pelo que usar.',
      en: 'Postgraduate final project: a platform that brings several AI models into one place, with saved conversation history and real-time usage tracking, paying only for what you use.',
    },
    year: '2026',
    url: 'https://keshai-one.vercel.app/',
    tags: ['AI', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/previews/keshai.jpg',
  },
  {
    code: 'RIFT_RANKING',
    title: { pt: 'RiftRanking', en: 'RiftRanking' },
    desc: {
      pt: 'Ranking brasileiro de Riftbound, atualizado diariamente com os resultados das lojas que realizam torneios oficiais no país — jogadores, eventos e classificação em um só lugar.',
      en: 'The Brazilian Riftbound ranking, updated daily with results from stores running official tournaments in the country — players, events and standings in one place.',
    },
    year: '2026',
    url: 'https://rift-ranking.vercel.app/',
    tags: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
    image: '/previews/rift-ranking.jpg',
  },
  {
    code: 'SKYLINE_HT',
    title: { pt: 'Skyline HomeTech', en: 'Skyline HomeTech' },
    desc: {
      pt: 'Plataforma de serviços de tecnologia residencial, com clientes ativos e assinantes recorrentes, criada para gerenciar planos, serviços, pagamentos e acesso dos clientes.',
      en: 'A home technology services platform with active clients and recurring subscribers, built to manage plans, services, payments and customer access.',
    },
    year: '2025',
    url: 'https://www.skylinehometech.com/',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Clerk', 'TypeScript'],
    image: '/previews/skyline-hometech.jpg',
  },
  {
    code: 'CABANA_PORTICO',
    title: { pt: 'Cabana do Pórtico', en: 'Cabana do Pórtico' },
    desc: {
      pt: 'Landing page para uma cabana de Airbnb em Gramado-RS, criada para atrair hóspedes e gerar pedidos de reserva pelo site.',
      en: 'A landing page for an Airbnb cabin in Gramado, Brazil, built to attract guests and generate booking requests through the site.',
    },
    year: '2025',
    url: 'https://cabana-portico.vercel.app/',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/previews/cabana-portico.jpg',
  },
  {
    code: 'WHELLER_INT',
    title: { pt: 'Wheller Interiores', en: 'Wheller Interiores' },
    desc: {
      pt: 'Projeto antigo e descontinuado para uma antiga empresa de design de interiores, feito em 2023 antes das ferramentas de IA fazerem parte do fluxo de desenvolvimento.',
      en: 'An old, discontinued project for a former interior design company, built in 2023 before AI tools were part of the development workflow.',
    },
    year: '2023',
    url: 'https://wheller-interiores.vercel.app/',
    tags: ['React.js', 'TypeScript', 'Tailwind CSS'],
    image: '/previews/wheller-interiores.jpg',
  },
]

export const STACK = {
  frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Vue.js', 'Tailwind CSS'],
  backend:  ['Node.js', 'Python', 'C#', 'SQL', 'WordPress'],
  design:   ['UX/UI Design', 'Figma', 'Salesforce', 'AI Training'],
}

export type EducationItem =
  | { learn?: false; when: L10n; title: L10n; school: string; done: boolean }
  | { learn: true }

export const EDUCATION: EducationItem[] = [
  {
    when:  { pt: 'Concluído em 2026', en: 'Completed 2026' },
    title: { pt: 'Desenvolvimento Full Stack — Pós-graduação', en: 'Full Stack Development — Postgraduate' },
    school: 'PUC-RS',
    done: true,
  },
  {
    when:  { pt: '2º semestre — Em andamento', en: '2nd semester — In progress' },
    title: { pt: 'Inteligência Artificial e Automação Digital — Tecnólogo', en: 'Artificial Intelligence and Digital Automation — Technologist' },
    school: 'UniFECAF',
    done: false,
  },
  {
    when:  { pt: 'Concluído em 2024', en: 'Completed 2024' },
    title: { pt: 'Desenvolvimento Web — Tecnólogo', en: 'Web Development — Technologist' },
    school: 'Unopar',
    done: true,
  },
  { learn: true },
]

export type PostCategory = 'dev' | 'ia' | 'work'

export type Post = {
  cat:   PostCategory
  tag:   L10n
  date:  L10n
  read:  L10n
  title: L10n
  dek:   L10n
  body:  L10n<string[]>
}

// Posts do blog — enquanto estiver vazio, a seção mostra um estado "em breve".
export const POSTS: Post[] = []

export const POST_FILTERS: [PostCategory | 'all', L10n | null][] = [
  ['all', null],
  ['dev', { pt: 'Desenvolvimento', en: 'Development' }],
  ['ia', { pt: 'IA', en: 'AI' }],
  ['work', { pt: 'Trabalho', en: 'Work' }],
]

export const EMAIL = 'chrisgfwheller@hotmail.com'

export const CHANNELS = [
  { name: 'WhatsApp', handle: '+55 51 99347-7433', href: 'https://wa.me/5551993477433?text=Hi%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20chat%21' },
  { name: 'LinkedIn', handle: 'christian-germano-fonseca', href: 'https://www.linkedin.com/in/christian-germano-fonseca' },
  { name: 'Email', handle: EMAIL, href: `mailto:${EMAIL}` },
  { name: 'GitHub', handle: 'christianfonseca03', href: 'https://github.com/christianfonseca03' },
]

export const ZONES = [
  ['POA', 'America/Sao_Paulo'],
  ['NYC', 'America/New_York'],
  ['LON', 'Europe/London'],
  ['TYO', 'Asia/Tokyo'],
] as const
