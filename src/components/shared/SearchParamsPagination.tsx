"use client"
import { UseUpdateSearchParams } from "@/hooks/UseUpdateSearchPrams";
import Pagination from "../ui/Pagination";

function SearchParamsPagination({ totalData = 1, activePage = 1 }: { totalData: number, activePage : number }) {

    const updateParams = UseUpdateSearchParams();

    return (
        <Pagination
            totalPages={totalData}
            initialPage={activePage}
            onPageChange={(n) => updateParams("page" , n?.toString())}
            maxDisplayedPages={5}
        />
    )
}

export default SearchParamsPagination