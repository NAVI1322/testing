// backend/src/routes/authRoutes.ts
import express from 'express';
import { login, signup } from '../controllers/authController';
// import { signup, login, verify2FA } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
 router.post('/login', login);
// router.post('/verify-2fa', verify2FA);

export default router;
