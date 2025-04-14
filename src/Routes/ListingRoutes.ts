import { Router } from "express";
import ListingController from "../Controllers/ListingController";

import { CommonValidators, ListingValidators } from "../Validators";
import {checkValidation} from "../Middlewares/CustomMiddlewares";

const router = Router();
const listingController = new ListingController();

router.post("/create", ListingValidators.listingCreateValidation, checkValidation, listingController.createListing);
router.put("/update", ListingValidators.listingUpdateValidation, checkValidation, listingController.updateListing);
router.delete("/delete", CommonValidators.idValidation("id"), checkValidation, listingController.deleteListing);
router.get("/detail", CommonValidators.idValidation("id"), checkValidation, listingController.getListingDetail);

router.put("/add_tags", CommonValidators.idValidation("id"), ListingValidators.tagArrayValidation("tag_list"), checkValidation, listingController.addListingTags);
router.put("/remove_tags", CommonValidators.idValidation("id"), ListingValidators.tagArrayValidation("tag_list"), checkValidation, listingController.removeListingTags);

router.get("/index", listingController.getAllListings);
router.get("/index_views", listingController.getAllListingViews);
router.get("/index_tags", CommonValidators.idValidation("id"), checkValidation, listingController.getListingTags);
router.get("/index_bids", CommonValidators.idValidation("id"), checkValidation, listingController.getListingBids);
router.get("/index_bids_views", CommonValidators.idValidation("id"), checkValidation, listingController.getListingBidViews);

router.get("/user_index", CommonValidators.idValidation("user_id"), checkValidation, listingController.getUserListings);
router.get("/user_owned_index", listingController.getUserOwnedListings);



export default router;