import dotnv from 'dotenv';

dotnv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
export const JWT_EXPIRE = process.env.JWT_EXPIRE
