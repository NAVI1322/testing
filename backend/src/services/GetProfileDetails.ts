import { prisma } from "../index";

type UserDetails = {
    firstName: string;
    lastName: string;
    email: string;
    about?: string | null; // Optional 'about' for Recruiters
  } | null;
  
  type UserProfile = {
    role: string;
    userDetails: UserDetails;
  } | null;
  
  export async function getUserProfile(email: string): Promise<UserProfile> {
    try {
      const profile = await prisma.user.findFirst({
        where: {
          email: email,
        },
        select: {
          role: true,
          Employee: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              about: true,
              createdAt:true
            },
          },
          Recruiter: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
              companyName:true,
              createdAt:true
            },
          },
        },
      });
      
      const role: string = profile?.role ?? "UNKNOWN"; // Provide a default value like "UNKNOWN"
      const userDetails = role === "JOB_SEEKER" ? profile?.Employee : profile?.Recruiter;
      
      return {
        role,
        userDetails: userDetails ?? null, // Fallback to null if userDetails is undefined
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }