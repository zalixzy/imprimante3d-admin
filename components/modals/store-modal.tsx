"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import {useState} from "react"
import axios from "axios";

import { Modal } from "@/components/ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
    } from "@/components/ui/form"
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const[loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        // console.log(values);
        try{
            setLoading(true);

            const response = await axios.post('/api/stores', values);

            console.log(response.data);
        }catch(error){
            console.log(error);

        } finally{
            setLoading(false);
        }
    }

    return(
    <Modal
    title="Créer un magasin"
    description="Soit créatif et choisit LE site qui fera toute la différence #pasdutout"
    isOpen={storeModal.isOpen}
    onClose={storeModal.onClose}>
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control ={form.control}
                            name="name"
                            render ={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input 
                                        disabled={loading}
                                         placeholder="Site à pognon" {...field}
                                         />
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button 
                            disabled={loading}
                            variant="outline" onClick={storeModal.onClose}>
                                Abandonner</Button>
                            <Button 
                            disabled={loading} 
                            type="submit">Continuer</Button>
                        </div>
                    </form>
                </Form>

            </div>
        </div>
    </Modal>
    );
}