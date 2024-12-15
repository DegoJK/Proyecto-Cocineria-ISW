import { useEffect, useState } from "react";
import { getDishes , editDish} from "../services/dishes.service.js";
import '@styles/dishes.css';

const Home = () => {
    const [dishes, setDishes] = useState([]);

    const userData = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = userData ? userData.rol : null;
    
    const menuDishes = dishes.filter((dish) => dish.estado === 'menu');

    const fetchDishes = async () => {
        try {
            const response = await getDishes();
            setDishes(response);
        }catch (error) {
            console.error('Error: ', error);
        }
    };

    const handleAddToMenu = async (id) => {
        try {
            const updatedData = { estado: 'disponible' };//!usar validacion para saber si esta disponible o no
            await editDish(id, updatedData);
            await fetchDishes();
        } catch (error) {
            console.error('Error al agregar al menÃº:', error.response.data);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    return (
    <div>
        <div className="title">
        <h1>Menu del dia</h1>
        </div>
        {menuDishes?.length > 0 ? (
            <ul>
                <div className="dish-list">
                {menuDishes.map((dish) => (

                    <div key = {dish.id}>
                        <ul>
                        <div className="dish-container">
                                    <p>Platillo: {dish.nombre}</p>
                                    
                                    <p>Precio: {dish.precio} </p>
                                    
                                    <div className="dish-image">
                                    <img src={dish.imagen} alt="imagen" />
                                    </div>

                                    <p>Descripcion: {dish.descripcion} </p>
                                    <h3>Ingredientes:</h3>
                                        <ul>
                                            {dish.platilloIngredients.map((pi) => (
                                            <li key={pi.id}>
                                                {pi.ingredient.nombre}: {pi.cantidad}
                                            </li>
                                            ))}
                                        </ul>

                                    {(userRole === "administrador" || userRole === "bosschef") && (
                                            <button className="delete-button" onClick={() => handleAddToMenu(dish.id)}>Quitar del menu</button>
                                    )}
                                    
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

export default Home