import { Router } from 'express';
import { toObjectId } from '../../middlewares/to-object-id';
import productController from './product.controller';

const productsRoutes = Router();

productsRoutes.post('/', productController.create);
productsRoutes.put('/:id', toObjectId, productController.update);
productsRoutes.delete('/:id', toObjectId, productController.delete);

export default productsRoutes;
