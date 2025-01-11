import { Input, Textarea } from "@nextui-org/input";
import { Form, redirect } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { createNewPaymentEntry } from "services/dashboard/accounting";
import { userIdState } from "state/userState";

export default function NewAccount(){

    const [id,setId] = useRecoilState(userIdState);

    return(
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full grid mt-5">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col mt-4 gap-3">
                        <Input type="text" required name="title" labelPlacement="outside" variant="faded" label="Title" />
                        <Input type="text" required name="type" labelPlacement="outside" variant="faded"  label="Type of Payment"  />
                        <Input type="text" required name="postingDate" labelPlacement="outside" variant="faded" label="Posting Date"  />
                        <Input type="text" required name="mode" labelPlacement="outside" variant="faded"   label="Mode of Payment" />
                        {/* <Input type="text" required name="balance" labelPlacement="outside"  variant="faded"  label="Balance"/> */}
                    </div>
                </div>
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
        const isAccountCreated = await createNewPaymentEntry(data)
        return redirect("/dashboard/"+data.userId+"/accounting/paymentEntry/table")
    }
    return -1
}