import { NavLink } from "@remix-run/react";

export default function Navbar({employeeId}:{employeeId:string}){
    return(
        <nav>
            <ul>
                <li style={{marginBottom:'10px', cursor:'pointer',borderRadius:'6px',paddingLeft:'2px',height:'25px',marginRight:'40px'}}>
                    <NavLink to={`/dashboard/${employeeId}/home`}>Home</NavLink>
                </li>
                <li style={{marginBottom:'10px', cursor:'pointer',borderRadius:'6px',paddingLeft:'2px',height:'25px',marginRight:'40px'}}>
                    <NavLink to={`/dashboard/${employeeId}/buying`}>Buying</NavLink>
                </li>
                <li style={{marginBottom:'10px', cursor:'pointer',borderRadius:'6px',paddingLeft:'2px',height:'25px',marginRight:'40px'}}>
                    <NavLink to={`/dashboard/${employeeId}/accounting`}>Accounting</NavLink>
                </li>
            </ul>
        </nav>
    )
}