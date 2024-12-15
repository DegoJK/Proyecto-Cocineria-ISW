import Cookies from "js-cookie";
import axios from "./root.service";

export async function createOrderService(dishes, mesa) {
  try {
    const token = Cookies.get("jwt-auth"); // Acceder al token desde las cookies
    if (!token) {
      console.error("No se encontró el token en las cookies");
      throw new Error("No estás autenticado");
    }
    console.log("dishes", dishes);
    const { data } = await axios.post(
      "/waiter/createOrder?table=" + mesa,
      dishes,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Usar el token en el encabezado
        },
      }
    );
    return data;
  } catch (error) {
    console.error(
      "Error al crear la orden:",
      error.response?.data || error.message
    );
    throw error;
  }
}
