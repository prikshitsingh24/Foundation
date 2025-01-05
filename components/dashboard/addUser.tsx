import { Form } from "@remix-run/react";

export default function AddUser(){
    
    return(
        <div className="w-full h-full">
            <Form method="post" className="w-full h-full">
                <div>
                    Basic Info
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="firstName" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="First Name" />
                        <input type="text" name="middleName" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Middle Name" />
                        <input type="text" name="lastName" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Last Name" />
                    </div>
                    <div className="flex flex-row mt-5 gap-3">
                        <input type="text" name="username" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Username" />
                        <input type="email" name="email" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Email" />
                        <input type="password" name="password" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Password" />
                    </div>
                </div>
                <br />
                <div className="flex flex-col pt-10">
                        Roles & Permissions
                        <div className="w-full">
                            <select name="role" className="bg-bgLightGray rounded-md w-5/12 h-8 mt-5 pl-3 pr-10 outline-none">
                                <option value="">Select Role</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                </div>
                <div className="flex flex-col pt-10 mt-5">
                    More Information
                    <div className="w-full">
                        <div className="flex flex-row mt-5 gap-3">
                            <select name="gender" className="bg-bgLightGray rounded-md w-5/12 h-8 pl-3 pr-10 outline-none">
                                <option value="">Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <input type="number" name="phoneNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Phone Number" />
                            <input type="number" name="mobileNumber" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Mobile Number" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <input type="text" name="dateOfBirth" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Date Of Birth" />
                            <input type="text" name="location" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Location" />
                        </div>
                        <div className="flex flex-row mt-5 gap-3">
                            <input type="text" name="interest" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Interest" />
                            <input type="text" name="bio" className="bg-bgLightGray rounded-md h-8 pl-3 w-96 mr-4 outline-none" placeholder="Bio" />
                        </div>
                    </div>
                </div>
                <button name="_action" value="addUser" className="bg-btnBlack rounded-md text-bgWhite h-8 mt-5 cursor-pointer flex justify-evenly items-center w-16">
                        Save
                </button>
            </Form>            
        </div>
    )
}