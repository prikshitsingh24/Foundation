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
                status: "ACTIVE"
            }
        });
        return 0
    }catch(error){
        console.log(error)
    }
    return -1
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