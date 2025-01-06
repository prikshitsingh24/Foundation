import { Form, NavLink, Outlet } from "@remix-run/react";
import addIcon from "/addIcon.png";
import editIcon from "/editIcon.png";
import deleteIcon from "/deleteIcon.png";
import { ActionFunctionArgs } from "@remix-run/node";
import { deleteUsersByIds } from "services/dashboard";
import React from "react";
import { selectedItemIdsState } from "state/itemState";
import { useRecoilState } from "recoil";

export default function Buying(){
    const [isItemSelected, setIsItemSelected] = React.useState(false);
    const [isMaterialRequiredSelected, setIsMaterialRequiredSelected] = React.useState(false);
    const [isPurchaseOrderSelected, setIsPurchaseOrderSelected] = React.useState(false);
    const [selectedItemKeys,setSelectedItemkeys]:any = useRecoilState(selectedItemIdsState);
    const [id,setItemId]:any = useRecoilState(selectedItemIdsState);

    const handleItemsClick =()=>{
        setIsItemSelected(true);
        setIsMaterialRequiredSelected(false);
        setIsPurchaseOrderSelected(false);
    }

    const handleMaterialRequiredClick =()=>{
        setIsItemSelected(false);
        setIsMaterialRequiredSelected(true);
        setIsPurchaseOrderSelected(false);
    }

    const handlePurchaseOrderClick =()=>{
        setIsItemSelected(false);
        setIsMaterialRequiredSelected(false);
        setIsPurchaseOrderSelected(true);
    }
    
    return(
        <div className="w-full h-full">
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row item-center">
                <NavLink to={`items/table`}>
                    <div className={`text-sm rounded-xl cursor-pointer ${isItemSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-14 h-8 flex justify-center items-center mr-2`}
                                    onClick={handleItemsClick}>
                        Items
                    </div>
                </NavLink>
                <div className={`text-sm rounded-xl cursor-pointer ${isMaterialRequiredSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-40 h-8 flex justify-center items-center mr-2`}
                                    onClick={handleMaterialRequiredClick}>
                   Material Required
                </div>
                <div className={`text-sm rounded-xl cursor-pointer ${isPurchaseOrderSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-40 h-8 flex justify-center items-center mr-2`}
                                    onClick={handlePurchaseOrderClick}>
                    Purchase Order
                </div>
            </div>
            {isItemSelected && (
                <div className="flex flex-row gap-3">
                {selectedItemKeys.size===1?(
                    <NavLink to={`allUsers/editUser/${String(Array.from(selectedItemKeys))}`}>
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
                <input type="text" name="ids" hidden value={Array.from(selectedItemKeys)} />
                <button className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
                    <img src={deleteIcon} width={20}/>
                </button>
                </Form>
               <NavLink to="items/addItem">
               <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-28" >
                    <img src={addIcon} width={20}/> Add Item
                </div>
               </NavLink>
                </div> 
            )}               
        </div>
        <Outlet/>
    </div>
    )
}