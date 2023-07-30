import { Router } from 'express';
import categoriesRoutes from './controllers/categories/routes';
import productsRoutes from './controllers/products/routes';

const appRoutes = Router();

appRoutes.use('/categories', categoriesRoutes);
appRoutes.use('/products', productsRoutes);

export default appRoutes;
