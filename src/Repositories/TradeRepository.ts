import Trade from "../Models/Trade";
import { User } from "../Models";
import { Op } from "sequelize";

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

    async findTradeByListingId(listing_id: number)
    {
        return safeToJson(await Trade.findOne({
            where: { listing_id }
        }));
    }

    async findTradeSellerUserByTradeId(trade_id: number)
    {
        const trade = await this.findById(trade_id);

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
}