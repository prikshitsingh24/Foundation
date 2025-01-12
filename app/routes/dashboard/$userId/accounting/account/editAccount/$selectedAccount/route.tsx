import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useActionData, useLoaderData } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { fetchAccountById, updateAccountById } from "services/dashboard/accounting";
// import { selectedAccountState } from "state/accountState";

export default function EditAccount() {
    const accountData = useLoaderData<any>();  // Get account data from loader
    // const [selectedAccount, setSelectedAccount] = useRecoilState(selectedAccountState);  // Handle selected account (optional)
    console.log(accountData);
    return (
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full mt-5">
                {/* Basic Info Section */}
                <div>
                    <h2>Account Info</h2>
                    <div className="flex flex-row mt-5 gap-3">
                        <input
                            type="text"
                            name="accountName"
                            defaultValue={accountData.accountName}
                            className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none"
                            placeholder="Account Name"
                        />
                        <input
                            type="text"
                            name="accountNumber"
                            defaultValue={accountData.accountNumber}
                            className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none"
                            placeholder="Account Number"
                        />
                    </div>
                </div>

                {/* Account Type Section */}
                <div>
                    <h2>Account Type</h2>
                    <div className="flex flex-row mt-5 gap-3">
                        <select
                            name="accountType"
                            defaultValue={accountData.accountType}
                            className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none"
                        >
                            <option value="ASSET">Asset</option>
                            <option value="LIABILITY">Liability</option>
                            <option value="INCOME">Income</option>
                            <option value="EXPENSE">Expense</option>
                        </select>
                    </div>
                </div>

                {/* Balance and Currency Section */}
                <div>
                    <h2>Balance & Currency</h2>
                    <div className="flex flex-row mt-5 gap-3">
                        <input
                            type="number"
                            name="balance"
                            defaultValue={accountData.balance}
                            className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none"
                            placeholder="Balance"
                        />
                        <input
                            type="text"
                            name="currency"
                            defaultValue={accountData.currency}
                            className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none"
                            placeholder="Currency"
                        />
                    </div>
                </div>

                {/* Status Section */}
                <div>
                    <h2>Status</h2>
                    <div className="flex flex-row mt-5 gap-3">
                        <select
                            name="status"
                            defaultValue={accountData.status}
                            className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none"
                        >
                            <option value="ACTIVE">Active</option>
                            <option value="INACTIVE">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Parent Account Section (if applicable) */}
                <div>
                    <h2>Parent Account (optional)</h2>
                    <div className="flex flex-row mt-5 gap-3">
                        <input
                            type="text"
                            name="parentAccount"
                            defaultValue={accountData.parentAccount || ""}
                            className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none"
                            placeholder="Parent Account"
                        />
                    </div>
                </div>

                {/* Description Section */}
                <div>
                    <h2>Description (optional)</h2>
                    <div className="flex flex-row mt-5 gap-3">
                        <textarea
                            name="description"
                            defaultValue={accountData.description || ""}
                            className="bg-bgLightGray rounded-md h-24 pl-3 w-full mr-4 outline-none"
                            placeholder="Account Description"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    name="_action"
                    value="editAccount"
                    className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16"
                >
                    Save
                </button>
            </Form>
        </div>
    );
}

export async function loader({ params }: LoaderFunctionArgs) {
    const accountId = await params.selectedAccount;  // Extract the account ID from the URL params
    if (accountId) {
        const accountData = await fetchAccountById(accountId);  // Fetch account data by ID
        if(accountData){
            return accountData;  // Return the fetched data to pre-populate the form            
        }
    }
    return [];
}

export async function action({ request, params }: ActionFunctionArgs) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const accountId = await params.selectedAccount;  // Extract account ID from params

    if (data && accountId) {
        await updateAccountById(data, accountId);  // Update the account using the data and ID
        return redirect(`/dashboard/${data.id}/account/editAccount/${accountId}`);  // Redirect to the account overview page after update
    }
    return -1;
}
