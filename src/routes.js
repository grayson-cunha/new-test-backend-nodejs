import { Router } from 'express';
import categoriesRoutes from './controllers/categories/routes';

const appRoutes = Router();

appRoutes.use('/categories', categoriesRoutes);

export default appRoutes;
