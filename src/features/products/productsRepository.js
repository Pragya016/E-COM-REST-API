import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ErrorHandler } from "../error handler/errorHandler.js";

export class ProductRepository {
    async add(newProduct) {
        try {
            const db = getDB();
            const collection = db.collection('Products');
            const result = await collection.insertOne(newProduct);
            return { _id: result.insertedId, ...newProduct };

        } catch (error) {
            throw new ErrorHandler("Something went wrong with database. Try again later!", 500)
        }
    }

    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection('Products');
            return await collection.find().toArray();
        } catch (error) {
            throw new ErrorHandler("Something went wrong with database. Try again later!", 500);
        }
    }

    async getOneProduct(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new ErrorHandler("Invalid ID format. ID must be a 24 character hex string.", 400);
            }
            const db = getDB();
            const collection = db.collection('Products');
            const product = await collection.findOne({ _id: new ObjectId(id) });
            if (!product) {
                throw new ErrorHandler("Product not found", 404);
            }
            return product;
        } catch (error) {
            throw   new ErrorHandler("Something went wrong with database. Try again later!", 500);
        }
    }


    async filterProducts(minPrice, maxPrice, category) {
        try {
            const db = getDB();
            const collection = db.collection('Products');
            let filterExpression = {};
            if (minPrice) {
                filterExpression.price = { $gte: parseFloat(minPrice) };
            }
            if (maxPrice) {
                filterExpression.price = { ...filterExpression.price, $lte: parseFloat(maxPrice) };
            }
            if (category) {
                filterExpression.category = category;
            }

            return await collection.find(filterExpression).toArray();
        } catch (err) {
            throw new ErrorHandler("Something went wrong with database", 500);
        }
    }

    async rateProduct(userId, productId, rating) {
        try {
            const db = getDB();
            const collection = db.collection('Products');

            // 1.Remove existing entry
            await collection.updateOne({ _id: new ObjectId(productId) }, {
                $pull: {
                ratings : {userId : new ObjectId(userId)}
            }})

            // add new entry
                return  await collection.updateOne({ _id: new ObjectId(productId) }, {
                    $push: {
                        ratings: {
                            userId: new ObjectId(userId),
                            rating: rating
                        }
                    }
                })
        } catch (error) {
            console.log(error)
            throw new ErrorHandler("Something went wrong with database", 500);
        }
    }
}