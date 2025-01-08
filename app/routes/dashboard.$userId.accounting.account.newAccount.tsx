import { Input, Textarea } from "@nextui-org/input";
import { Form, redirect } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { createNewAccount } from "services/dashboard";
import { userIdState } from "state/userState";

export default function NewAccount(){

    const [id,setId] = useRecoilState(userIdState);

    return(
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full grid mt-5">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col mt-4 gap-3">
                        <Input type="text" name="accountName" labelPlacement="outside" variant="faded" label="Account Name" />
                        <Input type="text" name="accountNumber" labelPlacement="outside" variant="faded"  label="Account Number"  />
                        <Input type="text" name="accountType" labelPlacement="outside" variant="faded" label="Account Type"  />
                    </div>
                    <div className="flex flex-col mt-4 gap-3">
                        <Input type="text" name="taxRate" labelPlacement="outside" variant="faded"   label="Tax Rate" />
                        <Input type="text" name="balance" labelPlacement="outside"  variant="faded"  label="Balance"/>
                    </div>
                </div>
                {/* <div className="flex flex-col pt-10">
                        Roles & Permissions
                        <div className="w-full">
                            <select name="role" className="bg-bgLightGray border-2 border-borderGray hover:border-borderHoverGray  rounded-xl w-5/12 h-10 mt-5 pl-3 pr-10 outline-none">
                            {roles.map((role:any)=>(
                                    <option value={role.roleId}>{role.role}</option>
                            ))}
                            </select>
                        </div>
                </div> */}
                
                <input type="text" hidden value={id} name="userId" />
                <button name="_action" value="addUser" className="bg-btnBlack rounded-md text-bgWhite h-8 mt-10 cursor-pointer flex justify-evenly items-center w-16">
                        Save
                </button>
            </Form>            
        </div>
    )
}

export async function action({request}:any) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    if(data){
        const isAccountCreated = await createNewAccount(data)
        return redirect("/dashboard/"+data.userId+"/accounting/account/table")
    }
    return -1
}