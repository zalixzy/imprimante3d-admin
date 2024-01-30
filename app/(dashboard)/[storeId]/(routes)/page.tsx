import { getTotalRevenu } from "@/actions/get-total-revenu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { getSalesCount } from "@/actions/get-sales-count";
import { CreditCard, EuroIcon, Package } from "lucide-react";
import { getStockCount } from "@/actions/get-stock-count";
import { Overview } from "@/components/overview";
import { getGraphRevenue } from "@/actions/get-graph-revenu";

interface DashBoardPageProps {
    params: { storeId: string }
};
const DashboardPage: React.FC<DashBoardPageProps> = async  ({
    params 
}) => {

    const totalRevenu= await getTotalRevenu(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphRevenu = await getGraphRevenue(params.storeId);
        return(
        <div className="flex-col">
           <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Tableau de bord" description="Vue d'ensemble du magasin"/>
                <Separator/>
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Revenue total
                            </CardTitle>
                            <EuroIcon className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold">
                                {formatter.format(totalRevenu)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Ventes
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold">
                                {salesCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Produits en stock
                            </CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl font-bold">
                                {stockCount}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-4">
                        <CardHeader>
                         <CardTitle>Vue d'ensemble</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview data={graphRevenu} />
                        </CardContent>
                    </Card>
                </div>
           </div>
        </div>
    );
} 

export default DashboardPage;