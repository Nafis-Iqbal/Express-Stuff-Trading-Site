import { Router } from "express";
import RatingController from "../Controllers/RatingController";

import { CommonValidators, RatingValidators } from "../Validators";
import {checkValidation} from "../Middlewares/CustomMiddlewares";

const router = Router();
const ratingController = new RatingController();

router.post("/create", RatingValidators.ratingCreateValidation, checkValidation, ratingController.createRating);
router.put("/update", checkValidation, ratingController.updateRating);
router.get("/index", ratingController.getAllRatings);
router.get("/detail", ratingController.getRatingDetail);

router.get("/user_index_given", ratingController.getUserGivenRatings);
router.get("/user_index_accepted", ratingController.getUserAcceptedRatings);

export default router;