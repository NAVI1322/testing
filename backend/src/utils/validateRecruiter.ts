import { prisma } from "../index";

export const validateRecruiter = async (
  Token: string,
  Email: string,
  Role: string
) => {
  try {
    const recruiter = await prisma.user.findUnique({
      where: { email:Email },
      include: { Recruiter: true,
       },
    });

    if (!recruiter) {
      throw new Error("Recruiter does not exist.");
    }


    if (recruiter.role !== Role || recruiter.role !== "RECRUITER") {
      throw new Error("Unauthorized action. User is not a recruiter.");
    }


    if (!recruiter.Recruiter || recruiter.Recruiter.id !== Token) {
      throw new Error("Recruiter ID does not match.");
    }

    return recruiter;
  } catch (error: any) {
    console.error("Error validating recruiter:", error.message || error);
    throw new Error("Failed to validate recruiter.");
  }
};