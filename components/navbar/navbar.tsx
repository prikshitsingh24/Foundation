import { NavLink } from "@remix-run/react";

export default function Navbar({employeeId}:{employeeId:string}){
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to={`/dashboard/${employeeId}/home`}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={`/dashboard/${employeeId}/buying`}>Buying</NavLink>
                </li>
                <li>
                    <NavLink to={`/dashboard/${employeeId}/accounting`}>Accounting</NavLink>
                </li>
            </ul>
        </nav>
    )
}