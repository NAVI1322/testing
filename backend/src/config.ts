// backend/src/config.ts
import { config } from 'dotenv';
config();

export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
