import { Router } from "express";
import ListingController from "../Controllers/ListingController";

const router = Router();

router.get("/listings", ListingController.getAllListings);

export default router;