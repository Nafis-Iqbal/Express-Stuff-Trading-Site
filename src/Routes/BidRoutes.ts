import { Router } from "express";
import BidController from "../Controllers/BidController";

import { CommonValidators, BidValidators } from "../Validators";
import {checkValidation} from "../Middlewares/CustomMiddlewares";

const router = Router();
const bidController = new BidController();

router.post("/create", bidController.createBid);
router.put("/update", bidController.updateBid);
router.delete("/delete", bidController.deleteBid);
router.get("/detail", bidController.getBidDetail);

router.get("/index", bidController.getAllBids);
router.get("/user_index", bidController.getUserOwnedBids);
router.get("/user_index_views", bidController.getUserOwnedBidViews);

export default router;