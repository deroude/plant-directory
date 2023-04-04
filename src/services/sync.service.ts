import { collection, getDocs } from "firebase/firestore";
import { db } from "./firestore.service";

export const sync = async ():Promise<void> =>{

    // const plants = await getDocs(collection(db, 'plants'));

    const indexedDb = window.indexedDB.open('lumea-verde');
    indexedDb.onsuccess = ev => {
        if(ev.type === 'success'){
            const db = (ev.target as any).result as IDBDatabase;
            db.transaction('plants', 'versionchange')
        }
    }

} 