import { PrismaClient } from "@prisma/client";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Item } from "type/item";
import { User } from "type/user";


//////////////////////////////////// Home services  /////////////////////////////////////////


export async function fetchCompany(){
    const companyDetails = await prisma.company.findMany();
    return companyDetails;
}






//////////////////////////////////// User services  /////////////////////////////////////////


const prisma = new PrismaClient();

export async function fetchUserById(userId: string){
    
    try{
        const userDetails = await prisma.user.findUnique({
            where:{
                userId: userId
            },
            include:{
                role:true
            }
        })
        if(userDetails){
            return userDetails
        }
        return -1;
    }catch(error){
        console.log(error);
    }
}

export async function fetchAllUsers():Promise<any>{
    try{
        const allUsers = await prisma.user.findMany({
            include: {
              role: true,
            },
          });
        return allUsers;
    }catch(error){
        console.log(error);
        return [];
    }
}

export async function registerUser(userData:any){
    try{
        const registeredUser = await prisma.user.create({
            data: {
                firstName:      userData.firstName, 
                middleName:     userData.middleName,    
                lastName:       userData.lastName,      
                username:       userData.username,      
                email:          userData.email,         
                password:       userData.password,      
                roleId:         userData.role,
                status:         "ACTIVE", 
                gender:         userData.gender,
                phoneNumber:    userData.phoneNumber,
                mobileNumber:   userData.mobileNumber,
                dateOfBirth:    userData.dateOfBirth,
                location:       userData.location,
                interest:       userData.interest,
                bio:            userData.bio,
            }
        })
        if(registeredUser){
            return 1;
        }
        return -1;
    }catch(error){
        console.log(error)
        return -1;
    }
}



export async function deleteUsersByIds(ids:string[]){
    try{
        const isUserDeleted = await prisma.user.deleteMany({
            where:{
                userId:{
                    in:ids
                }
            }
        });
        if(isUserDeleted){
            return isUserDeleted
        }
        return -1;
    }catch(error){
        console.log(error);
    }
}


export async function updateUserById(updateData:any,id:string){
    try{
        const isUserUpdated = await prisma.user.update({
            where:{
                userId: id
            },
            data:{
                firstName:      updateData.firstName, 
                middleName:     updateData.middleName,
                lastName:       updateData.lastName,
                username:       updateData.username,
                email:          updateData.email,
                password:       updateData.password,
                roleId:         updateData.role,
                status:         "ACTIVE", 
                gender:         updateData.gender,
                phoneNumber:    updateData.phoneNumber,
                mobileNumber:   updateData.mobileNumber,
                dateOfBirth:    updateData.dateOfBirth,
                location:       updateData.location,
                interest:       updateData.interest,
                bio:            updateData.bio,
            }
        })
        if(isUserUpdated){
            return 1
        }
        return -1
    }catch(error){
        console.log(error)
    }
}



//////////////////////////////////// Role services  /////////////////////////////////////////

export async function fetchAllRoles():Promise<any>{
    try{
        const roles = await prisma.role.findMany();
        return roles;
    }catch(error){
        console.log(error);
        return [];
    }
}

export async function deleteRolesByRoleIds(roleIds:string[]){
    try{
        const isUserForRoleExist = await prisma.user.findMany({
            where:{
                roleId:{
                    in:roleIds
                }
            }
        })
        console.log(isUserForRoleExist)
        if(isUserForRoleExist.length > 0){
            return {error:true, message:"Please delete the users associated with the role first"};
        }
        const isRoleDeleted = await prisma.role.deleteMany({
            where:{
                roleId:{
                    in:roleIds
                }
            }
        })
        if(isRoleDeleted){
            return {error:false, message:"Role deleted successfully"};
        }
        return {error:true, message:"Role deletion failed"};
    }catch(error){
        console.log(error)
    }
}

export async function createRoles(details:any){
    try{
        const isCreateRoles = await prisma.role.create({
            data:{
                role:           details.role,
                description:    details.description,
                status:         "ACTIVE"
            }
        })
    }catch(error){
        console.log(error)
    }
}

export async function fetchRoleById(roleId:string){
    try{
        const isRoleData = await prisma.role.findUnique({
            where:{
                roleId: roleId
            }
        })
        return isRoleData;
    }catch(error){
        console.log(error)
    }
}

export async function updateRoleById(detail:any,roleId:string){
    try{
        const isRoleUpdated = await prisma.role.update({
            where:{
                roleId: roleId
            },
            data:{
                role:           detail.role,
                description:    detail.description
            }
        })
        return 0
    }catch(error){
        console.log(error)
    }
    return -1
}

/////////////////////////////////// Items services  /////////////////////////////////////////



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








///////////////////////////////////// Accounting ////////////////////////////////////////////

export async function fetchAccountTable(){
    try{
        const isAccountTable = await prisma.account.findMany()
        if(isAccountTable)
        return isAccountTable
    }catch(error){
        console.log(error)
    }
    return -1
}

export async function createNewAccount(details:any){
    try{
        const isAccountCreated = await prisma.account.create({
            data:{
                accountName: details.accountName,
                accountNumber: details.accountNumber,
                accountType: details.accountType,
                status: "ACTIVE"
            }
        });
        return 0
    }catch(error){
        console.log(error)
    }
    return -1
}