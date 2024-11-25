
import express from 'express';
import { AddJob } from '../controllers/addJobController';
import { SubmitJob } from '../controllers/SubmitJob';




const router = express.Router();

router.post('/createjob',AddJob );
router.post('/submitApplication',SubmitJob)



export default router;
