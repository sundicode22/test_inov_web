import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, MessageCircle, Plus } from "lucide-react";
import { heroAccentGlow, heroAccentGradient } from "./constants";

type ProfilHeroBannerProps = {
  displayName: string;
  email: string;
  initials: string;
  adresse?: string | null;
};

export function ProfilHeroBanner({
  displayName,
  email,
  initials,
  adresse,
}: ProfilHeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border flex-shrink-0 border-slate-800/90 bg-slate-950 p-8 text-white shadow-xl">
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-88 w-88 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[90px]"
        aria-hidden
      />
      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-6">
          <div
            className={`flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-4xl font-bold text-white bg-gradient-to-br from-[#00D2FF] via-[#00A3FF] to-[#0061FF] shadow-[0_8px_20px_-4px_rgba(0,163,255,0.3)]`}
          >
            {initials}
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-3xl font-bold tracking-tight">
                {displayName}
              </h2>
              <span
                className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00D2FF] via-[#00A3FF] to-[#0061FF] text-white shadow-[0_8px_20px_-4px_rgba(0,163,255,0.3)]`}
                title="Compte vérifié"
              >
                <Check className="size-3.5 stroke-3" aria-hidden />
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-slate-400">
              <span>{email}</span>
              <span className="text-slate-600">·</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-950/90 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                <span className="size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_6px_1px_rgba(52,211,153,0.7)]" />
                Actif
              </span>
              {adresse?.trim() ? (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-300">{adresse.trim()}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="h-11 rounded-lg border-slate-500/70 bg-slate-950/40 font-semibold text-white backdrop-blur-sm hover:bg-slate-800/80 hover:text-white"
            asChild
          >
            <Link href="/dashboard/conversations">
              <MessageCircle className="mr-2 size-4" strokeWidth={1.75} />
              Démarrer un chat
            </Link>
          </Button>
          <Button
            asChild
            className={`h-11 rounded-lg border-0 px-5 font-semibold text-white transition hover:brightness-110 ${heroAccentGradient} ${heroAccentGlow}`}
          >
            <Link href="/dashboard/calendrier">
              <Plus className="mr-2 size-4 stroke-[2.5]" />
              Nouvelle action
            </Link>
          </Button>
        </div>
      </div>
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500/12 blur-[100px]"
        aria-hidden
      />
    </div>
  );
}
