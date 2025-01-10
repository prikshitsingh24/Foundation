import { useLoaderData } from "@remix-run/react";
import { LineChart } from "components/graphs/lineChart";
import { PieChart } from "components/graphs/pieChart";
import { ScatterChart } from "components/graphs/scatterChart";
import { VerticalBarChart } from "components/graphs/verticalBarChart";
import { fetchCompany } from "services/dashboard";

export default function Home(){

    const companyDetails:any = useLoaderData();

    return (
        <div className="p-2 w-full h-full ">
            <div className="text-2xl font-bold mb-2">{companyDetails[0].companyName} Insights and Trends</div>
            <hr />
           <div className="grid grid-cols-2 gap-3 w-full">
            <div className="h-full w-full">
                <VerticalBarChart></VerticalBarChart>
            </div>
            <div className="h-full w-full">
                <VerticalBarChart></VerticalBarChart>
            </div>
           </div>
           <div className="grid grid-cols-2 w-full mt-5">
            <div className="flex flex-col">
            <LineChart></LineChart>
            <ScatterChart></ScatterChart>
            </div>
            <div className="w-full">
            <PieChart></PieChart>
            </div>
           </div>
        

        </div>
    )
}


export async function loader(){
    const companyDetails = await fetchCompany();
    if(companyDetails){
        return companyDetails;
    }
    return null;
}