import { Request, Response } from 'express';
import { UserExists } from "../services/UserExist";
import { getUserProfile } from "../services/GetProfileDetails";

export const getProDetails = async (req: Request, res: Response): Promise<void> => {
    // Destructure email and UserRole from request query
    const { email, UserRole } = req.query

    // Check if email and UserRole are present and are strings
    if (typeof email !== 'string' || typeof UserRole !== 'string') {
        res.status(400).json({ message: 'Email and UserRole are required and must be strings' });
        return;
    }

    try {
        // Check if the user exists and get their role
        const existingRole = await UserExists(email);

        
        // Compare the roles to see if they match
        const role = UserRole === existingRole ? UserRole : null;
     ;

        if (role) {
            // Fetch user profile details
            const profileDetails = await getUserProfile(email);
            res.status(200).json({ message: 'Profile fetched successfully', data: profileDetails });
        } else {
            res.status(401).json({ message: 'Profile fetch failed: Unauthorized role' });
        }
    } catch (error) {
        console.error("Error fetching employee profile:", error);
        res.status(500).json({ error: 'An error occurred while fetching the profile' });
    }
};