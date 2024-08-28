'use client'

import { AiFillDollarCircle } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const pathname = usePathname();

  return (
    <body>
        
        <header className="bg-white rounded-md py-3 flex items-center justify-center px-5 mb-4 shadow-sm">
            
            <div className="w-1/5">
                <Link href="/dashboard" className="flex gap-3 w-fit">
                    <div className="bg-black p-2 rounded-lg">
                        <AiFillDollarCircle className="text-2xl text-white" />
                    </div>
                    <h1 className="text-3xl font-semibold">MyFin</h1>
                </Link>
            </div>
            <div className="flex-grow flex justify-center items-center gap-6">
                <Link className={clsx('text-lg px-2 py-1 rounded-md', 
                {'text-white bg-black': pathname === "/dashboard",
                    'text-slate-500': pathname !== "/dashboard"
                }
                )} href="/dashboard">Dashboard</Link>
                
                <Link className={clsx('text-lg px-2 py-1 rounded-md', 
                {'text-white bg-black': pathname === "/dashboard/income",
                    'text-slate-500': pathname !== "/dashboard/income"
                }
                )} href="/dashboard/income">Income</Link>
                
                <Link className={clsx('text-lg px-2 py-1 rounded-md', 
                {'text-white bg-black': pathname === "/dashboard/income",
                    'text-slate-500': pathname !== "/dashboard/income"
                }
                ,)} href="/dashboard">Expenses</Link>
                
                <Link className={clsx('text-lg px-2 py-1 rounded-md', 
                {'text-white bg-black': pathname === "/dashboard/income",
                    'text-slate-500': pathname !== "/dashboard/income"
                }
                ,)} href="/dashboard">Budgeting</Link>
            </div>
            <div className="flex items-center justify-end gap-5 w-1/5">
                <div>
                    <FaBell className="text-2xl" />
                </div>
                <div className="bg-black w-8 h-8 rounded-full">

                </div>
                
            </div>
        </header>
        {children}
    </body>
  );
}