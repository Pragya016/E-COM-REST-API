import { Router } from "express";
import { CartController } from "./cartController.js";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.route('/').post((req, res, next) => cartController.add(req, res, next));
cartRouter.route('/').get((req, res, next) => cartController.get(req, res, next));
cartRouter.route('/:id').delete((req, res, next) => cartController.delete(req, res, next));

export default cartRouter;