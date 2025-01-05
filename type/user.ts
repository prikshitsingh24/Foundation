import { Role, Status } from "@prisma/client";



export type User = {
    userId:   string;
    name:     string;
    email:    string;
    status:   Status;       
    password: string;    
    role:     Role;         
}