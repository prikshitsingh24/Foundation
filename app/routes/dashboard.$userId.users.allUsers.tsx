import { Form, NavLink, Outlet, redirect, useActionData, useLoaderData } from "@remix-run/react";
import addIcon from "/addIcon.png";
import editIcon from "/editIcon.png";
import deleteIcon from "/deleteIcon.png";

import { deleteUsersByIds, registerUser } from "services/dashboard";
import React from "react";
import { ActionFunctionArgs } from "@remix-run/node";
import { useRecoilState } from "recoil";
import { isAddUserState, isEditUserState, selectedIdsState, userIdState } from "state/userState";

export default function AllUsers(){

    const allUsers = useLoaderData<any>();
    const [addUser,setAddUser] = useRecoilState(isAddUserState);
    const [isDelete,setIsDelete] = React.useState(true);
    const [editUser,setEditUser] =  useRecoilState(isEditUserState);
    const [selectedKeys,setSelectedKeys] = useRecoilState(selectedIdsState);
    const [id,setId] = useRecoilState(userIdState);

    const handleAddUserClick=()=>{
        setAddUser(true);
    }

    const handleEditUserClick=()=>{
        setEditUser(true);
    }

    console.log(selectedKeys);
    return(
        <>
            <div className="mt-5 flex flex-row justify-between items-center">
                {addUser || editUser?(
                    <div></div>
                ):(
                    <Form className="flex flex-row">
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Name" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Status" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 outline-none" placeholder="Roles" />
                </Form>
                )}
                  {addUser || editUser?(
                   <div></div>
                  ):(
                    <div className="flex flex-row gap-3">
                        {selectedKeys.size===1?(
                            <NavLink to={`editUser/${String(Array.from(selectedKeys))}`}>
                            <div className="rounded-full w-8 text-blue-500 border-2 border-blue-500 h-8 cursor-pointer flex justify-evenly items-center" onClick={handleEditUserClick}>
                                <img src={editIcon} width={20}/>
                            </div>
                            </NavLink>
                        ):(
                        <div className="rounded-full w-8 text-blue-500 border-2 border-blue-500 h-8 cursor-pointer flex justify-evenly items-center">
                            <img src={editIcon} width={20}/>
                        </div>
                        
                        )}
                        <Form method="post">
                        <input type="text" hidden name="userId" value={id} />
                        <input type="text" name="ids" hidden value={Array.from(selectedKeys)} />
                        <button className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
                            <img src={deleteIcon} width={20}/>
                        </button>
                        </Form>
                       <NavLink to="addUser">
                       <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28" onClick={handleAddUserClick}>
                            <img src={addIcon} width={20}/> Add user
                        </div>
                       </NavLink>
                    </div>
                  )}
            </div>
            <div className="flex flex-col gap-3 mt-5">
                <Outlet/>
            </div>
        </>
    )
}



export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const userIds = String(data.ids).split(',');
    console.log(userIds);
    const isUserDeleted = await deleteUsersByIds(userIds)
    if(!isUserDeleted){
    console.log("Error!! not able to delete entry")
    }
    return redirect("/dashboard/"+data.userId+"/users/allUsers/userTable")
}








