export class CartModel {
    constructor (userId, productId, quantity) {
        this.id = Math.round(Math.random() * 1000000);
        this.userID = userId;
        this.productID = productId;
        this.quantity = quantity;
    }

    static add(userId, productId, quantity) {
        // check if user exists
        const user = cartItems.find(u => u.userID == userId);
        if (!user) {
            return 'user not found';
        }

        // check if product exists
        const product = cartItems.find(p => p.productID == productId);
        if (!product) {
            return 'Product not found.'
        }

        // add item to the cart
        cartItems.push(new CartModel(userId, productId, quantity));
    }

    static get(userId) {
        return cartItems.filter(u => u.userID == userId);
    }

    static delete(productId, userId) {
        const productIndex = cartItems.findIndex(p => p.productID == productId && p.userID == userId);
        if (productIndex == -1) {
            return 'Product Not Found.'
        }

        cartItems.splice(productIndex, 1);
    }
}

var cartItems = [new CartModel(1, 2, 1), new CartModel(2, 2, 1), new CartModel(1, 4, 2)]