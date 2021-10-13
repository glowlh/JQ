import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from '../firebase-config';

export const useItems = (userId) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const itemsRef = ref(db, '/items');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const result = [];
            Object.keys(data).forEach((itemId) => {
                if (data[itemId].userId === userId) {
                    result.push({
                        id: itemId,
                        ...data[itemId],
                    });
                }
            });
            setData(result);
        })
    }, []);

    return [data];
}
