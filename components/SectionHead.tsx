import { cn } from '@/lib/utils'

export function SectionLabel({
  n,
  children,
  className,
  numberClassName = 'text-acc',
}: {
  n: string
  children: React.ReactNode
  className?: string
  numberClassName?: string
}) {
  return (
    <div className={cn('flex items-baseline gap-2.5 text-xs tracking-[0.06em] uppercase', className)}>
      <span className={numberClassName}>/{n}</span>
      <span>{children}</span>
    </div>
  )
}

/** H2 que revela da esquerda para a direita quando a seção entra na viewport. */
export function RevealTitle({
  revealed,
  children,
  className,
  size = 'text-[68px] md:text-[96px] lg:text-[120px]',
}: {
  revealed: boolean
  children: React.ReactNode
  className?: string
  size?: string
}) {
  return (
    <h2
      className={cn(
        'm-0 font-display leading-[0.85] uppercase transition-[clip-path] duration-900 ease-cut motion-reduce:transition-none',
        size,
        className,
      )}
      // Margem vertical negativa para não cortar acentos (Õ, Ç) acima da caixa
      style={{ clipPath: `inset(-30% ${revealed ? '0%' : '100%'} -30% 0)` }}
    >
      {children}
    </h2>
  )
}
