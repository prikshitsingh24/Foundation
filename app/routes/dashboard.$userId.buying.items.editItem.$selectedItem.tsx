import { Input, Textarea } from "@nextui-org/input";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { LoaderFunctionArgs } from "react-router";
import { useRecoilState } from "recoil";
import { fetchAllItems, fetchItemById, updateItemById } from "services/dashboard";
import { userIdState } from "state/userState";


export default function EditItem(){

    const itemDetails:any = useLoaderData();

    const [id,setId] = useRecoilState(userIdState);
    const [isAddBarcode,setIsAddBarcode] = useState(false);
    const [barcode,setBarcode] = useState("");
    const [barcodeType,setBarcodeType] = useState("");
    const [uom,setUom] = useState("");
    const [barcodeList,setBarcodeList]:any = useState<{barcode:string,barcodeType:string,uom:string} | any>(itemDetails[0].barcode);

    
    const handleAddBarcodeClick=()=>{
        setIsAddBarcode(true);
    }

    const handleInsertBarcodeClick=()=>{
        setBarcodeList([...barcodeList,{barcode:barcode,barcodeType:barcodeType,uom:uom}]);
        setIsAddBarcode(false);
    }


    const handleBarcodeChange=(e:any)=>{
        setBarcode(e.target.value);
    }

    const handleBarcodeTypeChange=(e:any)=>{
        setBarcodeType(e.target.value);
    }

    const handleUomChange=(e:any)=>{
        setUom(e.target.value);
    }


    const [isAddAccounting,setIsAddAccounting] = useState(false);
    const [company,setCompany] = useState("");
    const [defaultWarehouse,setWarehouse] = useState("");
    const [defaultPriceList,setDefaultPriceList] = useState("");
    const [accountingList,setAccountingList]:any = useState<{company:string,defaultWarehouse:string,defaultPriceList:string} | any>(itemDetails[0].accounting);


    const handleAddAccountingClick=()=>{
        setIsAddAccounting(true);
    }

    const handleInsertAccountingClick=()=>{
        setAccountingList([...accountingList,{company:company,defaultWarehouse:defaultWarehouse,defaultPriceList:defaultPriceList}]);
        setIsAddAccounting(false);
    }

    const handleCompanyChange=(e:any)=>{
        setCompany(e.target.value);
    }

    const handleDefaultWarehouseChange=(e:any)=>{
        setWarehouse(e.target.value);
    }

    const handleDefaultPriceListChange=(e:any)=>{
        setDefaultPriceList(e.target.value);
    }


    const [isAddSupplier,setIsAddSupplier] = useState(false);
    const [supplier,setSupplier] = useState("");
    const [supplierPartNumber,setSupplierPartNumber] = useState("");
    const [supplierList,setSupplierList]:any = useState<{supplier:string,supplierPartNumber:string} | any>(itemDetails[0].supplier);

    const handleAddSupplierClick=()=>{
        setIsAddSupplier(true);
    }

    const handleInsertSupplierClick=()=>{
        setSupplierList([...supplierList,{supplier:supplier,supplierPartNumber:supplierPartNumber}]);
        setIsAddSupplier(false);
    }

    const handleSupplierChange=(e:any)=>{
        setSupplier(e.target.value);
    }

    const handleSupplierPartNumberChange=(e:any)=>{
        setSupplierPartNumber(e.target.value);
    }


    const [isAddCustomer,setIsAddCustomer] = useState(false);
    const [customerName,setCustomerName] = useState("");
    const [customerGroup,setCustomerGroup] = useState("");
    const [refCode,setRefCode] = useState("");
    const [customerList,setCustomerList]:any = useState<{customerName:string,customerGroup:string,refCode:string} | any>(itemDetails[0].customerDetails);

    const handleAddCustomerClick=()=>{
        setIsAddCustomer(true);
    }

    const handleInsertCustomerClick=()=>{
        setCustomerList([...customerList,{customerName:customerName,customerGroup:customerGroup,refCode:refCode}]);
        setIsAddCustomer(false);
    }

    const handleCustomerNameChange=(e:any)=>{
        setCustomerName(e.target.value);
    }

    const handleCustomerGroupChange=(e:any)=>{
        setCustomerGroup(e.target.value);
    }

    const handleRefCodeChange=(e:any)=>{
        setRefCode(e.target.value);
    }

    const [isAddTax,setIsAddTax] = useState(false);
    const [itemTaxTemplate,setItemTaxTemplate] = useState("");
    const [taxCategory,setTaxCategory] = useState("");
    const [validFrom,setValidFrom] = useState("");
    const [minimumNetRate,setMinimumNetRate] = useState("");
    const [maximumNetRate,setMaximumNetRate] = useState("");
    const [taxList,setTaxList]:any = useState<{itemTaxTemplate:string,taxCategory:string,validFrom:string,minimumNetRate:string,maximumNetRate:string} | any>(itemDetails[0].tax);

    const handleAddTaxClick=()=>{
        setIsAddTax(true);
    }

    const handleInsertTaxClick=()=>{
        setTaxList([...taxList,{itemTaxTemplate:itemTaxTemplate,taxCategory:taxCategory,validFrom:validFrom,minimumNetRate:minimumNetRate,maximumNetRate:maximumNetRate}]);
        setIsAddTax(false);
    }

    const handleItemTaxTemplateChange=(e:any)=>{
        setItemTaxTemplate(e.target.value);
    }

    const handleTaxCategoryChange=(e:any)=>{
        setTaxCategory(e.target.value);
    }

    const handleValidFromChange=(e:any)=>{
        setValidFrom(e.target.value);
    }

    const handleMinimumNetRateChange=(e:any)=>{
        setMinimumNetRate(e.target.value);
    }

    const handleMaximumNetRateChange=(e:any)=>{
    setMaximumNetRate(e.target.value);
    }

    return(
        <div className="w-full h-full">
        <Form method="post" className="w-full h-full mt-5">
            <div>
                Details
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="itemCode" defaultValue={itemDetails[0].ID} label="Item Code" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="itemName" defaultValue={itemDetails[0].name} label="Item Name" variant="faded" labelPlacement="outside"/>
                    <Input type="text" name="itemGroup" defaultValue={itemDetails[0].itemGroup} label="Item Group" variant="faded" labelPlacement="outside"/>
                </div>
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="unitOfMeasure"  defaultValue={itemDetails[0].unitOfMeasure} label="Unit of Measure" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="openingStock"  defaultValue={itemDetails[0].openingStock} label="Opening Stock" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="valuationRate"  defaultValue={itemDetails[0].valuationRate} label="Valuation Rate" variant="faded" labelPlacement="outside" />
                </div>
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="standardSellingRate"  defaultValue={itemDetails[0].standardSellingRate} label="Standard Selling Rate" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="brandName"  defaultValue={itemDetails[0].brandName} label="Brand Name" variant="faded" labelPlacement="outside"/>
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
                            name="description"
                            defaultValue={itemDetails[0].description}
                />
                </div>
            </div>
            <br />
            <div className="flex flex-col pt-10">
                   Inventory
                   <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="shelfLifeInDays"  defaultValue={itemDetails[0].shelfLifeInDays} label="Shelf Life in Days" variant="faded" labelPlacement="outside"/>
                    <Input type="text" name="warrantyPeriod"  defaultValue={itemDetails[0].warrantyPeriod} label="Warranty Period" variant="faded" labelPlacement="outside"/>
                    <Input type="text" name="endOfLife"  defaultValue={itemDetails[0].endOfLife} label="End of Life" variant="faded" labelPlacement="outside" />
                </div>
                <div className="flex flex-row mt-5 gap-3">
                    <Input type="text" name="weightPerUnit"  defaultValue={itemDetails[0].weightPerUnit} label="Weight per Unit" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="defaultMaterialRequestType"  defaultValue={itemDetails[0].defaultMaterialRequestType} label="Default Material Request Type" variant="faded" labelPlacement="outside" />
                    <Input type="text" name="weightUom"  defaultValue={itemDetails[0].weightUom} label="Weight UOM" variant="faded" labelPlacement="outside" />
                </div>
                <div className="flex flex-row mt-5 gap-3">
                    <Input type="text" name="valuation" label="Valuation"  defaultValue={itemDetails[0].valuation} variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Barcode
                {isAddBarcode?(
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
                        <TableColumn>No.</TableColumn>
                        <TableColumn>Barcode</TableColumn>
                        <TableColumn>Barcode Type</TableColumn>
                        <TableColumn>UOM</TableColumn>
                        </TableHeader>
                        <TableBody>
                        {barcodeList.map((barcode:{barcode:string,barcodeType:string,uom:string},index:number)=>(
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{barcode.barcode}</TableCell>
                                <TableCell>{barcode.barcodeType}</TableCell>
                                <TableCell>{barcode.uom}</TableCell>
                            </TableRow>
                        )
                     )}
                        </TableBody>
                    </Table>      
                        </div>
                        <div className="animate-slide-in-left">
                        <div className="grid grid-cols-3 gap-4">   
                        <Input type="text" name="barcode" label="Barcode" variant="faded" labelPlacement="outside" onChange={handleBarcodeChange}/>
                        <Input type="text" name="barcodeType" label="Barcode Type" variant="faded" labelPlacement="outside" onChange={handleBarcodeTypeChange}/>
                        <Input type="text" name="uom" label="uom" variant="faded" labelPlacement="outside" onChange={handleUomChange}/>
                        </div>
                        <button className="mt-4 bg-bgLightGray rounded-xl w-20 h-10" onClick={handleInsertBarcodeClick}>Insert</button>
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
                    <TableColumn>Barcode</TableColumn>
                    <TableColumn>Barcode Type</TableColumn>
                    <TableColumn>UOM</TableColumn>
                    </TableHeader>
                    <TableBody>
                     {barcodeList.map((barcode:{barcode:string,barcodeType:string,uom:string},index:number)=>(
                            <TableRow key={index}>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{barcode.barcode}</TableCell>
                                <TableCell>{barcode.barcodeType}</TableCell>
                                <TableCell>{barcode.uom}</TableCell>
                            </TableRow>
                        )
                     )}
                    </TableBody>
                </Table>      
                </div>
                )}
                <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2 cursor-pointer" onClick={handleAddBarcodeClick}>Add Barcode</div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Accouting
                {isAddAccounting?(
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
                    <TableColumn>No.</TableColumn>
                    <TableColumn>Company</TableColumn>
                    <TableColumn>Default Warehouse</TableColumn>
                    <TableColumn>Default Price List</TableColumn>
                    </TableHeader>
                    <TableBody>
                    {accountingList.map((account:{company:string,defaultWarehouse:string,defaultPriceList:string},index:number)=>(
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{account.company}</TableCell>
                            <TableCell>{account.defaultWarehouse}</TableCell>
                            <TableCell>{account.defaultPriceList}</TableCell>
                        </TableRow>
                    )
                 )}
                    </TableBody>
                </Table>      
                    </div>
                    <div className="animate-slide-in-left">
                    <div className="grid grid-cols-3 gap-4">   
                    <Input type="text" name="company" label="Company" variant="faded" labelPlacement="outside" onChange={handleCompanyChange}/>
                    <Input type="text" name="defaultWarehouse" label="Default Warehouse" variant="faded" labelPlacement="outside" onChange={handleDefaultWarehouseChange}/>
                    <Input type="text" name="defaultPriceList" label="Default Price List" variant="faded" labelPlacement="outside" onChange={handleDefaultPriceListChange}/>
                    </div>
                    <button className="mt-4 bg-bgLightGray rounded-xl w-20 h-10 cursor-pointer" onClick={handleInsertAccountingClick}>Insert</button>
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
                    <TableColumn>No.</TableColumn>
                    <TableColumn>Company</TableColumn>
                    <TableColumn>Default Warehouse</TableColumn>
                    <TableColumn>Default Price List</TableColumn>
                    </TableHeader>
                    <TableBody>
                    {accountingList.map((account:{company:string,defaultWarehouse:string,defaultPriceList:string},index:number)=>(
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{account.company}</TableCell>
                            <TableCell>{account.defaultWarehouse}</TableCell>
                            <TableCell>{account.defaultPriceList}</TableCell>
                        </TableRow>
                    )
                 )}
                    </TableBody>
                </Table>
                </div>
                )}
                <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2 cursor-pointer" onClick={handleAddAccountingClick}>Add Accouting</div>
            </div>          
            <div className="flex flex-col pt-10">
                   Purchasing
                   <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="defaultPurchaseUnitMeasure"  defaultValue={itemDetails[0].defaultPurchaseUnitOfMeasure} label="Default Purchase Unit of Measure" variant="faded" labelPlacement="outside"/>
                    <Input type="text" name="leadTimeInDays"  defaultValue={itemDetails[0].leadTimeInDays} label="Lead Time in Days" variant="faded" labelPlacement="outside"/>
                    <Input type="text" name="safetyStock"  defaultValue={itemDetails[0].safetyStock} label="Safety Stock" variant="faded" labelPlacement="outside" />
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Supplier Details
                {isAddSupplier?(
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
                    <TableColumn>No.</TableColumn>
                    <TableColumn>Supplier</TableColumn>
                    <TableColumn>Supplier Part Number</TableColumn>
                    </TableHeader>
                    <TableBody>
                    {supplierList.map((supplier:{supplier:string,supplierPartNumber:string},index:number)=>(
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{supplier.supplier}</TableCell>
                            <TableCell>{supplier.supplierPartNumber}</TableCell>
                        </TableRow>
                    )
                 )}
                    </TableBody>
                </Table>      
                    </div>
                    <div className="animate-slide-in-left">
                    <div className="grid grid-cols-3 gap-4">   
                    <Input type="text" name="supplier" label="Supplier" variant="faded" labelPlacement="outside" onChange={handleSupplierChange}/>
                    <Input type="text" name="supplierPartNumber" label="Supplier Part Number" variant="faded" labelPlacement="outside" onChange={handleSupplierPartNumberChange}/>
                    </div>
                    <button className="mt-4 bg-bgLightGray rounded-xl w-20 h-10 cursor-pointer" onClick={handleInsertSupplierClick}>Insert</button>
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
                    <TableColumn>No.</TableColumn>
                    <TableColumn>Supplier</TableColumn>
                    <TableColumn>Supplier Part Number</TableColumn>
                    </TableHeader>
                    <TableBody>
                    {supplierList.map((supplier:{supplier:string,supplierPartNumber:string},index:number)=>(
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{supplier.supplier}</TableCell>
                            <TableCell>{supplier.supplierPartNumber}</TableCell>
                        </TableRow>
                    )
                 )}
                    </TableBody>
                </Table>
                </div>
                )}
                <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2 cursor-pointer" onClick={handleAddSupplierClick}>Add Supplier</div>
            </div> 
            <div className="flex flex-col pt-10">
                   Foreign Trade Details
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="countryOfOrigin"  defaultValue={itemDetails[0].countryOfOrigin} label="Country of Origin" variant="faded" labelPlacement="outside"/>
                    <Input type="text" name="customsTariffNumber"  defaultValue={itemDetails[0].customsTariffNumber} label="Customs Tariff Number" variant="faded" labelPlacement="outside"/>
                </div>
            </div>
            <div className="flex flex-col pt-10">
                   Sales
                <div className="flex flex-row mt-4 gap-3">
                    <Input type="text" name="defaultSalesUnitMeasure"  defaultValue={itemDetails[0].defaultSalesUnitMeasure} label="Default Sales Unit of Measure" variant="faded" labelPlacement="outside"/>
                    <Input type="text" name="maxDiscount" defaultValue={itemDetails[0].maxDiscount}  label="Max Discount" variant="faded" labelPlacement="outside"/>
                </div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Customer Details
               {isAddCustomer?(
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
                    <TableColumn>No.</TableColumn>
                    <TableColumn>Customer</TableColumn>
                    <TableColumn>Customer Group</TableColumn>
                    <TableColumn>Ref Code</TableColumn>
                    </TableHeader>
                    <TableBody>
                    {customerList.map((customer:{customerName:string,customerGroup:string,refCode:string},index:number)=>(
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{customer.customerName}</TableCell>
                            <TableCell>{customer.customerGroup}</TableCell>
                            <TableCell>{customer.refCode}</TableCell>
                        </TableRow>
                    )
                 )}
                    </TableBody>
                </Table>      
                    </div>
                    <div className="animate-slide-in-left">
                    <div className="grid grid-cols-3 gap-4">   
                    <Input type="text" name="customerName" label="Customer Name" variant="faded" labelPlacement="outside" onChange={handleCustomerNameChange}/>
                    <Input type="text" name="customerGroup" label="Customer Group" variant="faded" labelPlacement="outside" onChange={handleCustomerGroupChange}/>
                    <Input type="text" name="refCode" label="Ref Code" variant="faded" labelPlacement="outside" onChange={handleRefCodeChange}/>
                    </div>
                    <button className="mt-4 bg-bgLightGray rounded-xl w-20 h-10 cursor-pointer" onClick={handleInsertCustomerClick}>Insert</button>
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
                    <TableColumn>No.</TableColumn>
                    <TableColumn>Customer</TableColumn>
                    <TableColumn>Customer Group</TableColumn>
                    <TableColumn>Ref Code</TableColumn>
                    </TableHeader>
                    <TableBody>
                    {customerList.map((customer:{customerName:string,customerGroup:string,refCode:string},index:number)=>(
                        <TableRow key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{customer.customerName}</TableCell>
                            <TableCell>{customer.customerGroup}</TableCell>
                            <TableCell>{customer.refCode}</TableCell>
                        </TableRow>
                    )
                 )}
                    </TableBody>
                </Table>
                </div>
                )}
                <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2 cursor-pointer" onClick={handleAddCustomerClick}>Add Customer</div>
            </div>
            <div className="flex flex-col pt-10 mt-5">
                Taxes
                {isAddTax?(
                     <div className="w-full  grid grid-rows-[1fr_auto] gap-2 mt-8">
                     <div className="mt-6">
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
                             {taxList.map((tax:{itemTaxTemplate:string,taxCategory:string,validFrom:string,minimumNetRate:string,maximumNetRate:string},index:number)=>(
                                 <TableRow key={index}>
                                     <TableCell>{index+1}</TableCell>
                                     <TableCell>{tax.itemTaxTemplate}</TableCell>
                                     <TableCell>{tax.taxCategory}</TableCell>
                                     <TableCell>{tax.validFrom}</TableCell>
                                     <TableCell>{tax.minimumNetRate}</TableCell>
                                     <TableCell>{tax.maximumNetRate}</TableCell>
                                 </TableRow>
                             )
                             )}
                         </TableBody>
                     </Table>      
                     </div>
                     <div className="animate-slide-in-left">
                    <div className="grid grid-cols-3 gap-4">   
                    <Input type="text" name="itemTaxTemplate" label="Item Tax Template" variant="faded" labelPlacement="outside" onChange={handleItemTaxTemplateChange}/>
                    <Input type="text" name="taxCategory" label="Tax Category" variant="faded" labelPlacement="outside" onChange={handleTaxCategoryChange}/>
                    <Input type="text" name="validFrom" label="Valid From" variant="faded" labelPlacement="outside" onChange={handleValidFromChange}/>
                    <Input type="text" name="minimumNetRate" label="Minimum Net Rate" variant="faded" labelPlacement="outside" onChange={handleMinimumNetRateChange}/>
                    <Input type="text" name="maximumNetRate" label="Maximum Net Rate" variant="faded" labelPlacement="outside" onChange={handleMaximumNetRateChange}/>
                    </div>
                    <button className="mt-4 bg-bgLightGray rounded-xl w-20 h-10 cursor-pointer" onClick={handleInsertTaxClick}>Insert</button>
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
                        <TableColumn>Item Tax Template</TableColumn>
                        <TableColumn>Tax Category</TableColumn>
                        <TableColumn>Valid From</TableColumn>
                        <TableColumn>Minimum Net Rate</TableColumn>
                        <TableColumn>Maximum Net Rate</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {taxList.map((tax:{itemTaxTemplate:string,taxCategory:string,validFrom:string,minimumNetRate:string,maximumNetRate:string},index:number)=>(
                                <TableRow key={index}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{tax.itemTaxTemplate}</TableCell>
                                    <TableCell>{tax.taxCategory}</TableCell>
                                    <TableCell>{tax.validFrom}</TableCell>
                                    <TableCell>{tax.minimumNetRate}</TableCell>
                                    <TableCell>{tax.maximumNetRate}</TableCell>
                                </TableRow>
                            )
                            )}
                        </TableBody>
                    </Table>      
                    </div>
                )}
                <div className="rounded-xl mt-4 bg-bgLightGray w-fit p-2 cursor-pointer" onClick={handleAddTaxClick}>Add Tax</div>
            </div>
            <input type="text" hidden value={id} name="userId" />
            <input type="text" hidden value={JSON.stringify(barcodeList)} name="barcodeList" />
            <input type="text" hidden value={JSON.stringify(accountingList)} name="accountList" />
            <input type="text" hidden value={JSON.stringify(supplierList)} name="supplierList" />
            <input type="text" hidden value={JSON.stringify(customerList)} name="customerList" />
            <input type="text" hidden value={JSON.stringify(taxList)} name="taxList" />
            <button className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                    Save
            </button>
        </Form>            
    </div>
    )
}

export async function loader({params}:LoaderFunctionArgs){
    const itemId = await params.selectedItem;
    if(itemId){
        const itemDetails = await fetchItemById(itemId);
        if(itemDetails){
            return itemDetails;
        }
    }
   
    return false;
}


export async function action({request,params}:ActionFunctionArgs){
    const formData = await request.formData();
    const itemId = await params.selectedItem;
    const {userId,...data} = Object.fromEntries(formData);
    if(itemId){
        const isItemCreated = await updateItemById(data,itemId);
        if(isItemCreated){
            return redirect("/dashboard/"+userId+"/buying/items/table")
        }
    }
    return null
}