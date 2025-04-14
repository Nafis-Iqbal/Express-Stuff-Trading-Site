import Trade from "../Models/Trade";
import { Listing, User } from "../Models";
import { Op, Sequelize } from "sequelize";

import { safeToJson } from "../Utils/Utilities";

export class TradeRepository{
    async findAllTrades()
    {
        return safeToJson(await Trade.findAll());
    }

    async findById(id: number) 
    {
        return safeToJson(await Trade.findByPk(id)); // Sequelize query
    }

    async findUserOwnedTrades(user_id: number)
    {
        return safeToJson(await Trade.findAll({
            where: {
                [Op.or]: [
                    { buyer_id: user_id },
                    { seller_id: user_id }
                ]
            }
        }));
    }

    async findUserTradeViews(user_id: number)
    {
        return safeToJson(await Trade.findAll({
            attributes: {
                include: [
                    [Sequelize.col("listing.title"), "listing_title"],
                    [Sequelize.col("buyerUser.user_name"), "buyer_name"],
                    [Sequelize.col("sellerUser.user_name"), "seller_name"]
                ]
            },
            include: [
                {
                    model: Listing,
                    as: "listing",
                    attributes: ['title']
                },
                {
                    model: User,
                    as: "buyerUser",
                    attributes: ['user_name']
                },
                {
                    model: User,
                    as: "sellerUser",
                    attributes: ['user_name']
                }
            ],
            where: {
                [Op.or]: [
                    { buyer_id: user_id },
                    { seller_id: user_id }
                ]
            }
        }));
    }

    async findTradeByListingId(listing_id: number)
    {
        return safeToJson(await Trade.findOne({
            where: { listing_id }
        }));
    }

    async findTradeSellerUserByTradeId(trade_id: number)
    {
        const trade = await Trade.findByPk(trade_id);

        if(trade){
            return safeToJson(await trade.getSellerUser());
        }
        else return null;
    }

    async createTrade(listing_id: number, buyer_id: number, seller_id: number, amount: number)
    {
        return safeToJson(await Trade.create({ listing_id, buyer_id, seller_id, amount }));
    }

    async updateTrade(id: number, newTradeData: Partial<Trade>)
    {
        return safeToJson(await Trade.update(newTradeData, {
            where: {id}
        }));
    }

    async deleteTrade(id: number)
    {
        const deletedRows = await Trade.destroy({
            where: {id}
        });

        if(deletedRows === 0){
            console.log("Trade not found");
            return false;
        }
        else{
            console.log("Trade deleted successfully");
            return true;
        }
    }
}