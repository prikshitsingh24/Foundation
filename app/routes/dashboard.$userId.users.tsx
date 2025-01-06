import { Link, NavLink, Outlet } from "@remix-run/react";
import React from "react";
import { useRecoilState } from "recoil";
import { isAddUserState, isEditUserState } from "state/userState";

export default function Users(){

    const [isUserSelected, setIsUserSelected] = React.useState(false);
    const [isRoleSelected, setIsRoleSelected] = React.useState(false);
    const [isPermissionManagerSelected, setIsPermissionManagerSelected] = React.useState(false);
    const [isAddUser,setAddUser] = useRecoilState(isAddUserState);
    const [isEditUser,setEditUser] = useRecoilState(isEditUserState);

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
    
    return(
        <div className="w-full h-full">
            <div className="flex flex-row items-center">
                <div className="flex flex-row item-center">
                    <NavLink to={`allUsers/userTable`}>
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
            </div>
            <Outlet/>
        </div>
    )
}
