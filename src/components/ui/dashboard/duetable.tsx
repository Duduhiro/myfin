import { FetchBillsResult } from "@/lib/types/dashboard";
import { USDollar, DateConverter } from "@/lib/utils"
import Pagination from "./pagination";

export function Duetable( {billings, page}: {  
    billings: FetchBillsResult;
    page: number;
} ) {

    const bills = billings['bills'];
    const pagecount = Math.ceil(billings['count'] / 5); 
    
    return (
        <div>
            <table className="table-fixed w-full border-collapse">
                <thead className="border-b">
                    <tr>
                        <th className="pl-4 py-2 w-6/12 text-start font-normal text-slate-500">Billing</th>
                        <th className="w-2/12 text-start font-normal text-slate-500">Due Date</th>
                        <th className="w-2/12 text-start font-normal text-slate-500">Status</th>
                        <th className="w-2/12 text-start font-normal text-slate-500">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.length != 0 ? bills.map((bill, index) => (
                        <tr key={index} className="border-b">
                            <td className="pl-4 py-2 font-semibold">{bill.description}</td>
                            <td className="font-semibold">{DateConverter(bill.due_date)}</td>
                            {bill.is_paid ? <td><div className="py-1 px-2 bg-green-200 text-green-700 w-fit rounded text-sm">• Paid</div></td> : <td><div className="py-1 px-2 bg-red-200 text-red-700 w-fit rounded text-sm">• Due</div></td>}
                            <td className="font-semibold">{USDollar(bill.amount)}</td>
                        </tr>
                    )) : <tr><td colSpan={4} className="py-4 text-lg text-center">No bills available</td></tr>}
                </tbody>
            </table>
            <Pagination currentPage={page} totalPages={pagecount} />
        </div>
        
    )
};