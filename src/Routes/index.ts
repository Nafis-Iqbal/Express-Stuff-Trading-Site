import express from "express";

import { authenticateToken } from "../Middlewares/CustomMiddlewares";

import userRoutes from "./UserRoutes";
import listingRoutes from "./ListingRoutes";
import tagRoutes from "./TagRoutes";
import bidRoutes from "./BidRoutes";
import ratingRoutes from "./RatingRoutes";
import tradeRoutes from "./TradeRoutes";
import transactionRoutes from "./TransactionRoutes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/listings", authenticateToken, listingRoutes);
router.use("/tags", authenticateToken, tagRoutes);
router.use("/bids", authenticateToken, bidRoutes);
router.use("/ratings", authenticateToken, ratingRoutes);
router.use("/trades", authenticateToken, tradeRoutes);
router.use("/transactions", authenticateToken, transactionRoutes);

export default router;
