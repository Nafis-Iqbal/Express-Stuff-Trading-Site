import { Request, Response, NextFunction } from "express";
import { TradeService } from "../Services/TradeService";

class TradeController{
    createTrade = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tradeService = new TradeService();
            const { listing_id, buyer_id, seller_id, amount } = req.body;

            const response = await tradeService.createTrade(req.user, listing_id, buyer_id, seller_id, amount);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    updateTrade = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tradeService = new TradeService();
            const { id, status } = req.body;

            const response = await tradeService.updateTrade(req.user, {id, status});

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    deleteTrade = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tradeService = new TradeService();
            const id = parseInt(req.query.id as string);

            const response = await tradeService.deleteTrade(req.user, id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getAllTrades = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tradeService = new TradeService();

            const response = await tradeService.getAllTrades(req.user);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getTradeDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tradeService = new TradeService();
            const {id} = req.body;

            const response = await tradeService.getTradeDetail(req.user, id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getUserTrades = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tradeService = new TradeService();
            const user_id = parseInt(req.query.user_id as string);

            const response = await tradeService.getUserTrades(user_id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getUserTradeViews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tradeService = new TradeService();
            const user_id = parseInt(req.query.user_id as string);

            const response = await tradeService.getUserTradeViews(user_id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getUserOwnedTrades = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const tradeService = new TradeService();

            const response = await tradeService.getUserOwnedTrades(req.user);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }
}

export default TradeController;