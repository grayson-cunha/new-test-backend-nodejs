const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Catalog API',
    description: 'REST API to manage catalog of products',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
