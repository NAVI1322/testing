import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SaveQuizSubmissionInput {
  jobDetails: any; // Replace `any` with a specific type if you have one
  employeeDetails: {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
    location: string;
    resume: string | null;
    coverLetter: string;
    whyJoin: string;
    availability: string;
  };
  answers: Array<string[]>;
  questions: Array<{ content: string; correctAnswers: Array<string> }>;
}

export const saveQuizSubmission = async (data: SaveQuizSubmissionInput) => {
  const { jobDetails, employeeDetails, answers, questions } = data;

  try {
    console.log("Starting quiz submission...");

    // Find existing user
    console.log("Checking if user exists...");
    const user = await prisma.user.findUnique({
      where: { email: employeeDetails.email },
    });

    if (!user) {
      throw new Error("User does not exist in the database. Please register first.");
    }

    // Upsert employee
    console.log("Upserting employee details...");
    const employee = await prisma.employee.upsert({
      where: { email: employeeDetails.email },
      update: { ...employeeDetails },
      create: { ...employeeDetails, userId: user.id },
    });

    // Fetch or create job details
    console.log("Checking or creating job details...");
    const existingJob = await prisma.availableJob.findUnique({
      where: { id: jobDetails.jobId },
    });

    let job;
    if (existingJob) {
      console.log("Job already exists, skipping update.");
      job = existingJob;
    } else {
      console.log("Creating new job...");
      job = await prisma.availableJob.create({
        data: {
          id: jobDetails.jobId,
          jobDescriptionId: jobDetails.jobData.jobDescriptionId,
        },
      });
    }

    // Fetch recruiter for the job
    console.log("Fetching recruiter for the job...");
    const recruiter = await prisma.recruiter.findFirst({
      where: {
        availableJobs: {
          some: {
            availableJobId: jobDetails.jobId,
          },
        },
      },
      include: {
        availableJobs: true,
      },
    });

    if (!recruiter) {
      console.error(`No recruiter found for job ID: ${jobDetails.jobId}`);
      throw new Error(`Recruiter not found for job ID: ${jobDetails.jobId}. Please verify the job setup.`);
    }

    console.log("Recruiter found:", recruiter);

    // Check for existing application
    console.log("Checking for existing application...");
    const existingApplication = await prisma.application.findFirst({
      where: {
        employeeId: employee.id,
        position: jobDetails.jobData.jobDescription.jobName,
      },
    });

    if (existingApplication) {
      throw new Error("You have already applied for this job.");
    }

    // Calculate score
    console.log("Calculating quiz score...");
    const score = questions.reduce((total, question, index) => {
      const userAnswers = answers[index] || [];
      return question.correctAnswers.every((ans) => userAnswers.includes(ans)) ? total + 1 : total;
    }, 0);

    // Create application
    console.log("Creating application...");
    const application = await prisma.application.create({
      data: {
        employeeId: employee.id,
        recruiterId: recruiter.id,
        jobId: jobDetails.jobId,
        position: jobDetails.jobData.jobDescription.jobName,
        status: "PENDING",
        appliedAt: new Date(),
        answers,
        score,
        ...employeeDetails,
      },
    });

    // Upsert questions
    console.log("Upserting questions...");
    const questionPromises = (jobDetails.QuestionObj || []).map((question: any) =>
      prisma.question.upsert({
        where: { id: question.id },
        update: {
          content: question.content,
          options: question.options,
          correctAnswers: question.correctAnswers,
        },
        create: {
          id: question.id,
          availableJobId: jobDetails.jobId,
          type: question.type,
          content: question.content,
          options: question.options,
          correctAnswers: question.correctAnswers,
        },
      })
    );

    await Promise.all(questionPromises);

    console.log("Quiz submission completed successfully.");
    return { employee, job, application };
  } catch (error: any) {
    console.error("Error during quiz submission:", error.message || error);
    throw new Error(error.message || "Failed to save quiz submission.");
  }
};