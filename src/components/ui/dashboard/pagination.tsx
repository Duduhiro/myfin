'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { VscTriangleLeft, VscTriangleRight } from "react-icons/vsc";

export default function Pagination({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [inputValue, setInputValue] = useState(currentPage.toString());

    const handlePagination = useDebouncedCallback((term: string | number) => {
        console.log(`Pagination... ${term}`)

        if (typeof term === 'string') {
            term = parseInt(term);
        }

        if (term < 1) {
            term = 1;
        } else if (term > totalPages) {
            term = totalPages;
        }

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('page', term.toString());
        } else {
            params.delete('page');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 200);

    const addPagination = () => {

        if (typeof currentPage === 'string') {
            currentPage = parseInt(currentPage);
        }
        
        if (currentPage === totalPages) {
            return;
        }

        let newPage = currentPage + 1;
        handlePagination(newPage);
    }

    const subPagination = () => {

        if (typeof currentPage === 'string') {
            currentPage = parseInt(currentPage);
        }

        if (currentPage === 1) {
            return;
        }

        let newPage = currentPage - 1;
        handlePagination(newPage);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        if (value === '' || (/^\d*$/.test(value) && Number(value) >= 1 && Number(value) <= totalPages)) {
            setInputValue(value);

      
            if (value !== '') {
                handlePagination(Number(value));
            }
        }

        
        
    }

    useEffect(() => {
        setInputValue(currentPage.toString());
    }, [currentPage]);

    return (
        <div className="mt-2 h-8 w-full  items-center justify-center flex">
            <div className="h-full w-8 flex items-center justify-center rounded-l cursor-pointer" onClick={() => {subPagination()}}><VscTriangleLeft/></div>
            <div className="flex gap-2 h-full items-center justify-between px-2">
                <input
                id="pagination"
                type="number"
                className="w-8 border border-gray-400 text-center"
                onChange={handleInputChange}
                value={inputValue}
                min={1}
                max={totalPages}
                onBlur={() => {
                    if (inputValue === '' || Number(inputValue) < 1 || Number(inputValue) > totalPages) {
                        setInputValue(currentPage.toString());
                    }
                }}
                />
                <div> of {totalPages}</div>
            </div>
            <div className="h-full w-8 flex items-center justify-center rounded-r cursor-pointer" onClick={() => {addPagination()}}><VscTriangleRight/></div>
        </div>
    )
}