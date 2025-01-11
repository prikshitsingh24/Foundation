import { Form, NavLink, Outlet } from "@remix-run/react";
import React from "react";
import { useRecoilState } from "recoil";
import { selectedIdsState, userIdState } from "state/userState";
import addIcon from "/addIcon.png";
import editIcon from "/editIcon.png";
import deleteIcon from "/deleteIcon.png";
import { ActionFunctionArgs } from "@remix-run/node";
import { isAddAccountState, isEditAccountState, selectedAccountsState } from "state/accountState";
import { selectedSalesInvoiceState } from "state/salesInvoiceState";
import { selectedPurchaseInvoiceState } from "state/purchaseInvoiceState";

export default function Accounting(){

    const [isAccountSelected, setIsAccountSelected] = React.useState(false);
    const [isSalesInvoiceSelected, setIsSalesInvoiceSelected] = React.useState(false);
    const [isPurchaseInvoiceSelected, setIsPurchaseInvoiceSelected] = React.useState(false);
    const [isPaymentEntrySelected, setIsPaymentEntrySelected] = React.useState(false);

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
    
    const [selectedAccountKeys,setSelectedAccountKeys]:any = useRecoilState(selectedAccountsState);
    const [selectedSalesInvoiceKeys,setSelectedSalesInvoiceKeys]:any = useRecoilState(selectedSalesInvoiceState);
    const [selectedPurchaseInvoiceKeys,setSelectedPurchaseInvoiceKeys]:any = useRecoilState(selectedPurchaseInvoiceState);

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
                    <div className="flex flex-row gap-3">
                    {selectedAccountKeys.size===1?(
                        <NavLink to={`account/editAccount/${String(Array.from(selectedAccountKeys))}`}>
                        <div className="rounded-full w-8 text-blue-500 border-2 border-blue-500 h-8 cursor-pointer flex justify-evenly items-center">
                            <img src={editIcon} width={20}/>
                        </div>
                        </NavLink>
                    ):(
                        <div></div>
                    )}
                    <Form method="post">
                    <input type="text" hidden value={id} name="userId" />
                    <input type="text" name="accountIds" hidden value={Array.from(selectedAccountKeys)} />
                    <button name="_action" value="deleteAccounts"className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
                        <img src={deleteIcon} width={20}/>
                    </button>
                    </Form>
                    <NavLink to="account/newAccount">
                    <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-36" >
                        <img src={addIcon} width={20}/> New Account
                    </div>
                   </NavLink>
                    </div> 
                )}
                {isSalesInvoiceSelected && 
                (
                    <div className="flex flex-row gap-3">
                    {selectedSalesInvoiceKeys.size===1?(
                        <NavLink to={`salesInvoice/editInvoice/${String(Array.from(selectedSalesInvoiceKeys))}`}>
                        <div className="rounded-full w-8 text-blue-500 border-2 border-blue-500 h-8 cursor-pointer flex justify-evenly items-center">
                            <img src={editIcon} width={20}/>
                        </div>
                        </NavLink>
                    ):(
                        <div></div>
                    )}
                    <Form method="post">
                    <input type="text" hidden value={id} name="userId" />
                    <input type="text" name="invoiceIds" hidden value={Array.from(selectedSalesInvoiceKeys)} />
                    <button name="_action" value="deleteAccounts"className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
                        <img src={deleteIcon} width={20}/>
                    </button>
                    </Form>
                    <NavLink to="salesInvoice/newInvoice">
                    <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-36" >
                        <img src={addIcon} width={20}/> New Invoice
                    </div>
                   </NavLink>
                    </div>
                )}
                {isPurchaseInvoiceSelected && 
                (
                    <div className="flex flex-row gap-3">
                    {selectedPurchaseInvoiceKeys.size===1?(
                        <NavLink to={`purchaseInvoice/editInvoice/${String(Array.from(selectedPurchaseInvoiceKeys))}`}>
                        <div className="rounded-full w-8 text-blue-500 border-2 border-blue-500 h-8 cursor-pointer flex justify-evenly items-center">
                            <img src={editIcon} width={20}/>
                        </div>
                        </NavLink>
                    ):(
                        <div></div>
                    )}
                    <Form method="post">
                    <input type="text" hidden value={id} name="userId" />
                    <input type="text" name="invoiceIds" hidden value={Array.from(selectedPurchaseInvoiceKeys)} />
                    <button name="_action" value="deleteAccounts"className="rounded-full w-8 text-red-500 border-2 border-red-500 h-8 cursor-pointer flex justify-evenly items-center">
                        <img src={deleteIcon} width={20}/>
                    </button>
                    </Form>
                    <NavLink to="purchaseInvoice/newInvoice">
                    <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-evenly items-center w-36" >
                        <img src={addIcon} width={20}/> New Invoice
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