import { TradeRepository } from "../Repositories/TradeRepository";
import { ListingService } from "./ListingService";
import { tradeStatus } from "../Types&Enums/Enums";

export class TradeService{
    private tradeRepository = new TradeRepository();
    private listingService = new ListingService();

    async createTrade(userData: Auth | undefined, listing_id: number, buyer_id: number, seller_id: number, amount: number)
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const listingOwnership = await this.listingService.verifyListingOwnership(listing_id, userData.id);
            const checkDuplicateTrade = await this.tradeRepository.findTradeByListingId(listing_id);

            if(listingOwnership && !checkDuplicateTrade){
                const newTrade = await this.tradeRepository.createTrade(listing_id, buyer_id, userData.id, amount);

                if(newTrade){
                    return {
                        message: "New trade initiated successfully.",
                        status: "success",
                        data: newTrade
                    }
                }
                else{
                    return {
                        message: "Trade initiation failed",
                        status: "failed",
                        data: []
                    }
                }
            }
            else{
                return {
                    message: "Listing must be owned by user to initiate trade, and parent listing can only have one trade.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async updateTrade(userData: Auth | undefined, newTradeData: {id: number, amount: number, status: tradeStatus})
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const tradeOwnership = await this.verifyTradeOwnership(newTradeData.id, userData.id);

            if(tradeOwnership){
                const updateStatus = await this.tradeRepository.updateTrade(newTradeData.id, newTradeData);

                if(updateStatus){
                    return {
                        message: "Trade updated successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to update trade.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Trade must be initiated by user to update.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async deleteTrade(userData: Auth | undefined, id: number)
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
            const listingOwnership = await this.verifyTradeOwnership(id, userData.id);

            if(listingOwnership){
                const deleteStatus = await this.tradeRepository.deleteTrade(id);

                if(deleteStatus){
                    return {
                        message: "Trade deleted successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to delete trade.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Failed to update trade. Trade not owned by user",
                    status: "failed"
                }
            }   
        }
    }

    async getTradeDetail(userData: Auth | undefined, id: number)
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const tradeDetail = await this.tradeRepository.findById(id);

            if(tradeDetail){
                return {
                    message: "Trade detail retrieved successfully.",
                    status: "success",
                    data: tradeDetail
                }
            }
            else{
                return {
                    message: "Failed to retrieve trade data.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async getAllTrades(userData: Auth | undefined)
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const allTrades = await this.tradeRepository.findAllTrades();

            if(allTrades){
                return {
                    message: "All trades retrieved successfully.",
                    status: "success",
                    data: allTrades
                }
            }
            else{
                return {
                    message: "Failed to retrieve trades data.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async getUserTrades(user_id: number)
    {
        const tradesByUser = await this.tradeRepository.findUserOwnedTrades(user_id);

        if(tradesByUser){
            return {
                message: "User trades retrieved successfully.",
                status: "success",
                data: tradesByUser
            }
        }
        else{
            return {
                message: "Failed to retrieve user trades data.",
                status: "failed",
                data: []
            }
        }
    }

    async getUserTradeViews(user_id: number)
    {
        const tradesByUser = await this.tradeRepository.findUserTradeViews(user_id);

        if(tradesByUser){
            return {
                message: "User trades retrieved successfully.",
                status: "success",
                data: tradesByUser
            }
        }
        else{
            return {
                message: "Failed to retrieve user trades data.",
                status: "failed",
                data: []
            }
        }
    }

    async getUserOwnedTrades(userData: Auth | undefined)
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const tradesByUser = await this.tradeRepository.findUserOwnedTrades(userData.id);

            if(tradesByUser){
                return {
                    message: "User trades retrieved successfully.",
                    status: "success",
                    data: tradesByUser
                }
            }
            else{
                return {
                    message: "Failed to retrieve user trades data.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async verifyTradeOwnership(trade_id: number, user_id: number)
    {
        const tradeUser = await this.tradeRepository.findTradeSellerUserByTradeId(trade_id);

        if(tradeUser && tradeUser.id === user_id){
            return true;
        }
        else return false;
    }
}