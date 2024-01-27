
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
 
export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
}) {    
    // Verification de connexion avec auth
    const { userId } =  auth();

    if(!userId){
        redirect('/sign-in');
    }
   
    // On regarde le premier store disponible avec le user login
    const store = await prismadb.store.findFirst({
        where:{
            userId: userId
        }
    });
    // Si ce store existe on redirige vers le storeId qui va nous amener vers le dashboard correspondant
    if(store){
        redirect(`/${store.id}`);
    }

    return(
        <>
            {children};
        </>
    )
}