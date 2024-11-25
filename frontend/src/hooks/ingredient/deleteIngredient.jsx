import { deleteIngredient } from '@services/ingredient.service.js';

const useDeleteIngredient = (fetchIngredients) => {
    const handleDelete = async (id) => {
        try {
            await deleteIngredient(id);
            await fetchIngredients();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return { handleDelete };
};

export default useDeleteIngredient;


