import Rating from "../Models/Rating";
import { User } from "../Models";
import { Op } from "sequelize";

import { safeToJson } from "../Utils/Utilities";

export class RatingRepository{
    async findAllRatings()
    {
        return safeToJson(await Rating.findAll());
    }

    async findById(id: number) 
    {
        return await Rating.findByPk(id); // Sequelize query
    }

    async findUserOwnedRatings(user_id: number)
    {
        return safeToJson(await Rating.findAll({
            where: {
                [Op.or]: [
                    { rating_giver_id: user_id },
                    { rating_taker_id: user_id }
                ]
            }
        }));
    }

    async findUserGivenRatings(user_id: number)
    {
        return safeToJson(await Rating.findAll({
            where: { rating_giver_id: user_id }
        }));
    }

    async findUserAcceptedRatings(user_id: number)
    {
        return safeToJson(await Rating.findAll({
            where: { rating_taker_id: user_id }
        }));
    }

    async findRatingByListingId(listing_id: number)
    {
        return safeToJson(await Rating.findOne({
            where: { listing_id }
        }));
    }

    async findRatingByTradeId(trade_id: number)
    {
        return safeToJson(await Rating.findOne({
            where: { trade_id }
        }));
    }

    async findRatingGiverUserByRatingId(rating_id: number)
    {
        const rating = await this.findById(rating_id);

        if(rating){
            return safeToJson(await rating.getRatingGiverUser());
        }
        else return null;
    }

    async findRatingAcceptingUserByRatingId(rating_id: number)
    {
        const rating = await this.findById(rating_id);

        if(rating){
            return safeToJson(await rating.getRatingAcceptingUser());
        }
        else return null;
    }

    async createRating(listing_id: number, trade_id: number, rating_giver_id: number, rating_taker_id: number, rating: number, comment: string)
    {
        return safeToJson(await Rating.create({ listing_id, trade_id, rating_giver_id, rating_taker_id, rating, comment }));
    }

    async updateRating(id: number, newRatingData: Partial<Rating>)
    {
        return safeToJson(await Rating.update(newRatingData, {
            where: {id}
        }));
    }
}