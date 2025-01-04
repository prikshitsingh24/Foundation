import { NavLink } from "@remix-run/react";

export default function Navbar({userId}:{userId:string}){
    return(
        <nav>
            <ul>
                <li style={{marginBottom:'10px', cursor:'pointer',borderRadius:'6px',paddingLeft:'2px',height:'25px',marginRight:'40px'}}>
                    <NavLink to={`/dashboard/${userId}/home`}>Home</NavLink>
                </li>
                <li style={{marginBottom:'10px', cursor:'pointer',borderRadius:'6px',paddingLeft:'2px',height:'25px',marginRight:'40px'}}>
                    <NavLink to={`/dashboard/${userId}/buying`}>Buying</NavLink>
                </li>
                <li style={{marginBottom:'10px', cursor:'pointer',borderRadius:'6px',paddingLeft:'2px',height:'25px',marginRight:'40px'}}>
                    <NavLink to={`/dashboard/${userId}/accounting`}>Accounting</NavLink>
                </li>
                <li style={{marginBottom:'10px', cursor:'pointer',borderRadius:'6px',paddingLeft:'2px',height:'25px',marginRight:'40px'}}>
                    <NavLink to={`/dashboard/${userId}/users`}>Users</NavLink>
                </li>
            </ul>
        </nav>
    )
}