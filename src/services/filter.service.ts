import { collection, getDocs } from "firebase/firestore"; 
import { db } from "./firestore.service";
export interface FilterOption {
    id: string;
    label: string;
}

export interface Filter {
    id: string;
    label: string;
    type: 'include'|'equals'|'like';
    options?: FilterOption[]
}

export interface FilterSelection {
    filter: Filter;
    value: string;
}

export const getFilters: () => Promise<Filter[]> = async () => {
    const filters = await getDocs(collection(db, "filter-definition"));
    return Promise.resolve(filters.docs.map(d=>({id:d.id, ...d.data()} as Filter)))
}