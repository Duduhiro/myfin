import { fetchIncomeXExpense } from "@/lib/data"

export default async function Page() {
    
    const incomes = await fetchIncomeXExpense()

    return (
        <div className="h-full bg-white rounded-md shadow-md p-5">
            <div>
                {incomes.map((income, key) =>
                    <div key={key}>{income.month}</div>
                )}
            </div>
        </div>
    )
}