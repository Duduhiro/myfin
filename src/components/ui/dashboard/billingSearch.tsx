'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function SearchBillings() {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    function handleSearch(term: string) {

        console.log(`Billings Search... ${term}`)

        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <input
            className="shadow pl-3 py-2 rounded"
            placeholder="Search Bill"
            onChange={(e) => {handleSearch(e.target.value)}}
            defaultValue={searchParams.get('query')?.toString()}
        />
    )
}