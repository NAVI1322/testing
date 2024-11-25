import { prisma } from "../index";

interface QuestionData {
  type: string;
  time: number;
  content: string;
  options?: string[];
  correctAnswers?: string[];
}

interface FormData {
  jobName: string;
  jobDescription: string;
  benefits: string;
  ourValues: string;
  positionSummary: string;
  positionResponsibilities: string;
  skillsRequired: string;
  whyWorkWithUs: string;
  wageRate: string;
  location: string;
}

interface MainBodyProps {
  formData: FormData;
}

export const createjob = async (
  Jobdata: MainBodyProps,
  questions: QuestionData[],
  recruiterDetails: {
    Token: string;
    Role: string;
    Email: string;
  }
) => {
  try {
    console.log("Validating recruiter role...");
    if (recruiterDetails.Role !== "RECRUITER") {
      throw new Error("Only recruiters can create jobs.");
    }

    console.log("Fetching recruiter by email...");
    const recruiter = await prisma.recruiter.findFirst({
      where: { email: recruiterDetails.Email },
    });

    if (!recruiter) {
      throw new Error(
        `Recruiter not found for email: ${recruiterDetails.Email}`
      );
    }

    const { formData } = Jobdata;

    if (!formData) {
      throw new Error("Form data is missing");
    }

    const {
      jobName,
      jobDescription,
      benefits,
      ourValues,
      positionSummary,
      positionResponsibilities,
      skillsRequired,
      whyWorkWithUs,
      wageRate,
      location,
    } = formData;

    console.log("Creating job description...");
    const createdJobDescription = await prisma.jobDescription.create({
      data: {
        jobName,
        description: jobDescription,
        location,
        benefits,
        ourValues,
        positionSummary,
        positionResponsibilities,
        skills: skillsRequired,
        whyWorkWithUs,
        wageRate,
      },
    });

    console.log("Creating available job...");
    const availableJob = await prisma.availableJob.create({
      data: {
        jobDescriptionId: createdJobDescription.id,
        questions: {
          create: questions.map((question) => ({
            type: question.type,
            content: question.content,
            options: question.options || [],
            correctAnswers: question.correctAnswers || [],
          })),
        },
      },
    });

    console.log("Linking recruiter to the job...");
    await prisma.availableJobRecruiter.create({
      data: {
        availableJobId: availableJob.id,
        recruiterId: recruiter.id,
      },
    });

    console.log("Job and questions added successfully:", availableJob);
    return availableJob;
  } catch (error: any) {
    console.error("Error adding job:", error.message || error);
    throw new Error(`Failed to add job: ${error.message}`);
  }
};