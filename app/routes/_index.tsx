import { Input } from "@nextui-org/input";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { fetchAdminRole, login, registerAdmin } from "services/home";
import foundationIcon from "/foundationIcon.png"

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
      <div className="flex flex-col items-center bg-bgWhite shadow-lg mt-10 w-fit pr-20 border-2 border-borderGray hover:border-borderHoverGray pl-20 pt-10 pb-14 rounded-md">
        <div className="mb-5 text-xl flex flex-col items-center font-bold">
        <img src={foundationIcon} alt="" className="w-20 mb-5"/>
          <div>Foundation</div>
        </div>
        {isAdmin?(
          <Form method="post" className="grid grid-rows-4 gap-2 justify-items-center">
          <Input type="text" name="username" label="Username" variant="faded" labelPlacement="outside" required/>
          <Input type="email" name="email" label="Email" variant="faded" labelPlacement="outside" required/>
          <Input type="password" name="password" label="Password" variant="faded" labelPlacement="outside" required/>
          <button name="_action" value="login" className="bg-btnBlack rounded-md w-2/5 h-10 mt-5 text-textWhite">LogIn</button>
        </Form>
        ):(
          <Form method="post" className="grid grid-rows-4 gap-2 justify-items-center">
          <Input type="text" name="username" label="Username" variant="faded" labelPlacement="outside" required/>
          <Input type="text" name="companyName" label="Company name" variant="faded" labelPlacement="outside" required/>
          <Input type="text" name="companyAbbreviation" label="Company abbreviation" variant="faded" labelPlacement="outside" required/>
          <Input type="email" name="email" label="Email" variant="faded" labelPlacement="outside" required/>
          <Input type="password" name="password" label="Password" variant="faded" labelPlacement="outside" required/>
          <button name="_action" value="signup" className="bg-btnBlack rounded-md w-2/5 h-10 mt-5 text-textWhite">SignUp</button>
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
  let userId;
  switch(_action){
    case "login":
      userId = await login(details);
      if(userId != -1){
        return redirect("/dashboard/"+userId+"/home");
      }
      break;

    case "signup":
      userId = await registerAdmin(details);
      if(userId != -1){
        return redirect("/dashboard/"+userId+"/home");
      }
      break;
  }
  return redirect("/");
}