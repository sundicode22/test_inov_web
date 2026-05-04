"use client";

import { ProfilErrorState } from "@/components/dashboard/profil/profil-error-state";
import { ProfilHeroBanner } from "@/components/dashboard/profil/profil-hero-banner";
import { ProfilPageSkeleton } from "@/components/dashboard/profil/profil-page-skeleton";
import { ProfilPageToolbar } from "@/components/dashboard/profil/profil-page-toolbar";
import { ProfilRecentActivity } from "@/components/dashboard/profil/profil-recent-activity";
import { ProfilStatsGrid } from "@/components/dashboard/profil/profil-stats-grid";
import { useUser } from "@/hooks/use-user";
import {
  capitalizeFrMonthYear,
  initialsFromName,
  splitAddress,
} from "@/utils/profile";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useSession } from "next-auth/react";

export default function ProfilPage() {
  const { data: user, isLoading, isError, refetch } = useUser();
  const { data: session } = useSession();

  if (isLoading) {
    return <ProfilPageSkeleton />;
  }

  if (isError || !user) {
    return <ProfilErrorState onRetry={() => refetch()} />;
  }

  const displayName =
    `${user.prenom} ${user.nom}`.trim() ||
    session?.user?.name?.trim() ||
    user.email;
  const email = user.email || session?.user?.email || "";
  const roleLabel =
    user.role?.trim() || session?.user?.role?.trim() || "—";
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
      <ProfilPageToolbar />
      <ProfilHeroBanner
        displayName={displayName}
        email={email}
        initials={initials}
        adresse={user.adresse}
      />
      <ProfilStatsGrid
        roleLabel={roleLabel}
        memberSinceLabel={memberSinceLabel}
        memberSinceRelative={memberSinceRelative}
        cityLine={cityLine}
        locationSecondLine={locationSecondLine}
      />
      <ProfilRecentActivity />
    </div>
  );
}
