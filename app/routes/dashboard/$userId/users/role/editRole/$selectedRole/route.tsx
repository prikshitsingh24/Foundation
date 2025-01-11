import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { fetchRoleById, updateRoleById } from "services/dashboard/role";
import { userIdState } from "state/userState";

export default function AddRole(){

    const [id,setId] = useRecoilState(userIdState);

    const isRoleData = useLoaderData<any>()
    
    return(
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full mt-5">                
                <div>
                    Basic Info
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="role" defaultValue={isRoleData.role} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Role" />
                        <input type="text" name="description" defaultValue={isRoleData.description} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Description" />
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

export async function loader({params}:LoaderFunctionArgs){
    const roleId = await params.selectedRole
    if(roleId){
        const isRoleData = await fetchRoleById(roleId)
        return isRoleData
    }
}

export async function action({request,params}:ActionFunctionArgs){
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const roleId = await params.selectedRole;
    if(data && roleId){
        await updateRoleById(data,roleId);
        return redirect("/dashboard/"+data.userId+"/users/role/table");
    }
    return -1
}