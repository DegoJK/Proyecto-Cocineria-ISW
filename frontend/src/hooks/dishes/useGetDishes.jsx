import { useEffect, useState } from "react";
import { getDishes} from "@services/dishes.service.js";

const useGetDishes = () => {
    const [dishes, setDishes] = useState([]);

    const fetchDishes = async () => {
        try {
            const response = await getDishes();
            setDishes(response);
        }catch (error) {
            console.error('Error: ', error);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    return { dishes, fetchDishes };
}

export default useGetDishes;