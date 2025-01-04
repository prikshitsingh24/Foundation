import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchUserById(userId: string){
    
    try{
        const userDetails = await prisma.user.findUnique({
            where:{
                userId: userId
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

export async function fetchAllUser(){
    try{
        const allUser = await prisma.user.findMany()
        return allUser;
    }catch(error){
        console.log(error)
    }
}