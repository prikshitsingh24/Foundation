import { Form, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import addIcon from "/addIcon.png";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import React from "react";
import AddUser from "components/dashboard/addUser";
import { Item } from "type/item";
import { fetchAllItems } from "services/dashboard";
import AddItem from "components/dashboard/addItem";

export default function Items(){

    const allItems = useLoaderData<any>();
    const [isAddItem,setIsAddItem] = React.useState(false);

    const handleAddUserClick=()=>{
        setIsAddItem(true);
    }

    const handleViewUserClick=()=>{
        setIsAddItem(false);
    }

    return(
        <>
            <div className="mt-5 flex flex-row justify-between items-center">
                {isAddItem?(
                    <div></div>
                ):(
                    <Form className="flex flex-row">
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Name" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Status" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 outline-none" placeholder="Roles" />
                </Form>
                )}
                  {isAddItem?(
                      <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28" onClick={handleViewUserClick}>
                        View items
                  </div>
                  ):(
                    <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28" onClick={handleAddUserClick}>
                    <img src={addIcon} width={20}/> Add Item
                </div>
                  )}
            </div>
            <div className="flex flex-col gap-3 mt-5">
            {isAddItem?(
                <AddItem/>
            ):(
                <Table
                removeWrapper
                aria-label="Example static collection table"
                selectionMode="multiple"
                  classNames={{
                    wrapper: "min-h-[650px]",
                  }}
                >
                <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>Item Group</TableColumn>
                <TableColumn>ID</TableColumn>
                <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                {allItems.map((item:any,index:number)=>(
                    <TableRow key={index}>
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
            )}
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