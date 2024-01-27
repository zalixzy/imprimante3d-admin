"use client";

import * as z from "zod"
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";


import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alter-modal";
import { ApiAlert } from "@/components/ui/api-alert";








interface SettingsFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const router = useRouter(); 
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    });

    const onSubmit = async (data: SettingsFormValues) => {
        try{
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh();
            toast.success("Magasin mis à jours");
        }catch(error){
            toast.error("Une erreur s'est produite")
        }finally{
            setLoading(false);  
        }
    };

    const onDelete = async () => {
        try{
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh();
            router.push("/");
            toast.success("Bravo! Magasin supprimé!")
        } catch(erro){
            toast.error("Supprimez tout les produits et catégories d'abord.")
        } finally{
            setLoading(false)
            setOpen(false)
        }
    }

  
    return (
        <>

            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Paramètres"
                    description="Gérer les paramètres du magasin"
                    />
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4"/>
                </Button>
            </div>
          <Separator/>  
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) =>(
                            <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Nom du magasin" {...field}/>

                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        
                    />
                </div>
                <Button disabled={loading} className="ml-auto" type="submit">
                    Sauvegarder les changements
                </Button>
            </form>
            
          </Form>
          <Separator/>
          <ApiAlert 
            title= "NEXT_PUBLIC_API_URL" 
            description ={`${origin}/api/${params.storeId}`} 
            variant="public"
          />
        </>
    )
}