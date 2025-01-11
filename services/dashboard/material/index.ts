import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

export async function fetchAllMaterialRequested(){
    try{
        const data = await prisma.materialRequested.findMany({
            include:{
                material:true
            }
        });
        if(data){
            return data;
        }
        return [];
    }catch(error){
        console.log(error);
    }
}



export async function createMaterialRequested(details:any){
    let materialList:any=[];
    try{
        if(details.materialList){
            materialList = JSON.parse(details.materialList)
        }
        const isMaterialRequested = await prisma.materialRequested.create({
            data:{
                ID:details.series,
                transactionDate:details.transactionDate,
                status:"DRAFT",
                purpose:details.purpose,
                requiredBy:details.requiredBy,
                company: details.company,
                setTargetWarehouse: details.setTargetWarehouse,
                material: materialList?{
                    createMany:{
                        data: materialList.map((material: any) => ({
                                itemCode: material.itemCode,
                                requiredBy: material.requiredBy,
                                itemName: material.itemName,
                                description: material.description,
                                quantity: material.quantity,
                                uom: material.uom,
                                uomConversionFactor: material.uomConversionFactor,
                                targetWarehouse: material.targetWarehouse,
                                rate: material.rate,
                                expenseAccount: material.expenseAccount,
                                wipCompositeAsset: material.wipCompositeAsset,
                                manufacturer: material.manufacturer,
                                bomNo: material.bomNo,
                                project: material.project,
                                costCenter: material.costCenter
                              }))
                        
                    }
                }:undefined

            }
        })
        if(isMaterialRequested){
            return true;
        }
        return false;
    }catch(error){
        console.error(error);
    }
}


export async function  deleteMaterialRequiredByIds(ids:string[]){
    try{
        const isDeleted = await prisma.$transaction(async(tx)=>{
            await Promise.all([
                tx.material.deleteMany({
                    where: { materialRequestedId: { in: ids } }
                }),
            ])

            const isMaterialRequestedDeleted = await tx.materialRequested.deleteMany({
                where:{
                    materialRequestedId:{
                        in : ids
                    }
                }
            })

            return {
                isMaterialRequestedDeleted
            };
        });
        if(isDeleted){
            return true;
        }
        return false;
    }catch(error){
        console.error(error)
    }
}
