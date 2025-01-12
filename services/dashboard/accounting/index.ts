import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

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
                accountId: "",
                accountName: details.accountName,
                accountNumber: details.accountNumber,
                accountType: details.accountType,
                balance: details.balance,
                currency: details.currency,
                description: details.description,
                status: "ACTIVE"
            }
        });
        return 0
    }catch(error){
        console.log(error)
    }
    return -1
}

export async function fetchAccountById(id:any){
    try{
        const  isAccountById = await prisma.account.findUnique({
            where:{
                id: id
            }
        })
        if(isAccountById != null)
            return isAccountById    
    }catch(error){
        console.log(error)
    }
}

export async function updateAccountById(details: any, id: string) {
    try {
        // Update the account in the database using the provided account ID
        const updatedAccount = await prisma.account.update({
            where: {
                id: id,  // Use the provided account ID to find the account
            },
            data: {
                accountName: details.accountName, // Account name
                accountNumber: details.accountNumber, // Account number
                accountType: details.accountType, // Account type
                balance: details.balance, // Balance (convert to float if necessary)
                currency: details.currency, // Currency
                status: details.status, // Account status
                parentAccountId: details.parentAccount || null, // Optional parent account
                description: details.description || null, // Optional description
                updatedAt: new Date(), // Set updated timestamp
            },
        });

        // Return the updated account object (or any other information you need)
        return updatedAccount;
    } catch (error) {
        console.log("Error updating account: ", error);
        throw new Error("Error updating account");
    }
}


export async function fetchSalesInvoiceTable(){
    try{
        const isSalesInvoiceTable = await prisma.salesInvoice.findMany()
        if(isSalesInvoiceTable)
        return isSalesInvoiceTable
    }catch(error){
        console.log(error)
    }
    return -1
}

export async function createNewSalesInvoice(details:any){
    try{
        const isNewSalesInvoice = await prisma.salesInvoice.create({
            data:{
                title: details.title,
                grandTotal: details.grandTotal,
                status: "ACTIVE",
                invoiceId:""
            }
        });
        return 0
    }catch(error){
        console.log(error)
    }
    return -1
}

export async function fetchPurchaseInvoiceTable(){
    try{
        const isPurchaseInvoiceTable = await prisma.purchaseInvoice.findMany()
        if(isPurchaseInvoiceTable)
        return isPurchaseInvoiceTable
    }catch(error){
        console.log(error)
    }
    return -1
}

export async function createNewPurchaseInvoice(details:any){
    try{
        const isAccountCreated = await prisma.purchaseInvoice.create({
            data:{
                title: details.title,
                postingDate: details.postingDate,
                grandTotal: details.grandTotal,
                status: "ACTIVE",
                invoiceId:"" 
            }
        });
        return 0
    }catch(error){
        console.log(error)
    }
    return -1
}

export async function fetchPaymentEntryTable(){
    try{
        const isPaymentEntryTable = await prisma.paymentEntry.findMany()
        if(isPaymentEntryTable)
        return isPaymentEntryTable
    }catch(error){
        console.log(error)
    }
    return -1
}

export async function createNewPaymentEntry(details:any){
    try{
        const isAccountCreated = await prisma.paymentEntry.create({
            data:{
                title: details.title,
                type: details.type,
                postingDate: details.postingDate,
                mode: details.mode,
                status: "ACTIVE"
            }
        });
        return 0
    }catch(error){
        console.log(error)
    }
    return -1
}