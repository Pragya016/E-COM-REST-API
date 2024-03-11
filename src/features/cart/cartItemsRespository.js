import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ErrorHandler } from "../error handler/errorHandler.js";

export class CartRepository {
    constructor () {
        this.collection = 'cartItems';
    }

    async add(productId, userId, quantity) {
        try {
            const db = getDB();
            await db.collection(this.collection).insertOne({ userId: new ObjectId(userId), productId: new ObjectId(productId), quantity });
        }
        catch (err) {
            throw new ErrorHandler('Something went wrong with database.', 500);
        }
    }

    async get(userId) {
        try {
            const db = getDB();
            return await db.collection(this.collection).find({ userId: new ObjectId(userId) }).toArray();
        } catch (error) {
            throw new ErrorHandler('Something went wrong with database.', 500);
        }
    }

    async delete(userId, productId) {
        try {
            const db = getDB();
            const result = await db.collection(this.collection)
                .deleteOne({ userId: new ObjectId(userId), productId: new ObjectId(productId) });

            return result.deletedCount > 0;
        } catch (error) {
            throw new ErrorHandler('Something went wrong with database.', 500);
        }
    }
}