// server/swagger.js

import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Allocation Tracker API',
      version: '1.0.0',
      description: 'Swagger documentation for the Project Allocation Tracker backend API',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // scan all routes
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
