import { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from '../firebase-config';

export const useUsers = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const itemsRef = ref(db, '/users');
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            const result = [];
            Object.keys(data).forEach((userId) => {
                result.push({
                    ...data[userId],
                    id: userId,
                });
            })

            setData(result);
        });
    }, []);

    return [data];
}
