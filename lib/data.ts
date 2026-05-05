export const STACK_DATA = {
  frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Vue.js", "Tailwind CSS"],
  backend:  ["Node.js", "Python", "C#", "SQL", "WordPress"],
  design:   ["UX/UI Design", "Figma", "Salesforce", "AI Training"],
  soft:     ["Advanced English", "Teamwork", "Problem-Solving", "Communication", "Adaptability", "Fast learning", "Customer Service"],
} as const

export type Project = {
  name:    string
  desc_en: string
  desc_pt: string
  tags:    string[]
  year:    string
}

export const PROJECT_DATA: Project[] = [
  {
    name:    "Project Alpha",
    desc_en: "A real-time collaboration tool with shared cursors, presence and conflict-free editing.",
    desc_pt: "Ferramenta de colaboração em tempo real com cursores compartilhados, presença e edição sem conflitos.",
    tags:    ["Next.js", "TypeScript", "WebSockets"],
    year:    "2025",
  },
  {
    name:    "Project Beta",
    desc_en: "E-commerce storefront with headless CMS, custom checkout flow and Stripe integration.",
    desc_pt: "E-commerce com CMS headless, fluxo de checkout customizado e integração com Stripe.",
    tags:    ["React", "Node.js", "PostgreSQL"],
    year:    "2025",
  },
  {
    name:    "Project Gamma",
    desc_en: "AI-powered dashboard for content moderation with classification pipelines and analytics.",
    desc_pt: "Dashboard com IA para moderação de conteúdo, com pipelines de classificação e analytics.",
    tags:    ["Python", "Next.js", "Tailwind"],
    year:    "2024",
  },
  {
    name:    "Project Delta",
    desc_en: "Salesforce automation suite — custom Lightning components and Apex flow orchestration.",
    desc_pt: "Suite de automação Salesforce — componentes Lightning customizados e orquestração Apex.",
    tags:    ["Salesforce", "TypeScript", "C#"],
    year:    "2024",
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
    period:    "2025 — In progress",
    period_pt: "2025 — Em andamento",
    status:    "progress",
  },
  {
    title_en:  "Artificial Intelligence & Digital Automation — Associate Degree",
    title_pt:  "Inteligência Artificial e Automação Digital — Tecnólogo",
    school:    "UniFECAF",
    period:    "1st semester — In progress",
    period_pt: "1º semestre — Em andamento",
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
