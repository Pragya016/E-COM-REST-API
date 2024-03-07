import { CartModel } from "./cartModel.js";

export class CartController {
    static add(req, res) {
        const { productID, quantity } = req.query;
        const userId = req.userID;
        CartModel.add(userId, productID, quantity);
        res.status(201).send('Product added to the cart.');
    }

    static get(req, res) {
        const items = CartModel.get(req.userID);
        res.status(200).send(items);
    }

    static delete(req, res) {
        const userId = req.userID;
        const cartItemId = req.params.id;
        const err = CartModel.delete(cartItemId, userId);

        if (err) {
            return res.status(404).send(err);
        }

        return res.status(200).send('Item is deleted from the cart successfully.');
    }
}