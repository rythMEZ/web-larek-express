import express from 'express';
import createOrder from '../controllers/order';
import { validateCreateOrder } from '../middlewares/validatons';

const orderRouter = express.Router();
orderRouter.post('/order', validateCreateOrder, createOrder);

export default orderRouter;
