import { useState } from "react";
import { createDish } from "@services/dishes.service.js";

const useDishForm = (fetchDishes, handleClose) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [dishIngredients, setDishIngredients] = useState([]);

    const handleSubmit = async () => {
        try{
            const ingredients = dishIngredients.map((item) => ({
                ingredient_id: parseInt(item.ingredientId, 10),
                cantidad: parseInt(item.cantidad, 10),
            }));

            const newDish = {
                nombre,
                descripcion,
                precio: parseFloat(precio),
                ingredients,
            };

            if(imagen && imagen.trim() !== ""){
                newDish.imagen = imagen;
            }
            await createDish(newDish);
            await fetchDishes();
            handleClose();
            setNombre("");
            setDescripcion("");
            setPrecio("");
            setImagen("");
            setDishIngredients([]);

        }catch(error){
            console.error("Error al agregar platillo:", error);
        }
    };

    return {
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        precio,
        setPrecio,
        imagen,
        setImagen,
        dishIngredients,
        setDishIngredients,
        handleSubmit,
    };
};

export default useDishForm;