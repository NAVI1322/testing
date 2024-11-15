import { prisma } from "../index";

interface QuestionData {
    type: string;
    time: number;
    content: string;
    options?: string[];
    correctAnswers?: string[];
}

interface MainBodyProps {

        jobName: string;
        skills: string;
        description: string;
        location: string;
        benefits: string;
        ourValues: string;
        whyWorkWithUs: string;
        positionSummary: string;
        positionResponsibilities: string;
    
}

export const createjob = async (Jobdata: MainBodyProps, questions: QuestionData[]) => {
    try {
        // Check if formdata exists
        if (!Jobdata) {
            throw new Error("Form data is missing");
        }

        // Destructure formdata for easier access
        const {
            jobName,
            skills,
            description,
            location,
            benefits,
            ourValues,
            whyWorkWithUs,
            positionSummary,
            positionResponsibilities
        } = Jobdata;

        // Create the job along with the associated questions
        const response = await prisma.availableJob.create({
            data: {
                jobDescription: {
                    create: {
                        jobName,
                        skills,
                        description,
                        location,
                        benefits,
                        ourValues,
                        whyWorkWithUs,
                        positionSummary,
                        positionResponsibilities,
                    }
                },
                questions: {
                    create: questions.map((question) => ({
                        type: question.type,
                        content: question.content,
                        options: question.options || [],
                        correctAnswers: question.correctAnswers || [],
                    })),
                }
            },
        });

        console.log("Job and questions added successfully:", response);
        return response;
    } catch (error) {
        console.error("Error adding job:", error);
        throw new Error("Failed to add job");
    }
};