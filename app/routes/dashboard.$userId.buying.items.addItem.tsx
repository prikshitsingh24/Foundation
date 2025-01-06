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
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="itemCode" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Item Code" />
                        <input type="text" name="itemName" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Item Name" />
                        <input type="text" name="itemGroup" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Item Group" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="unitOfMeasure" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Default Unit of Measure" />
                        <input type="text" name="openingStock" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Opening Stock" />
                        <input type="text" name="valuationRate" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Valuation Rate" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="standardSellingRate" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Standard Selling Rate" />
                        <input type="text" name="description" className="bg-bgLightGray rounded-md h-8 pl-3 w-full mr-4 outline-none" placeholder="Description" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="brandName" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Brand Name" />
                    </div>
                </div>
                <br />
                <div className="flex flex-col pt-10">
                       Inventory
                       <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="shelfLifeInDays" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Shelf Life in Days" />
                        <input type="text" name="warrantyPeriod" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Warranty Period" />
                        <input type="text" name="End of Life" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="End of Life" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="weigthPerUnit" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Weight per Unit" />
                        <input type="text" name="defaultMaterialRequestType" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Default Material Request Type" />
                        <input type="text" name="weightUom" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Weight UOM" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="standardSellingRate" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Standard Selling Rate" />
                        <input type="text" name="description" className="bg-bgLightGray rounded-md h-8 pl-3 w-full mr-4 outline-none" placeholder="Description" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="brandName" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Brand Name" />
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
                            <input type="number" name="phoneNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Phone Number" />
                            <input type="number" name="mobileNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Mobile Number" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <input type="text" name="dateOfBirth" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Date Of Birth" />
                            <input type="text" name="location" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Location" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <input type="text" name="interest" className="bg-bgLightGray rounded-md h-20 pl-3 w-96 mr-4 outline-none" placeholder="Interest" />
                            <input type="text" name="bio" className="bg-bgLightGray rounded-md h-20 pl-3 w-96 mr-4 outline-none" placeholder="Bio" />
                        </div>
                    </div>
                </div>
                <input type="text" hidden value={id} name="userId" />
                <button name="_action" value="addUser" className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                        Save
                </button>
            </Form>            
        </div>
    )
}