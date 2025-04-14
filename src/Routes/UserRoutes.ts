import { Router } from "express";
import UserController from "../Controllers/UserController";

import { CommonValidators, UserValidators } from "../Validators";
import {checkValidation} from "../Middlewares/CustomMiddlewares";
import { authenticateToken } from "../Middlewares/CustomMiddlewares";

const router = Router();
const userController = new UserController(); 

router.post("/create", UserValidators.createUserValidation, userController.createUser);

router.post("/login", UserValidators.loginUserValidation, checkValidation, userController.login);
router.get("/logout", userController.logout);

router.put("/update", authenticateToken, UserValidators.userDataValidation, checkValidation, userController.updateUser);
router.delete("/delete", authenticateToken, CommonValidators.idValidation("id"), checkValidation, userController.deleteUser);
router.get("/own_detail", authenticateToken, userController.getOwnUserDetail);
router.get("/detail", authenticateToken, CommonValidators.idValidation("id"), checkValidation, userController.getUserDetail);

router.get("/index", authenticateToken, userController.getAllUsers);

export default router;