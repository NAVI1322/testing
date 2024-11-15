import { prisma } from "../index";

export const getAllJobs = async () => {
    try {
        // Fetch all jobs along with their associated job descriptions and questions
        const jobs = await prisma.availableJob.findMany({
            include: {
                jobDescription: true, // Include the job description
                questions: true,      // Include associated questions
            },
        });

        console.log("All job data fetched successfully:", jobs);
        return jobs;
    } catch (error) {
        console.error("Error fetching all job data:", error);
        throw new Error("Failed to fetch all job data");
    }
};