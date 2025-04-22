
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, FolderTree, ArrowRight } from "lucide-react"
import { getStatistics } from "@/action/dashboard.action"
import DashboardLinks from "./_components/dashboard-links"

export default async function AdminDashboardPage() {
  const { totalFoods: foodCount, totalCategories: categoryCount } = await getStatistics()

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-2 border-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jami taomlar</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{foodCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jami kategoriyalar</CardTitle>
            <FolderTree className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">{categoryCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      <DashboardLinks />
    </div>
  )
}
