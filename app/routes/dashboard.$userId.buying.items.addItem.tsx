import { Input, Textarea } from "@nextui-org/input";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
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
                    Barcode
                    <div className="w-full mt-8">
                    <Table
                          removeWrapper
                          aria-label="Users table"
                          selectionMode="multiple"
                          classNames={{
                              wrapper: "min-h-[650px]",
                          }}>
                        <TableHeader>
                        <TableColumn>No.</TableColumn>
                        <TableColumn>Barcode</TableColumn>
                        <TableColumn>Barcode Type</TableColumn>
                        <TableColumn>UOM</TableColumn>
                        </TableHeader>
                        <TableBody>
                         
                        </TableBody>
                    </Table>      
                    </div>
                    <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2">Add Barcode</div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    Accouting
                    <div className="w-full mt-8">
                    <Table
                          removeWrapper
                          aria-label="Users table"
                          selectionMode="multiple"
                          classNames={{
                              wrapper: "min-h-[650px]",
                          }}>
                        <TableHeader>
                        <TableColumn>No.</TableColumn>
                        <TableColumn>Company</TableColumn>
                        <TableColumn>Default Warehouse</TableColumn>
                        <TableColumn>Default Price List</TableColumn>
                        </TableHeader>
                        <TableBody>
                         
                        </TableBody>
                    </Table>      
                    </div>
                    <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2">Add Accouting</div>
                </div>          
                <div className="flex flex-col pt-10">
                       Purchasing
                       <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="defaultPurchaseUnitOfMeasure" label="Default Purchase Unit of Measure" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="leadTimeInDays" label="Lead Time in Days" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="safetyStock" label="Safety Stock" variant="faded" labelPlacement="outside" />
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
                    Supplier Details
                    <div className="w-full mt-8">
                    <Table
                          removeWrapper
                          aria-label="Users table"
                          selectionMode="multiple"
                          classNames={{
                              wrapper: "min-h-[650px]",
                          }}>
                        <TableHeader>
                        <TableColumn>Supplier</TableColumn>
                        <TableColumn>Supplier Part Number</TableColumn>
                        </TableHeader>
                        <TableBody>
                         
                        </TableBody>
                    </Table>      
                    </div>
                    <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2">Add Supplier</div>
                </div> 
                <div className="flex flex-col pt-10">
                       Foreign Trade Details
                    <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="countryOfOrigin" label="Country of Origin" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="customsTariffNumber" label="Customs Tariff Number" variant="faded" labelPlacement="outside"/>
                    </div>
                </div>
                <div className="flex flex-col pt-10">
                       Sales
                    <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="defaultSalesUnitOfMeasure" label="Default Sales Unit of Measure" variant="faded" labelPlacement="outside"/>
                        <Input type="text" name="maxDiscount" label="Max Discount" variant="faded" labelPlacement="outside"/>
                    </div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    Customer Details
                    <div className="w-full mt-8">
                    <Table
                          removeWrapper
                          aria-label="Users table"
                          selectionMode="multiple"
                          classNames={{
                              wrapper: "min-h-[650px]",
                          }}>
                        <TableHeader>
                        <TableColumn>No.</TableColumn>
                        <TableColumn>Customer Name</TableColumn>
                        <TableColumn>Customer Group</TableColumn>
                        <TableColumn>Ref Code</TableColumn>
                        </TableHeader>
                        <TableBody>
                        </TableBody>
                    </Table>      
                    </div>
                    <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2">Add Customer</div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    Taxes
                    <div className="w-full mt-8">
                    <Table
                          removeWrapper
                          aria-label="Users table"
                          selectionMode="multiple"
                          classNames={{
                              wrapper: "min-h-[650px]",
                          }}>
                        <TableHeader>
                        <TableColumn>No.</TableColumn>
                        <TableColumn>Item Tax Template</TableColumn>
                        <TableColumn>Tax Category</TableColumn>
                        <TableColumn>Valid From</TableColumn>
                        <TableColumn>Minimum Net Rate</TableColumn>
                        <TableColumn>Maximum Net Rate</TableColumn>
                        </TableHeader>
                        <TableBody>
                        </TableBody>
                    </Table>      
                    </div>
                    <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2">Add Tax</div>
                </div>
                <input type="text" hidden value={id} name="userId" />
                <button name="_action" value="addUser" className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                        Save
                </button>
            </Form>            
        </div>
    )
}