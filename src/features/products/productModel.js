import { UserModel } from "../user/userModel.js";

export default class ProductModel {
    constructor (name, desc, price, imageUrl, category, sizes, id) {
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
        this.ratings = [];
    }

    static filter(minPrice, maxPrice, category) {
        const filteredItem = products.filter((product) => {
            return (!minPrice || product.price >= minPrice) && (!maxPrice || product.price <= maxPrice) && (category || product.category == category)
        });

        return filteredItem;
    }

    static rateProduct(userID, productID, rating) {
        const user = UserModel.getAll().find(u => u._id == userID);
        if (!user) {
            throw new Error('User not found!')
        }

        const product = products.find(p => p._id == productID);
        if (!product) throw new Error('Product not found!');
        if (!product.ratings) {
            product.ratings = [];
            product.ratings.push({
                userID: userID,
                ratings: rating
            })
        } else {
            const existingProductIndex = products.findIndex(u => u._id == userID);

            if (existingProductIndex >= 0) {
                product.ratings[existingProductIndex] = {
                    userID: userID,
                    ratings: rating
                }
            } else {
                product.ratings.push({
                    userID: userID,
                    ratings: rating
                })
            }
        }
    }
}

var products = [
    new ProductModel(
        1,
        "T-shirt",
        'Description for product 1.',
        199,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJTMbXP8UK-yp4qPy694L79qxT5zpkCKCpw&usqp=CAU",
        'clothes',
        ['L', 'XL', 'XXL', 'M']
    ),
    new ProductModel(
        2,
        "kurti",
        'Description for product 1.',
        349,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJTMbXP8UK-yp4qPy694L79qxT5zpkCKCpw&usqp=CAU",
        'clothes',
        ['L', 'XL', 'M']
    ),
    new ProductModel(
        3,
        "T-shirt",
        'Description for product 1.',
        349,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJTMbXP8UK-yp4qPy694L79qxT5zpkCKCpw&usqp=CAU",
        'clothes',
        ['L', 'M']
    ),
    new ProductModel(
        4,
        "kurti",
        'Description for product 1.',
        799,
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJTMbXP8UK-yp4qPy694L79qxT5zpkCKCpw&usqp=CAU",
        'clothes',
        ['M']
    ),
]