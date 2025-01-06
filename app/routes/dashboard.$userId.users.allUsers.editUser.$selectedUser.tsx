import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { useRecoilState } from "recoil";
import { fetchAllRoles, fetchUserById, updateUserById } from "services/dashboard";
import { userIdState } from "state/userState";


export default function EditUser(){
    const {roles,...userDetails} = useLoaderData<any>();
    const [id,setId] = useRecoilState(userIdState);
    console.log(userDetails)
        return(
            <div className="w-full h-full">
            <Form method="post" className="w-full h-full mt-5">
                <div>
                    Basic Info
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="firstName" defaultValue={userDetails.selectedUserDetail.firstName} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="First Name" />
                        <input type="text" name="middleName" defaultValue={userDetails.selectedUserDetail.middleName}  className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Middle Name" />
                        <input type="text" name="lastName" defaultValue={userDetails.selectedUserDetail.lastName} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Last Name" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="username" defaultValue={userDetails.selectedUserDetail.username} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Username" />
                        <input type="email" name="email" defaultValue={userDetails.selectedUserDetail.email} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Email" />
                        <input type="password" name="password" defaultValue={userDetails.selectedUserDetail.password} className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Password" />
                    </div>
                </div>
                <br />
                <div className="flex flex-col pt-10">
                        Roles & Permissions
                        <div className="w-full">
                            <select name="role" defaultValue={userDetails.selectedUserDetail.role} className="bg-bgLightGray rounded-md w-5/12 h-8 mt-5 pl-3 pr-10 outline-none">
                                {roles.map((role:any)=>(
                                    <option value={role.roleId}>{role.role}</option>
                                ))}
                            </select>
                        </div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    More Information
                    <div className="w-full">
                        <div className="flex flex-row mt-5 gap-3">
                            <select name="gender" defaultValue={userDetails.selectedUserDetail.gender} className="bg-bgLightGray rounded-md w-5/12 h-8 pl-3 pr-10 outline-none">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input type="number" defaultValue={userDetails.selectedUserDetail.phoneNumber} name="phoneNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Phone Number" />
                            <input type="number" defaultValue={userDetails.selectedUserDetail.mobileNumber} name="mobileNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Mobile Number" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <input type="text" defaultValue={userDetails.selectedUserDetail.dateOfBirth} name="dateOfBirth" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Date Of Birth" />
                            <input type="text" defaultValue={userDetails.selectedUserDetail.location} name="location" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Location" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <input type="text" defaultValue={userDetails.selectedUserDetail.interest} name="interest" className="bg-bgLightGray rounded-md h-20 pl-3 w-96 mr-4 outline-none" placeholder="Interest" />
                            <input type="text" defaultValue={userDetails.selectedUserDetail.bio} name="bio" className="bg-bgLightGray rounded-md h-20 pl-3 w-96 mr-4 outline-none" placeholder="Bio" />
                        </div>
                    </div>
                </div>
                <input type="text" name="userId" value={id} hidden />
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
        const roles = await fetchAllRoles();
        return {selectedUserDetail,roles};
    }

}

export async function action({request,params}:ActionFunctionArgs){
    const formData = await request.formData();
    const id = await params.selectedUser;
    if(id){
        const updateUser =  await updateUserById(Object.fromEntries(formData),id);
        console.log(updateUser)
        return redirect(`/dashboard/${Object.fromEntries(formData).userId}/users/allUsers/table`)
    }
    return 0;
}