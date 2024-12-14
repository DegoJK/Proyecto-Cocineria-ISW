import useGetIngredients from "@hooks/ingredient/getIngredients.jsx";
import useDeleteIngredient from "@hooks/ingredient/deleteIngredient";
import { useState } from "react";
import "@styles/menu.css";

const IngredientSelector = () => {
  const { ingredients, fetchIngredients } = useGetIngredients();
  const { handleDelete } = useDeleteIngredient(fetchIngredients);

  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    setQuantity((prev) => {
      const newValue = prev + 1;
      //if (onQuantityChange) onQuantityChange(newValue); // Notificar al componente padre
      return newValue;
    });
  };

  const decrement = () => {
    setQuantity((prev) => {
      const newValue = prev > 0 ? prev - 1 : 0; // Evitar valores negativos
      //if (onQuantityChange) onQuantityChange(newValue); // Notificar al componente padre
      return newValue;
    });
  };

  return (
    <div className="ingredients-container">
      <h1 className="title">Ingredientes</h1>
      {ingredients?.length > 0 ? (
        <ul className="ingredients-list">
          {ingredients.map((ingredient) => (
            <li key={ingredient.id} className="ingredient-item">
              <p>
                <strong>Nombre:</strong> {ingredient.nombre}
              </p>
              <p>
                <strong>Tipo:</strong> {ingredient.tipo}
              </p>
              <p>
                <strong>Cantidad:</strong> {ingredient.cantidad}
              </p>
              <button
                className="delete-button"
                onClick={() => handleDelete(ingredient.id)}
              >
                Eliminar
              </button>
              <div className="table-card-counter">
                <button onClick={decrement} className="counter-button">
                  -
                </button>
                <span className="counter-value">{quantity}</span>
                <button onClick={increment} className="counter-button">
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-ingredients">No hay ingredientes</p>
      )}
    </div>
  );
};

export default IngredientSelector;
