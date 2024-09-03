'use client'

import clsx from 'clsx';
import { FaFilter } from "react-icons/fa";
import { useState, useRef, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function FilterList() {
    
    const [hidden, setHidden] = useState(true);
    const filterRef = useRef<HTMLDivElement>(null);

    const toggleHidden = () => {
        setHidden(!hidden);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setHidden(true);
        }
    };

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    function handleFilter(term: string) {

        console.log(`Billings Filter... ${term}`)
        setHidden(true);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('filter', term);
        } else {
            params.delete('filter');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="relative w-20 px-2 py-2 text-gray-400 shadow rounded flex items-center justify-center gap-1 hover:cursor-pointer" onClick={() => {toggleHidden()}}>
                <FaFilter size={12} />
                Filter
            </div>
            <div ref={filterRef} className={clsx('w-48 h-fit absolute rounded -translate-x-52 -translate-y-10 shadow-xl border-slate-200 bg-white flex flex-col',
                {
                    'hidden': hidden === true,
                }
            )}>
                <div className='py-2 px-4 border-b flex items-center hover:bg-slate-100 hover:cursor-pointer' onClick={() => {handleFilter('')}}>No filter</div>
                <div className='py-2 px-4 flex items-center hover:bg-slate-100 hover:cursor-pointer' onClick={() => {handleFilter('date_recent')}}>Due Date &#9650;</div>
                <div className='border-y py-2 px-4 hover:bg-slate-100 hover:cursor-pointer' onClick={() => {handleFilter('date_old')}}>Due Date &#9660;</div>
                <div className='border-b py-2 px-4 hover:bg-slate-100 hover:cursor-pointer' onClick={() => {handleFilter('paid')}}>Status: Paid</div>
                <div className='py-2 px-4 hover:bg-slate-100 hover:cursor-pointer' onClick={() => {handleFilter('due')}}>Status: Due</div>
            </div>
        </div>
    )
}