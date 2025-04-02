import { Router } from "express";
import TransactionController from "../Controllers/TransactionController";

import { CommonValidators, TransactionValidators } from "../Validators";
import {checkValidation} from "../Middlewares/CustomMiddlewares";

const router = Router();
const transactionController = new TransactionController();

router.post("/create", transactionController.createTransaction);
router.get("/detail", transactionController.getTransactionDetail);

router.get("/index", transactionController.getAllTransactions);
router.get("/user_index", transactionController.getUserOwnedTransactions);

export default router;