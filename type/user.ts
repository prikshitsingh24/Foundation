import { Role, Status } from "@prisma/client";



export type User = {
    userId:   string;
    username: string;
    email:    string;
    status:   Status;       
    password: string;    
    roleId:   string | null;  
    createdAt: Date;       
}