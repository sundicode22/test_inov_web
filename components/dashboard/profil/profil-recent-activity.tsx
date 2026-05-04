import { Button } from "@/components/ui/button";
import { Activity, MessageCircle, Users } from "lucide-react";

export function ProfilRecentActivity() {
  return (
    <div className="mt-2 flex-1 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] p-6">
        <h3 className="text-xl font-bold text-slate-900">Activité récente</h3>
        <Button
          variant="ghost"
          className="h-9 rounded-lg font-bold text-blue-600 hover:bg-blue-50 hover:text-blue-700"
        >
          Voir tout
        </Button>
      </div>
      <div className="p-6">
        <div className="relative space-y-10 pl-8 before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-slate-200">
          <div className="relative">
            <div className="absolute left-[-32px] z-10 flex size-8 items-center justify-center rounded-full border-[3px] border-white bg-blue-50 text-blue-600 shadow-sm ring-1 ring-[#E5E7EB]">
              <MessageCircle className="size-3.5" strokeWidth={1.75} />
            </div>
            <div className="-mt-1.5 space-y-1.5">
              <p className="text-sm font-bold text-slate-900">
                Nouvelle conversation
              </p>
              <p className="text-sm font-medium text-slate-500">
                Discussion sur le projet Q2 2026
              </p>
              <p className="text-xs font-semibold text-slate-400">
                Il y a 2 heures
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-32px] z-10 flex size-8 items-center justify-center rounded-full border-[3px] border-white bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-[#E5E7EB]">
              <Activity className="size-3.5" />
            </div>
            <div className="-mt-1.5 space-y-1.5">
              <p className="text-sm font-bold text-slate-900">Rapport généré</p>
              <p className="text-sm font-medium text-slate-500">
                Analyse mensuelle des performances
              </p>
              <p className="text-xs font-semibold text-slate-400">
                Il y a 5 heures
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[-32px] z-10 flex size-8 items-center justify-center rounded-full border-[3px] border-white bg-purple-50 text-purple-600 shadow-sm ring-1 ring-[#E5E7EB]">
              <Users className="size-3.5" />
            </div>
            <div className="-mt-1.5 space-y-1.5">
              <p className="text-sm font-bold text-slate-900">
                Réunion planifiée
              </p>
              <p className="text-sm font-medium text-slate-500">
                Briefing équipe - Jeudi 14:00
              </p>
              <p className="text-xs font-semibold text-slate-400">
                Il y a 1 jour
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
