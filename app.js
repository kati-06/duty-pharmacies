import dotenv from 'dotenv';
dotenv.config();
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import connectDB from './db/connect.js';
import {updatePharmacies} from './utils/scheduler.js';

import errorHandlerMiddleware from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';

const app = express();

// config
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//app.use(express.static(path.resolve(__dirname, './client/build'), options));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(helmet());
app.use(express.json());
app.use(cors());

// routers
import pharmaciesRouter from './routes/pharmacies.js';

// routes
app.use('/pharmacies', pharmaciesRouter);

//app.get('', (req, res) => {
//  res.send('Welcome !');
//});

// serving the frontend

app.get('*', (req, res) => {
  res.sendFile('index.html', {root: '/client/build'});
  //res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

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
