import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import BadRequestError from '../errors/bad-request-error';
import Product from '../models/product';

enum Payment {
  card = 'card',
  online = 'online',
}

interface IOrder {
  payment: Payment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

const createOrder = async (
  req: Request<unknown, unknown, IOrder>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { total, items } = req.body;

    // Проверка наличия _id в базе
    const products = await Product.find({
      _id: { $in: items },
    });
    if (products.length !== items.length) {
      return next(
        new BadRequestError(
          'Один или несколько товаров недоступны для покупки',
        ),
      );
    }

    // Проверка поля price !== null
    const hasUnavailableProduct = products.some(
      (product) => product.price === null,
    );
    if (hasUnavailableProduct) {
      return next(
        new BadRequestError(
          'Один или несколько товаров недоступны для покупки',
        ),
      );
    }
    // Проверка суммы стоимости переданных товаров === total
    const calculatedTotal = products.reduce(
      (sum, product) => sum + (product.price ?? 0),
      0,
    );

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Ошибка суммы заказа'));
    }

    const orderID = randomUUID();

    return res.status(200).json({
      id: orderID,
      total: calculatedTotal,
    });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
