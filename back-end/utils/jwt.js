import jwt from 'jsonwebtoken';
import {JWT_SECRET_KEY, JWT_EXPIRE} from '../config/config.js'

export const tokenGenerate = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    },
    JWT_SECRET_KEY,
    {expiresIn: JWT_EXPIRE}
    );
};
