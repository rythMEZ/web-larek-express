import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import path from 'path';

const { PORT, DB_ADDRESS } = process.env;
if (!DB_ADDRESS) {
  throw new Error('DB_ADDRESS is not defined');
}

const app = express();

app.use(cors());
app.use(
  express.static(path.join(__dirname, 'public')),
);

const client = new MongoClient(DB_ADDRESS);

const startServer = async () => {
  await client.connect();

  const db = client.db('weblarek');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

startServer();
