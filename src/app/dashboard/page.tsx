'use client'

import { FaArrowTrendDown } from "react-icons/fa6";
import { PieChartComponent } from "@/components/ui/piechart"
import { useState } from "react"
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { BarChartComponent } from "@/components/ui/barchart";
import { Duetable } from "@/components/ui/dashboard/duetable";
import { FaFilter } from "react-icons/fa";
import { CashFlowChartComponent } from "@/components/ui/cashflowchart";
import { ExpedingLimitChartComponent } from "@/components/ui/expendinglimit";

let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function Page() {
    
    const [showBalance, setShowBalance] = useState(false);
    
    const toggleShowBalance = () => {
        setShowBalance(!showBalance);
    }
    
    const dashboardData = {
        balance: 1000,
        income: 400,
        expense: 500,
        savings: -100 
    }

    return (
        <div className="h-full bg-white rounded-md shadow-md p-5 flex gap-4">
            
            <div className="w-1/2 h-full flex flex-col gap-4">
                
                <div className="w-full h-1/6 flex gap-4">
                    <div className="w-1/2 bg-black rounded-lg border text-white border-slate-200 shadow-sm p-4 flex flex-col
                    bg-gradient-to-br from-black from-10% via-black via-70% to-green-400 to-100% select-none
                    ">
                        <div className="flex gap-4 items-center">
                            <h1 className="text-2xl font-semibold leading-none tracking-tight grow">Balance</h1>
                            {
                                showBalance ? <RxEyeOpen onClick={toggleShowBalance} className="text-2xl cursor-pointer" /> : <RxEyeClosed onClick={toggleShowBalance} className="text-xl cursor-pointer" />
                            }
                        </div>
                        <div className="flex items-center gap-4 mt-4 flex-grow">
                            <div>
                                <h1 className="text-5xl font-semibold">
                                    {
                                        showBalance ? USDollar.format(dashboardData.balance) : "$"
                                    }
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col">
                        <div className="flex gap-4 items-center">
                            <h1 className="text-2xl font-semibold leading-none tracking-tight">Savings</h1>
                            
                        </div>
                        <div className="flex items-center gap-4 mt-4 flex-grow">
                            <div className="flex items-center gap-5">
                                <h1 className="text-5xl font-semibold text-purple-600">
                                    {USDollar.format(dashboardData.savings)}
                                </h1>
                                <FaArrowTrendDown size={48} className="text-purple-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-1/6 flex gap-4">
                    <div className="w-1/2 rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col">
                        <div className="flex gap-4 items-center">
                            <h1 className="text-2xl font-semibold leading-none tracking-tight">Monthly Income</h1>
                            
                        </div>
                        <div className="flex items-center gap-4 mt-4 flex-grow">
                            <div>
                                <h1 className="text-5xl font-semibold text-green-500">
                                    {USDollar.format(dashboardData.income)}
                                </h1>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/2 shrink rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col">
                        <div className="flex gap-4 items-center">
                            <h1 className="text-2xl font-semibold leading-none tracking-tight">Monthly Expense</h1>
                            
                        </div>
                        <div className="flex items-center gap-4 mt-4 flex-grow">
                            <div>
                                <h1 className="text-5xl font-semibold text-purple-600">
                                    -{USDollar.format(dashboardData.expense)}
                                </h1>
                            </div>
                        </div>
                    </div>
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

                <div className="w-full h-3/6 rounded-md border border-slate-200 shadow-sm p-4 flex flex-col">
                    <div className="grow flex items-start">
                        <h1 className="text-2xl font-semibold leading-none tracking-tight">Your Billings</h1>
                        <div className="grow flex justify-end gap-4">
                            <input className="shadow pl-3 py-1 rounded" placeholder="Search Bill" />
                            <div className="w-fit px-2 py-1 text-gray-400 shadow rounded flex items-center gap-1 hover:cursor-pointer">
                                <FaFilter size={12} />
                                Filter
                            </div>
                        </div>
                    </div>
                    <Duetable />
                </div>
            </div>
        </div>
    )
}