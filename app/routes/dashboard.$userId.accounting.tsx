import { Form, Link, NavLink, Outlet, data, redirect, useActionData } from "@remix-run/react";
import React from "react";
import { useRecoilState } from "recoil";
import { isAddUserState, isEditUserState, selectedIdsState, userIdState } from "state/userState";
import addIcon from "/addIcon.png";
import editIcon from "/editIcon.png";
import deleteIcon from "/deleteIcon.png";
import { ActionFunctionArgs } from "@remix-run/node";
import { deleteRolesByRoleIds, deleteUsersByIds } from "services/dashboard";
import { selectedRolesState } from "state/roleState";

export default function Accounting(){

    const [isAccountSelected, setIsAccountSelected] = React.useState(false);
    const [isNewAccount,setNewAccount] = useRecoilState(isAddUserState);
    const [id,setId] = useRecoilState(userIdState);


    const handleAccountClick =()=>{
        setNewAccount(false);
        setIsAccountSelected(true)
    }
    
    return(
        <div className="w-full h-full">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row item-center">
                    <NavLink to="account/table">
                        <div className={`text-sm rounded-xl cursor-pointer ${isAccountSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-20 h-8 flex justify-center items-center mr-2`}
                                        onClick={handleAccountClick}>
                            Accounts
                        </div>
                    </NavLink>
                </div>
                {isAccountSelected && 
                (
                    <div>
                        <NavLink to="account/newAccount">
                            <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28">
                                New Account
                            </div>
                        </NavLink>
                    </div>
                )}
            </div>
            <Outlet/>
        </div>
    )
}