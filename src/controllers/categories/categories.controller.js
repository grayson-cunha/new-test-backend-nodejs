import { HttpStatus } from '../../constants/http-constants';
import Category from '../../models/category.model';

class CategoriesController {
  async create(req, res) {
    try {
      const { title, description, ownerId } = req.body;

      const NewCategory = new Category({ title, description, ownerId });

      const category = await NewCategory.save();

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

      return res.status(HttpStatus.OK).send(updatedCategory);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message });
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    const category = await Category.findOneAndDelete({ _id: id });

    console.log(category);
    if (!category) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Category not found' });
    }

    return res.status(HttpStatus.OK).send(category);
  }
}

export default new CategoriesController();
