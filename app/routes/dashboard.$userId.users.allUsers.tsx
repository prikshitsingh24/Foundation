import { Form, NavLink, Outlet, redirect, useActionData, useLoaderData } from "@remix-run/react";
import addIcon from "/addIcon.png";
import editIcon from "/editIcon.png";
import deleteIcon from "/deleteIcon.png";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import { deleteUsersByIds, fetchAllUsers, registerUser } from "services/dashboard";
import React from "react";
import AddUser from "components/dashboard/addUser";
import { User } from "type/user";
import { ActionFunctionArgs } from "@remix-run/node";

export default function AllUsers(){

    const allUsers = useLoaderData<any>();
    const [isAddUser,setIsAddUser] = React.useState(false);
    const [isDelete,setIsDelete] = React.useState(true);
    const [isUpdated,setIsUpdate] = React.useState(true);
    const [selectedKeys,setSelectedKeys] = React.useState<any>(new Set([]));

    const handleAddUserClick=()=>{
        setIsAddUser(true);
    }

    const handleViewUserClick=()=>{
        setIsAddUser(false);
    }

    const isUserRegistered = useActionData<any>();

    React.useEffect(()=>{
        if(isUserRegistered){
            setIsAddUser(false)
        }
    },[isUserRegistered]);


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
                    <div className="flex flex-row gap-3">
                        <div className="rounded-full w-8 text-blue-500 border-2 border-blue-500 h-8 cursor-pointer flex justify-evenly items-center">
                            <img src={editIcon} width={20}/>
                        </div>
                        <Form method="post">
                        <input type="text" name="ids" hidden value={Array.from(selectedKeys)} />
                        <button className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center" name="_action" value="deleteUser">
                            <img src={deleteIcon} width={20}/>
                        </button>
                        </Form>
                        <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28" onClick={handleAddUserClick}>
                            <img src={addIcon} width={20}/> Add user
                        </div>
                    </div>
                  )}
            </div>
            <div className="flex flex-col gap-3 mt-5">
            {isAddUser?(
                <AddUser/>
            ):(
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
            )}
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

export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData();
    const {_action,...data} = Object.fromEntries(formData);
    if(_action=="addUser"){
        const isUserRegistered = await registerUser(data)
        if(isUserRegistered != -1){
            return 1
        }
        else{
            console.log("Error!!")
        }
    }else{
        const userIds = String(data.ids).split(',');
        console.log(userIds);
       const isUserDeleted = await deleteUsersByIds(userIds)
       if(!isUserDeleted){
        console.log("Error!! not able to delete entry")
       }
    }
    return 0;
}








