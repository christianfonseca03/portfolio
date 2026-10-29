export const locales = ['pt', 'en'] as const
export type Locale = (typeof locales)[number]

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale)

const pt = {
  h1a: 'Desenvolvedor full-stack', h1b: 'criando produtos', h1c: 'que entregam.',
  sub: 'Desenho e desenvolvo aplicações web performáticas com ferramentas modernas — da interface à infraestrutura.',
  aboutP: [
    'Sou desenvolvedor full-stack focado em entregar produtos limpos, sustentáveis e performáticos em produção. Atuo em toda a stack — do design da interface no Figma ao deploy da API.',
    'Sou pós-graduado em Desenvolvimento Full Stack pela PUC-RS e sigo estudando IA e automação digital na UniFECAF. Tenho inglês avançado e estou pronto para colaborar remotamente com times internacionais.',
    'Fora do editor, sou um aprendiz rápido que valoriza comunicação clara, autonomia e entrega. Trato cada projeto como uma parceria de longo prazo.',
  ],
  facts: [['Localização', 'Porto Alegre, Brasil'], ['Idiomas', 'Português · Inglês'], ['Disponibilidade', 'Aberto a remoto'], ['Foco', 'Web · IA · Automação']],
  soft: ['Inglês avançado', 'Trabalho em equipe', 'Resolução de problemas', 'Comunicação', 'Adaptabilidade', 'Aprendizado rápido', 'Atendimento ao cliente'],
  visit: 'Ver site',
  done: 'Concluído', always: 'Sempre',
  learnTitle: 'Aprendizado contínuo',
  learnBody: 'Além da formação acadêmica, participo de diversos cursos especializados em desenvolvimento web, IA, design systems e arquitetura de software.',
  blogSub: 'Notas sobre desenvolvimento, IA e trabalho.', all: 'Tudo',
  blogEmpty: '', blogSoon: 'Os primeiros posts estão a caminho.',
  contactSub: 'Atualmente disponível para oportunidades remotas e freelance. Entre em contato pelo canal que preferir.',
  copy: 'Copiar email', copied: 'Email copiado',
  copyright: '© 2026 Christian Fonseca. Todos os direitos reservados.',

  menu: 'Menu', close: 'Fechar', secure: 'Seguro', progress: 'Progresso de leitura', rescan: 'Re-escanear', rendering: 'Renderizando', renderOk: 'Render ok',
  ctaWork: 'Ver trabalhos', ctaContact: 'Contato',
  secs: ['Início', 'Protocolo', 'Stack', 'Trabalhos', 'Build_log', 'Blog', 'Conexão'],
  aboutT: 'Sobre_', protoLabels: ['Entrega', 'Formação', 'Operação'], swipe: 'DESLIZE →', termHint: 'Toque um comando',
  workT: 'Trabalhos_', logT: ['Trajetória', 'acadêmica_'], blogT: 'Blog_',
  cats: ['Plataforma de IA', 'Ranking // TCG', 'Plataforma SaaS', 'Landing page', 'Arquivo // 2023'], running: 'Em execução',
  connT1: 'Vamos', connT2: 'construir_', hold: 'Segure para conectar', holding: 'Conectando', granted: '> Acesso liberado_', skip: 'pular',
  tzT: 'Fusos horários', here: 'meu fuso', lang: 'Idioma', project: 'Projeto', post: 'Post',
  marquee: ['full-stack', 'next.js', 'IA', 'typescript', 'node.js', 'react.js', 'tailwind'],
}

export type Copy = typeof pt

const en: Copy = {
  h1a: 'Full-stack developer', h1b: 'building products', h1c: 'that ship.',
  sub: 'I design and build performant web applications with modern tools — from interface to infrastructure.',
  aboutP: [
    'I’m a full-stack developer focused on shipping clean, maintainable and performant products to production. I work across the whole stack — from interface design in Figma to API deployment.',
    'I hold a postgraduate degree in Full Stack Development from PUC-RS and keep studying AI and digital automation at UniFECAF. I speak advanced English and I’m ready to collaborate remotely with international teams.',
    'Outside the editor, I’m a fast learner who values clear communication, autonomy and delivery. I treat every project as a long-term partnership.',
  ],
  facts: [['Location', 'Porto Alegre, Brazil'], ['Languages', 'Portuguese · English'], ['Availability', 'Open to remote'], ['Focus', 'Web · AI · Automation']],
  soft: ['Advanced English', 'Teamwork', 'Problem solving', 'Communication', 'Adaptability', 'Fast learning', 'Customer service'],
  visit: 'Visit site',
  done: 'Completed', always: 'Always',
  learnTitle: 'Continuous learning',
  learnBody: 'Beyond formal education, I take many specialized courses in web development, AI, design systems and software architecture.',
  blogSub: 'Notes on development, AI and work.', all: 'All',
  blogEmpty: 'No posts yet', blogSoon: 'The first posts are on the way.',
  contactSub: 'Currently available for remote and freelance opportunities. Reach out through whichever channel you prefer.',
  copy: 'Copy email', copied: 'Email copied',
  copyright: '© 2026 Christian Fonseca. All rights reserved.',

  menu: 'Menu', close: 'Close', secure: 'Secure', progress: 'Reading progress', rescan: 'Re-scan', rendering: 'Rendering', renderOk: 'Render ok',
  ctaWork: 'View work', ctaContact: 'Contact',
  secs: ['Boot', 'Protocol', 'Stack', 'Work', 'Build_log', 'Blog', 'Connect'],
  aboutT: 'About_', protoLabels: ['Delivery', 'Training', 'Operation'], swipe: 'SWIPE →', termHint: 'Tap a command',
  workT: 'Work_', logT: ['Academic', 'journey_'], blogT: 'Blog_',
  cats: ['AI platform', 'Ranking // TCG', 'SaaS platform', 'Landing page', 'Archive // 2023'], running: 'Running',
  connT1: 'Let’s', connT2: 'build_', hold: 'Hold to connect', holding: 'Connecting', granted: '> Access granted_', skip: 'skip',
  tzT: 'Time zones', here: 'my time zone', lang: 'Language', project: 'Project', post: 'Post',
  marquee: ['full-stack', 'next.js', 'AI', 'typescript', 'node.js', 'react.js', 'tailwind'],
}

export const COPY: Record<Locale, Copy> = { pt, en }
