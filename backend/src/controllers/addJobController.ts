import { createjob } from "../services/createAJob";
import { Request, Response } from "express";
import fetchQuizData from "../utils/getguhuzaque";
import { validateRecruiter } from "../utils/validateRecruiter";

const transformApiQuestions = (apiQuestions: any[]): any[] => {
  return apiQuestions.map((item: any) => ({
    type: "multiple-choice", // Assuming all are multiple-choice
    time: 30, // Default time
    content: item.question,
    options: item.answers,
    correctAnswers: [item.answers[item.test_answer]], // Extract correct answer
  }));
};

export const AddJob = async (req: Request, res: Response): Promise<void> => {
  const { Jobdata, questions, recruiterDetails }: any = req.body;

  try {
    console.log("Validating recruiter details...");
    const { Token, Email, Role } = recruiterDetails;
    if (!Token || !Email || !Role) {
      throw new Error("Incomplete recruiter details provided.");
    }

    const recruiter = await validateRecruiter(Token, Email, Role);
    const recruiterId = recruiter.Recruiter?.id;
    if (!recruiterId) {
      throw new Error("Recruiter ID is missing or invalid.");
    }

    console.log("Fetching additional questions...");
    const apiResponse = await fetchQuizData();
    const apiQuestions = apiResponse.test.question;
    const transformedQuestions = transformApiQuestions(apiQuestions);
    const allQuestions = [...questions, ...transformedQuestions];

    console.log("Creating job and linking with recruiter...");
    const updateResult = await createjob(Jobdata, allQuestions, recruiterDetails);

    res.status(200).json({
      message: "Job and Test Created Successfully",
      data: updateResult,
    });
  } catch (error: any) {
    console.error("Error creating job and test:", error.message || error);
    res.status(500).json({
      error: error.message || "An error occurred while creating the job and test",
    });
  }
};