import { Request, Response, NextFunction } from "express";
import { RatingService } from "../Services/RatingService";


class RatingController{
    createRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ratingService = new RatingService();
            const { listing_id, trade_id, rating_taker_id, rating, comment } = req.body;

            const response = await ratingService.createRating(req.user, listing_id, trade_id, rating_taker_id, rating, comment);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    updateRating = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ratingService = new RatingService();
            const { id, rating, comment} = req.body;

            const response = await ratingService.updateRating(req.user, {id, rating, comment});

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getAllRatings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ratingService = new RatingService();

            const response = await ratingService.getAllRatings(req.user);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getRatingDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ratingService = new RatingService();
            const {id} = req.body; 

            const response = await ratingService.getRatingDetail(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getUserGivenRatings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ratingService = new RatingService();
            const {id} = req.body;

            const response = await ratingService.getUserGivenRatings(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getUserAcceptedRatings = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ratingService = new RatingService();
            const {id} = req.body;

            const response = await ratingService.getUserAcceptedRatings(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }
}

export default RatingController;