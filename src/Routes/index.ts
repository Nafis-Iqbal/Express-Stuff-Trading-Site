import express from "express";

import { authenticateToken } from "../Middlewares/CustomMiddlewares";

import userRoutes from "./UserRoutes";
import listingRoutes from "./ListingRoutes";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/listing", authenticateToken, listingRoutes);

export default router;
