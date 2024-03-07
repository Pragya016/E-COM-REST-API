import express from 'express';
import { UserController } from './userController.js';

// initialize express router
const userRouter = express.Router();
const userController = new UserController();

// all the paths to controller
userRouter.post('/signin', (req, res, next) => userController.signIn(req, res, next))
userRouter.post('/signup', (req, res, next) => userController.signUp(req, res,next))

export default userRouter;