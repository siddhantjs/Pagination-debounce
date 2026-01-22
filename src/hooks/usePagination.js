import { useMemo } from "react"

// returning a subset of data instead of whole data;
const usePagination = (data,itemsPerPage,page)=>{
    let totalPages = Math.ceil(data.length/itemsPerPage);

    const currentItems = useMemo(()=>{
        let start = (page-1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    },[page,itemsPerPage,data]);

    return {totalPages, currentItems};
}

export default usePagination;