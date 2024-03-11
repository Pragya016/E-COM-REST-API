import express from 'express';
import { ProductsController } from './controllers/productsController.js';
import upload from '../../middlewares/fileUploadMiddleware.js';

// initialize express router
const productsRouter = express.Router();
const productController = new ProductsController();

// all the paths to controller
productsRouter.get('/', (req, res, next) => productController.getAllProducts(req, res, next));
productsRouter.post('/', upload.single('imageUrl'), (req, res, next) => productController.addProduct(req, res, next));
// url would be something like - localhost:/3100/api/products/filter?minPrice=199&maxPrice=399&catagory=clothes
productsRouter.get('/filter', (req, res, next) => productController.filterProducts(req, res, next));
productsRouter.post('/rate', (req, res, next) => productController.rateProduct(req, res,next));
productsRouter.get('/:id', (req, res, next) => productController.getOneProduct(req, res, next));

export default productsRouter;