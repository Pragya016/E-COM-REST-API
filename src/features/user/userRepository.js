import { getDB } from "../../config/mongodb.js";
import { ErrorHandler } from "../error handler/errorHandler.js";

export class UserRepository {
    async signUp(newUser) {
        try {
            // get the database
            const db = getDB();
            // get the collection
            const collection = db.collection("users");
            // check if user with these credentials already exists or not
            const user = await collection.findOne({ email: newUser.email });
            // if user already exists, throw error
            if (user) {
                throw new ErrorHandler('An user with this email already exists. Try using another email.', 409)
            }

            // insert the document
            await collection.insertOne(newUser);
            return newUser;
        } catch (error) {
            throw new ErrorHandler(error.message, error.status);
        }
    }

    async findByEmail(email) {
        try {
            // get the database
            const db = getDB();
            // get the collection
            const collection = db.collection("users");
            // find the document
            return await collection.findOne({ email });
        } catch (error) {
            throw new ErrorHandler('Something went wrong with database!', 500);
        }
    }
}