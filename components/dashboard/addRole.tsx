import { Form } from "@remix-run/react";

export default function AddRole(){
    return(
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full">
                <div>
                    Basic Info
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="role" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Role" />
                        <input type="text" name="description" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Description" />
                    </div>
                </div>
                <button name="_action" value="addRole" className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                        Save
                </button>
            </Form>            
        </div>
    )
}