import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();





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