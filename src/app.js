import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// importing routes
import indexRoute from './routes/index.route';
import userRoute from './routes/user.route';

dotenv.config();

// initialize the app
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mount the routes
app.use('/api/v1/', indexRoute);
app.use('/api/v1/', userRoute);

// handling errors
// create error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// send the error
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.use((req, res, next) => {
  res.locals.user = res.user;
  next();
});

export default app;
