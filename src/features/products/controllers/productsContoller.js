import { ErrorHandler } from "../../error handler/errorHandler.js";
import ProductModel from "../productModel.js";
import { ProductRepository } from "../productsRepository.js";

export class ProductsController {
    constructor () {
        this.productsRepo = new ProductRepository()
    }

    async getAllProducts(req, res, next) {
        try {
            const allProducts = await this.productsRepo.getAll();
            res.status(200).send(allProducts);
        } catch (error) {
            next(error)
        }
    }

    async addProduct(req, res, next) {
        try {
            const { name, price, sizes } = req.body;
            const newProduct = new ProductModel(name, null, price, req.file.filename, 'clothes', sizes.split(','))
            // add the new product to the products array
            const product = await this.productsRepo.add(newProduct);
            // send back the response to the client
            res.status(201).send("Product added to the cart.");
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }

    rateProduct(req, res, next) {
        const { productID, rating } = req.query;
        const userID = req.user
        try {
            const error = this.productsRepo.rateProduct(userID, productID, rating);
            return res.status(200).send('Rating has added successfully.');
        } catch (error) {
            next(error);
        }
    }

    async getOneProduct(req, res, next) {
        try {
            const id = req.params.id
            const product = await this.productsRepo.getOneProduct(id);

            if (!product) {
                throw new ErrorHandler('Product not found!', 404);
            }

            res.status(200).send(product);
        }
        catch (error) {
            next(error)
        }
    }

    async filterProducts(req, res, next) {
        try {
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            const result = await this.productsRepo.filterProducts(
                minPrice,
                maxPrice,
                category
            );

            res.status(200).send(result);
        } catch (err) {
            next(err)
        }
    }

}