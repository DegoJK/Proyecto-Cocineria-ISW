import { useState } from 'react';
import { updateIngredient } from '@services/ingredient.service.js';

const useUpdateIngredient = (onSuccess) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdate = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            await updateIngredient(id, data);
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            setError(err);
            console.error('Error al actualizar ingrediente:', err);
        } finally {
            setLoading(false);
        }
    };

    return { handleUpdate, loading, error };
};

export default useUpdateIngredient;