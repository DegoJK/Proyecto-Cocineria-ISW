import "@styles/menu.css";
import "@styles/dishes.css";
import { useState, useEffect } from "react";

export const DishSelector = ({
  id,
  nombre,
  precio,
  imagen,
  ingredientes,
  descripcion,
  estado,
  onCounterChange,
  reset,
}) => {
  useEffect(() => {
    if (reset) {
      setQuantity(0); // Reinicia el contador a 0
    }
  }, [reset]);

  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onCounterChange(id, newQuantity); // Notificar al padre
  };

  const decrement = () => {
    const newQuantity = quantity > 0 ? quantity - 1 : 0;
    setQuantity(newQuantity);
    onCounterChange(id, newQuantity); // Notificar al padre
  };

  return (
    <div className="dish-container">
      <p>Platillo: {nombre}</p>

      <p>Precio: {precio} </p>

      <div className="dish-image">
        <img src={imagen} alt="imagen" />
      </div>

      <div className="bot-container">
        <p>Descripcion: {descripcion} </p>
        <p>Estado: {estado} </p>
        <p>Ingredientes:</p>
        <ul>
          {ingredientes.map((pi) => (
            <div key={id}>
              {pi.ingredient.nombre}: {pi.cantidad}
            </div>
          ))}
        </ul>
      </div>

      <div className="table-card-counter">
        <button onClick={decrement} className="counter-button">
          -
        </button>
        <span className="counter-value">{quantity}</span>
        <button onClick={increment} className="counter-button">
          +
        </button>
      </div>
    </div>
  );
};

export default DishSelector;
