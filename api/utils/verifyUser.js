//used to verify JWT token from cookies in requests
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;//cookieParser middleware will parse cookies and make them available in req.cookies
  //if token is not present, return error

  if (!token) return next(errorHandler(401, 'Unauthorized'));//null, call errorHandler from utils/error.js

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {//if toekn + secret generates signature, valid user object is returned
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;//info  of user via jwt.verify is added to req.user, so that it can be accessed in the next middleware or controller
    next();
  });
};