import axios from 'axios';

export const fetchApplication = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/get/Application?recruiterId=${id}`);
    return response.data.data; // Return the `data` array from the API response
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};