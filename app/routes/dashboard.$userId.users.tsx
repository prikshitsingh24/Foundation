import { Form } from "@remix-run/react";


export default function Users(){
    return(
        <div className="w-full h-full">
            <div className="flex flex-row items-center">
                <div></div>
                <div className="flex flex-row item-center">
                    <div className="text-sm rounded-xl bg-btnBlack text-bgWhite w-14 h-8 flex justify-center items-center mr-2">
                        Users
                    </div>
                    <div className="text-sm rounded-xl bg-btnBlack text-bgWhite w-14 h-8 flex justify-center items-center mr-2">
                        Roles
                    </div>
                    <div className="text-sm rounded-xl bg-btnBlack text-bgWhite w-40 h-8 flex justify-center items-center mr-2">
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
                <div className="bg-btnBlack rounded-md text-bgWhite h-10 flex justify-center items-center w-20">
                    Add user
                </div>
            </div>
        </div>
    )
}