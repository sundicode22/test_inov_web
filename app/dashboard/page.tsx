"use client"

import { useDashboardStats } from "@/hooks/use-dashboard-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, FileText } from "lucide-react"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats()
  const { data: session } = useSession()

  if (isLoading) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto">
        <p>Chargement des statistiques...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Tableau de bord</h1>
        {session?.user && (
          <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full border border-border">
            Connecté en tant que <span className="font-bold text-foreground">{session.user.email}</span>
          </div>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivité</CardTitle>
            <BarChart3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.productivity}%</div>
            <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Réunions</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.reunions} total</div>
            <p className="text-xs text-muted-foreground">Temps moyen : 48 min</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="size-4 text-muted-foreground" />
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
