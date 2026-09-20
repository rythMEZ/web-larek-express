import { celebrate, Joi, Segments } from 'celebrate';

// Валидация создания заказа
const orderSchema = Joi.object({
  payment: Joi.string().valid('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number(),
  items: Joi.array()
    .items(Joi.string().length(24).hex().required())
    .min(1)
    .unique()
    .required(),
});

export const validateCreateOrder = celebrate({
  [Segments.BODY]: orderSchema,
});

// Валидация создания товара
const productSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().allow(null),
});

export const validateCreateProduct = celebrate({
  [Segments.BODY]: productSchema,
});
