import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { fetchAdminRole, login, registerAdmin } from "services/home";
import { Details } from "type";

export const meta: MetaFunction = () => {
  return [
    { title: "Foundation" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const isAdmin = useLoaderData<boolean>();

  return (
    <div className="bg-bgLightGray h-screen w-full">
      <div className="bg-bgWhite fixed left-0 text-black right-0 h-12 shadow-md">
        
      </div>
    <div className="h-screen w-full flex flex-col justify-center items-center"> 
      <div className="flex flex-col items-center bg-bgWhite shadow-lg pl-8 pr-8 pt-16 pb-14 rounded-md">
        <div className="mb-8 text-xl">
          Foundation
        </div>
        {isAdmin?(
          <Form method="post" className="grid grid-rows-4 gap-2 justify-items-center">
          <input type="text" name="name" placeholder="Username" className="bg-bgGray rounded-md h-8 w-80 pl-3 outline-none"/>
          <input type="email" name="email" placeholder="Email" className="bg-bgGray rounded-md h-8 w-80 pl-3 outline-none"/>
          <input type="password" name="password" placeholder="Password" className="bg-bgGray rounded-md h-8 w-80 pl-3 outline-none"/>
          <button name="_action" value="login" className="bg-btnBlack rounded-md w-2/5 h-10 text-textWhite">LogIn</button>
        </Form>
        ):(
          <Form method="post" className="grid grid-rows-4 gap-2 justify-items-center">
          <input type="text" name="name" placeholder="Username" className="bg-bgGray rounded-md h-8 w-80 pl-3 outline-none"/>
          <input type="email" name="email" placeholder="Email" className="bg-bgGray rounded-md h-8 w-80 pl-3 outline-none"/>
          <input type="password" name="password" placeholder="Password" className="bg-bgGray rounded-md h-8 w-80 pl-3 outline-none"/>
          <button name="_action" value="signup" className="bg-btnBlack rounded-md w-2/5 h-10 text-textWhite">SignUp</button>
        </Form>
        )}
      </div>
    </div>
    </div>
    
  );
}

export async function loader(){
  const isAdmin = await fetchAdminRole();
  return isAdmin;
}

export async function action({request}:ActionFunctionArgs){

  const formData = await request.formData();
  const {_action, ...details}= Object.fromEntries(formData)
  let employeeId;
  switch(_action){
    case "login":
      employeeId = await login(details);
      if(employeeId != -1){
        return redirect("/dashboard/"+employeeId+"/home");
      }
      break;

    case "signup":
      employeeId = await registerAdmin(details);
      if(employeeId != -1){
        return redirect("/dashboard/"+employeeId+"/home");
      }
      break;
  }
  return redirect("/");
}