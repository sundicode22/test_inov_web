import { cn } from "@/lib/utils"

export function LogoIcon({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex size-10 items-center justify-center rounded-xl bg-[#0066FF] shadow-[0_0_25px_rgba(0,102,255,0.5),0_0_50px_rgba(0,102,255,0.2)]", className)}>
      <div className="size-6 rounded-full border-[3px] border-white" />
      <div className="absolute bottom-[7px] right-[7px] size-[10px] rounded-[2px] bg-[#00F0FF] border-[2px] border-[#0066FF]" />
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
