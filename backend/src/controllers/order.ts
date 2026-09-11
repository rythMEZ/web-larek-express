import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';

enum Payment {
  card = 'карта',
  online = 'онлайн',
}

interface IOrder {
  payment: Payment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: [];
}

const createOrder = (
  req: Request,
  res: Response,
) => {
  const {
    payment,
    email,
    phone,
    address,
    total,
    items,
  } = req.body;

  const orderID = faker.string.uuid();
};
