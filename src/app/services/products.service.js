import { AppError } from '../../utils/app-error';
import { HttpStatus } from '../constants/http-constants';

import Product from '../models/product.model';
import Category from '../models/category.model';

class ProductsService {
  async create({ title, description, price, category, ownerId }) {
    const existsCategory = await Category.findOne({ _id: category, ownerId });

    if (category && !existsCategory) {
      throw new AppError(
        `Doesn't exist category with id ${category} for the ownerId ${ownerId}`
      );
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      ownerId,
    });

    const product = await newProduct.save();

    return product;
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
