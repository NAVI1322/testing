import { prisma } from "../index";

export async function UserExists(email: string): Promise<string | null> {
  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        role: true,
      },
    });

    // Return the role if the user exists, otherwise return null
    return userExist?.role ?? null;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    // Optionally rethrow the error if you want the caller to handle it
    // throw error;
    return null;
  }
}