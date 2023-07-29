import { Router } from 'express';
import { toObjectId } from '../../middlewares/to-object-id';
import ProductController from './product.controller';

const productsRoutes = Router();

productsRoutes.post('/', ProductController.create);
productsRoutes.put('/:id', toObjectId, ProductController.update);
productsRoutes.delete('/:id', toObjectId, ProductController.delete);

export default productsRoutes;
