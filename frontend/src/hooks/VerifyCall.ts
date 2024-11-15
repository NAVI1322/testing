import axios from 'axios';

const verifyCall = async (email: string, password: string, otp: string) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/verify-2fa', {
      email: email,
      password: password,
      otp: otp,
    });
    return response.data; // Return the JWT token on successful verification
  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};



export default verifyCall;
