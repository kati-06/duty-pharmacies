import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import helmet from 'helmet';

import connectDB from './db/connect.js';
import {updatePharmacies} from './utils/scheduler.js';

import errorHandlerMiddleware from './middleware/errorHandler.js';
import notFoundMiddleware from './middleware/notFound.js';

const app = express();

// express config
app.use(helmet());
app.use(express.json());

// routers
import pharmaciesRouter from './routes/pharmacies.js';

// routes
app.use('/api/v1/pharmacies', pharmaciesRouter);

app.get('/', (req, res) => {
  res.send('here');
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
import {testo} from './utils/scheduler.js';

const startServer = async () => {
  try {
    await connectDB();
    await testo();
    updatePharmacies();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
