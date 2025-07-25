import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; //importing bcryptjs for password hashing
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';


export const signup = async (req, res,next) => {
    const { username, email, password } = req.body; //passwd can't be saved as it is, it should be hashed before saving. hence destructuring the request body
    const hashedPassword = bcryptjs.hashSync(password, 10); //hashing the password with a salt rounds of 10
    const newUser = new User({username, email, password: hashedPassword}); //creating a new user instance with the provided username, email, and password
      try {
        await newUser.save(); //saving the new user to the database
        res.status(201).json("User created successfully!"); //responding with a success message and a 201 status code
        } catch (error) {
          next(error); //if an error occurs, pass it to the next middleware for error handling
    }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body; //destructuring the request body to get email and password
  try {
    const validUser = await User.findOne({ email }); //finding a user by email in the database
    if (!validUser) { return next(errorHandler(404, "User not found!")); } //if user not found, return a 404 error
    const validPassword = bcryptjs.compareSync(password, validUser.password); //comparing the provided password with the hashed password in the database
    if (!validPassword) { return next(errorHandler(401, "Wrong credentials")); } //if password is invalid, return a 400 error
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET); //signing a JWT token with the user's ID and a secret key
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
        
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
      
    }
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
