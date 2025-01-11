import { Form, useLoaderData } from "@remix-run/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import { fetchPaymentEntryTable } from "services/dashboard/accounting";

export default function PaymentEntryTable(){

    const paymentEntryTableData = useLoaderData<any>();

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
                //selectedKeys={selectedKeys}
                //onSelectionChange={setSelectedKeys}
                >
                <TableHeader>
                {/* <TableColumn>ID</TableColumn> */}
                <TableColumn>TITLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>PAYMENT TYPE</TableColumn>
                <TableColumn>POSTING DATE</TableColumn>
                <TableColumn>MODE OF PAYMENT</TableColumn>
                <TableColumn>ID</TableColumn>
                </TableHeader>
                <TableBody>
                {paymentEntryTableData.map((payment:any,index:number)=>(
                    <TableRow key={payment.id}>
                        <TableCell>{payment.title}</TableCell>
                        <TableCell>
                            <div className={`${payment.status=="ACTIVE"?'bg-green-300':'bg-red-300'} rounded-lg p-1 w-16 flex justify-center items-center`}>
                                {payment.status?"Active":"Inactive"}
                            </div>
                        </TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{payment.postingDate}</TableCell>
                        <TableCell>{payment.mode}</TableCell>
                        <TableCell>{payment.id}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </>
    )
}

export async function loader() {
    const isPaymentEntryTable = await fetchPaymentEntryTable()
    return isPaymentEntryTable;
}