import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";


const BillboardPage = async ({
    params
  }: {
    params: { billboardId: string }
  }) => {
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId
      }
    });
  
    return ( 
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardForm initialData={billboard} />
        </div>
      </div>
    );
  }

  
// const BillboardPage = async ({
//   params
// }: {
//   params: { billboardId: string }
// }) => {
//   if (!params.billboardId) {
//     // Gérer le cas où l'ID n'est pas défini, par exemple, rediriger vers une page d'erreur.
//     return <div>Erreur : ID de billboard non défini</div>;
//   }

//   const billboard = await prismadb.billboard.findUnique({
//     where: {
//       id: params.billboardId
//     }
//   });

//   return (
//     <div className="flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <BillboardForm initialData={billboard} />
//       </div>
//     </div>
//   );
// };
  

export default BillboardPage;