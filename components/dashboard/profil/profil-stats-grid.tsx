import {
  Activity,
  Briefcase,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { capitalizeFirst } from "@/utils/profile";

type ProfilStatsGridProps = {
  roleLabel: string;
  memberSinceLabel: string;
  memberSinceRelative: string;
  cityLine: string;
  locationSecondLine: string;
};

export function ProfilStatsGrid({
  roleLabel,
  memberSinceLabel,
  memberSinceRelative,
  cityLine,
  locationSecondLine,
}: ProfilStatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 ">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
          <div className="flex size-9 items-center justify-center rounded-lg border border-blue-100/80 bg-blue-50 text-blue-600">
            <Briefcase className="size-4" />
          </div>
          Rôle
        </div>
        <div>
          <span className="mb-1 inline-block rounded-lg border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
            {roleLabel}
          </span>
          <p className="mt-2 text-sm font-medium text-slate-500">
            Profil métier renseigné par votre organisation
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 ">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
          <div className="flex size-9 items-center justify-center rounded-lg border border-emerald-100/80 bg-emerald-50 text-emerald-600">
            <Activity className="size-4" />
          </div>
          Statut
        </div>
        <div>
          <div className="mb-1 flex items-center gap-2 font-bold text-emerald-600">
            <span className="size-2 rounded-full bg-emerald-500" />
            Actif
          </div>
          <p className="mt-2 text-sm font-medium text-slate-500">
            En ligne maintenant
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 ">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
          <div className="flex size-9 items-center justify-center rounded-lg border border-purple-100/80 bg-purple-50 text-purple-600">
            <CalendarDays className="size-4" />
          </div>
          Membre depuis
        </div>
        <div>
          <div className="mb-1 font-bold text-slate-900">{memberSinceLabel}</div>
          {memberSinceRelative ? (
            <p className="mt-2 text-sm font-medium text-slate-500">
              {capitalizeFirst(memberSinceRelative)}
            </p>
          ) : (
            <p className="mt-2 text-sm font-medium text-slate-500">
              Date d&apos;inscription indisponible
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6">
        <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
          <div className="flex size-9 items-center justify-center rounded-lg border border-orange-100/80 bg-orange-50 text-orange-600">
            <MapPin className="size-4" />
          </div>
          Localisation
        </div>
        <div>
          <div className="mb-1 font-bold text-slate-900">{cityLine}</div>
          <p className="mt-2 text-sm font-medium text-slate-500">
            {locationSecondLine}
          </p>
        </div>
      </div>
    </div>
  );
}
