import { Input, Textarea } from "@nextui-org/input";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { createPurchaseOrder } from "services/dashboard/purchaseOrder";
import { userIdState } from "state/userState";



export default function AddPurchaseOrder(){
    const [id,setId] = useRecoilState(userIdState);


    const [isAddItem,setIsAddItem] = useState(false);
    const [itemList,setItemList]:any = useState([])

    const [itemCode,setItemCode] = useState("");
    const [requiredBy,setRequiredBy] = useState("");
    const [itemName,setItemName] = useState("");
    const [expectedDeliveryDate,setExpectedDelivaryDate] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [rate,setRate] = useState(0);

    const handleItemCodeChange = (e:any) => setItemCode(e.target.value);
    const handleRequiredByChange = (e:any) => setRequiredBy(e.target.value);
    const handleItemNameChange = (e:any) => setItemName(e.target.value);
    const handleExpectedDeliveryDateChange = (e:any) => setExpectedDelivaryDate(e.target.value);
    const handleQuantityChange = (e:any) => setQuantity(e.target.value);
    const handleRateChange = (e:any) => setRate(e.target.value);

    const handleAddItemClick = ()=>{
        setIsAddItem(true);
    }

    const handleInsertItemClick=()=>{
        const amount = rate * quantity;
        setItemList([...itemList,{itemCode, 
            requiredBy, 
            itemName, 
            expectedDeliveryDate, 
            quantity, 
            rate, 
            amount}])
        setIsAddItem(false);
    }
    
    return(
        <div className="w-full h-full">
        <Form method="post" className="w-full h-full mt-5">                
            <div>
                Details
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="series" label="Series" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="date" label="Date" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="company" label="Company" variant="faded" labelPlacement="outside" />
                </div>
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="supplier" labelPlacement="outside" variant="faded"   label="Supplier" />
                    <Input type="text" name="requiredBy" labelPlacement="outside"  variant="faded"  label="Required By"/>
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Accounting Dimensions
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="costCenter" label="Cost Center" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="project" label="Project" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Currency and Price List
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="currency" label="Currency" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="project" label="Project" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
            <div className="flex flex-col pt-10">
                       Purchasing
                       <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="defaultPurchaseUnitOfMeasure" label="Default Purchase Unit of Measure" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="leadTimeInDays" label="Lead Time in Days" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="safetyStock" label="Safety Stock" variant="faded" labelPlacement="outside" />
                    </div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    {isAddItem?(
                        <div className="w-full  grid grid-rows-[1fr_auto] gap-2 mt-8">
                        <div className="mt-6">
                        <Table
                          removeWrapper
                          aria-label="Users table"
                          selectionMode="multiple"
                          classNames={{
                              wrapper: "min-h-fit-content",
                          }}>
                        <TableHeader>
                        <TableColumn>Item Code</TableColumn>
                        <TableColumn>Item Name</TableColumn>
                        <TableColumn>Required By</TableColumn>
                        <TableColumn>Expected Delivery Date</TableColumn>
                        <TableColumn>Quantity</TableColumn>
                        <TableColumn>Rate</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        </TableHeader>
                        <TableBody>
                        {itemList.map((item:any, index:number) => (
                                <TableRow key={index}>
                                    <TableCell>{item.itemCode}</TableCell>
                                    <TableCell>{item.itemName}</TableCell>
                                    <TableCell>{item.requiredBy}</TableCell>
                                    <TableCell>{item.expectedDeliveryDate}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.rate}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>      
                        </div>
                        <div className="animate-slide-in-left">
                        <div className="grid grid-cols-3 gap-4">   
                        <Input type="text" name="itemCode" label="Item Code" variant="faded" labelPlacement="outside" onChange={handleItemCodeChange} />
                        <Input type="text" name="requiredBy" label="Required By" variant="faded" labelPlacement="outside" onChange={handleRequiredByChange} />
                        <Input type="text" name="itemName" label="Item Name" variant="faded" labelPlacement="outside" onChange={handleItemNameChange} />
                        <Input type="text" name="expectedDeliveryDate" label="Expected Delivery Date" variant="faded" labelPlacement="outside" onChange={handleExpectedDeliveryDateChange} />
                        <Input type="number" name="quantity" label="Quantity" variant="faded" labelPlacement="outside" onChange={handleQuantityChange} />
                        <Input type="number" name="rate" label="Rate" variant="faded" labelPlacement="outside" onChange={handleRateChange} />
                        </div>
                        <button className="mt-4 bg-bgLightGray rounded-xl w-20 h-10 cursor-pointer" onClick={handleInsertItemClick}>Insert</button>
                        </div>
                    </div>
                    ):(
                        <div className="w-full mt-8">
                           <Table
                          removeWrapper
                          aria-label="Users table"
                          selectionMode="multiple"
                          classNames={{
                              wrapper: "min-h-fit-content",
                          }}>
                        <TableHeader>
                        <TableColumn>Item Code</TableColumn>
                        <TableColumn>Item Name</TableColumn>
                        <TableColumn>Required By</TableColumn>
                        <TableColumn>Expected Delivery Date</TableColumn>
                        <TableColumn>Quantity</TableColumn>
                        <TableColumn>Rate</TableColumn>
                        <TableColumn>Amount</TableColumn>
                        </TableHeader>
                        <TableBody>
                        {itemList.map((item:any, index:number) => (
                                <TableRow key={index}>
                                    <TableCell>{item.itemCode}</TableCell>
                                    <TableCell>{item.itemName}</TableCell>
                                    <TableCell>{item.requiredBy}</TableCell>
                                    <TableCell>{item.expectedDeliveryDate}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.rate}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </div>
                    )}
                    <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2 cursor-pointer" onClick={handleAddItemClick}>Add Item</div>
                </div> 
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="setTargetWarehouse" label="Set Target Warehouse" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Tax and Charges
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="taxCategory" label="Tax Category" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="shippingRule" label="Shipping Rule" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="incoterm" label="Incoterm" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Additional Discount
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="applyAdditionalDiscountOn" label="Apply Additional Discount On" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="additionalDiscountPercentage" label="Additional Discount Percentage" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="additionalDiscountAmount" label="Additional Discount Amount" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Supplier Address
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="supplierAddress" label="Supplier Address" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="supplierContact" label="Supplier Contact" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Shipping Address
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="shippingAddress" label="Shipping Address" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Company Billing Address
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="shippingAddress" label="Shipping Address" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Terms and Conditions
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="terms" label="Terms" variant="faded" labelPlacement="outside" />
                </div>
                <div className="flex flex-row mt-4 gap-3">
                <Textarea
                        name="description"
                        labelPlacement="outside"
                        variant="faded"
                        label="Terms and Condition "
                    />
                </div>
            </div>

            <input type="text" name="userId" hidden value={id}/>
            <input type="text" name="itemList" hidden value={JSON.stringify(itemList)} />
            <button className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                    Save
            </button>
        </Form>            
    </div>
    )
}



export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData();
    const {userId,...data} = Object.fromEntries(formData);
    if(data){
        const isPruchaseOrderCreated = await createPurchaseOrder(data);
        if(isPruchaseOrderCreated){
            return redirect("/dashboard/"+userId+"/buying/purchaseOrder/table")
        }
    }
    return null;
}