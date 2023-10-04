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

// serving frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', function (req, res) {
  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
});

// routes
app.use('/api/v1/pharmacies', pharmaciesRouter);

app.get('/api/v1', (req, res) => {
  res.send('Welcome !');
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
