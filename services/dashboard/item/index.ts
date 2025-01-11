
import { PrismaClient } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Item } from "type/item";
import { User } from "type/user";

const prisma = new PrismaClient();


export async function fetchAllItems():Promise<Item[]>{
    try{
        const items = await prisma.item.findMany();
        return items;
    }catch(error){
        console.log(error);
        return [];
    }
}


export async function fetchItemById(id:string){
    try{
        const item = await prisma.item.findMany({
            include:{
                barcode:true,
                accounting:true,
                tax:true,
                supplier:true,
                customerDetails:true
            }
        })
        return item;
    }catch(error){
        console.log(error);
        return [];
    }
}


export async function createItem(details:any) {
    try {
        let barcodeList:any = [];
        let accountingList:any = [];
        let supplierList:any = [];
        let customerList:any = [];
        let taxList:any = [];

        if (details.barcodeList) {
            barcodeList = JSON.parse(details.barcodeList);
        }
        if (details.accountList) {
            accountingList = JSON.parse(details.accountList);
        }
        if (details.supplierList) {
            supplierList = JSON.parse(details.supplierList);
        }
        if (details.customerList) {
            customerList = JSON.parse(details.customerList);
        }
        if (details.taxList) {
            taxList = JSON.parse(details.taxList);
        }

        const createdItem = await prisma.$transaction(async (tx) => {
            // Create the main item with all relationships
            const item = await tx.item.create({
                data: {
                    ID: details.itemCode,
                    name: details.itemName,
                    itemGroup: details.itemGroup,
                    status: "ACTIVE",
                    unitOfMeasure: details.unitOfMeasure,
                    openingStock: details.openingStock,
                    valuationRate: details.valuationRate,
                    standardSellingRate: details.standardSellingRate,
                    brandName: details.brandName,
                    description: details.description,
                    shelfLifeInDays: details.shelfLifeInDays,
                    warrantyPeriod: details.warrantyPeriod,
                    endOfLife: details.endOfLife,
                    weightPerUnit: details.weightPerUnit,
                    defaultMaterialRequestType: details.defaultMaterialRequestType,
                    weightUom: details.weightUom,
                    valuation: details.valuation,
                    defaultPurchaseUnitOfMeasure: details.defaultPurchaseUnitOfMeasure,
                    leadTimeInDays: details.leadTimeInDays,
                    safetyStock: details.safetyStock,
                    countryOfOrigin: details.countryOfOrigin,
                    customsTariffNumber: details.customsTariffNumber,
                    defaultSalesUnitMeasure: details.defaultSalesUnitMeasure,
                    maxDiscount: details.maxDiscount,
                    // Create barcodes
                    barcode: details.barcodeList ? {
                        create: barcodeList.map((barcodeData:any) => ({
                            barcode: barcodeData.barcode,
                            barcodeType: barcodeData.barcodeType,
                            uom: barcodeData.uom
                        }))
                    } : undefined,
                    //Create accounting entries
                    accounting: details.accountList ? {
                        create: accountingList.map((accounting:any) => ({
                            company: accounting.company,
                            defaultWarehouse:accounting.defaultWarehouse,
                            defaultPriceList: accounting.defaultPriceList,
                    
                        }))
                    } : undefined,

                    // Create supplier entries
                    supplier: details.supplierList ? {
                        create: supplierList.map((supplier:any) => ({
                            supplier: supplier.supplier,
                            supplierPartNumber: supplier.supplierPartNumber
                        }))
                    } : undefined,

                    // Create customer details
                    customerDetails: details.customerList ? {
                        create: customerList.map((customer:any) => ({
                            customerName: customer.customerName,
                            customerGroup: customer.customerGroup,
                            refCode: customer.refCode
                        }))
                    } : undefined,

                    // Create tax entries
                    tax: details.taxList ? {
                        create: taxList.map((tax:any) => ({
                            itemTaxTemplate: tax.itemTaxTemplate,
                            taxCategory: tax.taxCategory,
                            validFrom: tax.validFrom,
                            minimumNetRate: tax.minimumNetRate,
                            maximumNetRate: tax.maximumNetRate
                        }))
                    } : undefined
                },
                // Include all relationships in the return value
                include: {
                    barcode: true,
                    accounting: true,
                    supplier: true,
                    customerDetails: true,
                    tax: true
                }
            });

            return item;
        });

        return {
            success: true,
            data: createdItem,
            message: "Item created successfully with all relationships"
        };

    } catch (error) {
        console.error("Error in createItem:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
            message: "Failed to create item"
        };
    }
}


export async function updateItemById(details: any, itemId: string) {
    try {
        let barcodeList: any = [];
        let accountingList: any = [];
        let supplierList: any = [];
        let customerList: any = [];
        let taxList: any = [];

        if (details.barcodeList) {
            barcodeList = JSON.parse(details.barcodeList);
        }
        if (details.accountList) {
            accountingList = JSON.parse(details.accountList);
        }
        if (details.supplierList) {
            supplierList = JSON.parse(details.supplierList);
        }
        if (details.customerList) {
            customerList = JSON.parse(details.customerList);
        }
        if (details.taxList) {
            taxList = JSON.parse(details.taxList);
        }

        const updatedItem = await prisma.$transaction(async (tx) => {
            // First, delete all existing relationships
            await Promise.all([
                tx.barcode.deleteMany({
                    where: { itemId }
                }),
                tx.accounting.deleteMany({
                    where: { itemId }
                }),
                tx.supplier.deleteMany({
                    where: { itemId }
                }),
                tx.customerDetails.deleteMany({
                    where: { itemId }
                }),
                tx.tax.deleteMany({
                    where: { itemId }
                })
            ]);

            // Then update the item with new relationships
            const item = await tx.item.update({
                where: {
                    itemId: itemId
                },
                data: {
                    ID: details.itemCode,
                    name: details.itemName,
                    itemGroup: details.itemGroup,
                    status: "ACTIVE",
                    unitOfMeasure: details.unitOfMeasure,
                    openingStock: details.openingStock,
                    valuationRate: details.valuationRate,
                    standardSellingRate: details.standardSellingRate,
                    brandName: details.brandName,
                    description: details.description,
                    shelfLifeInDays: details.shelfLifeInDays,
                    warrantyPeriod: details.warrantyPeriod,
                    endOfLife: details.endOfLife,
                    weightPerUnit: details.weightPerUnit,
                    defaultMaterialRequestType: details.defaultMaterialRequestType,
                    weightUom: details.weightUom,
                    valuation: details.valuation,
                    defaultPurchaseUnitOfMeasure: details.defaultPurchaseUnitOfMeasure,
                    leadTimeInDays: details.leadTimeInDays,
                    safetyStock: details.safetyStock,
                    countryOfOrigin: details.countryOfOrigin,
                    customsTariffNumber: details.customsTariffNumber,
                    defaultSalesUnitMeasure: details.defaultSalesUnitMeasure,
                    maxDiscount: details.maxDiscount,
                    
                    // Create new barcodes
                    barcode: details.barcodeList ? {
                        createMany: {
                            data: barcodeList.map((barcodeData: any) => ({
                                barcode: barcodeData.barcode,
                                barcodeType: barcodeData.barcodeType,
                                uom: barcodeData.uom
                            }))
                        }
                    } : undefined,

                    // Create new accounting entries
                    accounting: details.accountList ? {
                        createMany: {
                            data: accountingList.map((accounting: any) => ({
                                company: accounting.company,
                                defaultWarehouse: accounting.defaultWarehouse,
                                defaultPriceList: accounting.defaultPriceList,
                            }))
                        }
                    } : undefined,

                    // Create new supplier entries
                    supplier: details.supplierList ? {
                        createMany: {
                            data: supplierList.map((supplier: any) => ({
                                supplier: supplier.supplier,
                                supplierPartNumber: supplier.supplierPartNumber
                            }))
                        }
                    } : undefined,

                    // Create new customer details
                    customerDetails: details.customerList ? {
                        createMany: {
                            data: customerList.map((customer: any) => ({
                                customerName: customer.customerName,
                                customerGroup: customer.customerGroup,
                                refCode: customer.refCode
                            }))
                        }
                    } : undefined,

                    // Create new tax entries
                    tax: details.taxList ? {
                        createMany: {
                            data: taxList.map((tax: any) => ({
                                itemTaxTemplate: tax.itemTaxTemplate,
                                taxCategory: tax.taxCategory,
                                validFrom: tax.validFrom,
                                minimumNetRate: tax.minimumNetRate,
                                maximumNetRate: tax.maximumNetRate
                            }))
                        }
                    } : undefined
                },
                include: {
                    barcode: true,
                    accounting: true,
                    supplier: true,
                    customerDetails: true,
                    tax: true
                }
            });

            return item;
        });

        return {
            success: true,
            data: updatedItem,
            message: "Item updated successfully with all relationships"
        };

    } catch (error) {
        console.error("Error in updateItem:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
            message: "Failed to update item"
        };
    }
}




export async function deleteRolesByItemIds(itemIds: string[]) {
    try {
        const result = await prisma.$transaction(async (tx) => {
            await Promise.all([
                tx.tax.deleteMany({
                    where: { itemId: { in: itemIds } }
                }),
                // Delete CustomerDetails
                tx.customerDetails.deleteMany({
                    where: { itemId: { in: itemIds } }
                }),
                // Delete Supplier records
                tx.supplier.deleteMany({
                    where: { itemId: { in: itemIds } }
                }),
                // Delete accounting records
                tx.accounting.deleteMany({
                    where: { itemId: { in: itemIds } }
                }),
                // Delete barcodes
                tx.barcode.deleteMany({
                    where: { itemId: { in: itemIds } }
                })
            ]);

            // Finally delete the items
            const deletedItemsResult = await tx.item.deleteMany({
                where: {
                    itemId: { in: itemIds }
                }
            });

            return {
                count: deletedItemsResult.count,
                itemIds: itemIds
            };
        });

        return {
            success: true,
            data: result,
            message: `Successfully deleted ${result.count} items and their related records`
        };

    } catch (error) {
        console.error("Error in deleteItems:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error occurred",
            message: "Failed to delete items",
            failedItemIds: itemIds
        };
    }
}
