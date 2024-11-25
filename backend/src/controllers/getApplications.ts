import { Request, Response } from "express";
import { getApplicationsByRecruiter } from "../services/getApplicationsByRecruiter";

export const getApplicationDetails = async (req: Request, res: Response): Promise<void> => {
  const { recruiterId } = req.query; // Use query parameters for GET request

  if (!recruiterId) {
    res.status(400).json({ error: "Recruiter ID is required" });
    return;
  }

  try {
    const applications = await getApplicationsByRecruiter(recruiterId as string);

    res.status(200).json({
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (error: any) {
    console.error("Error fetching application details:", error.message || error);
    res.status(500).json({
      error: "An error occurred while fetching application details",
    });
  }
};