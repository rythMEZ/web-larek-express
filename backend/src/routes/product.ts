import express from 'express';
import {
  createProduct,
  getProduct,
} from '../controllers/products';

const productRouter = express.Router();
productRouter.post('/product', createProduct);
productRouter.get('/product', getProduct);
