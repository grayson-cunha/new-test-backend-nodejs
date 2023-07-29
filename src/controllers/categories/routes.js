import { Router } from 'express';
import CategoriesController from './categories.controller';
import { toObjectId } from '../../middlewares/to-object-id';

const categoriesRoutes = Router();

categoriesRoutes.post('/', CategoriesController.create);
categoriesRoutes.put('/:id', toObjectId, CategoriesController.update);
categoriesRoutes.delete('/:id', toObjectId, CategoriesController.delete);

export default categoriesRoutes;
