import "@styles/orders.css";

const OrderComponent = ({
  orderNumber,
  table,
  status,
  orderDishes,
  button,
}) => {
  return (
    <div className="order-card">
      <div>
        <h3>Orden #{orderNumber}</h3>
        <p>Mesa: {table}</p>
        <p>Estado: {status}</p>
        <ul>
          {orderDishes.map((dish) => (
            <li key={dish.dishId}>
              {dish.dishName} - Cantidad: {dish.quantity}
            </li>
          ))}
        </ul>
      </div>
      {button}
    </div>
  );
};

export default OrderComponent;
