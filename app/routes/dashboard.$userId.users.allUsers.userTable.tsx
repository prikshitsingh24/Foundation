import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { useRecoilState } from "recoil";
import { fetchAllUsers } from "services/dashboard";
import { selectedIdsState } from "state/userState";
import { User } from "type/user";

export default function UserTable() {
    
    const [selectedKeys,setSelectedKeys]:any = useRecoilState(selectedIdsState);
    const allUsers = useLoaderData<any>();
    return(
        <Table
        removeWrapper
        aria-label="Users table"
        selectionMode="multiple"
          classNames={{
            wrapper: "min-h-[650px]",
          }}
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
        <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
        {allUsers.map((user:any,index:number)=>(
            <TableRow key={user.userId}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                    <div className={`${user.status=="ACTIVE"?'bg-green-300':'bg-red-300'} rounded-lg p-1 w-16 flex justify-center items-center`}>
                        {user.status?"Active":"Inactive"}
                    </div>
                </TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
    )
}


export async function loader():Promise<User[] | []>{
    const allUser = await fetchAllUsers();
    if(allUser?.length!=0){
        return allUser;
    }
    return [];
}