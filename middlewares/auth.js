import jwt from 'jsonwebtoken';
import {User} from '../models/user.js'

export const isAuthenticated = async (req,res,next) => {
    if(!req.cookies.token) return res.status(400).json({
        success: false,
        message: "Login First"
     })
     
     const details = jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY);
     
     req.user = await User.findOne({_id: details._id});

     next();
} 