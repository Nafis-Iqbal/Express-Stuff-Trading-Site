import { Router } from "express";
import TagController from "../Controllers/TagController";

import { CommonValidators, TagValidators } from "../Validators";
import {checkValidation} from "../Middlewares/CustomMiddlewares";

const router = Router();
const tagController = new TagController();

router.post("/create", TagValidators.tagDataValidation, checkValidation, tagController.createTag);
router.put("/update", TagValidators.tagDataValidation, checkValidation, tagController.updateTag);
router.delete("/delete", CommonValidators.idValidation("id"), checkValidation, tagController.deleteTag);
router.get("/index", tagController.getAllTags);
router.get("/index_listings", tagController.getListingsByTag);

export default router;