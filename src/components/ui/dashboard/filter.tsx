'use client'

import clsx from 'clsx';
import { FaFilter } from "react-icons/fa";
import { useState } from 'react';

export default function FilterList() {
    
    const [hidden, setHidden] = useState(true);
    
    const toggleHidden = () => {
        setHidden(!hidden);
    }

    return (
        <div>
            <div className="relative w-20 px-2 py-2 text-gray-400 shadow rounded flex items-center justify-center gap-1 hover:cursor-pointer" onClick={() => {toggleHidden()}}>
                <FaFilter size={12} />
                Filter
            </div>
            <div className={clsx('w-48 h-fit absolute rounded -translate-x-52 -translate-y-10 shadow-xl bg-white p-4 flex flex-col',
                {
                    'hidden': hidden === true,
                }
            )}>
                
                <div className='py-2 flex items-center hover:bg-slate-100 hover:cursor-pointer'>Due Date &#9650;</div>
                <div className='border-y py-2 hover:bg-slate-100 hover:cursor-pointer'>Due Date &#9660;</div>
                <div className='border-b py-2 hover:bg-slate-100 hover:cursor-pointer'>Status: Paid</div>
                <div className='py-2 hover:bg-slate-100 hover:cursor-pointer'>Status: Due</div>
            </div>
        </div>
    )
}