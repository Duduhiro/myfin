'use client'

import { useState } from 'react';
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";
import { USDollar } from '@/lib/utils';

export default function BalanceComp({ balance }: { balance: number }) {
    
    const [showBalance, setShowBalance] = useState(false);

    const toggleShowBalance = () => {
        setShowBalance(!showBalance);
    }
    
    return (
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
                            showBalance ? USDollar(balance) : "$"
                        }
                    </h1>
                </div>
            </div>
        </div>
    )
}