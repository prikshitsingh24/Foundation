import { Form, NavLink, Outlet, redirect, useActionData, useLoaderData } from "@remix-run/react";


import { deleteUsersByIds, fetchAccountTable, fetchAllUsers, registerUser } from "services/dashboard";
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

export default function AccountTable(){

    const accountData = useLoaderData<any>();

    return(
        <>
            {/* <div className="mt-5 flex flex-row justify-between items-center">
                {addUser || editUser?(
                    <div></div>
                ):( */}
                    <Form className="flex flex-row mt-5 ">
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Account Name" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Accont Number" />
                </Form>
                {/* )}
                  {addUser || editUser?(
                   <div></div>
                  ):(
                   <div></div>
                  )}
            </div> */}
            <div className="flex flex-col gap-3 mt-5">
            <Table
                removeWrapper
                aria-label="Users table"
                selectionMode="multiple"
                classNames={{
                    wrapper: "min-h-[650px]",
                }}
                //selectedKeys={selectedKeys}
                //onSelectionChange={setSelectedKeys}
                >
                <TableHeader>
                {/* <TableColumn>ID</TableColumn> */}
                <TableColumn>ACCOUNT NAME</TableColumn>
                <TableColumn>ACCOUNT NUMBER</TableColumn>
                <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                {accountData.map((account:any,index:number)=>(
                    <TableRow key={account.accountId}>
                        <TableCell>{account.accountName}</TableCell>
                        <TableCell>{account.accountNumber}</TableCell>
                        <TableCell>
                            <div className={`${account.status=="ACTIVE"?'bg-green-300':'bg-red-300'} rounded-lg p-1 w-16 flex justify-center items-center`}>
                                {account.status?"Active":"Inactive"}
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
    const isAccountTable = await fetchAccountTable()
    return isAccountTable;
}