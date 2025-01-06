import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchAdminRole(){
    const isAdminRole = await prisma.user.findMany({
        where:{
            roleId: "8a523da8-3625-42e4-a256-d9ccca4b4974"
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
                username: details.username,
                email: details.email,
                password: details.password,
                roleId: "8a523da8-3625-42e4-a256-d9ccca4b4974",
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
                username: details.username,
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

