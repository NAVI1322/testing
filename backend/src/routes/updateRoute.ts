// backend/src/routes/authRoutes.ts
import express from 'express';
import { E_Profile } from '../controllers/ProfileController';



const router = express.Router();

router.post('/Profile', E_Profile);



export default router;
