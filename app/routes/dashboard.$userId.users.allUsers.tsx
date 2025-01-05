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
import { fetchAllUsers } from "services/dashboard";
import React from "react";
import AddUser from "components/dashboard/addUser";
export default function allUsers(){

    const allUsers = useLoaderData<any>();
    const [isAddUser,setIsAddUser] = React.useState(false);

    const handleAddUserClick=()=>{
        setIsAddUser(true);
    }

    const handleViewUserClick=()=>{
        setIsAddUser(false);
    }

    return(
        <>
            <div className="mt-5 flex flex-row justify-between items-center">
                {isAddUser?(
                    <div></div>
                ):(
                    <Form className="flex flex-row">
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Name" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Status" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 outline-none" placeholder="Roles" />
                </Form>
                )}
                  {isAddUser?(
                      <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28" onClick={handleViewUserClick}>
                        View users
                  </div>
                  ):(
                    <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28" onClick={handleAddUserClick}>
                    <img src={addIcon} width={20}/> Add user
                </div>
                  )}
            </div>
            <div className="flex flex-col gap-3 mt-5">
            {isAddUser?(
                <AddUser/>
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
                <TableColumn>EMAIL</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                {allUsers.map((user:any,index:number)=>(
                    <TableRow key={index}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            )}
            </div>
        </>
    )
}

export async function loader(){
    const allUser = await fetchAllUsers();
    if(allUser?.length!=0){
        return allUser;
    }
    return [];
}