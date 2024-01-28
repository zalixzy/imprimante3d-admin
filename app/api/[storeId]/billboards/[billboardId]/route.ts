import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET (
    req: Request,
    { params }: { params: {billboardId: string } }
){
    try{
       
        if(!params.billboardId){
            return new NextResponse("Un Id de panneau est nécessaire", { status: 400 });
        }
       
        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
               
            },
        });

        return NextResponse.json(billboard);

    } catch ( error ){
        console.log(('[BILLBOARD_GET]'), error );
        return new NextResponse("Erreur interne", { status: 500 });
    }

}

export async function PATCH (
    req: Request,
    { params }: { params: {storeId: string, billboardId: string } }
){
    try{
        const { userId } = auth();
        const body = await req.json();
        const { label, imageUrl } = body;

        if(!userId){
            return new NextResponse("Non identifié", { status: 401 });
        }
        if(!label){
            return new NextResponse("Un label est nécessaire", { status: 400});
        }

        if(!imageUrl){
            return new NextResponse("Une image est requise", { status: 400});
        }
        if(!params.billboardId){
            return new NextResponse("Un Id de panneau est nécessaire", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Non autorisé",{status: 403});
        }

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
                
            },
            data:{
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard);

    } catch ( error ){
        console.log(('[BILLBOARD_PATCH]'), error );
        return new NextResponse("Erreur interne", { status: 500 });
    }

}

export async function DELETE (
    req: Request,
    { params }: { params: {storeId: string, billboardId: string } }
){
    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Non identifié", { status: 401 });
        }
        if(!params.billboardId){
            return new NextResponse("Un Id de panneau est nécessaire", { status: 400 });
        }
        const storeByUserId = await prismadb.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })

        if(!storeByUserId){
            return new NextResponse("Non autorisé",{status: 403});
        }

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
               
            },
        });

        return NextResponse.json(billboard);

    } catch ( error ){
        console.log(('[BILLBOARD_DELETE]'), error );
        return new NextResponse("Erreur interne", { status: 500 });
    }

}