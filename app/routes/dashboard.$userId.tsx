import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Navbar from "components/navbar/navbar";
import { fetchUserById } from "services/dashboard";



export default function Dashboard(){

    const details = useLoaderData<any>();

    return(
    
        <div className="h-screen w-full grid grid-cols-[0_1fr_0] screen-1280:grid-cols-[1fr_1280px_1fr] screen-1366:[1fr_1366px_1fr] screen-1536:[1fr_1536px_1fr] screen-1440:grid-cols-[1fr_1440px_1fr] overflow-hidden">
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

                    <div className="pt-20 grid grid-cols-[1fr_6fr] h-[700px] screen-1080:h-[890px] ">
                        <div>
                            <div className="pb-5 text-2xl font-bold">
                                Home
                            </div>
                            <div>
                                <Navbar userId={details.userId}></Navbar>
                            </div>
                        </div>
                        <div className="flex p-2 border-2 border-bgLightGray rounded-lg h-full overflow-y-scroll">
                           <Outlet/>
                        </div>
                    </div>

                </div>
            
            <div></div>
        </div>
        
        
    )
}

export async function loader({params}: LoaderFunctionArgs){
    const userId = await params.userId;
    if(userId){
        const user = await fetchUserById(userId);
        if(user != -1){
            return user;
        }
        return redirect("/");
    }else{
        return redirect("/");
    }
}