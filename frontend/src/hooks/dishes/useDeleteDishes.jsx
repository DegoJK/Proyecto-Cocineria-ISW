import { deleteDish } from "@services/dishes.service";

const useDeleteDishes = (fetchDishes) => {
    const handleDelete = async (id) => {
        try {
            const response = await deleteDish(id);
            console.log("Platillo eliminado",response);
            await fetchDishes();
        } catch (error) {
            console.error('Error: ',error);
        }
    }
    return { handleDelete };
}

export default useDeleteDishes;