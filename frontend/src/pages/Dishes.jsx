import { useEffect, useState } from "react";
import { getDishes, deleteDish } from "../services/dishes.service.js";
import '@styles/dishes.css';

export default function Dishes() {
    const [dishes, setDishes] = useState([]);

    const fetchDishes = async () => {
        try {
            const response = await getDishes();
            setDishes(response);
        }catch (error) {
            console.error('Error: ', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteDish(id);
            console.log("Platillo eliminado",response);
            await fetchDishes();
        } catch (error) {
            console.error('Error: ',error);
        }

    }

    useEffect(() => {
        fetchDishes();
    }, []);

    return (
        <div>
            <div className="dish-header">
            <h1>Pagina de Platillos</h1>
            </div>
            {dishes?.length > 0 ? (
                <ul>
                    <div className="dish-list">
                    {dishes.map((dish) => (

                        <div key = {dish.id}>
                            <li>
                                <div className="dish-container">
                                    <p>Platillo: {dish.nombre}</p>
                                    <p>Descripcion: {dish.descripcion} </p>
                                    <p>Precio: {dish.precio} </p>
                                    <p>Estado: {dish.estado} </p>
                                    <img src={dish.imagen} alt="imagen" />
                                    
                                    <button onClick={() => handleDelete(dish.id)}>Eliminar</button>
                                </div>
                            </li>
                        </div>
                    ))}
                    </div>
                </ul>
            ) : (
                <p>No hay platillos</p>
            )}
        </div>
    )

}