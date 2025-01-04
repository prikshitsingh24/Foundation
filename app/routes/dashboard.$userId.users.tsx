import { Link, NavLink, Outlet } from "@remix-run/react";

export default function Users(){
    
    return(
        <div className="w-full h-full">
            <div className="flex flex-row items-center">
                <div className="flex flex-row item-center">
                    <div className="text-sm rounded-xl cursor-pointer  hover:bg-btnBlack hover:text-white w-14 h-8 flex justify-center items-center mr-2">
                        <NavLink to={`allUsers`}>Users</NavLink>
                    </div>
                    <div className="text-sm rounded-xl cursor-pointer hover:bg-btnBlack hover:text-white w-14 h-8 flex justify-center items-center mr-2">
                        Roles
                    </div>
                    <div className="text-sm rounded-xl cursor-pointer hover:bg-btnBlack hover:text-white w-40 h-8 flex justify-center items-center mr-2">
                        Permission manager
                    </div>
                </div>                
            </div>
            <Outlet/>
        </div>
    )
}
