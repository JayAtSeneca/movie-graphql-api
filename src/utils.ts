import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

const APP_SECRET = process.env.APP_SECRET as string;

interface Token {
  userId: number;
}

function getUserId(req: Request): number {
  const Authorization = req.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET) as Token;
    return userId;
  }

  throw new Error('Not authenticated');
}

function generateToken(userId: number): string {
  return jwt.sign({ userId }, APP_SECRET);
}

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export { getUserId, generateToken, hashPassword, comparePassword };
