import { ErrorHandler } from "../error handler/errorHandler.js";
import { UserModel } from "./userModel.js";
import jwt from "jsonwebtoken";
import { UserRepository } from "./userRepository.js";
import bcrypt from 'bcrypt';

export class UserController {
    constructor () {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res, next) {
        try {
            const { name, email, password, type } = req.body;
            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new UserModel(name, email, hashedPassword, type);
            await this.userRepository.signUp(user);
            return res.status(201).send("Account Created!");
        } catch (error) {
            // Pass the error to the next error handling middleware
            return next(error);
        }
    }


    async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            // check if user with this email exists
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                throw new ErrorHandler('No user found with this email.', 400);
            } else {
                // check if password is correct
                const result = await bcrypt.compare(password, user.password);

                if (result) {
                    const token = jwt.sign({ userID: user.id, userEmail: user.email }, process.env.JWT_SECERT, {
                        expiresIn: '1h'
                    })

                    return res.status(200).send(token);
                } else {
                    throw new ErrorHandler('Password is incorrect.', 400);
                }
            }
        } catch (err) {
            next(err)
        }
    }
}