import { PrismaClient } from "@prisma/client";
import { Item } from "type/item";
import { User } from "type/user";


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

export async function fetchAllUsers():Promise<any>{
    try{
        const allUsers = await prisma.user.findMany()
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
                role:           userData.role,
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
    console.log("faldsjflkadjsf",ids);
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