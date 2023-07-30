import { HttpStatus } from '../../constants/http-constants';
import Category from '../../models/category.model';
import sqsService from '../../services/sqs.service';

class CategoriesController {
  async create(req, res) {
    try {
      const { title, description, ownerId } = req.body;

      const newCategory = new Category({ title, description, ownerId });

      const category = await newCategory.save();

      await sqsService.sendMessage({ ownerId });

      return res.status(HttpStatus.CREATED).send(category);
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;

      const categoryData = { ...req.body };

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: id },
        categoryData,
        { new: true }
      );

      if (!updatedCategory) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .send({ message: 'Category not found' });
      }

      await sqsService.sendMessage({ ownerId: updatedCategory.ownerId });

      return res.status(HttpStatus.OK).send(updatedCategory);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const deletedCategory = await Category.findOneAndDelete({ _id: id });

    if (!deletedCategory) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Category not found' });
    }

    await sqsService.sendMessage({ ownerId: deletedCategory.ownerId });

    return res.status(HttpStatus.OK).send(deletedCategory);
  }
}

export default new CategoriesController();
