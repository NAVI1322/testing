import { ProfileUpdate } from "../services/UpdateProfile";
import { Request, Response } from 'express';

export const E_Profile = async (req: Request, res: Response): Promise<void> => {
    const { firstName, lastName, about, email }:any = req.body;
  
    try {
      const updateResult = await ProfileUpdate(firstName, lastName, about, email); // Renamed to updateResult to avoid conflict
  
      res.status(200).json({ message: 'Employee Profile Updated successfully', data: updateResult });
      return;
    } catch (e) {
      console.error("Error updating employee profile:", e);
      res.status(500).json({ error: 'An error occurred while updating the employee profile' });
    }
  };


function R_Profile()
{

}