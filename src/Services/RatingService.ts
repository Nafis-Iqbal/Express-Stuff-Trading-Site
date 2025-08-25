import { UserRepository, RatingRepository } from "../Repositories";
import { TradeService } from "./TradeService";

export class RatingService{
    private ratingRepository = new RatingRepository();
    private userRepository = new UserRepository();

    private tradeService = new TradeService();

    async createRating(userData: Auth | undefined, listing_id: number, trade_id: number, rating_taker_id: number, rating: number, comment: string)
    {
        if(!userData)
        {
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const tradeOwnership = await this.tradeService.verifyTradeOwnership(listing_id, userData.id);
            const existingRatingForTrade = await this.ratingRepository.findRatingByTradeId(trade_id);

            if(tradeOwnership){
                return {
                    message: "Seller cannot rate a trade.",
                    status: "failed",
                    data: []
                }
            }
            else if(existingRatingForTrade){
                return {
                    message: "Seller already rated for given trade. Try updating the rating from the trade detail page",
                    status: "failed",
                    data: []
                }
            }
            else{
                const newRating = await this.ratingRepository.createRating(listing_id, trade_id, userData.id, rating_taker_id, rating, comment);

                const sellerRatings = await this.ratingRepository.findUserAcceptedRatings(rating_taker_id);
                const averageRating = sellerRatings.reduce((acc: number, rating: Rating) => acc + rating.rating, 0) / sellerRatings.length;

                await this.userRepository.updateUser(rating_taker_id, { rating: averageRating });

                if(newRating){
                    return {
                        message: "New rating created successfully.",
                        status: "success",
                        data: newRating
                    }
                }
                else{
                    return {
                        message: "Rating creation failed",
                        status: "failed",
                        data: []
                    }
                }
            }
        }
    }

    async updateRating(userData: Auth | undefined, newRatingData: {id: number, rating: number, comment: string})
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const ratingOwnership = await this.verifyRatingOwnership(newRatingData.id, userData.id);

            if(ratingOwnership){
                const updateStatus = await this.ratingRepository.updateRating(newRatingData.id, newRatingData);

                if(updateStatus){
                    return {
                        message: "Rating updated successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to update rating.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Rating must be given by user to update.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async getAllRatings(userData: Auth | undefined)
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const allRatings = await this.ratingRepository.findAllRatings();

            if(allRatings){
                return {
                    message: "All ratings retrieved successfully.",
                    status: "success",
                    data: allRatings
                }
            }
            else{
                return {
                    message: "Failed to retrieve ratings data.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async getRatingDetail(id: number)
    {
        const ratingDetail = await this.ratingRepository.findById(id);

        if(ratingDetail){
            return {
                message: "Rating detail retrieved successfully.",
                status: "success",
                data: ratingDetail
            }
        }
        else{
            return {
                message: "Failed to retrieve rating data.",
                status: "failed",
                data: []
            }
        }
    }

    async getUserGivenRatings(user_id: number)
    {
        const userGivenRatingsData = await this.ratingRepository.findUserGivenRatings(user_id);

        if(userGivenRatingsData){
            return {
                message: "User given ratings retrieved successfully.",
                status: "failed",
                data: []
            }
        }
        else{
            return {
                message: "Failed to retrieve ratings given by user.",
                status: "failed",
                data: []
            }
        }
    }

    async getUserAcceptedRatings(user_id: number)
    {
        const userAcceptedRatingsData = await this.ratingRepository.findUserGivenRatings(user_id);

        if(userAcceptedRatingsData){
            return {
                message: "User acccepted ratings retrieved successfully.",
                status: "failed",
                data: []
            }
        }
        else{
            return {
                message: "Failed to retrieve ratings accepted by user.",
                status: "failed",
                data: []
            }
        }
    }

    async verifyRatingOwnership(rating_id: number, user_id: number)
    {
        const ratingGiverUser = await this.ratingRepository.findRatingGiverUserByRatingId(rating_id);

        if(ratingGiverUser && ratingGiverUser.id === user_id){
            return true;
        }
        else return false;
    }
}