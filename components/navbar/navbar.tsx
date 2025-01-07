import { NavLink } from "@remix-run/react";

export default function Navbar({userId}:{userId:string}){
    return(
    <div className="flex flex-col" style={{marginRight:'30px'}}>
        <NavLink to={`/dashboard/${userId}/home`} className="block py-1">
            <div className="cursor-pointer rounded-md  h-6" style={{fontSize:'15px',paddingLeft:'10px',display:'flex',justifyContent:'start',alignItems:'center'}}>
                Home
            </div>
        </NavLink>
        <NavLink to={`/dashboard/${userId}/buying`} className="block py-1">
            <div className="cursor-pointer rounded-md  h-6" style={{fontSize:'15px',paddingLeft:'10px',display:'flex',justifyContent:'start',alignItems:'center'}}>
                Buying
            </div>
        </NavLink>
        <NavLink to={`/dashboard/${userId}/accounting`} className="block py-1">
            <div className="cursor-pointer rounded-md  h-6" style={{fontSize:'15px',paddingLeft:'10px',display:'flex',justifyContent:'start',alignItems:'center'}}>
                Accounting
            </div>
        </NavLink>
        <NavLink to={`/dashboard/${userId}/users`} className="block py-1">
            <div className="cursor-pointer rounded-md h-6" 
            style={{fontSize:'15px',paddingLeft:'10px',display:'flex',justifyContent:'start',alignItems:'center'}}
            >
                Users
            </div>
        </NavLink>
    </div>

    )
}