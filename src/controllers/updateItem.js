import { db } from '../firebase-config';
import { ref, update } from "firebase/database";

export const updateItem = (id, data) => {
    const item = ref(db, `/items/${id}`);
    update(item, data);
}
