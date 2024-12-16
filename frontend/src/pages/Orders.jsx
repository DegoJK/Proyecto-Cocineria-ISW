import "@styles/orders.css";
import useGetOrders from "@hooks/orders/useGetOrders.jsx";
import useGetDishes from "@hooks/dishes/useGetDishes.jsx";
import { updateOrderStatus } from "@services/order.service.js";
import { mayusLetter } from "../utils";
import OrderComponent from "../components/OrdersComponent";

const Orders = () => {
  const { orders, setOrders } = useGetOrders();
  const { dishes } = useGetDishes();
  if (!orders || !dishes)
    return (
      <div className="orders-container">
        <header className="orders-header">
          <h1>Órdenes</h1>
        </header>
        <div className="orders-no-data">
          <h1>No hay ordenes</h1>
        </div>
      </div>
    );

  const ordersWithDishNames = orders.map((order) => ({
    ...order,
    orderDishes: order.orderDishes.map((orderDish) => ({
      ...orderDish,
      dishName:
        dishes.find((dish) => dish.id === orderDish.dishId)?.nombre ||
        "Platillo desconocido",
    })),
  }));

  const pendingOrders = ordersWithDishNames.filter(
    (order) => order.status === "Pendiente"
  );
  const preparingOrders = ordersWithDishNames.filter(
    (order) => order.status === "en preparación"
  );
  const readyOrders = ordersWithDishNames.filter(
    (order) => order.status === "lista"
  );
  const deliveredOrders = ordersWithDishNames.filter(
    (order) => order.status === "entregada"
  );

  const handleChangeStatus = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);

    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="orders-container">
      <header className="orders-header">
        <h1>Órdenes</h1>
      </header>
      {/* Verifica si no hay órdenes válidas */}
      {!orders || orders.length === 0 ? (
        <div className="orders-no-data">
          <h1>No se recibieron órdenes</h1>
        </div>
      ) : (
        <div className="orders-content">
          <section className="orders-table">
            <h2>Pendientes</h2>
            <div className="orders-list">
              {pendingOrders.length === 0 ? (
                <div className="orders-list-no-orders">
                  <h2>No hay órdenes</h2>
                </div>
              ) : (
                pendingOrders.map((order) => (
                  <OrderComponent
                    key={order.id}
                    orderNumber={order.orderNumber}
                    table={order.table}
                    status={mayusLetter(order.status)}
                    orderDishes={order.orderDishes}
                    button={
                      <button
                        className="order-card-button"
                        onClick={() =>
                          handleChangeStatus(order.id, "en preparación")
                        }
                      >
                        Marcar como En Preparación
                      </button>
                    }
                    deleteButton={
                      <button
                        className="delete"
                        onClick={() =>
                          handleChangeStatus(order.id, "cancelada")
                        }
                      >
                        Eliminar
                      </button>
                    }
                  />
                ))
              )}
            </div>
          </section>

          <section className="orders-table">
            <h2>En Preparación</h2>
            <div className="orders-list">
              {preparingOrders.length === 0 ? (
                <div className="orders-list-no-orders">
                  <h2>No hay órdenes</h2>
                </div>
              ) : (
                preparingOrders.map((order) => (
                  <OrderComponent
                    key={order.id}
                    orderNumber={order.orderNumber}
                    table={order.table}
                    status={mayusLetter(order.status)}
                    orderDishes={order.orderDishes}
                    button={
                      <button
                        className="order-card-button"
                        onClick={() => handleChangeStatus(order.id, "lista")}
                      >
                        Marcar como Lista
                      </button>
                    }
                    deleteButton={
                      <button
                        className="delete"
                        onClick={() =>
                          handleChangeStatus(order.id, "cancelada")
                        }
                      >
                        Eliminar
                      </button>
                    }
                  />
                ))
              )}
            </div>
          </section>

          <section className="orders-table">
            <h2>Listas</h2>
            <div className="orders-list">
              {readyOrders.length === 0 ? (
                <div className="orders-list-no-orders">
                  <h2>No hay órdenes</h2>
                </div>
              ) : (
                readyOrders.map((order) => (
                  <OrderComponent
                    key={order.id}
                    orderNumber={order.orderNumber}
                    table={order.table}
                    status={mayusLetter(order.status)}
                    orderDishes={order.orderDishes}
                    button={
                      <button
                        className="order-card-button"
                        onClick={() =>
                          handleChangeStatus(order.id, "entregada")
                        }
                      >
                        Marcar como Entregada
                      </button>
                    }
                    deleteButton={
                      <button
                        className="delete"
                        onClick={() =>
                          handleChangeStatus(order.id, "cancelada")
                        }
                      >
                        Eliminar
                      </button>
                    }
                  />
                ))
              )}
            </div>
          </section>

          <section className="orders-table">
            <h2>Entregadas</h2>
            <div className="orders-list">
              {deliveredOrders.length === 0 ? (
                <div className="orders-list-no-orders">
                  <h2>No hay órdenes</h2>
                </div>
              ) : (
                deliveredOrders.map((order) => (
                  <OrderComponent
                    key={order.id}
                    orderNumber={order.orderNumber}
                    table={order.table}
                    status={mayusLetter(order.status)}
                    orderDishes={order.orderDishes}
                    button={
                      <button
                        className="order-card-button"
                        onClick={() => handleChangeStatus(order.id, "Pagada")}
                      >
                        Marcar como Pagada
                      </button>
                    }
                    deleteButton={
                      <button
                        className="delete"
                        onClick={() =>
                          handleChangeStatus(order.id, "cancelada")
                        }
                      >
                        Eliminar
                      </button>
                    }
                  />
                ))
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Orders;
