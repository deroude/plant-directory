import { collection, getDocs } from "firebase/firestore";
import { db } from "./firestore.service";
export interface Result {
    id: string;
    label: string;
    photoUrl: string;
}
export const search = async (filterOptions: { [key: string]: string }): Promise<Result[]> => {
    const results = await getDocs(collection(db, 'plants'));
    return Promise.resolve(results.docs.map(d => ({ id: d.id, ...d.data() } as Result)))
}