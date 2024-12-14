import '@styles/dishes.css';

export const DishCard = ({ dish }) => {
    return (
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
                                {pi.ingredient.nombre} - Cantidad: {pi.cantidad}
                            </li>
                            ))}
                        </ul>

                    {(userRole === "administrador" || userRole === "bosschef") && (
                            <button className="delete-button" onClick={() => handleAddToMenu(dish.id)}>Quitar del menu</button>
                    )}
                    
                </div>
        </ul>
        </div>
    );
}