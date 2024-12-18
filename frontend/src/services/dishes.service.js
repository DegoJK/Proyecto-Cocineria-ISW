import axios from './root.service.js';

export async function getDishById(id) {
    try {
        const response = await axios.get(`/dish/find/${id}`);
        return response.data.data;
    } catch (error) {
        return error.response;
    }
}


export async function getDishes() {
    try {
        const response = await axios.get('/dish/all');
        return response.data.data;
    } catch (error) {
        return error.response;
    }
}

export async function deleteDish(id) {
    try {
        const response = await axios.delete(`/dish/delete/${id}`);
        return response.data.data;
    } catch (error) {
        return error.response;
    }
}

export async function createDish(data) {
    try {
        const response = await axios.post('/dish/create', data);
        return response.data.data;
    } catch (error) {
        return error.response;
    }
}

export async function editDish(id, data) {
    try {
        const response = await axios.patch(`/dish/edit/${id}`, data);
        return response.data.data;
    } catch (error) {
        return error.response;
    }
}