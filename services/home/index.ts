import { PrismaClient } from "@prisma/client";
import { Details } from "type";

const prisma = new PrismaClient();

export async function fetchAdminRole(){
    const isAdminRole = await prisma.employee.findMany({
        where:{
            role: "ADMIN"
        }
    })
    if(isAdminRole.length != 0){
        return true;
    }
    return false;
}

export async function registerAdmin(details:any){
    try{
        await prisma.employee.create({
            data:{
                name: details.name,
                email: details.email,
                password: details.password,
                role: "ADMIN"
            }
        })
        console.log("Data added successfully!")
        return 0;
    }catch(error){
        console.log(error);
    }
}

export async function login(details:any){

    try{
        const isEmployee = await prisma.employee.findMany({
            where:{
                name: details.name,
                email: details.email,
                password: details.password
            }
        })
        return isEmployee;
    }catch(error){
        console.log(error);
    }

}