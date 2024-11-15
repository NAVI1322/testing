import { createjob } from "../services/createAJob";
import { Request, Response } from 'express';

export const AddJob = async (req: Request, res: Response): Promise<void> => {
    const { formdata, questions}:any = req.body;
  
    try {
      const updateResult = await createjob(formdata,questions); // Renamed to updateResult to avoid conflict
  
      res.status(200).json({ message: 'Test Created Successfully', data: updateResult });
      return;
    } catch (e) {
      console.error("Error updating employee profile:", e);
      res.status(500).json({ error: 'An error occurred while creating the test' });
    }
  };