import { Router } from "express";
import UserController from "../Controllers/UserController";

import { CommonValidators, UserValidators } from "../Validators";
import {checkValidation, authenticateToken, checkAdminRole} from "../Middlewares/CustomMiddlewares";

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

// Admin-only route for updating user roles
router.put("/update/admin-role", authenticateToken, checkAdminRole, UserValidators.updateUserRoleValidation, checkValidation, userController.updateUserRole);

export default router;