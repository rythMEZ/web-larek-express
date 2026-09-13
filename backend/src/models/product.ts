import mongoose from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description: string;
  price: number | null;
}

const ImageSchema = new mongoose.Schema<IImage>(
  {
    fileName: {
      type: String,
      required: [true, 'Поле "fileName" должно быть заполнено'],
    },
    originalName: {
      type: String,
      required: [true, 'Поле "originalName" должно быть заполнено'],
    },
  },
  { _id: false },
);

const ProductSchema = new mongoose.Schema<IProduct>(
  {
    image: ImageSchema,

    title: {
      type: String,
      unique: true,
      required: [true, 'Поле "title" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "title" - 2'],
      maxlength: [30, 'Максимальная длина поля "title" - 30'],
    },

    category: {
      type: String,
      required: [true, 'Поле "category" должно быть заполнено'],
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      default: null,
      required: false,
    },
  },
  { versionKey: false },
);

export default mongoose.model<IProduct>('product', ProductSchema);
