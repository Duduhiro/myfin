'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBillings() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    const handleSearch = useDebouncedCallback((term: string) => {
        console.log(`Billings Search... ${term}`)

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('billings', term);
        } else {
            params.delete('billings');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 200);

    return (
        <input
            className="shadow pl-3 py-2 rounded"
            placeholder="Search Bill"
            onChange={(e) => {handleSearch(e.target.value)}}
            defaultValue={searchParams.get('billings')?.toString()}
        />
    )
}