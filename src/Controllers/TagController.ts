import { Request, Response, NextFunction } from "express";

import { TagService } from "../Services/TagService";

class TagController{
    createTag = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tagService = new TagService();
            const { title } = req.body;

            const response = await tagService.createTag(title);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    updateTag = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tagService = new TagService();
            const { id, title } = req.body;

            const response = await tagService.updateTag({id, title});

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    deleteTag = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tagService = new TagService();
            const id = parseInt(req.query.id as string);

            const response = await tagService.deleteTag(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getAllTags = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tagService = new TagService();

            const response = await tagService.getAllTags();

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getListingsByTag = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tagService = new TagService();
            const {id} = req.body;

            const response = await tagService.getListingsByTag(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }
}

export default TagController;