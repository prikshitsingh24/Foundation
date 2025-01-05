import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchAdminRole(){
    const isAdminRole = await prisma.user.findMany({
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
        const admin = await prisma.user.create({
            data:{
                name: details.name,
                email: details.email,
                password: details.password,
                role: "ADMIN",
                status:"ACTIVE"
            }
        })
        if(admin){
            return admin.userId;
        }
        return -1;
    }catch(error){
        console.log(error);
    }
}

export async function login(details:any){

    try{
        const user = await prisma.user.findMany({
            where:{
                name: details.name,
                email: details.email,
                password: details.password
            }
        })
        if(user.length!=0){
            return user[0].userId;
        }
        return -1;
    }catch(error){
        console.log(error);
    }

}

