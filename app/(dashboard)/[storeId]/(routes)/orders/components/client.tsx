"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";


import { OrderColumn, columns } from "./columns";





interface OrderClientProps{
    data: OrderColumn[]
}
export const OrderClient: React.FC<OrderClientProps> = ({
    data
}) => {
    return(
        <>
            <Heading
                title={`Commandes (${data.length})`}
                description="Gérer les commandes pour votre magasin"
            />   
            <Separator/>
            <DataTable searchKey="products" columns={columns} data={data}/>
        </>
    )
}