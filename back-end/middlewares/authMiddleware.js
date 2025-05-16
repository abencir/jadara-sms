import jwt from 'jsonwebtoken';
import User from '../models/User';

const authMiddleware = async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader.startsWith('Bearer ')) {
        return res.status(401).send('No token provided')
    }

    const token = authHeader.split('')[1];

    try{
        const check = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(check.id).select('-password');
        next()
    }catch(err){
        res.status(401).send('Invalid Token')
    }
}

export default authMiddleware;