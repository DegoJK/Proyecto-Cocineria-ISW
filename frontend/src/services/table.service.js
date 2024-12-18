import axios from "./root.service.js";

export async function getTables() {
  try {
    const { data } = await axios.get("/table/getTables");
    //Sort by table number
    const sortedData = data.data.sort((a, b) => a.number - b.number);

    return sortedData;
  } catch (error) {
    return error.response.data;
  }
}

export async function deleteTable(id) {
  try {
    const { data } = await axios.delete(`/table/deleteTable/${id}`);
    return data;
  } catch (error) {
    return error.response.data;
  }
}
