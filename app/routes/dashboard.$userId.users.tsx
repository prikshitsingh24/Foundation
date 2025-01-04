import { Form } from "@remix-run/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";

export default function Users(){
    return(
        <div className="w-full h-full">
            <div className="flex flex-row items-center">
                <div></div>
                <div className="flex flex-row item-center">
                    <div className="text-sm rounded-xl cursor-pointer  hover:bg-btnBlack hover:text-white w-14 h-8 flex justify-center items-center mr-2">
                        Users
                    </div>
                    <div className="text-sm rounded-xl cursor-pointer hover:bg-btnBlack hover:text-white w-14 h-8 flex justify-center items-center mr-2">
                        Roles
                    </div>
                    <div className="text-sm rounded-xl cursor-pointer hover:bg-btnBlack hover:text-white w-40 h-8 flex justify-center items-center mr-2">
                        Permission manager
                    </div>
                </div>
            </div>
            <div className="mt-5 flex flex-row justify-between items-center">
                <Form className="flex flex-row">
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Id" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Name" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 mr-4 outline-none" placeholder="Status" />
                    <input type="text" className="bg-bgLightGray rounded-md h-8 pl-3 w-40 outline-none" placeholder="Roles" />
                </Form>
                <div className="bg-btnBlack rounded-md text-bgWhite h-8 cursor-pointer flex justify-center items-center w-20">
                    Add user
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-5">
            <Table
                removeWrapper
                aria-label="Example static collection table"
                selectionMode="multiple"
                  classNames={{
                    wrapper: "min-h-[650px]",
                  }}
                >
                <TableHeader>
                <TableColumn>NAME</TableColumn>
                <TableColumn>ROLE</TableColumn>
                <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </div>
        </div>
    )
}