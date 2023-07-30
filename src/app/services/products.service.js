import mongoose from 'mongoose';

import { AppError } from '../../utils/app-error';
import { HttpStatus } from '../constants/http-constants';

import Product from '../models/product.model';

class ProductsService {
  async create({ title, description, price, category, ownerId }) {
    const newProduct = new Product({
      title,
      description,
      price,
      category: new mongoose.Types.ObjectId(category),
      ownerId,
    });

    return newProduct.save();
  }

  async update(id, productData) {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      productData,
      { new: true }
    );

    if (!updatedProduct) {
      throw new AppError(
        HttpStatus.NOT_FOUND,
        `Product with id ${id} not found`
      );
    }

    return updatedProduct;
  }

  async delete(id) {
    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
      throw new AppError(
        HttpStatus.NOT_FOUND,
        `Product with id ${id} not found`
      );
    }

    return product;
  }
}

export default new ProductsService();
