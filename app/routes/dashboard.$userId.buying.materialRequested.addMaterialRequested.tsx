import { Input, Textarea } from "@nextui-org/input";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { createMaterialRequested } from "services/dashboard/material";
import { userIdState } from "state/userState";


export default function AddMaterialRequestedTable(){

    const [id,setId] = useRecoilState(userIdState);
    const [isMaterial,setIsMaterial] = useState(false);
    const [itemCode,setItemCode] = useState('');
    const [requiredBy, setRequiredBy] = useState('');
    const [itemName,setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [quantity,setQuantity] = useState('');
    const [uom,setUom] = useState('');
    const [uomConversionFactor,setUomConversionFactor] = useState('');
    const [targetWarehouse,setTargetWarehouse] = useState('');
    const [rate,setRate] = useState('');
    const [expenseAccount,setExpenseAccount] = useState('');
    const [wipCompositeAsset,setWipCompositeAsset] = useState('');
    const [manufacturer,setManufacturer] = useState('');
    const [bomNo,setBomNo] = useState('');
    const [project,setProject] = useState('');
    const [costCenter,setCostCenter] = useState('');
    const [materialRequestedList,setMaterialRequestedList]:any = useState([])


    const handleAddMaterialClick=()=>{
        setIsMaterial(true);
    }

    const handleItemCodeChange=(e:any)=>{
        setItemCode(e.target.value)
    }
      
      const handleRequiredByChange = (e:any) => {
        setRequiredBy(e.target.value);
      };
      
      const handleItemNameChange = (e:any) => {
        setItemName(e.target.value);
      };
      
      const handleDescriptionChange = (e:any) => {
        setDescription(e.target.value);
      };
      
      const handleQuantityChange = (e:any) => {
        setQuantity(e.target.value);
      };
      
      const handleUomChange = (e:any) => {
        setUom(e.target.value);
      };
      
      const handleUomConversionFactorChange = (e:any) => {
        setUomConversionFactor(e.target.value);
      };
      
      const handleTargetWarehouseChange = (e:any) => {
        setTargetWarehouse(e.target.value);
      };
      
      const handleRateChange = (e:any) => {
        setRate(e.target.value);
      };
      
      const handleExpenseAccountChange = (e:any) => {
        setExpenseAccount(e.target.value);
      };
      
      const handleWipCompositeAssetChange = (e:any) => {
        setWipCompositeAsset(e.target.value);
      };
      
      const handleManufacturerChange = (e:any) => {
        setManufacturer(e.target.value);
      };
      
      const handleBomNoChange = (e:any) => {
        setBomNo(e.target.value);
      };
      
      const handleProjectChange = (e:any) => {
        setProject(e.target.value);
      };
      
      const handleCostCenterChange = (e:any) => {
        setCostCenter(e.target.value);
      };


      const handleInsertMaterialClick=()=>{
        setMaterialRequestedList([
            ...materialRequestedList,
            {
              itemCode,
              requiredBy,
              itemName,
              description,
              quantity,
              uom,
              uomConversionFactor,
              targetWarehouse,
              rate,
              expenseAccount,
              wipCompositeAsset,
              manufacturer,
              bomNo,
              project,
              costCenter
            }
          ]);
          setIsMaterial(false);
      }
      

    return(
        <div className="w-full h-full">
        <Form method="post" className="w-full h-full mt-5">
            <div>
                Basic Info
                <div className="flex mt-4 flex-row gap-3">
                    <Input type="text" name="series" labelPlacement="outside" variant="faded" label="Series" />
                    <Input type="text" name="transactionDate" labelPlacement="outside" variant="faded"  label="Transaction Date"  />
                    <Input type="text" name="purpose" labelPlacement="outside" variant="faded" label="Purpose"  />
                </div>
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="requiredBy" labelPlacement="outside" variant="faded"   label="Required By" />
                    <Input type="text" name="company" labelPlacement="outside"  variant="faded"  label="Company"/>
                </div>
            </div>
            <br />
            <div className="flex flex-col pt-10 mt-5">
                Items
                <div className="w-full mt-4">
                    <div className="flex flex-row gap-3">
                        <Input type="text" name="setTargetWarehouse" label="Set Target Warehouse" variant="faded"   labelPlacement="outside" />
                        
                    </div>
                    <div className="flex flex-col pt-10">
                    {isMaterial?(
                        <div className="w-full  grid grid-rows-[1fr_auto] gap-2 mt-4">
                            <div className="mt-6">
                            <Table
                              removeWrapper
                              aria-label="Users table"
                              selectionMode="multiple"
                              classNames={{
                                  wrapper: "min-h-fit-content",
                              }}>
                            <TableHeader>
                            <TableColumn>No.</TableColumn>
                            <TableColumn>Item Code</TableColumn>
                            <TableColumn>Required By</TableColumn>
                            <TableColumn>Quantity</TableColumn>
                            <TableColumn>Target Warehouse</TableColumn>
                            <TableColumn>UOM</TableColumn>
                            </TableHeader>
                            <TableBody>
                            {materialRequestedList.map((material:any,index:number)=>(
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{material.itemCode}</TableCell>
                                    <TableCell>{material.requiredBy}</TableCell>
                                    <TableCell>{material.quantity}</TableCell>
                                    <TableCell>{material.targetWarehouse}</TableCell>
                                    <TableCell>{material.uom}</TableCell>
                                </TableRow>
                            )
                         )}
                            </TableBody>
                        </Table>      
                            </div>
                            <div className="animate-slide-in-left">
                            <div className="grid grid-cols-3 gap-4">   
                            <Input type="text" name="itemCode" label="Item Code" variant="faded" labelPlacement="outside" onChange={handleItemCodeChange}/>
                            <Input type="dateTime" name="requiredBy" label="Required By" variant="faded" labelPlacement="outside" onChange={handleRequiredByChange} />
                            <Input type="text" name="itemName" label="Item Name" variant="faded" labelPlacement="outside" onChange={handleItemNameChange} />
                            <Input type="text" name="description" label="Description" variant="faded" labelPlacement="outside" onChange={handleDescriptionChange} />
                            <Input type="text" name="quantity" label="Quantity" variant="faded" labelPlacement="outside" onChange={handleQuantityChange} />
                            <Input type="text" name="uom" label="UOM" variant="faded" labelPlacement="outside" onChange={handleUomChange} />
                            <Input type="text" name="uomConversionFactor" label="UOM Conversion Factor" variant="faded" labelPlacement="outside" onChange={handleUomConversionFactorChange} />
                            <Input type="text" name="targetWarehouse" label="Target Warehouse" variant="faded" labelPlacement="outside" onChange={handleTargetWarehouseChange} />
                            <Input type="text" name="rate" label="Rate" variant="faded" labelPlacement="outside" onChange={handleRateChange} />
                            <Input type="text" name="expenseAccount" label="Expense Account" variant="faded" labelPlacement="outside" onChange={handleExpenseAccountChange} />
                            <Input type="text" name="wipCompositeAsset" label="WIP Composite Asset" variant="faded" labelPlacement="outside" onChange={handleWipCompositeAssetChange} />
                            <Input type="text" name="manufacturer" label="Manufacturer" variant="faded" labelPlacement="outside" onChange={handleManufacturerChange} />
                            <Input type="text" name="bomNo" label="BOM No" variant="faded" labelPlacement="outside" onChange={handleBomNoChange} />
                            <Input type="text" name="project" label="Project" variant="faded" labelPlacement="outside" onChange={handleProjectChange} />
                            <Input type="text" name="costCenter" label="Cost Center" variant="faded" labelPlacement="outside" onChange={handleCostCenterChange} />

                            </div>
                            <button className="mt-4 bg-bgLightGray rounded-xl w-20 h-10" onClick={handleInsertMaterialClick}>Insert</button>
                            </div>
                        </div>
                    ):(
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
                        <TableColumn>Item Code</TableColumn>
                        <TableColumn>Required By</TableColumn>
                        <TableColumn>Quantity</TableColumn>
                        <TableColumn>Target Warehouse</TableColumn>
                        <TableColumn>UOM</TableColumn>
                        </TableHeader>
                        <TableBody>
                        {materialRequestedList.map((material:any,index:number)=>(
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{material.itemCode}</TableCell>
                                    <TableCell>{material.requiredBy}</TableCell>
                                    <TableCell>{material.quantity}</TableCell>
                                    <TableCell>{material.targetWarehouse}</TableCell>
                                    <TableCell>{material.uom}</TableCell>
                                </TableRow>
                            )
                         )}
                        </TableBody>
                    </Table>      
                    </div>
                    )}
                    <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2 cursor-pointer" onClick={handleAddMaterialClick}>Add Material</div>
                </div>
                </div>
            </div>
            <input type="text" hidden value={id} name="userId" />
            <input type="text" hidden value={JSON.stringify(materialRequestedList)} name="materialList" />
            <button className="bg-btnBlack rounded-md text-bgWhite h-8 mt-10 cursor-pointer flex justify-evenly items-center w-16">
                    Save
            </button>
        </Form>            
    </div>
    )
}


export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData();
    const {userId,...data} = Object.fromEntries(formData);
    const isCreated = await createMaterialRequested(data);
    if(isCreated){
        return redirect("/dashboard"+userId+"/buying/materialRequested/table")
    }
    return null;
}