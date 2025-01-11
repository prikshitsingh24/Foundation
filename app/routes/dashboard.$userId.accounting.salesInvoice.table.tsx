import { Form, useLoaderData } from "@remix-run/react";
import { fetchSalesInvoiceTable } from "services/dashboard";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import { selectedSalesInvoiceState } from "state/salesInvoiceState";
import { useRecoilState } from "recoil";

export default function SalesInvoiceTable(){

    const salesInvocieTableData = useLoaderData<any>();

    const [selectedInvoiceKeys,setSelectedInvoiceKeys]:any = useRecoilState(selectedSalesInvoiceState);

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
                selectedKeys={selectedInvoiceKeys}
                onSelectionChange={setSelectedInvoiceKeys}
                >
                <TableHeader>
                <TableColumn>TITLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>GRAND TOTAL</TableColumn>
                <TableColumn>ID</TableColumn>
                </TableHeader>
                <TableBody>
                {salesInvocieTableData.map((invoice:any,index:number)=>(
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.title}</TableCell>
                        <TableCell>
                            <div className={`${invoice.status=="ACTIVE"?'bg-green-300':'bg-red-300'} rounded-lg p-1 w-16 flex justify-center items-center`}>
                                {invoice.status?"Active":"Inactive"}
                            </div>
                        </TableCell>
                        <TableCell>{invoice.grandTotal}</TableCell>
                        <TableCell>{invoice.invoiceId}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </div>
        </>
    )
}

export async function loader() {
    const isSalesInvoiceTable = await fetchSalesInvoiceTable()
    return isSalesInvoiceTable;
}