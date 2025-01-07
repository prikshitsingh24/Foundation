import { Form, NavLink, Outlet, redirect, useActionData, useLoaderData } from "@remix-run/react";


import { deleteRolesByRoleIds, deleteUsersByIds, fetchAllRoles, fetchAllUsers, registerUser } from "services/dashboard";
import React from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { useRecoilState } from "recoil";
// import { isAddUserState, isEditUserState, selectedIdsState, userIdState } from "state/userState";

import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import { User } from "type/user";
import { selectedRolesState } from "state/roleState";

export default function RoleTable(){

    const allRoles = useLoaderData<any>();
    // const [addRole,setAddRole] = useRecoilState(isAddRoleState);
    const [isDelete,setIsDelete] = React.useState(true);
    // const [editUser,setEditUser] =  useRecoilState(isEditUserState);
    const [selectedRoleKeys,setSelectedRoleKeys]:any = useRecoilState(selectedRolesState);
    // const [id,setId] = useRecoilState(userIdState);

    return(
        <>
            <div className="mt-5 flex flex-row justify-between items-center">
                    <Form className="flex flex-row">
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Name" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Status" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 outline-none" placeholder="Roles" />
                </Form>
            </div>
            <div className="flex flex-col gap-3 mt-5">
            <Table
                removeWrapper
                aria-label="Users table"
                selectionMode="multiple"
                classNames={{
                    wrapper: "min-h-[650px]",
                }}
                selectedKeys={selectedRoleKeys}
                onSelectionChange={setSelectedRoleKeys}
                >
                <TableHeader>
                <TableColumn>ROLE</TableColumn>
                {/* <TableColumn>STATUS</TableColumn> */}
                <TableColumn>DESCRIPTION</TableColumn>
                <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                {allRoles.map((role:any,index:number)=>(
                    <TableRow key={role.roleId}>
                        <TableCell>{role.role}</TableCell>
                        {/* <TableCell>{role.status}</TableCell> */}
                        <TableCell>{role.description}</TableCell>
                        <TableCell>
                            <div className={`${role.status=="ACTIVE"?'bg-green-300':'bg-red-300'} rounded-lg p-1 w-16 flex justify-center items-center`}>
                                {role.status?"Active":"Inactive"}
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

export async function loader() {
    const allRoles = await fetchAllRoles();
    if(allRoles){
        return allRoles
    }
    else{
        console.log("failed")
        return -1
    }
}
