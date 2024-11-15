import { sendVerificationEmail } from '../utils/emailSender';
import { PrismaClient, Prisma, Role } from '@prisma/client'; // Combine imports for better readability
import bcrypt from 'bcrypt';
import { create } from 'domain';

// In-memory store for OTPs
const inMemoryOTPStore: { [key: string]: { otp: string, expiry: number } } = {}; 

// Initialize Prisma Client
const prisma = new PrismaClient();

// Generate a random OTP
const generateOTP = (length: number = 6): string => {
  if (length < 1) {
    throw new Error('OTP length must be at least 1');
  }
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
  return otp.toString().slice(0, length); // Ensure it is the correct length
};

// Service to send OTP to email
export const sendOTPService = async (email: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists. Please log in.');

  const otp = generateOTP();
  const expiry = Date.now() + 5 * 60 * 1000; 

  inMemoryOTPStore[email] = { otp, expiry };

  await sendVerificationEmail(email, otp);
  return { message: 'OTP sent to your email for signup verification' };
};

// Service to verify the OTP
export const verifyOtpService = async (email: string, otp: string) => {
  const otpData = inMemoryOTPStore[email];

  if (!otpData) throw new Error('No OTP sent to this email');

  // Check if OTP matches and has not expired
  if (otpData.otp !== otp) throw new Error('Invalid OTP');
  if (Date.now() > otpData.expiry) throw new Error('OTP has expired');

  // Clear the OTP after verification
  delete inMemoryOTPStore[email];

  return { 
    status:"success",
    message: 'OTP verified successfully' };
};

// Service to set the user role
export const setRoleService = async (email: string, role: string) => {
  const allowedRoles = ['JOB_SEEKER', 'RECRUITER'];

  if (!allowedRoles.includes(role)) {
    throw new Error('Invalid role. Choose either "JOB_SEEKER", "RECRUITER"');
  }

  return { message: `Role set to ${role}` };
};

// Service to create a user
export const createUserService = async (
  email: string,
  password: string,
  role: 'JOB_SEEKER' | 'RECRUITER',
  firstName?: string,
  lastName?: string,
  companyName?: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {

    console.log(companyName + " in auth services")
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        Employee: role === 'JOB_SEEKER' ? {
          create: {
            firstName: firstName || '', // Provide a default value
            lastName: lastName || '',
            email: email,
            createdAt: new Date(), // Correctly initialize with parentheses
          }
        } : undefined, // Create employee only if the role is JOB_SEEKER
        Recruiter: role === 'RECRUITER' ? {
          create: {
            firstName: firstName || '', // Provide a default value
            lastName: lastName || '',
            email: email,
            companyName: companyName || '', // Provide a default value
            createdAt: new Date(),
            aboutCompany:"" // Correctly initialize with parentheses
          }
        } : undefined // Create recruiter only if the role is RECRUITER
      },
      select: {
        email: true,
        role: true,
        Employee: {
          select: {
            firstName: true,
            lastName: true,
            createdAt:true
          },
        },
        Recruiter:{
          select:{
            firstName:true,
            lastName:true,
            companyName:true,
            createdAt:true
          }
        }
      }
    });

    return { message: 'User created successfully'};
  } catch (error) {
    // Handle Prisma error for unique email constraint
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error('Email already in use');
    }

    throw new Error('Error creating user');
  }
};
export const loginService = async (email: string, password: string) => {
  try {
    // Find the user by email
    const userExist = await prisma.user.findUnique({
      where: { email: email }, // Use the variable 'email'
      select: {  
        role: true ,
        password:true,
        Employee: {
          select: {
            firstName: true,
            lastName: true,
            createdAt:true,
            email:true,
            
          },
        },
        Recruiter:{
          select:{
            firstName:true,
            lastName:true,
            companyName:true,
            createdAt:true,
            email:true,
          }
        }

       }, 
    });

    
    // Check if user does not exist
    if (!userExist) {
      return { success: false, message: 'User does not exist' };
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid password'  };
    }

    const dataReterived = userExist.Employee?userExist.Employee:userExist.Recruiter;

    // If user exists and password is correct
    return { success: true, message: 'Login successful', Role: userExist.role  ,userdata:dataReterived };
  } catch (error) {
    console.error('Login Error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};
