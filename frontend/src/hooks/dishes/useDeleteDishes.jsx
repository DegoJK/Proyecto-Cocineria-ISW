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
        <div className="dishes-container">
            
            <h1 className="title">Pagina de Platillos</h1>
            <div className="centrar">
            <button className="add-button">Agregar Platillo</button>
            </div>
            {dishes?.length > 0 ? (
                <ul>
                    <div className="dish-list">
                    {dishes.map((dish) => (

                        <div key = {dish.id}>
                            <ul>
                                <div className="dish-container">
                                    <p>Platillo: {dish.nombre}</p>
                                    
                                    <p>Precio: {dish.precio} </p>
                                    
                                    <div className="dish-image">
                                    <img src={dish.imagen} alt="imagen" />
                                    </div>

                                    <p>Descripcion: {dish.descripcion} </p>
                                    <p>Estado: {dish.estado} </p>
                                    
                                    <button className="onmenu-button">Agregar al menu</button>
                                    <button className="edit-button">Editar</button>
                                    <button className="delete-button" onClick={() => handleDelete(dish.id)}>Eliminar</button>
                                    
                                </div>
                            </ul>
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