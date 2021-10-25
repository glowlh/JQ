import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from '../firebase-config';

export const useUser = (id) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const itemsRef = ref(db, `/users/${id}`);
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            setData(data);
        });
    }, [id]);

    return [data];
}
