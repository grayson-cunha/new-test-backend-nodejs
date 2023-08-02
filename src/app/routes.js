import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger-output.json';
import categoriesRoutes from './controllers/categories/routes';
import productsRoutes from './controllers/products/routes';

const appRoutes = Router();

appRoutes.use('/documentation', swaggerUi.serve);
appRoutes.get('/documentation', swaggerUi.setup(swaggerDocument));

appRoutes.use('/categories', categoriesRoutes);
appRoutes.use('/products', productsRoutes);

export default appRoutes;
