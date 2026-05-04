import { cn } from "@/lib/utils"

export function LogoIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex size-10 items-center justify-center rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]", className)}>
      <div className="size-6 rounded-full border-[3px] border-white/90" />
      <div className="absolute bottom-2 right-2 size-2.5 bg-cyan-400 rounded-sm" />
    </div>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoIcon />
      <div className="flex flex-col leading-tight">
        <span className="text-xl font-bold tracking-tight text-white">Inov Consulting</span>
        <span className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">
          AI Assistant Platform
        </span>
      </div>
    </div>
  )
}
