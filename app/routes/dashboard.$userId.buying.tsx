import { NavLink, Outlet } from "@remix-run/react";

export default function Buying(){
    return(
        <div className="w-full h-full">
        <div className="flex flex-row items-center">
            <div className="flex flex-row item-center">
                <NavLink to="items">
                <div className="text-sm rounded-xl cursor-pointer  hover:bg-btnBlack hover:text-white w-14 h-8 flex justify-center items-center mr-2">
                    Items
                </div>
                </NavLink>
                <div className="text-sm rounded-xl cursor-pointer hover:bg-btnBlack hover:text-white w-40 h-8 flex justify-center items-center mr-2">
                    Material Requested
                </div>
                <div className="text-sm rounded-xl cursor-pointer hover:bg-btnBlack hover:text-white w-36 h-8 flex justify-center items-center mr-2">
                    Purchase Order
                </div>
            </div>                
        </div>
        <Outlet/>
    </div>
    )
}