import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Form, useLoaderData } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { fetchAllPurchaseOrders } from "services/dashboard/purchaseOrder";
import { selectedPurchaseOrderIdState } from "state/purchaseOrderState";


export default function PurchaseTable(){

    const [selectedPurchaseOrderId,setSelecterPurchaseOrderId]:any = useRecoilState(selectedPurchaseOrderIdState);
    const allPurchaseOrderData = useLoaderData<any>()
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
            aria-label="Example static collection table"
            selectionMode="multiple"
              classNames={{
                wrapper: "min-h-[650px]",
              }}
            selectedKeys={selectedPurchaseOrderId}
            onSelectionChange={setSelecterPurchaseOrderId}
            >
            <TableHeader>
            <TableColumn>Supplier Name</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Grand Total</TableColumn>
            <TableColumn>ID</TableColumn>
            <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
            {allPurchaseOrderData.map((purchaseOrder:any,index:number)=>{
                const grandTotal = purchaseOrder.purchaseOrderItem.reduce((acc:number, item:any) => acc + item.amount, 0);
                return (
                <TableRow key={purchaseOrder.purchaseOrderId}>
                    <TableCell>{purchaseOrder.supplier}</TableCell>
                    <TableCell>{purchaseOrder.date}</TableCell>
                    <TableCell>{grandTotal}</TableCell>
                    <TableCell>{purchaseOrder.series}</TableCell>
                    <TableCell>
                            <div className={`${purchaseOrder.status=="ACTIVE"?'bg-green-300':'bg-red-300'} rounded-lg p-1 w-16 flex justify-center items-center`}>
                                {purchaseOrder.status?"Enabled":"Disabled"}
                            </div>
                        </TableCell>
                </TableRow>
            )})}
            </TableBody>
        </Table>
        </div>
    </>
    )
}


export async function loader(){
    const purchaseOrderData = await fetchAllPurchaseOrders();
    return purchaseOrderData;
}