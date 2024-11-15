import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendOTPService, verifyOtpService, setRoleService, createUserService, loginService } from '../services/authService';


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { step, email, otp, role, password, confirmPassword ,firstName, lastName , companyName} = req.body;

  try {
    // Step 1: Send OTP to email
    if (step === 'email') {
    await sendOTPService(email);
      
      res.status(200).json({ message: 'OTP sent to your email' });
      return;
    }

    // Step 2: Verify OTP
    if (step === 'verifyOtp') {
      await verifyOtpService(email, otp);
      res.status(200).json({ message: 'OTP verified successfully' });
      return;
    }

    // Step 3: Resend OTP
    if (step === 'resendOtp') {
      await sendOTPService(email);
      res.status(200).json({ message: 'OTP resent to your email' });
      return;
    }

    // Step 4: Set Role (JOB_SEEKER or RECRUITER)
    if (step === 'setRole') {
      await setRoleService(email, role);
      res.status(200).json({ message: `Role set to ${role}` });
      return;
    }


    // Step 5: Create User with Password
    if (step === 'createUser') {

      if (password !== confirmPassword) {
        res.status(400).json({ message: 'Passwords do not match' });
        return;
      }

      console.log(companyName + " in auth controller"); 
      const user = await createUserService(email, password, role,firstName,lastName,companyName);
      res.status(201).json({ message: 'User created successfully', user });
      return;
    }

    // If no valid step is provided
    res.status(400).json({ message: 'Invalid step' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};



const generateToken = (email: string, role: 'RECRUITER' | 'JOB_SEEKER') => {
  const payload = {
    email,
    role, // Include role in the token
  };

  // Generate the token with a 1-hour expiration time
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Login function with JWT generation
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const response = await loginService(email, password);

    if (!response.success) {
      res.status(400).json({
        Status: 'failed',
        message: 'Login failed. Email or password is incorrect',
      });
      return; // Ensure to return here to avoid further execution
    }

    const role = response.Role as 'RECRUITER' | 'JOB_SEEKER'; // Assuming Role is provided in the response

    const userdata = response.userdata;

    // Generate the token with the user's role
    const token = generateToken(email, role);

    res.status(200).json({
      message: 'Login successful',
      token,
      userdata,
      role
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};