import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();//__dirname is used to get the current directory name, which is useful for serving static files or resolving paths relative to the current directory.
const app = express();//create instance of Express application,sets up server and define routes and middleware.

app.use(express.json());//allows us to parse JSON bodies, by default, Express does not parse JSON bodies, so we need to use this middleware to handle JSON requests.
app.use(cookieParser());//allows us to parse cookies from incoming requests, enabling us to access cookies in the request object.

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist'))); //serves static files from the 'client/dist' directory, which is where the React app is built and served from.

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
}) // This route serves the index.html file for any other routes that are not handled by the API routes, allowing the React app to handle client-side routing.

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

//middlewares,mongoose, env, dotenv, cookie-parser, express, and routes are imported.
//mongoose connect to MongoDB, dotenv is used to load environment variables, cookie-parser is used to parse cookies, and express is used to create the server.
//The server listens on port 3000, and the routes for user, auth, and listing are defined.
//An error handling middleware is also defined to catch any errors that occur during request processing and return  a JSON response with the error details.   
//app.use() is used to define middleware functions that will be executed in the order they are defined, allowing us to handle requests and responses effectively.