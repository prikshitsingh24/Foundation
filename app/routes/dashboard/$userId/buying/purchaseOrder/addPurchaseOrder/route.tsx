import { Input } from "@nextui-org/input";
import { Form } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { userIdState } from "state/userState";



export default function AddPurchaseOrder(){
    const [id,setId] = useRecoilState(userIdState);
    
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
            <input type="text" name="userId" hidden value={id}/>
            <button className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                    Save
            </button>
        </Form>            
    </div>
    )
}