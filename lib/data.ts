export const STACK_DATA = {
  frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Vue.js", "Tailwind CSS"],
  backend:  ["Node.js", "Python", "C#", "SQL", "WordPress"],
  design:   ["UX/UI Design", "Figma", "Salesforce", "AI Training"],
  soft:     ["Advanced English", "Teamwork", "Problem-Solving", "Communication", "Adaptability", "Fast learning", "Customer Service"],
} as const

export const STACK_SOFT_PT = [
  "Inglês avançado",
  "Trabalho em equipe",
  "Resolução de problemas",
  "Comunicação",
  "Adaptabilidade",
  "Aprendizado rápido",
  "Atendimento ao cliente",
] as const

export type Project = {
  name:    string
  name_pt?: string
  desc_en: string
  desc_pt: string
  tags:    string[]
  year:    string
  liveUrl?: string
  previewMode?: "iframe" | "image" | "under-development"
  previewImageUrl?: string
}

export const PROJECT_DATA: Project[] = [
  {
    name: "KeshAI — Postgraduate Final Project",
    name_pt: "KeshAI — TCC da pós-graduação",
    desc_en: "Postgraduate final project: a platform that brings several AI models together in one place, with saved chat history and real-time usage tracking, paying only for what you use.",
    desc_pt: "Projeto final da pós-graduação: uma plataforma que reúne vários modelos de IA em um só lugar, com histórico de conversas salvo e acompanhamento de consumo em tempo real, pagando apenas pelo que usar.",
    tags: ["AI", "Next.js", "TypeScript", "Tailwind CSS"],
    year: "2026",
    liveUrl: "https://keshai-one.vercel.app/",
    previewMode: "image",
    previewImageUrl: "/previews/keshai.jpg",
  },
  {
    name: "Skyline HomeTech",
    desc_en: "Home technology service platform with active clients and recurring subscribers, built to manage memberships, services, payments and customer access.",
    desc_pt: "Plataforma de serviços de tecnologia residencial, com clientes ativos e assinantes recorrentes, criada para gerenciar planos, serviços, pagamentos e acesso dos clientes.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Clerk", "TypeScript", "Tailwind CSS"],
    year: "2025",
    liveUrl: "https://www.skylinehometech.com/",
    previewMode: "image",
    previewImageUrl: "/previews/skyline-hometech.jpg",
  },
  {
    name: "Cabana do Pórtico",
    desc_en: "Landing page for an Airbnb cabin in Gramado-RS, designed to attract guests and generate direct booking requests through the website.",
    desc_pt: "Landing page para uma cabana de Airbnb em Gramado-RS, criada para atrair hóspedes e gerar pedidos de reserva pelo site.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    year: "2025",
    liveUrl: "https://cabana-portico.vercel.app/",
    previewMode: "image",
    previewImageUrl: "/previews/cabana-portico.jpg",
  },
  {
    name: "Wheller Interiores",
    desc_en: "Old and discontinued project for a former interior design company, built in 2023 before AI tools became part of the development workflow.",
    desc_pt: "Projeto antigo e descontinuado para uma antiga empresa de design de interiores, feito em 2023 antes das ferramentas de IA fazerem parte do fluxo de desenvolvimento.",
    tags: ["React.js", "TypeScript", "Tailwind CSS"],
    year: "2023",
    liveUrl: "https://wheller-interiores.vercel.app/",
    previewMode: "image",
    previewImageUrl: "/previews/wheller-interiores.jpg",
  },
]

export type EducationItem = {
  title_en:  string
  title_pt:  string
  school:    string
  period:    string
  period_pt: string
  status:    "progress" | "done"
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    title_en:  "Full Stack Development — Postgraduate Specialization",
    title_pt:  "Desenvolvimento Full Stack — Pós-graduação",
    school:    "PUC-RS",
    period:    "Graduated 2026",
    period_pt: "Concluído em 2026",
    status:    "done",
  },
  {
    title_en:  "Artificial Intelligence & Digital Automation — Associate Degree",
    title_pt:  "Inteligência Artificial e Automação Digital — Tecnólogo",
    school:    "UniFECAF",
    period:    "2nd semester — In progress",
    period_pt: "2º semestre — Em andamento",
    status:    "progress",
  },
  {
    title_en:  "Web Development — Associate Degree",
    title_pt:  "Desenvolvimento Web — Tecnólogo",
    school:    "Unopar",
    period:    "Graduated 2024",
    period_pt: "Concluído em 2024",
    status:    "done",
  },
]
