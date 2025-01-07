import { PrismaClient } from "@prisma/client";
import { Item } from "type/item";
import { User } from "type/user";


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
          console.log(allUsers)
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