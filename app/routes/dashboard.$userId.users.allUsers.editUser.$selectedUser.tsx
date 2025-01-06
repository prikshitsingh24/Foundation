import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { fetchUserById } from "services/dashboard";


export default function EditUser(){
    const userDetails = useLoaderData<any>();
        return(
            <div className="w-full h-full">
            <Form method="post" className="w-full h-full">
                <div>
                    Basic Info
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="firstName" defaultValue={userDetails.firstName} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="First Name" />
                        <input type="text" name="middleName" defaultValue={userDetails.middleName}  className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Middle Name" />
                        <input type="text" name="lastName" defaultValue={userDetails.lastName} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Last Name" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="username" defaultValue={userDetails.username} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Username" />
                        <input type="email" name="email" defaultValue={userDetails.email} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Email" />
                        <input type="password" name="password" defaultValue={userDetails.password} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Password" />
                    </div>
                </div>
                <br />
                <div className="flex flex-col pt-10">
                        Roles & Permissions
                        <div className="w-full">
                            <select name="role" defaultValue={userDetails.role} className="bg-bgLightGray rounded-md w-5/12 h-8 mt-5 pl-3 pr-10 outline-none">
                                <option value="">Select Role</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    More Information
                    <div className="w-full">
                        <div className="flex flex-row mt-5 gap-3">
                            <select name="gender" defaultValue={userDetails.gender} className="bg-bgLightGray rounded-md w-5/12 h-8 pl-3 pr-10 outline-none">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input type="number" defaultValue={userDetails.phoneNumber} name="phoneNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Phone Number" />
                            <input type="number" defaultValue={userDetails.mobileNumber} name="mobileNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Mobile Number" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <input type="text" defaultValue={userDetails.dateOfBirth} name="dateOfBirth" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Date Of Birth" />
                            <input type="text" defaultValue={userDetails.location} name="location" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Location" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <input type="text" defaultValue={userDetails.interest} name="interest" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Interest" />
                            <input type="text" defaultValue={userDetails.bio} name="bio" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Bio" />
                        </div>
                    </div>
                </div>
                <button name="_action" value="addUser" className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                       update
                </button>
            </Form>            
        </div>
    )
}


export async function loader({params}:LoaderFunctionArgs){
    const id = await params.selectedUser;
    if(id){
        const selectedUserDetail = await fetchUserById(id);
        return selectedUserDetail;
    }

}