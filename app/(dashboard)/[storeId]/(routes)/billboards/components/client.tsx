"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";


export const BillboardClient = () => {
    const router = useRouter();
    const params = useParams();
    return(
        <>
            <div className="flex items-center justify-between">

                <Heading
                    title="Panneau d'affichage (0)"
                    description="Gérer les panneaux d'affichage pour votre magasin"
                />
                <Button onClick={() => router.push(`${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Ajouter
                </Button>
                <Separator/>
            </div>

        </>
    )
}