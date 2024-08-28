import { USDollar } from "@/lib/utils"

export default function MonthExpense({ expense }: { expense: number }) {
    return (
        <div className="w-1/2 shrink rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col">
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl font-semibold leading-none tracking-tight">Monthly Expense</h1>
                
            </div>
            <div className="flex items-center gap-4 mt-4 flex-grow">
                <div>
                    <h1 className="text-5xl font-semibold text-purple-600">
                        -{USDollar(expense)}
                    </h1>
                </div>
            </div>
        </div>
    )
}