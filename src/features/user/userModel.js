import { getDB } from "../../config/mongodb.js";
import { ErrorHandler } from "../error handler/errorHandler.js";

let users = [
    {
        id: 1,
        username: 'abc',
        email: "abc@ecom.com",
        password: "abc123",
        type: "customer"
    },
    {
        id: "2",
        username: 'xyz',
        email: "xyz@ecom.com",
        password: "xyz123",
        type: "seller"
    }
]

export class UserModel {
    constructor (username, email, password, typeOfUser, id) {
        this.username = username,
            this.email = email,
            this.password = password,
            this._id = id;
        this.type = typeOfUser
    }

    // static async signUp(username, email, password, type) {
    //     try {
    //         // get the database
    //         const db = getDB();

    //         // get the collection
    //         const collection = db.collection("users");
    //         const newUser = new UserModel(username, email, password, type);;
    //         // insert the document
    //         const user =  await collection.insertOne(newUser);

    //         return user;
    //     } catch (error) {
    //         throw new ErrorHandler('Something went wrong!', 500);
    //     }
    // }

    // static signIn(email, password) {
    //     const user = users.find(u => u.email == email && u.password == password);
    //     return user;
    // }

    static getAll() {
        return users;
    }
}