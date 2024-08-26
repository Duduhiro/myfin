export function Duetable() {
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
                <tr className="h-14">
                    <td className="pl-4 font-semibold">Water</td>
                    <td className="font-semibold">2021-10-01</td>
                    <td><div className="py-1 px-2 bg-green-200 text-green-700 w-fit rounded">• Paid</div></td>
                    <td className="font-semibold">$100.00</td>
                </tr>
                <tr className="h-14 border-t">
                    <td className="pl-4 font-semibold">University</td>
                    <td className="font-semibold">2021-10-01</td>
                    <td><div className="py-1 px-2 bg-orange-200 text-orange-500 w-fit rounded">• Pending</div></td>
                    <td className="font-semibold">$400.00</td>
                </tr>
                <tr className="h-14 border-t">
                    <td className="pl-4 font-semibold">University</td>
                    <td className="font-semibold">2021-10-01</td>
                    <td><div className="py-1 px-2 bg-orange-200 text-orange-500 w-fit rounded">• Pending</div></td>
                    <td className="font-semibold">$400.00</td>
                </tr>
                <tr className="h-14 border-t">
                    <td className="pl-4 font-semibold">University</td>
                    <td className="font-semibold">2021-10-01</td>
                    <td><div className="py-1 px-2 bg-orange-200 text-orange-500 w-fit rounded">• Pending</div></td>
                    <td className="font-semibold">$400.00</td>
                </tr>
                <tr className="h-14 border-t">
                    <td className="pl-4 font-semibold">University</td>
                    <td className="font-semibold">2021-10-01</td>
                    <td><div className="py-1 px-2 bg-orange-200 text-orange-500 w-fit rounded">• Pending</div></td>
                    <td className="font-semibold">$400.00</td>
                </tr>
            </tbody>
        </table>
    )
};