import { HttpStatus } from '../../constants/http-constants';
import productsService from '../../services/products.service';
import sqsService from '../../services/sqs.service';

class ProductsController {
  async create(req, res) {
    try {
      const product = { ...req.body };

      const newProduct = await productsService.create(product);

      await sqsService.sendMessage({ ownerId: newProduct.ownerId });

      return res.status(HttpStatus.CREATED).send(newProduct);
    } catch (err) {
      res.status(err.statusCode || 500).send({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      const productData = { ...req.body };

      const updatedProduct = await productsService.update(id, productData);

      await sqsService.sendMessage({ ownerId: updatedProduct.ownerId });

      return res.status(HttpStatus.OK).send(updatedProduct);
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedProduct = await productsService.delete(id);

      await sqsService.sendMessage({ ownerId: deletedProduct.ownerId });

      return res.status(HttpStatus.OK).send(deletedProduct);
    } catch (err) {
      return res.status(err.statusCode).send({ message: err.message });
    }
  }
}

export default new ProductsController();
