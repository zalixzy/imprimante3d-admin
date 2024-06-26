"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { BillboardColumn, columns } from "./columns";





interface BillboardClientProps{
    data: BillboardColumn[]
}
export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return(
        <>
            <div className="flex items-center justify-between">

                <Heading
                    title={`Panneau d'affichage (${data.length})`}
                    description="Gérer les panneaux d'affichage pour votre magasin"
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Ajouter
                </Button>    
            </div>
            <Separator/>
            <DataTable searchKey="label" columns={columns} data={data}/>
            <Heading title="API" description="Appels d'API pour les panneaux d'affichage"/>
            <Separator/>
            <ApiList entityName="billboards" entityIdName="billboardsId" />
        </>
    )
}