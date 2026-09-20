import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';

export const getProduct = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find({}).select('-__v -image._id').lean();
    return res.send({
      items: products,
      total: products.length,
    });
  } catch (error) {
    return next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      description,
      image,
      title,
      category,
      price,
    } = req.body;

    const product = await Product.create({
      description,
      image,
      title,
      category,
      price,
    });

    return res.status(201).send({ data: product });
  } catch (error) {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(
        new ConflictError('Ошибка валидации данных при создании товара'),
      );
    }
    return next(error);
  }
};
