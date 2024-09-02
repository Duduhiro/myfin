import { PieChartComponent } from "@/components/ui/piechart"
import { BarChartComponent } from "@/components/ui/barchart";
import { CashFlowChartComponent } from "@/components/ui/cashflowchart";
import { ExpedingLimitChartComponent } from "@/components/ui/expendinglimit";
import BalanceComp from "@/components/ui/dashboard/balance";
import SavingsComp from "@/components/ui/dashboard/savings";
import MonthExpense from "@/components/ui/dashboard/monthExpense";
import MonthIncome from "@/components/ui/dashboard/monthIncome";
import Billings from "@/components/ui/dashboard/billings";
import { FinancialData } from "@/lib/types/dashboard";
import { fetchDashboard } from "@/lib/data";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        billings?: string;
        filter?: string;
        page?: number;
    }
}) {
    
    const query = searchParams?.billings || '';
    const filter = searchParams?.filter || '';
    const page = searchParams?.page || 1;

    const dashboardData: FinancialData = await fetchDashboard();

    return (
        <div className="h-full bg-white rounded-md shadow-md p-5 flex gap-4">
            <div className="w-1/2 h-full flex flex-col gap-4">
                <div className="w-full h-1/6 flex gap-4">
                    <BalanceComp balance={dashboardData.balance} />
                    <SavingsComp savings={dashboardData.savings} />
                </div>

                <div className="w-full h-1/6 flex gap-4">
                    <MonthIncome income={dashboardData.income_value}/>
                    <MonthExpense expense={dashboardData.expense_value}/>
                </div>

                <div className="flex h-4/6 gap-4 w-full">
                    <div className="w-1/2 h-full">
                        <PieChartComponent />
                    </div>
                    
                    <div className="w-1/2 h-full">
                        <BarChartComponent />
                    </div>
                </div>

            </div>

            <div className="flex flex-col w-1/2 h-full gap-4">

                <div className="w-full h-3/6 flex gap-4">
                    <div className="w-1/2 h-full">
                        <CashFlowChartComponent />
                    </div>
                    <div className="w-1/2 h-full">
                        <ExpedingLimitChartComponent />
                    </div>
                </div>
                <Billings query={query} filter={filter} page={page} />
            </div>
        </div>
    )
}