
import express from 'express';
import { getJobDetails } from '../controllers/getJobDetails';
import { getProDetails } from '../controllers/getProfileDetails';
import { getApplicationDetails } from '../controllers/getApplications';


const router = express.Router();

router.get('/getJobDetails',getJobDetails );
router.get('/getProfile',getProDetails);
router.get('/Application',getApplicationDetails)



export default router;
