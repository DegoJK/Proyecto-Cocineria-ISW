import { useState } from 'react';
import { editDish } from '@services/dishes.service.js';
import { getDishById } from '@services/dishes.service.js';
const useAddToMenu = (fetchDishes) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddToMenu = async (id) => {
            setLoading(true);
            setError(null);
            
        try {
            const dish = await getDishById(id);
            const estado = dish.estado;
            if(estado === 'disponible'){
                const updatedData = { estado: 'menu' };
                await editDish(id, updatedData);
            }else if(estado === 'menu'){
                const updatedData = { estado: 'disponible' };
                await editDish(id, updatedData);
            }
            await fetchDishes();
        } catch (error) {
            setError(error.response?.data || 'Error al agregar al menú');
            console.error('Error al agregar al menú:', error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleAddToMenu,
        loading,
        error,
    };
};

export default useAddToMenu;