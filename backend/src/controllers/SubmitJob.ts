// Assume this is the service for saving to the DB
import { Request, Response } from "express";
import { saveQuizSubmission } from "../services/SubmitJob";

export const SubmitJob = async (req: Request, res: Response): Promise<void> => {
  const { jobDetails, employeeDetails, answers, questions }: any = req.body;

  try {
    // Validate the incoming data
    if (!jobDetails || !employeeDetails || !answers || !questions) {
      res.status(400).json({ error: "Missing required fields in the request body" });
      return;
    }

    // Call the service to save the submission
    const result = await saveQuizSubmission({
      jobDetails,
      employeeDetails,
      answers,
      questions,
    });

    res.status(200).json({ message: "Submission saved successfully", data: result });
  } catch (error) {
    console.error("Error submitting job details:", error);
    res.status(500).json({ error: "An error occurred while saving the submission" });
  }
};