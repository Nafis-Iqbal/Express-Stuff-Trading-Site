import { Router } from "express";
import TradeController from "../Controllers/TradeController";

import { CommonValidators, TradeValidators } from "../Validators";
import {checkValidation} from "../Middlewares/CustomMiddlewares";

const router = Router();
const tradeController = new TradeController();

router.post("/create", tradeController.createTrade);
router.put("/update", tradeController.updateTrade);
router.get("/detail", tradeController.getTradeDetail);

router.get("/index", tradeController.getAllTrades);
router.get("/user_owned_index", tradeController.getUserOwnedTrades);

export default router;