import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import Listing from '../models/listing.model.js';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)//user from token vs user sent in update request
    //if they do not match, user is trying to update another user's account
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);//hashing the password before saving it to the database
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,//find user by id from params
      {//update user with the data from the request body
        $set: {
          username: req.body.username,//if not provided, ignores it
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }//returns the updated user object
    );

    const { password, ...rest } = updatedUser._doc;//_ doc contains the user data, excluding the password

    res.status(200).json(rest);//send the updated user data back to the client, excluding the password
  } catch (error) {
    next(error); //if any error occurs, pass it to the next middleware (error handler)
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) //user from token vs user sent in delete request
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id); //find user by id from params and delete it
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted successfully!');
  } catch (error) {
    next(error); //if any error occurs, pass it to the next middleware (error handler)
  }
};
export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });//UserRef is just a field to link listings back to their owner (the user).
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, 'You can only view your own listings!'));
  }
};
export const getUser = async (req, res, next) => {
  try {
    
    const user = await User.findById(req.params.id); //extract id from the request parameters and find the user in the database
  
    if (!user) return next(errorHandler(404, 'User not found!'));
  
    const { password: pass, ...rest } = user._doc;
  
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


