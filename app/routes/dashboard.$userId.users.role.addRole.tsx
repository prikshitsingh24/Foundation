import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { createRoles } from "services/dashboard";
import { userIdState } from "state/userState";

export default function AddRole(){

    const [id,setId] = useRecoilState(userIdState);
    
    return(
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full mt-5">                
                <div>
                    Basic Info
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="role" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Role" />
                        <input type="text" name="description" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Description" />
                        <input type="text" name="userId" hidden value={id}/>
                    </div>
                </div>
                <button name="_action" value="addRole" className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                        Save
                </button>
            </Form>            
        </div>
    )
}

export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    if(data){
        await createRoles(data);
        return redirect("/dashboard/"+data.userId+"/users/role/table");
    }
}