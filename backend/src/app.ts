import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import { errorLogger, requestLogger } from './middlewares/logger';
import { DB_ADDRESS, PORT } from './config';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static(path.join(__dirname, 'public')));

app.use(productRouter);
app.use(orderRouter);

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(DB_ADDRESS);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

startServer();
