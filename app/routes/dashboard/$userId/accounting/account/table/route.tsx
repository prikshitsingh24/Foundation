import { Form, useLoaderData } from "@remix-run/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import React from "react";
import { useRecoilState } from "recoil";
import { isAddAccountState, isEditAccountState, selectedAccountsState } from "state/accountState";
import { fetchAccountTable } from "services/dashboard/accounting";

export default function AccountTable(){

    const accountData = useLoaderData<any>();

    const [addAccount,setAddAccount] = useRecoilState(isAddAccountState);
    const [isDelete,setIsDelete] = React.useState(true);
    const [editAccount,setEditAccount] =  useRecoilState(isEditAccountState);
    const [selectedAccountKeys,setSelectedAccountKeys]:any = useRecoilState(selectedAccountsState);

    return(
        <>
                    <Form className="flex flex-row mt-5 ">
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Account Name" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Accont Number" />
                    </Form>
            <div className="flex flex-col gap-3 mt-5">
            <Table
                removeWrapper
                aria-label="Users table"
                selectionMode="multiple"
                classNames={{
                    wrapper: "min-h-[650px]",
                }}
                selectedKeys={selectedAccountKeys}
                onSelectionChange={setSelectedAccountKeys}
                >
                <TableHeader>
                <TableColumn>ACCOUNT NAME</TableColumn>
                <TableColumn>ACCOUNT NUMBER</TableColumn>
                <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                {accountData.map((account:any,index:number)=>(
                    <TableRow key={account.id}>
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
    if(isAccountTable != null){
        return isAccountTable;
    }
    return [];
}