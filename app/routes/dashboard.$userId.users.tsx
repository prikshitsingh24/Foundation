import { Form, Link, NavLink, Outlet, redirect } from "@remix-run/react";
import React from "react";
import { useRecoilState } from "recoil";
import { isAddUserState, isEditUserState, selectedIdsState, userIdState } from "state/userState";
import addIcon from "/addIcon.png";
import editIcon from "/editIcon.png";
import deleteIcon from "/deleteIcon.png";
import { ActionFunctionArgs } from "@remix-run/node";
import { deleteUsersByIds } from "services/dashboard";

export default function Users(){

    const [isUserSelected, setIsUserSelected] = React.useState(false);
    const [isRoleSelected, setIsRoleSelected] = React.useState(false);
    const [isPermissionManagerSelected, setIsPermissionManagerSelected] = React.useState(false);
    const [isAddUser,setAddUser] = useRecoilState(isAddUserState);
    const [isEditUser,setEditUser] = useRecoilState(isEditUserState);
    const [id,setId] = useRecoilState(userIdState);


    const handleUserClick =()=>{
        setAddUser(false);
        setEditUser(false);
        setIsRoleSelected(false)
        setIsPermissionManagerSelected(false)
        setIsUserSelected(true)
    }

    const handleRoleClick =()=>{
     
        setIsUserSelected(false)
        setIsPermissionManagerSelected(false)
        setIsRoleSelected(true)
    }

    const handlePermissionManagerClick =()=>{
     
        setIsUserSelected(false)
        setIsRoleSelected(false)
        setIsPermissionManagerSelected(true)
    }

    const [selectedKeys,setSelectedKeys]:any = useRecoilState(selectedIdsState);
    
    return(
        <div className="w-full h-full">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row item-center">
                    <NavLink to={`allUsers/table`}>
                        <div className={`text-sm rounded-xl cursor-pointer ${isUserSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-14 h-8 flex justify-center items-center mr-2`}
                                        onClick={handleUserClick}>
                            Users
                        </div>
                    </NavLink>
                    <div className={`text-sm rounded-xl cursor-pointer ${isRoleSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-14 h-8 flex justify-center items-center mr-2`}
                                        onClick={handleRoleClick}>
                        Roles
                    </div>
                    <div className={`text-sm rounded-xl cursor-pointer ${isPermissionManagerSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-40 h-8 flex justify-center items-center mr-2`}
                                        onClick={handlePermissionManagerClick}>
                        Permission manager
                    </div>
                </div>
                {isUserSelected && (
                    <div className="flex flex-row gap-3">
                    {selectedKeys.size===1?(
                        <NavLink to={`allUsers/editUser/${String(Array.from(selectedKeys))}`}>
                        <div className="rounded-full w-8 text-blue-500 border-2 border-blue-500 h-8 cursor-pointer flex justify-evenly items-center">
                            <img src={editIcon} width={20}/>
                        </div>
                        </NavLink>
                    ):(
                    <div className="rounded-full w-8 text-blue-500 border-2 border-blue-500 h-8 cursor-pointer flex justify-evenly items-center">
                        <img src={editIcon} width={20}/>
                    </div>
                    
                    )}
                    <Form method="post">
                    <input type="text" hidden value={id} name="userId" />
                    <input type="text" name="ids" hidden value={Array.from(selectedKeys)} />
                    <button className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
                        <img src={deleteIcon} width={20}/>
                    </button>
                    </Form>
                   <NavLink to="allUsers/addUser">
                   <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28" >
                        <img src={addIcon} width={20}/> Add user
                    </div>
                   </NavLink>
                    </div> 
                )}               
            </div>
            <Outlet/>
        </div>
    )
}


export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const userIds = String(data.ids).split(',');
    const isUserDeleted = await deleteUsersByIds(userIds)
    if(!isUserDeleted){
    console.log("Error!! not able to delete entry");
    }
    return redirect("/dashboard/"+data.userId+"/users/allUsers/table");

}
