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
    const [isSalesInvoiceSelected, setIsSalesInvoiceSelected] = React.useState(false);
    const [isPurchaseInvoiceSelected, setIsPurchaseInvoiceSelected] = React.useState(false);
    const [isPaymentEntrySelected, setIsPaymentEntrySelected] = React.useState(false);
    const [isNewAccount,setNewAccount] = useRecoilState(isAddUserState);
    const [id,setId] = useRecoilState(userIdState);


    const handleAccountClick =()=>{
        setIsSalesInvoiceSelected(false)
        setIsPurchaseInvoiceSelected(false)
        setIsPaymentEntrySelected(false)
        setIsAccountSelected(true)
    }

    const handleSalesInvoiceClick =()=>{
        setIsAccountSelected(false)
        setIsPurchaseInvoiceSelected(false)
        setIsPaymentEntrySelected(false)
        setIsSalesInvoiceSelected(true)
    }

    const handlePurchaseInvoiceClick =()=>{
        setIsAccountSelected(false)
        setIsSalesInvoiceSelected(false)
        setIsPaymentEntrySelected(false)
        setIsPurchaseInvoiceSelected(true)
    }

    const handlePaymentEntryClick =()=>{
        setIsAccountSelected(false)
        setIsSalesInvoiceSelected(false)
        setIsPurchaseInvoiceSelected(false)
        setIsPaymentEntrySelected(true)
    }
    
    return(
        <div className="w-full h-full">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row item-center">
                    <NavLink to="account/table">
                        <div className={`text-sm rounded-xl cursor-pointer ${isAccountSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-24 h-8 flex justify-center items-center mr-2`}
                                        onClick={handleAccountClick}>
                            Accounts
                        </div>
                    </NavLink>
                    <NavLink to="salesInvoice/table">
                        <div className={`text-sm rounded-xl cursor-pointer ${isSalesInvoiceSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-28 h-8 flex justify-center items-center mr-2`}
                                        onClick={handleSalesInvoiceClick}>
                            Sales Invoice
                        </div>
                    </NavLink>
                    <NavLink to="purchaseInvoice/table">
                        <div className={`text-sm rounded-xl cursor-pointer ${isPurchaseInvoiceSelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-36 h-8 flex justify-center items-center mr-2`}
                                        onClick={handlePurchaseInvoiceClick}>
                            Purchase Invoice
                        </div>
                    </NavLink>
                    <NavLink to="paymentEntry/table">
                        <div className={`text-sm rounded-xl cursor-pointer ${isPaymentEntrySelected?'bg-btnBlack text-textWhite':''} hover:bg-btnBlack hover:text-white w-36 h-8 flex justify-center items-center mr-2`}
                                        onClick={handlePaymentEntryClick}>
                            Payment Entry
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
                {isSalesInvoiceSelected && 
                (
                    <div>
                        <NavLink to="salesInvoice/newInvoice">
                            <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-32">
                                New Invoice
                            </div>
                        </NavLink>
                    </div>
                )}
                {isPurchaseInvoiceSelected && 
                (
                    <div>
                        <NavLink to="purchaseInvoice/newInvoice">
                            <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-32">
                                New Invoice
                            </div>
                        </NavLink>
                    </div>
                )}
                {isPaymentEntrySelected && 
                (
                    <div>
                        <NavLink to="paymentEntry/newEntry">
                            <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-32">
                                New Entry
                            </div>
                        </NavLink>
                    </div>
                )}
            </div>
            <Outlet/>
        </div>
    )
}