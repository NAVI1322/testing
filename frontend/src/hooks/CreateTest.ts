import { Toast } from '@/components/majorComponents/toast';
import axios from 'axios';

interface QuestionData {
    type: string;
    time: number;
    content: string;
    options?: string[];
    correctAnswers?: (string | number | boolean)[]; // Allow both string and number
}

interface MainBodyProps {
    formData?: {
      jobName: string;
      jobDescription: string;
      benefits: string;
      ourValues: string;
      positionSummary: string;
      positionResponsibilities: string;
      skillsRequired: string;
      whyWorkWithUs: string;
      wageRate: string;
    };
  }

interface Details {
    email: string;
    role: string;
    token: string;
}

// Adjust the parameter type to be an array of QuestionData
const CreateTest = async (
    Jobdata: MainBodyProps, 
    questions: QuestionData[], 
    recruiterDetails: Details
) => {
    console.log(recruiterDetails);
    try {
        const response = await axios.post('http://localhost:3000/create/createjob', {
            Jobdata,
            recruiterDetails: {
                Email: recruiterDetails.email,
                Token: recruiterDetails.token,
                Role: recruiterDetails.role
            },
            questions: questions.map((e) => ({
                type: e.type,
                content: e.content,
                options: e.options || [], // Default to empty array if not provided
                correctAnswers: e.correctAnswers || [] // Default to empty array if not provided
            }))
        });
        Toast("Success", "Test Created Successfully");
        return response.data; // Return the response data
    } catch (error: any) {
        Toast("Error", "Failed to create Test", "Try Again");
        if (error.response) {
            console.error('Error response:', error.response.data);
        } else {
            console.error('Error message:', error.message);
        }
        throw error; // Rethrow the error for further handling
    }
};

export default CreateTest;