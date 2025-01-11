import { NavLink } from "@remix-run/react";
import homeIcon from "/homeIcon.png";
import buyingIcon from "/buyingIcon.png";
import accountingIcon from "/accountingIcon.png";
import userIcon from "/userIcon.png"

export default function Navbar({userId}:{userId:string}){
    return(
    <div className="flex flex-col" style={{marginRight:'30px'}}>
        <NavLink to={`/dashboard/${userId}/home`} className="block py-2">
            <div className="cursor-pointer rounded-md h-6" style={{fontSize:'15px',display:'flex', flexDirection:'row',justifyContent:'start',alignItems:'end'}}>
                <div><img src={homeIcon} alt="" className="w-6"/></div>
                <div>Home</div>
            </div>
        </NavLink>
        <NavLink to={`/dashboard/${userId}/buying`} className="block py-2">
            <div className="cursor-pointer rounded-md  h-6" style={{fontSize:'15px',display:'flex',flexDirection:'row',justifyContent:'start',alignItems:'center'}}>
                <div><img src={buyingIcon} alt="" className="w-5"/></div>
                Buying
            </div>
        </NavLink>
        <NavLink to={`/dashboard/${userId}/accounting`} className="block py-2">
            <div className="cursor-pointer rounded-md  h-6" style={{fontSize:'15px',display:'flex',justifyContent:'start',alignItems:'center'}}>
                <div><img src={accountingIcon} alt="" className="w-5"/></div>
                Accounting
            </div>
        </NavLink>
        <NavLink to={`/dashboard/${userId}/users`} className="block py-2">
            <div className="cursor-pointer rounded-md h-6" 
            style={{fontSize:'15px',display:'flex',justifyContent:'start',alignItems:'center'}}>
                <div><img src={userIcon} alt="" className="w-5"/></div>
                Users
            </div>
        </NavLink>
    </div>

    )
}