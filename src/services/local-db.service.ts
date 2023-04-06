import Dexie from "dexie";
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

export interface Result {
    id: string;
    label: string;
    photoUrl: string;
}

const localDb: any = new Dexie('lumea-verde');

// Declare tables, IDs and indexes
localDb.version(1).stores({
    plants: '++id, name, latinName, locations, seasons',
    filters: '++id, label, type, options'
});


export const sync = async (): Promise<void> => {

    const plants = await getDocs(collection(db, 'plants'));

    for (let p of plants.docs) {
        await localDb.plants.put({
            id: p.id,
            ...p.data()
        });
    }

    const filters = await getDocs(collection(db, "filter-definition"));

    for (let f of filters.docs) {
        await localDb.filters.put({
            id: f.id,
            ...f.data()
        });
    }
}

const toClause = (filterSelection: FilterSelection): (entry: any) => boolean => {
    switch (filterSelection.filter.type) {
        case 'include':
            return entry => entry[filterSelection.filter.id].includes(filterSelection.value);
        case 'like':
            return entry => new RegExp(filterSelection.value).test(entry[filterSelection.filter.id]);
        case 'equals':
        default:
            return entry => entry[filterSelection.filter.id] === filterSelection.value;
    }
}

export const search = async (filterSelection: FilterSelection[]): Promise<Result[]> => {
   return localDb.plants.filter((entry: any) => filterSelection.reduce((prev, curr) => prev && toClause(curr)(entry), true)).toArray();
}

export const getFilters = async(): Promise<Filter[]> => {
    return localDb.filters.toArray();
}