import { Duetable } from "@/components/ui/dashboard/duetable";
import { fetchBills } from "@/lib/data";
import SearchBillings from "@/components/ui/dashboard/billingSearch";
import FilterList from "./filter";
import { FetchBillsResult } from "@/lib/types/dashboard";

export default async function Billings({ query, filter, page }: { query: string, filter: string, page:number }) {

    let billings: FetchBillsResult = await fetchBills(query, filter, page);
    
    return (
        <div className="w-full h-3/6 rounded-md border border-slate-200 shadow-sm p-4 flex flex-col bg-white">
            <div className="flex items-start px-2 py-4">
                <h1 className="text-2xl font-semibold leading-none tracking-tight">Your Billings</h1>
                <div className="grow flex justify-end gap-4">
                    <FilterList/>
                    <SearchBillings />
                </div>
            </div>
            <Duetable billings={billings} page={page} />
        </div>
    )
}