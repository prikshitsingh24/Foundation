import { PrismaClient } from "@prisma/client"



const prisma = new PrismaClient();


export async function fetchAllPurchaseOrders(){
    try{
        const purchaseOrderData = await prisma.purchaseOrder.findMany({
            include:{
                purchaseOrderItem:true
            }
        })
        return purchaseOrderData;
    }catch(error){
        console.error(error)
    }
}


export async function createPurchaseOrder(data:any){
    let itemList:any = []
    try {
        if(data.itemList){
            itemList = JSON.parse(data.itemList);
        }
        const isPurchaseOrderRegistered = await prisma.purchaseOrder.create({
            data: {
                series: data.series,
                date: data.date,
                company: data.company,
                supplier: data.supplier,
                requiredBy: data.requiredBy,
                costCenter: data.costCenter,
                project: data.project,
                currency: data.currency,
                setTargetWarehouse: data.setTargetWarehouse,
                taxCategory: data.taxCategory,
                shippingRule: data.shippingRule,
                incoterm: data.incoterm,
                applyAdditionalDiscountOn: data.applyAdditionalDiscountOn,
                additionalDiscountPercentage: data.additionalDiscountPercentage,
                additionalDiscountAmount: data.additionalDiscountAmount,
                supplierAddress: data.supplierAddress,
                supplierContact: data.supplierContact,
                shippingAddress: data.shippingAddress,
                terms: data.terms,
                description: data.description,
                purchaseOrderItem: itemList?{
                    create: itemList.map((item:any)=>({
                            itemCode: item.itemCode,
                            itemName: item.itemName,
                            requiredBy: item.requiredBy,
                            expectedDeliveryDate: item.expectedDeliveryDate,
                            quantity: item.quantity,
                            rate: item.rate,
                            amount: item.amount
                        }))
                }:undefined
            }
        })
        return isPurchaseOrderRegistered;
    } catch (error) {
        console.error("Error creating purchase order:", error);
        throw new Error("Failed to create purchase order");
    }
}



export async function deletePurchaseOrderByIds(ids:string[]){
    try{
        const purchaseOrderDeleted = await prisma.$transaction(async(tx)=>{
            await Promise.all([
                tx.purchaseOrderItem.deleteMany({
                    where:{
                        purchaseOrderId:{
                            in:ids
                        }
                    }
                })
            ])

            const isPurchaseOrderDeleted = await tx.purchaseOrder.deleteMany({
                where:{
                    purchaseOrderId:{
                        in:ids
                    }
                }
            })
            return isPurchaseOrderDeleted;
        })
        return purchaseOrderDeleted;
    }catch(error){
        console.error(error)
    }
}