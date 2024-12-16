import { useState } from 'react';
import { createIngredient } from '@services/ingredient.service.js';

const useCreateIngredient = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (data) => {
        setLoading(true);
        setError(null);

        try {
            await createIngredient(data);
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError(err);
            console.error('Error al crear ingrediente:', err);
        } finally {
            setLoading(false);
        }
    };

    return { handleCreate, loading, error };
};

export default useCreateIngredient;