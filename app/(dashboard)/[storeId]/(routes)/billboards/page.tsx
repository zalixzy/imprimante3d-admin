
import { BillboardClient } from "./components/client";


const BillboardsPage = () => {
    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BillboardClient/>
            </div>
            Panneau d'affichage
        </div>
    )
}

export default BillboardsPage;