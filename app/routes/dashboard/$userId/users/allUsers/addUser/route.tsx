import { Input, Textarea } from "@nextui-org/input";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect, replace, useActionData, useLoaderData } from "@remix-run/react";
import React from "react";
import { useRecoilState } from "recoil";
import { fetchAllRoles } from "services/dashboard/role";
import { registerUser } from "services/dashboard/user";
import { isAddUserState, isEditUserState, userIdState } from "state/userState";

export default function AddUser(){
    const [id,setId] = useRecoilState(userIdState);
    const roles:any = useLoaderData();

    return(
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full mt-5">
                <div>
                    Basic Info
                    <div className="flex flex-row gap-3">
                        <Input type="text" name="firstName" labelPlacement="outside" variant="faded" label="First Name" />
                        <Input type="text" name="middleName" labelPlacement="outside" variant="faded"  label="Middle Name"  />
                        <Input type="text" name="lastName" labelPlacement="outside" variant="faded" label="Last Name"  />
                    </div>
                    <div className="flex flex-row mt-4 gap-3">
                        <Input type="text" name="username" labelPlacement="outside" variant="faded"   label="Username" />
                        <Input type="email" name="email" labelPlacement="outside"  variant="faded"  label="Email"/>
                        <Input type="password" name="password" labelPlacement="outside" variant="faded"  label="Password" />
                    </div>
                </div>
                <br />
                <div className="flex flex-col pt-10">
                        Roles & Permissions
                        <div className="w-full">
                            <select name="role" className="bg-bgLightGray border-2 border-borderGray hover:border-borderHoverGray  rounded-xl w-5/12 h-10 mt-5 pl-3 pr-10 outline-none">
                            {roles.map((role:any)=>(
                                    <option value={role.roleId}>{role.role}</option>
                            ))}
                            </select>
                        </div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    More Information
                    <div className="w-full">
                        <div className="flex flex-row gap-3">
                            <select name="gender" className="bg-bgLightGray  border-2 border-borderGray hover:border-borderHoverGray  rounded-xl mt-6 w-full h-10 pl-3 pr-10 outline-none">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <Input type="number" name="phoneNumber" label="Phone number" variant="faded"   labelPlacement="outside" />
                            <Input type="number" name="mobileNumber" label="Mobile Number"  variant="faded"   labelPlacement="outside" />
                        </div>
                        <div className="flex flex-row mt-4 gap-3">
                            <Input type="text" name="dateOfBirth" label="Date of Birth"   variant="faded"   labelPlacement="outside" />
                            <Input type="text" name="location" label="Location"   variant="faded"   labelPlacement="outside"/>
                        </div>
                        <div className="flex flex-row mt-10 gap-3">
                            <Textarea
                                disableAnimation
                                disableAutosize
                                classNames={{
                                    base: "max-w-xs",
                                    input: "resize-y min-h-[40px]",
                                }}
                                label="Interest"
                                variant="faded"
                                />
                            <Textarea
                                disableAnimation
                                disableAutosize
                                classNames={{
                                    base: "max-w-xs",
                                    input: "resize-y min-h-[40px]",
                                }}
                                label="Bio"
                                variant="faded"
                                />
                        </div>
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

export async function loader(){
    const roles = await fetchAllRoles();
    return roles;
}


export async function action({request}:ActionFunctionArgs){
    const formData = await request.formData();
    const {_action,...data} = Object.fromEntries(formData);
    if(_action=="addUser"){
        const isUserRegistered = await registerUser(data);
        if(isUserRegistered != -1){
            return redirect("/dashboard/"+data.userId+"/users/allUsers/table")
        }
        else{
            console.log("Error!!")
        }
    }
    return 0;
}