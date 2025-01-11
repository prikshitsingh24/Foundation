import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Outlet, useLoaderData } from "@remix-run/react";
import Navbar from "components/navbar/navbar";
import { useRecoilState } from "recoil";
import { userIdState } from "state/userState";
import { User } from "type/user";
import searchIcon from "/searchIcon.png"
import foundationIcon from "/foundationIcon.png"
import { fetchUserById } from "services/dashboard/user";


export default function Dashboard(){

    const details = useLoaderData<any>();
    const [id,setId] = useRecoilState(userIdState);
    setId(details.userId);
    return(
    
        <div className="h-screen w-full grid grid-cols-[0_1fr_0] screen-1280:grid-cols-[1fr_1280px_1fr] screen-1366:[1fr_1366px_1fr] screen-1536:[1fr_1536px_1fr] screen-1440:grid-cols-[1fr_1440px_1fr] overflow-hidden">
            <div></div>
                <div className="h-full">
                    <div className="bg-bgWhite fixed left-0 text-black right-0 h-12 justify-items-center shadow-md">
                        <div className="w-[1440px] flex h-full items-center justify-between">
                            <div className="flex flex-row items-center">
                                <img src={foundationIcon} alt="" className="w-9 h-10 mr-2"/>
                                <div className="font-bold">Foundation</div>
                            </div>
                            <div className="flex flex-row space-x-8 h-full items-center">
                                <Form>
                                    <div className="bg-bgLightGray flex flex-row items-center  border-2 border-borderGray hover:border-borderHoverGray rounded-xl w-full h-8 pl-2 outline-none">
                                    <img src={searchIcon} alt="" className="w-5 h-5 mr-2"/>
                                    <input type="text" className="h-full w-full rounded-xl bg-bgLightGray outline-none pr-2" placeholder="Search...."/>
                                    </div>
                                </Form>
                                <div className="bg-bgLightGray rounded-full w-11 h-11 flex justify-center border-2 items-center hover:border-borderHoverGray cursor-pointer">{details.firstName?details.firstName.slice(0,1):details.username.slice(0,1)} {details.middleName?details.middleName.slice(0,1):''} {details.lastName?details.lastName.slice(0,1):''}</div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="pt-20 grid grid-cols-[1fr_6fr] h-[700px] screen-1920:h-[890px] ">
                        <div>
                            <div className="pb-5 text-2xl pl-[10px] font-bold">
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

export async function loader({params}: LoaderFunctionArgs):Promise<User | undefined>{
    const userId = await params.userId;
    if(userId){
        const user = await fetchUserById(userId);
        if(user != -1){
            return user;
        }
        throw redirect("/");
    }else{
        throw redirect("/");
    }
}