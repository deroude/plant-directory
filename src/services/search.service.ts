import { collection, getDocs, where, query, QueryFieldFilterConstraint } from "firebase/firestore";
import { FilterSelection } from "./filter.service";
import { db } from "./firestore.service";
export interface Result {
    id: string;
    label: string;
    photoUrl: string;
}

const toClause = (filterSelection:FilterSelection) : QueryFieldFilterConstraint =>{
    switch(filterSelection.filter.type){
        case 'include':
            return where(filterSelection.filter.id, 'array-contains', filterSelection.value);
        case 'equals':
        default:
            return where(filterSelection.filter.id, '==', filterSelection.value);
    }
}

export const search = async (filterSelection: FilterSelection[]): Promise<Result[]> => {
    const q = query( collection(db, 'plants'), ...filterSelection.map(toClause));
    const results = await getDocs(q);
    return Promise.resolve(results.docs.map(d => ({ id: d.id, ...d.data() } as Result)))
}