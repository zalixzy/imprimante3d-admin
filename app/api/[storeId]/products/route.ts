import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb"   

export async function POST(
    req: Request,
    { params }: { params:{storeId: string} }
){
    try{
        const {userId} = auth();
        const body = await req.json();
        const { 
            name, 
            price, 
            categoryId,
            sizeId,
            colorId,
            images,
            isFeatured,
            isArchived
        } = body;

        if(!userId){
            return new NextResponse("Non authentifié", {status:401});
        }

        if(!name){
            return new NextResponse("Un nom est requis", {status:400});
        }

        if(!images || !images.length){
            return new NextResponse("Des images sont requises", {status: 400})
        }

        if(!price){
            return new NextResponse("Un prix est requis", {status:400});
        }
        if(!sizeId){
            return new NextResponse("Un sizeId est requis", {status:400});
        }
        if(!colorId){
            return new NextResponse("Un colorId est requis", {status:400});
        }
        if(!categoryId){
            return new NextResponse("Un categoryId est requis", {status:400});
        }


        if(!params.storeId){
            return new NextResponse("Un Id magasin est requis", {status:400});
        }

        const storeByUserId =  await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if(!storeByUserId){
            return new NextResponse("Non autorisé", {status: 403});
        }

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isArchived,
                isFeatured,
                colorId,
                categoryId,
                sizeId,
                storeId: params.storeId,
                images:{
                    createMany: {
                        data:{
                            ...images.map((image: { url : string }) => image)
                        }
                    }
                }
            }
        })
        return NextResponse.json(product);
    }catch (error){
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}


export async function GET(
    req: Request,
    { params }: { params:{storeId: string} }
){
    try{

       const { searchParams } = new URL(req.url);
       const categoryId =  searchParams.get("categoryId") || undefined; 
       const colorId =  searchParams.get("colorId") || undefined;
       const sizeId =  searchParams.get("sizeId")  || undefined; 
       const isFeatured =  searchParams.get("isFeatured")   
        

        if(!params.storeId){
            return new NextResponse("Un Id magasin est requis", {status:400});
        }

        const products = await prismadb.product.findMany({
           where:{
            storeId: params.storeId,
            categoryId,
            sizeId,
            colorId,
            isFeatured: isFeatured? true : undefined,
            isArchived: false
           },
           include: {
            images: true,
            category: true,
            size: true,
            color: true
           },
           orderBy: {
            createdAt: 'desc',
           }
        })
        return NextResponse.json(products);
    }catch (error){
        console.log('[PRODUCTS_GET]', error);
        return new NextResponse("Internal error", {status: 500})
    }
}