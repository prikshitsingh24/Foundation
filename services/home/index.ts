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
        const admin = await prisma.employee.create({
            data:{
                name: details.name,
                email: details.email,
                password: details.password,
                role: "ADMIN"
            }
        })
        if(admin){
            return admin.employeeId;
        }
        return -1;
    }catch(error){
        console.log(error);
    }
}

export async function login(details:any){

    try{
        const employee = await prisma.employee.findMany({
            where:{
                name: details.name,
                email: details.email,
                password: details.password
            }
        })
        if(employee.length!=0){
            return employee[0].employeeId;
        }
        return -1;
    }catch(error){
        console.log(error);
    }

}