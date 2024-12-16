import { useState, useEffect } from "react";
import { getOrders } from "@services/order.service.js";

const useGetOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, fetchOrders, setOrders };
};

export default useGetOrders;
