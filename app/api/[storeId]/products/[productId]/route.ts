import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET (
    req: Request,
    { params }: { params: {productId: string } }
){
    try{
       
        if(!params.productId){
            return new NextResponse("L'id d'un produit est nécessaire", { status: 400 });
        }
       
        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
               
            },
            include:{
                images: true,
                category: true,
                color: true,
                size: true
            }
        });

        return NextResponse.json(product);

    } catch ( error ){
        console.log(('[PRODUCT_GET]'), error );
        return new NextResponse("Erreur interne", { status: 500 });
    }

}

export async function PATCH (
    req: Request,
    { params }: { params: {storeId: string, productId: string } }
){
    try{
        const { userId } = auth();
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
            return new NextResponse("Non identifié", { status: 401 });
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
        if(!params.productId){
            return new NextResponse("Un id produit est requis", {status:400});
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

        await prismadb.product.update({
            where: {
                id: params.productId,
                
            },
            data:{
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                images: {
                    deleteMany:{
                        
                    }
                },
                isFeatured,
                isArchived
            }
        });

        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
                data:{
                    images:{
                        createMany:{
                            data:[
                                ...images.map((image: {url: string}) => image)
                            ]
                        }
                    }
                }
        })

        return NextResponse.json(product);

    } catch ( error ){
        console.log(('[PRODUCT_PATCH]'), error );
        return new NextResponse("Erreur interne", { status: 500 });
    }

}

export async function DELETE (
    req: Request,
    { params }: { params: {storeId: string, productId: string } }
){
    try{
        const { userId } = auth();

        if(!userId){
            return new NextResponse("Non identifié", { status: 401 });
        }
        if(!params.productId){
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

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,    
            },
        });

        return NextResponse.json(product);

    } catch ( error ){
        console.log(('[PRODUCT_DELETE]'), error );
        return new NextResponse("Erreur interne", { status: 500 });
    }

}