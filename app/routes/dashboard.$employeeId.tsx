import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Navbar from "components/navbar/navbar";
import ResponsiveDiv from "components/responsiveDiv/responsiveDiv";
import { fetchEmployeeDetails } from "services/home";



export default function Dashboard(){

    const details = useLoaderData<any>();

    return(
    
        <div className="h-full w-full grid grid-cols-[1fr_1440px_1fr]">
            <div></div>

                <div className="h-full">
                    <div className="bg-bgWhite fixed left-0 text-black right-0 h-12 justify-items-center shadow-md">
                        <div className="w-[1440px] flex h-full items-center justify-between">
                            <div>
                                Foundation
                            </div>
                            <div className="flex flex-row space-x-10 h-full items-center">
                                <div>Search</div>
                                <div className="bg-bgLightGray rounded-full w-10 h-10 flex justify-center items-center">Ps</div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="pt-20 grid grid-cols-[1fr_6fr] h-full">
                        <div>
                            <div className="pb-2 text-2xl font-bold">
                                Home
                            </div>
                            <div>
                                <Navbar employeeId={details.employeeId}></Navbar>
                            </div>
                        </div>
                        <div className="pt-2 mt-10 border-2 border-bgLightGray rounded-md h-full">
                           <Outlet/>
                        </div>
                    </div>

                </div>
            
            <div></div>
        </div>
        
        
    )
}

export async function loader({params}: LoaderFunctionArgs){
    const employeeId = await params.employeeId;
    if(employeeId){
        return fetchEmployeeDetails(employeeId);
    }else{
        return redirect("/");
    }
}