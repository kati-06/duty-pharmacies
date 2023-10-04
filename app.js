import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import connectDB from './db/connect.js';
import {updatePharmacies} from './utils/scheduler.js';

import errorHandlerMiddleware from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';

const app = express();

// config
app.use(helmet());
app.use(express.json());
app.use(cors());

// routers
import pharmaciesRouter from './routes/pharmacies.js';

// routes
app.use('/api/v1/pharmacies', pharmaciesRouter);

app.get('/api/v1', (req, res) => {
  res.send('Welcome !');
});

// serving frontend
// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now());
  res.set('x-powered-by', 'cyclic.sh');
  console.log(
    `[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`
  );
  next();
});

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
};
app.use(express.static('public', options));

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req, res) => {
  res
    .json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params,
    })
    .end();
});
//app.use(express.static(path.join(__dirname, 'client/build')));

//path.join(__dirname, 'client/build');
//app.get('*', (req, res) => {
//  const indexPath = path.join(__dirname, 'client', 'build', 'index.html');
//  res.sendFile(indexPath, (err) => {
//    if (err) {
//      res
//        .status(500)
//        .send({
//          err,
//          path1: `${path.join(__dirname, 'client/build')}`,
//          path2: `${path.join(__dirname, 'client', 'build', 'index.html')}`,
//        });
//    }
//  });
//});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    updatePharmacies();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
