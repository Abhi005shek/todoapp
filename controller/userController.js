import {User} from '../models/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const login = async (req,res) => {
   const {email, password} = req.body;

   let user = await User.findOne({email}).select("+password");

   if(!user) return res.status(404).json({
      success: false,
      message: "Invalid Email or Password"
   })

   const isMatch = await bcrypt.compare(password,user.password);

   const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY );

   if(isMatch) {
     return res.status(200).cookie("token",token,{
      httpOnly:true,
      sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
      secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
   }).json({
      success: true,
      message: "Login Successfull"
   });
}
else{
     return res.status(404).json({
      success: false,
      message: "Invalid Email or Password"
   })
}

}




export const register = async (req,res) => {

    const {name,email,password} = req.body;
   
    //finding user in the database if it already exists 
    let user = await User.findOne({email});

    if(user)  return res.status(404).json({
       success: false,
       message: "User already exists"
    });

    //Encrypting password
    const hashedpassword = await bcrypt.hash(password,10);
    // creating user
    user = await User.create({name,email,password: hashedpassword});
   
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY );
   
    res.status(201).cookie("token",token,{
       httpOnly: true,
       sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
       secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
    }).json({
       success: true,
       message: 'Registered Successfully'
    });
   
   }


   export const getMyProfile = (req,res) => {
      
      res.status(200).json({
         success: true,
         user : req.user
      })
   }

   export const logout = (req,res) => {
      res.status(200).cookie("token","",{
         expires: new Date(Date.now()),
         sameSite: process.env.NODE_ENV === "DEVELOPMENT" ? "lax" : "none",
         secure: process.env.NODE_ENV === "DEVELOPMENT" ? false : true,
      }).json({
         success: true,
         message: "Logout Successfull"
      })
   }