import { Status } from "@prisma/client"


export type Item = {
    itemId:string
    ID:string
    name:string
    itemGroup:string
    status:Status
}