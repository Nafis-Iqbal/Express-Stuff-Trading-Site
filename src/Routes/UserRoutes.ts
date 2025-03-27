import { Router } from "express";
import UserController from "../Controllers/UserController";
import { UserValidators } from "../Validators";
import {checkValidation} from "../Middlewares/CustomMiddlewares";

const router = Router();

router.post("/create", UserValidators.createUserValidation, UserController.createUser);

router.post("/login", UserValidators.loginUserValidation, checkValidation, UserController.login);
router.post("/logout", UserController.logout);

export default router;