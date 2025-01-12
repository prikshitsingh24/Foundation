import { Form, NavLink, Outlet } from "@remix-run/react";
import addIcon from "/addIcon.png";
import editIcon from "/editIcon.png";
import deleteIcon from "/deleteIcon.png";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import React from "react";
import { selectedItemIdsState } from "state/itemState";
import { useRecoilState } from "recoil";
import { userIdState } from "state/userState";
import { selectedMaterialRequestedIdState } from "state/materialRequestedState";
import { deleteMaterialRequiredByIds } from "services/dashboard/material";
import { deleteRolesByItemIds } from "services/dashboard/item";

export default function Buying(){
    const [isItemSelected, setIsItemSelected] = React.useState(false);
    const [isMaterialRequestedSelected, setIsMaterialRequestedSelected] = React.useState(false);
    const [isPurchaseOrderSelected, setIsPurchaseOrderSelected] = React.useState(false);
    const [selectedItemIds,setSelectedItemIds]:any = useRecoilState(selectedItemIdsState);
    const [selectedMaterialRequestedId,setSelectedMaterialRequestedId]:any = useRecoilState(selectedMaterialRequestedIdState);
    const [id,setUserId]:any = useRecoilState(userIdState);

    const handleItemsClick =()=>{
        setIsItemSelected(true);
      setIsMaterialRequestedSelected(false);
        setIsPurchaseOrderSelected(false);
    }

    const handleMaterialRequiredClick =()=>{
        setIsItemSelected(false);
      setIsMaterialRequestedSelected(true);
        setIsPurchaseOrderSelected(false);
    }

    const handlePurchaseOrderClick =()=>{
        setIsItemSelected(false);
      setIsMaterialRequestedSelected(false);
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
              <NavLink to="materialRequested/table">
              <div className={`text-sm rounded-xl cursor-pointer ${isMaterialRequestedSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-40 h-8 flex justify-center items-center mr-2`}
                                    onClick={handleMaterialRequiredClick}>
                   Material Requested
                </div>
              </NavLink>
              <NavLink to="purchaseOrder/table">
              <div className={`text-sm rounded-xl cursor-pointer ${isPurchaseOrderSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-40 h-8 flex justify-center items-center mr-2`}
                                    onClick={handlePurchaseOrderClick}>
                    Purchase Order
                </div>
              </NavLink>
                
            </div>
            {isItemSelected && (
                <div className="flex flex-row gap-3">
                {selectedItemIds.size===1?(
                    <NavLink to={`items/editItem/${String(Array.from(selectedItemIds))}`}>
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
                <input type="text" name="itemIds" hidden value={Array.from(selectedItemIds)} />
                <button name="_action" value="deleteItems" className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
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

             {isMaterialRequestedSelected && (
                <div className="flex flex-row gap-3">
                {selectedMaterialRequestedId.size===1?(
                    <NavLink to={`materialRequested/editMaterialRequested/${String(Array.from(selectedMaterialRequestedId))}`}>
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
                <input type="text" name="materialRequestedIds" hidden value={Array.from(selectedMaterialRequestedId)} />
                <button name="_action" value="deleteMaterialRequest" className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
                    <img src={deleteIcon} width={20}/>
                </button>
                </Form>
               <NavLink to="materialRequested/addMaterialRequested">
               <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-56" >
                    <img src={addIcon} width={20}/> Add Material Requested
                </div>
               </NavLink>
                </div> 
            )}
            {isPurchaseOrderSelected && (
                <div className="flex flex-row gap-3">
                {selectedMaterialRequestedId.size===1?(
                    <NavLink to={`materialRequested/editMaterialRequested/${String(Array.from(selectedMaterialRequestedId))}`}>
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
                <input type="text" name="materialRequestedIds" hidden value={Array.from(selectedMaterialRequestedId)} />
                <button name="_action" value="deleteMaterialRequest" className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
                    <img src={deleteIcon} width={20}/>
                </button>
                </Form>
               <NavLink to="purchaseOrder/addPurchaseOrder">
               <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-48" >
                    <img src={addIcon} width={20}/> Add Purchase Order
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
    const {_action, ...ids} = Object.fromEntries(formData);
    if(_action==="deleteItems"){
    const itemIds = String(ids.itemIds).split(',');
    const isRoleDeleted = await deleteRolesByItemIds(itemIds)
    if(isRoleDeleted){
        return redirect("/dashboard/"+ids.userId+"/buying/items/table");
    }
    if(!isRoleDeleted){
        console.log("Error!! not able to delete entry")
    }
    return redirect("/dashboard/"+ids.userId+"/buying/items/table");
    }
    if(_action==="deleteMaterialRequest"){
        const itemIds = String(ids.materialRequestedIds).split(',');
        const isMaterialDeleted = await deleteMaterialRequiredByIds(itemIds)
        if(isMaterialDeleted){
            return redirect("/dashboard/"+ids.userId+"/buying/materialRequested/table");
        }
        if(!isMaterialDeleted){
            console.log("Error!! not able to delete entry");
            return redirect("/dashboard/"+ids.userId+"/buying/materialRequested/table");
        }
        return redirect("/dashboard/"+ids.userId+"/buying/materialRequested/table");
    }
}