import { useState, useEffect } from 'react';
import { getIngredients } from '@services/ingredient.service.js';

const useGetIngredients = () => {
    const [ingredients, setIngredients] = useState([]);

    const fetchIngredients = async () => {
        try {
            const response = await getIngredients();
            setIngredients(response);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchIngredients();
    }, [])

    return { ingredients, fetchIngredients, setIngredients };
}

export default useGetIngredients;