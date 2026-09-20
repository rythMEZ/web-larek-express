import express from 'express';
import { createProduct, getProduct } from '../controllers/products';
import { validateCreateProduct } from '../middlewares/validatons';

const productRouter = express.Router();
productRouter.post('/product', validateCreateProduct, createProduct);
productRouter.get('/product', getProduct);

export default productRouter;
