import swaggerJsdoc from 'swagger-jsdoc';
import {serve, setup} from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation (ES7)',
            version: '1.0.0',
            description: 'Modern Swagger setup with ES7+',
        },
        servers: [
            {url: 'http://localhost:3000', description: 'Development Server'},
        ],
    },
    apis: [process.cwd() + "/src/modules/**/*.swagger.js"], // مسیر فایل‌های route با ES Modules
};

// const specs = swaggerJsdoc(options);
const specs = swaggerJsdoc(options
//     {
//     definition: {
//         info: {
//             title: 'API Documentation (ES7)',
//             version: '1.0.0',
//             description: 'Modern Swagger setup with ES7+',
//         },
//     }, apis: []
// }
);

// const swaggerConfig =setup(specs)

export const setupSwagger = (app) => {
    // app.use("/", serve, setup(specs, {}))
    app.use("/api-docs", serve, setup(specs, {}))
}