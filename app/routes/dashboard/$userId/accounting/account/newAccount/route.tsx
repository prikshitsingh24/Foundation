import { Input, Textarea } from "@nextui-org/input";
import { Form, redirect } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { createNewAccount } from "services/dashboard/accounting";
import { userIdState } from "state/userState";

export default function NewAccount() {
    const [id, setId] = useRecoilState(userIdState);

    return (
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full grid mt-5">
                {/* Basic Account Info Section */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col mt-4 gap-3">
                        <Input
                            type="text"
                            required
                            name="accountName"
                            labelPlacement="outside"
                            variant="faded"
                            label="Account Name"
                        />
                        <Input
                            type="text"
                            required
                            name="accountNumber"
                            labelPlacement="outside"
                            variant="faded"
                            label="Account Number"
                        />
                        <Input
                            type="text"
                            required
                            name="accountType"
                            labelPlacement="outside"
                            variant="faded"
                            label="Account Type"
                        />
                    </div>
                    <div className="flex flex-col mt-4 gap-3">
                        <Input
                            type="text"
                            required
                            name="balance"
                            labelPlacement="outside"
                            variant="faded"
                            label="Balance"
                        />
                        <Input
                            type="text"
                            required
                            name="currency"
                            labelPlacement="outside"
                            variant="faded"
                            label="Currency"
                        />
                    </div>
                </div>

                {/* Status Section */}
                <div className="flex flex-col mt-4 gap-3">
                    <Input
                        type="text"
                        required
                        name="status"
                        labelPlacement="outside"
                        variant="faded"
                        label="Status" // Active/Inactive
                    />
                </div>

                {/* Parent Account Section */}
                <div className="flex flex-col mt-4 gap-3">
                    <Input
                        type="text"
                        name="parentAccount"
                        labelPlacement="outside"
                        variant="faded"
                        label="Parent Account (optional)"
                    />
                </div>

                {/* Description Section */}
                <div className="flex flex-col mt-4 gap-3">
                    <Textarea
                        name="description"
                        labelPlacement="outside"
                        variant="faded"
                        label="Account Description (optional)"
                    />
                </div>

                {/* Hidden userId for submission */}
                <input type="text" hidden value={id} name="userId" />

                {/* Submit Button */}
                <button
                    name="_action"
                    value="addAccount"
                    className="bg-btnBlack rounded-md text-bgWhite h-8 mt-10 cursor-pointer flex justify-evenly items-center w-16"
                >
                    Save
                </button>
            </Form>
        </div>
    );
}

export async function action({ request }: any) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    if (data) {
        const isAccountCreated = await createNewAccount(data);
        return redirect("/dashboard/" + data.userId + "/accounting/account/table");
    }
    return -1;
}
