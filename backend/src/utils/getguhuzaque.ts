
import axios from 'axios';

const fetchQuizData = async () => {
  const url = 'https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=2';
  
  try {
    const response = await axios.get(url);
    return response.data; // Directly return the data
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return null; // Return null or handle errors as needed
  }
};

export default fetchQuizData;
