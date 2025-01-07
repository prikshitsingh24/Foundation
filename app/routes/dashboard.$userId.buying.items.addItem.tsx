import { Input, Textarea } from "@nextui-org/input";
import { Form } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { userIdState } from "state/userState";



export default function AddItem(){
    const [id,setId] = useRecoilState(userIdState);
    
    return(
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full mt-5">
                <div>
                    Details
                    <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="itemCode" label="Item Code" variant="faded" labelPlacement="outside" />
                        <Input type="text" name="itemName" label="Item Name" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="itemGroup" label="Item Group" variant="faded" labelPlacement="outside"/>
                    </div>
                    <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="unitOfMeasure" label="Unit of Measure" variant="faded" labelPlacement="outside" />
                        <Input type="text" name="openingStock" label="Opening Stock" variant="faded" labelPlacement="outside" />
                        <Input type="text" name="valuationRate" label="Valuation Rate" variant="faded" labelPlacement="outside" />
                    </div>
                    <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="standardSellingRate" label="Standard Selling Rate" variant="faded" labelPlacement="outside" />
                        <Input type="text" name="brandName" label="Brand Name" variant="faded" labelPlacement="outside"/>
                    </div>
                    <div className="flex flex-row mt-8 gap-3">
                    <Textarea
                                disableAnimation
                                disableAutosize
                                classNames={{
                                    base: "max-w-xs",
                                    input: "resize-y min-h-[40px]",
                                }}
                                label="Description"
                                variant="faded"
                    />
                    </div>
                </div>
                <br />
                <div className="flex flex-col pt-10">
                       Inventory
                       <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="shelfLifeInDays" label="Shelf Life in Days" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="warrantyPeriod" label="Warranty Period" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="End of Life" label="End of Life" variant="faded" labelPlacement="outside" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <Input type="text" name="weigthPerUnit" label="Weight per Unit" variant="faded" labelPlacement="outside" />
                        <Input type="text" name="defaultMaterialRequestType" label="Default Material Request Type" variant="faded" labelPlacement="outside" />
                        <Input type="text" name="weightUom" label="Weight UOM" variant="faded" labelPlacement="outside" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <Input type="text" name="valuation" label="Valuation" variant="faded" labelPlacement="outside" />
                    </div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    More Information
                    <div className="w-full">
                        <div className="flex flex-row mt-5 gap-3">
                            <select name="gender" className="bg-bgLightGray rounded-md w-5/12 h-8 pl-3 pr-10 outline-none">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <Input type="number" name="phoneNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Phone Number" />
                            <Input type="number" name="mobileNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Mobile Number" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <Input type="text" name="dateOfBirth" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Date Of Birth" />
                            <Input type="text" name="location" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Location" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <Input type="text" name="interest" className="bg-bgLightGray rounded-md h-20 pl-3 w-96 mr-4 outline-none" placeholder="Interest" />
                            <Input type="text" name="bio" className="bg-bgLightGray rounded-md h-20 pl-3 w-96 mr-4 outline-none" placeholder="Bio" />
                        </div>
                    </div>
                </div>
                <Input type="text" hidden value={id} name="userId" />
                <button name="_action" value="addUser" className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                        Save
                </button>
            </Form>            
        </div>
    )
}