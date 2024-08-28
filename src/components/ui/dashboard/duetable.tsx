import { USDollar, DateConverter } from "@/lib/utils"

export function Duetable( {bills}: {  
    bills: {description: string, amount: number, due_date: string, is_paid: boolean}[]
} ) {
    return (
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
                {bills.map((bill, index) => (
                    <tr key={index} className="h-14 border-b">
                        <td className="pl-4 font-semibold">{bill.description}</td>
                        <td className="font-semibold">{DateConverter(bill.due_date)}</td>
                        {bill.is_paid ? <td><div className="py-1 px-2 bg-red-200 text-red-700 w-fit rounded">• Due</div></td> : <td><div className="py-1 px-2 bg-green-200 text-green-700 w-fit rounded">• Paid</div></td>}
                        <td className="font-semibold">{USDollar(bill.amount)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};