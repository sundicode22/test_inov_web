"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  MessageSquare,
  Plus,
  Check,
  Briefcase,
  Activity,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import {
  capitalizeFirst,
  capitalizeFrMonthYear,
  initialsFromName,
  splitAddress,
} from "@/utils/profile";

/** Shared cyan → blue gradient + soft blue outer glow (avatar & primary CTA) */
const heroAccentGradient =
  "bg-gradient-to-br from-sky-400 via-blue-600 to-blue-800";
const heroAccentGlow =
  "shadow-[0_0_28px_-4px_rgba(56,189,248,0.55),0_14px_44px_-10px_rgba(37,99,235,0.5)]";

function ProfilPageSkeleton() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto bg-slate-50/50 p-6 lg:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40 rounded-lg" />
          <Skeleton className="h-5 w-full max-w-md rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-28 rounded-lg" />
          <Skeleton className="h-11 w-40 rounded-lg" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950 p-8 shadow-xl">
        <div
          className="pointer-events-none absolute -left-24 top-1/2 h-88 w-88 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[90px]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <Skeleton className="size-24 shrink-0 rounded-2xl bg-slate-600/40 shadow-[0_0_24px_-2px_rgba(56,189,248,0.35)]" />
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-9 w-56 rounded-lg bg-slate-600/40" />
                <Skeleton className="size-5 shrink-0 rounded-full bg-slate-600/40" />
              </div>
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-4 w-52 rounded-md bg-slate-600/40" />
                <Skeleton className="h-4 w-24 rounded-md bg-slate-600/40" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-11 w-44 rounded-lg bg-slate-600/40" />
            <Skeleton className="h-11 w-40 rounded-lg bg-slate-600/40" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500/12 blur-[100px]"
          aria-hidden
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <Skeleton className="h-6 w-32 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
          </div>
        ))}
      </div>

      <div className="mt-2 flex-1 rounded-2xl border border-[#E5E7EB] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] p-6">
          <Skeleton className="h-7 w-40 rounded-lg" />
          <Skeleton className="h-9 w-20 rounded-lg" />
        </div>
        <div className="space-y-8 p-6 pl-14">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-48 rounded-md" />
              <Skeleton className="h-4 w-full max-w-sm rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProfilPage() {
  const { data: user, isLoading, isError, refetch } = useUser();

  if (isLoading) {
    return <ProfilPageSkeleton />;
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 overflow-y-auto bg-slate-50/50 p-6 text-center">
        <p className="text-slate-600">Impossible de charger votre profil.</p>
        <Button type="button" onClick={() => refetch()}>
          Réessayer
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Retour au tableau de bord</Link>
        </Button>
      </div>
    );
  }

  const displayName = `${user.prenom} ${user.nom}`.trim() || user.email;
  const email = user.email;
  const roleLabel = user.role || "—";
  const initials = initialsFromName(displayName);

  const createdAt = user.created_at ? new Date(user.created_at) : null;
  const memberSinceLabel = createdAt
    ? capitalizeFrMonthYear(format(createdAt, "MMMM yyyy", { locale: fr }))
    : "—";
  const memberSinceRelative = createdAt
    ? formatDistanceToNow(createdAt, { locale: fr, addSuffix: true })
    : "";

  const { line1: cityLine, line2: countryLine } = splitAddress(user.adresse);
  const locationSecondLine = countryLine || "Cameroun";

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto bg-slate-50/50 p-6 lg:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mon profil</h1>
          <p className="mt-0.5 text-base text-slate-500">
            Gérez vos informations personnelles et préférences de compte.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 rounded-lg border border-[#E5E7EB] bg-white font-semibold shadow-sm"
          >
            <Download className="mr-2 size-4" />
            Exporter
          </Button>
          <Button className="h-11 rounded-lg border border-slate-900 bg-slate-900 font-semibold text-white shadow-md hover:bg-slate-800">
            Modifier le profil
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950 p-8 text-white shadow-xl">
        {/* Ambient blue glow — left (behind identity) + right */}
        <div
          className="pointer-events-none absolute -left-24 top-1/2 h-88 w-88 -translate-y-1/2 rounded-full bg-sky-500/15 blur-[90px]"
          aria-hidden
        />
        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <div
              className={`flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-4xl font-bold text-white ${heroAccentGradient} ${heroAccentGlow}`}
            >
              {initials}
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-3xl font-bold tracking-tight">
                  {displayName}
                </h2>
                <span
                  className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full ${heroAccentGradient} text-white ${heroAccentGlow}`}
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
                {user.adresse?.trim() ? (
                  <>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-300">
                      {user.adresse.trim()}
                    </span>
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
                <MessageSquare className="mr-2 size-4" strokeWidth={1.75} />
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
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

        <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
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

        <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
            <div className="flex size-9 items-center justify-center rounded-lg border border-purple-100/80 bg-purple-50 text-purple-600">
              <CalendarDays className="size-4" />
            </div>
            Membre depuis
          </div>
          <div>
            <div className="mb-1 font-bold text-slate-900">
              {memberSinceLabel}
            </div>
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

        <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
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
                <MessageSquare className="size-3.5" strokeWidth={1.75} />
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
                <p className="text-sm font-bold text-slate-900">
                  Rapport généré
                </p>
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
    </div>
  );
}
