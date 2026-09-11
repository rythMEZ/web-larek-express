import { Request, Response } from 'express';
import Product from '../models/product';

export const getProduct = (
  req: Request,
  res: Response,
) => {
  Product.find({})
    .then((products) => {
      res.send({
        data: products,
      });
    })
    .catch(() => {
      res.status(500).send({
        message: 'Произошла ошибка',
      });
    });
};

export const createProduct = (
  req: Request,
  res: Response,
) => {
  const {
    description,
    image,
    title,
    category,
    price,
  } = req.body;

  return Product.create({
    description,
    image,
    title,
    category,
    price,
  })
    .then((product) => {
      res.send({
        data: product,
      });
    })
    .catch((err) => {
      console.error(err);

      res.status(500).send({
        message: 'Произошла ошибка',
      });
    });
};
