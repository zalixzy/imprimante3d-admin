"use client";

import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

import { 
    DropdownMenu, 
    DropdownMenuTrigger,
    DropdownMenuContent, 
    DropdownMenuLabel,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Copy, Delete, Edit, MoreHorizontal } from "lucide-react";
import { AlertModal } from "@/components/modals/alter-modal";

import { ColorColumn } from "./columns";







interface CellActionProps{
    data: ColorColumn
}

export const CellAction: React.FC<CellActionProps> =({
    data
}) =>{
    const params = useParams();
    const router = useRouter();
    const onCopy = (id: string) =>{
        navigator.clipboard.writeText(id);
        toast.success("L'id d'une couleur a été copiée avec succès")
    }

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/colors/${data.id}`)
            router.refresh();
            toast.success("Bravo! Couleur supprimée")
        } catch(erro){
            toast.error("Supprimez tous les produits liés à cette couleur d'abord.")
        } finally{
            setLoading(false)
            setOpen(false)
        }
    }
    return(
     <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir le menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4"/>
                        Copier l'Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
                        <Edit className="mr-2 h-4 w-4"/>
                        Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Delete className="mr-2 h-4 w-4"/>
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>   
     </>  
    )
}