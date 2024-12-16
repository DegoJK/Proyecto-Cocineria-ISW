import axios from "./root.service.js";

export async function getOrders() {
  try {
    const { data } = await axios.get("/waiter/getOrders");
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function updateOrderStatus(id, status) {
  try {
    const { data } = await axios.put(`/waiter/updateOrderStatus/${id}`, {
      status,
    });
    return data;
  } catch (error) {
    return error.response.data;
  }
}
