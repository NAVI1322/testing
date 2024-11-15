import axios from 'axios';

export const getJobsDetails = async () => {
  try {
    const response = await axios.get('http://localhost:3000/get/getJobDetails');
    return response.data; 
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};


export const FetchUserProfile = async (email: string, role: string) => {
  try {
    const response = await axios.get('http://localhost:3000/get/getProfile', {
      params: {
        email: email,       // This will be sent as a query parameter
        UserRole: role,     // This will be sent as a query parameter
      },
    });

   
    return response.data; // Returns the fetched data
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data); // Logs the error response from the server
    } else {
      console.error('Error message:', error.message); // Logs the general error message
    }
    throw error; // Throws the error for further handling
  }
};