import { editDish } from "../../services/dishes.service";

export default function useEditDishes() {

    const handleEdit = async (id, data) => {
        try {
            const response = await editDish(id, data);
            return response;
        } catch (error) {
            return error.response;
        }
    };

    return { handleEdit };
}