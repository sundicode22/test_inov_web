import { useQuery } from "@tanstack/react-query"

interface DashboardStats {
  productivity: number
  reunions: number
  documents: number
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    productivity: 94,
    reunions: 8,
    documents: 23,
  }
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  })
}
