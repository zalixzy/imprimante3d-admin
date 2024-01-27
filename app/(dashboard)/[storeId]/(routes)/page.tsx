import prismadb from "@/lib/prismadb";

interface DashBoardPageProps {
    params: { storeId: string }
};
const DashboardPage: React.FC<DashBoardPageProps> = async  ({
    params 
}) => {
        const store = await prismadb.store.findFirst({
            where:{
                id: params.storeId
            }
        });
        return(
        <div>
            Magasin actif: {store?.name}
        </div>
    );
} 

export default DashboardPage;