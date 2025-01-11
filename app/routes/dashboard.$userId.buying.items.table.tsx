import { Form, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import { Item } from "type/item";
import { useRecoilState } from "recoil";
import { selectedItemIdsState } from "state/itemState";
import { fetchAllItems } from "services/dashboard/item";


export default function Items(){

    const allItems = useLoaderData<any>();
    const [selectedItemIds,setSelectedItemIds]:any = useRecoilState(selectedItemIdsState)

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
                selectedKeys={selectedItemIds}
                onSelectionChange={setSelectedItemIds}
                >
                <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>Item Group</TableColumn>
                <TableColumn>ID</TableColumn>
                <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                {allItems.map((item:any,index:number)=>(
                    <TableRow key={item.itemId}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.itemGroup}</TableCell>
                        <TableCell>{item.ID}</TableCell>
                        <TableCell>
                            <div className={`${item.status=="ACTIVE"?'bg-green-300':'bg-red-300'} rounded-lg p-1 w-16 flex justify-center items-center`}>
                                {item.status?"Enabled":"Disabled"}
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

export async function loader():Promise<Item[] | []>{
    const allItems = await fetchAllItems();
    if(allItems?.length!=0){
        return allItems;
    }
    return [];
}