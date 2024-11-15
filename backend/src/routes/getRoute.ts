
import express from 'express';
import { getJobDetails } from '../controllers/getJobDetails';
import { getProDetails } from '../controllers/getProfileDetails';


const router = express.Router();

router.get('/getJobDetails',getJobDetails );
router.get('/getProfile',getProDetails);



export default router;
