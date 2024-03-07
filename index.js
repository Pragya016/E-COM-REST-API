import dotenv from 'dotenv';

// load all the envionment variables in application
dotenv.config();


import express from "express";
import bodyParser from "body-parser";
import swagger from 'swagger-ui-express';
import cors from 'cors';

import apiDocs from './swagger.json' assert {type: 'json'};
import ProductRouter from './src/features/products/routes.js';
import userRouter from "./src/features/user/userRoutes.js";
// import basicAuth from "./src/middlewares/basicAuthMiddleware.js";
import jwtAuth from "./src/middlewares/jwtMiddleware.js";
import cartRouter from "./src/features/cart/cartRoutes.js";
import loggerMiddleware from "./src/middlewares/loggerMiddleware.js";
import { ErrorHandler } from "./src/features/error handler/errorHandler.js";


const app = express();

// CORS policy configuration
const corsOptions = {
    origin: '*',
}

app.use(cors(corsOptions));
// app.use((req, res, next) => {

//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');

//     // return ok for preflight requests
//     if (req.method == 'OPTIONS') {
//         return res.sendStatus(200);
//     }

//     next();
// })


// setup body parser to parse json
app.use(bodyParser.json());

app.use('/api-docs', swagger.serve, swagger.setup(apiDocs))


// For all requests related to products
app.use(loggerMiddleware);
app.use('/api/products', jwtAuth, ProductRouter);
app.use('/api', userRouter);
app.use('/api/cart', jwtAuth, cartRouter);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the e-commerce API.');
});

// default error handler
app.use((err, req, res, next) => {
    // for application error
    if (err instanceof ErrorHandler) {
        console.log(err)
        return res.status(err.status).send(err.message);
    }

    // for server errors
    return res.status(500).send('Something went wrong. Please try again later!')
})

// middleware to handle 404 error 
app.use((req, res) => {
    res.status(404).send('API not found. Please check our documentation for more details at /api/api-docs');
})

export default app;
