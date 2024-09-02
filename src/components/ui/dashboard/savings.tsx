import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { USDollar } from "@/lib/utils";


export default function SavingsComp({ savings }: { savings: number }) {
    return (
        <div className="w-1/2 rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col">
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl font-semibold leading-none tracking-tight">Savings</h1>
                
            </div>
            <div className="flex items-center gap-4 mt-4 flex-grow">
                <div>
                    {savings >= 0 ? <div className="flex items-center gap-5">
                        <h1 className="text-5xl font-semibold text-green-500">
                            {USDollar(savings)}
                        </h1>
                        <FaArrowTrendUp size={48} className="text-green-500" />
                    </div> : <div className="flex items-center gap-5">
                        <h1 className="text-5xl font-semibold text-purple-600">
                            {USDollar(savings)}
                        </h1>
                        <FaArrowTrendDown size={48} className="text-purple-600" />
                    </div>}
                    
                </div>
            </div>
        </div>
    )
}