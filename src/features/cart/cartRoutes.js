import { Router } from "express";
import { CartController } from "./cartController.js";

const cartRouter = Router();

cartRouter.route('/').post(CartController.add);
cartRouter.route('/').get(CartController.get);
cartRouter.route('/:id').delete(CartController.delete);

export default cartRouter;