import useGetDishes from '@hooks/dishes/useGetDishes.jsx';
import useAddToMenu from "@hooks/dishes/useAddToMenu.jsx";
import '@styles/dishes.css';

const Home = () => {
    const { dishes, fetchDishes } = useGetDishes();
    const { handleAddToMenu } = useAddToMenu(fetchDishes);
    const userData = JSON.parse(sessionStorage.getItem('usuario'));
    const userRole = userData ? userData.rol : null;
    
    const menuDishes = dishes.filter((dish) => dish.estado === 'menu');


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