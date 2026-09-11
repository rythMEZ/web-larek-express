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

const ImageSchema = new mongoose.Schema<IImage>({
  fileName: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
});

const ProductSchema =
  new mongoose.Schema<IProduct>({
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    image: ImageSchema,

    category: {
      type: String,
      required: true,
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
  });

export default mongoose.model<IProduct>(
  'product',
  ProductSchema,
);
