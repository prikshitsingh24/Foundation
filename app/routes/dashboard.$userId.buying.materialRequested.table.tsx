import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Form, useLoaderData } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { fetchAllMaterialRequested } from "services/dashboard";
import { selectedMaterialRequestedIdState } from "state/materialRequestedState";


export default function MaterialRequestedTable(){

    const [selectedMaterialRequestedId,setSelectedMaterialRequestedId]:any = useRecoilState(selectedMaterialRequestedIdState);
    const allMaterialRequestedData:any = useLoaderData();
    return(
        <>
        <div className="mt-5 flex flex-row justify-between items-center">
                <Form className="flex flex-row">
                <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Name" />
                <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Status" />
                <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 outline-none" placeholder="Roles" />
            </Form>

        </div>
        <div className="flex flex-col gap-3 mt-5">
            <Table
            removeWrapper
            aria-label="Example static collection table"
            selectionMode="multiple"
              classNames={{
                wrapper: "min-h-[650px]",
              }}
            selectedKeys={selectedMaterialRequestedId}
            onSelectionChange={setSelectedMaterialRequestedId}
            >
            <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Purpose</TableColumn>
            <TableColumn>Required By</TableColumn>
            <TableColumn>Set Target Warehouse</TableColumn>
            <TableColumn>ID</TableColumn>
            </TableHeader>
            <TableBody>
            {allMaterialRequestedData.map((material:any,index:number)=>(
                <TableRow key={material.materialRequestedId}>
                    <TableCell>{material.material[0].itemName}</TableCell>
                    <TableCell>{material.purpose}</TableCell>
                    <TableCell>{material.requiredBy}</TableCell>
                    <TableCell>{material.setTargetWarehouse}</TableCell>
                    <TableCell>{material.ID}</TableCell>
                    <TableCell>
                            <div className={`${material.status=="ACTIVE"?'bg-green-300':'bg-red-300'} rounded-lg p-1 w-16 flex justify-center items-center`}>
                                {material.status?"Enabled":"Disabled"}
                            </div>
                        </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
    </>
    )
}


export async function loader(){
    const materialRequestedData = await fetchAllMaterialRequested();
    return materialRequestedData;
}