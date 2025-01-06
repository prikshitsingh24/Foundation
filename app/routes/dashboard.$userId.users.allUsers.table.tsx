import { Form, NavLink, Outlet, redirect, useActionData, useLoaderData } from "@remix-run/react";


import { deleteUsersByIds, fetchAllUsers, registerUser } from "services/dashboard";
import React from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { useRecoilState } from "recoil";
import { isAddUserState, isEditUserState, selectedIdsState, userIdState } from "state/userState";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import { User } from "type/user";

export default function AllUsers(){

    const allUsers = useLoaderData<any>();
    const [addUser,setAddUser] = useRecoilState(isAddUserState);
    const [isDelete,setIsDelete] = React.useState(true);
    const [editUser,setEditUser] =  useRecoilState(isEditUserState);
    const [selectedKeys,setSelectedKeys]:any = useRecoilState(selectedIdsState);
    const [id,setId] = useRecoilState(userIdState);

    return(
        <>
            <div className="mt-5 flex flex-row justify-between items-center">
                {addUser || editUser?(
                    <div></div>
                ):(
                    <Form className="flex flex-row">
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Name" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Status" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 outline-none" placeholder="Roles" />
                </Form>
                )}
                  {addUser || editUser?(
                   <div></div>
                  ):(
                   <div></div>
                  )}
            </div>
            <div className="flex flex-col gap-3 mt-5">
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
            </div>
        </>
    )
}

export async function loader():Promise<User[] | []>{
    const allUser = await fetchAllUsers();
    if(allUser?.length!=0){
        return allUser;
    }
    return [];
}









