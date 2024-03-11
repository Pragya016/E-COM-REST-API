import { ErrorHandler } from "../error handler/errorHandler.js";
import { CartRepository } from "./cartItemsRespository.js";
import { CartModel } from "./cartModel.js";

export class CartController {
    constructor () {
        this.cartRepository = new CartRepository();
    }

    async add(req, res, next) {
        try {
            const { productID, quantity } = req.query;
            const userId = req.userID;
            await this.cartRepository.add(productID, userId, quantity);
            res.status(201).send('Product added to the cart.');
        } catch (err) {
            next(err);
        }
    }

    async get(req, res, next) {
        try {
            const userId = req.userID;
            const items = await this.cartRepository.get(userId);
            res.status(200).send(items);
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.userID;
            const cartItemId = req.params.id;;
            const result = await this.cartRepository.delete(userId, cartItemId);

            if (!result) {
                throw new ErrorHandler('No item found to be deleted.', 404);
            }

            return res.status(200).send('Item is deleted from the cart successfully.');
        } catch (err) {
            next(err);
        }
    }
}