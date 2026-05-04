"use client"

import { useDashboardStats } from "@/hooks/use-dashboard-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics01Icon,
  UserGroupIcon,
  File01Icon,
} from "@hugeicons/core-free-icons"

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Chargement des statistiques...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Tableau de bord</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivité</CardTitle>
            <HugeiconsIcon icon={Analytics01Icon} className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.productivity}%</div>
            <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réunions</CardTitle>
            <HugeiconsIcon icon={UserGroupIcon} className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.reunions} total</div>
            <p className="text-xs text-muted-foreground">Temps moyen : 48 min</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <HugeiconsIcon icon={File01Icon} className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.documents}</div>
            <p className="text-xs text-muted-foreground">+5 nouveaux cette semaine</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
