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
    formdata?: {
        jobName: string;
        skills: string;
        description: string;
        location: string;
        benefits: string;
        ourValues: string;
        whyWorkWithUs: string;
        positionSummary: string;
        positionResponsibilities: string;
    };
}

// Adjusted the parameter type to be an array of QuestionData
const CreateTest = async (Jobdata:MainBodyProps, questions: QuestionData[]) => {
    try {
        const response = await axios.post('http://localhost:3000/create/createjob', {
            Jobdata,
            questions: questions.map(e => ({
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

export default CreateTest; // Make sure to export the function correctly