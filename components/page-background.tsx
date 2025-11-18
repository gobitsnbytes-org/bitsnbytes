import { cn } from '@/lib/utils'

type PageBackgroundProps = {
  className?: string
}

export function PageBackground({ className }: PageBackgroundProps) {
  return (
    <div aria-hidden className={cn('pointer-events-none fixed inset-0 -z-10 overflow-hidden', className)}>
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-b transition-colors duration-500',
          'from-[#fff5fb] via-[#f7f2ff] to-[#fdf7ff]',
          'dark:from-[#030008] dark:via-[#0e061d] dark:to-[#1a0c2f]',
        )}
      />
      <div className="absolute inset-0 opacity-60 mix-blend-soft-light bg-grid-faint" />
      <div className="absolute inset-0 opacity-50 bg-noise-texture" />
      <div className="absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full blur-[160px] bg-accent/20" />
      <div className="absolute left-1/4 bottom-[-5%] h-72 w-72 rounded-full blur-[200px] bg-primary/20" />
    </div>
  )
}

export default PageBackground

