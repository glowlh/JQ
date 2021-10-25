import { db } from '../firebase-config';
import { ref, update } from "firebase/database";

export const updateUserScoring = (id, data) => {
    const user = ref(db, `/users/${id}`);
    update(user, data);
}
