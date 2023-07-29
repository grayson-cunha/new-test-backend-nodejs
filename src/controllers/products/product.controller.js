import mongoose from 'mongoose';
import { HttpStatus } from '../../constants/http-constants';
import Product from '../../models/product.model';

class ProductsController {
  async create(req, res) {
    try {
      const { title, description, price, category, ownerId } = req.body;

      const NewProduct = new Product({
        title,
        description,
        price,
        category: new mongoose.Types.ObjectId(category),
        ownerId,
      });

      const product = await NewProduct.save();

      return res.status(HttpStatus.CREATED).send(product);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      const productData = { ...req.body };

      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id },
        productData,
        { new: true }
      );

      if (!updatedProduct) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send({ message: `Product with id ${id} not found` });
      }

      return res.status(HttpStatus.OK).send(updatedProduct);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `Product with id ${id} not found` });
    }

    return res.status(HttpStatus.OK).send(product);
  }
}

export default new ProductsController();
