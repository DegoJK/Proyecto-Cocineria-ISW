import axios from './root.service.js';

export async function getIngredients(){
    try {
        const response = await axios.get('/ingredient/all');
        return response.data.data;
    } catch (error) {
        return error.response;
    }
}

export async function deleteIngredient(id){
    try {
        const response = await axios.delete(`/ingredient/${id}`);
        return response.data.data;
    } catch (error) {
        return error.response;
    }
}