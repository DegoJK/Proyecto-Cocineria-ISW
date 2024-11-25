import axios from './root.service.js';

export const getDailyReport = async () => {
  try {
    const response = await axios.get('/report/daily');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSalesByDateRange = async (startDate, endDate) => {
  try {
    const response = await axios.get('/report/sales-by-date', {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};