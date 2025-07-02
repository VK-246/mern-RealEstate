import User from "../models/user.model.js";
import bcryptjs from "bcryptjs"; //importing bcryptjs for password hashing

export const signup = async (req, res,next) => {
    const { username, email, password } = req.body; //passwd can't be saved as it is, it should be hashed before saving. hence destructuring the request body
    const hashedPassword = bcryptjs.hashSync(password, 10); //hashing the password with a salt rounds of 10
    const newUser = new User({username, email, password: hashedPassword}); //creating a new user instance with the provided username, email, and password
      try {
        await newUser.save(); //saving the new user to the database
        res.status(201).json({ message: "User created successfully!" }); //responding with a success message and a 201 status code
        } catch (error) {
          next(error); //if an error occurs, pass it to the next middleware for error handling
    }
};