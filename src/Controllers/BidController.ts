import { Request, Response, NextFunction } from "express";
import { BidService } from "../Services/BidService";

class BidController{
    createBid = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const bidService = new BidService();
            const { listing_id, description, amount } = req.body;

            const response = await bidService.createBid(req.user, listing_id, description, amount);
            
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error)
        {
            next(error);
            return;
        }
    }

    updateBid = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const bidService = new BidService();
            const { id, description, amount } = req.body;

            const response = await bidService.updateBid(req.user, {id, description, amount});
            
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error)
        {
            next(error);
            return;
        }
    }

    deleteBid = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bidService = new BidService();
            const { id } = req.body;

            const response = await bidService.deleteBid(req.user, id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getBidDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bidService = new BidService();
            const { id } = req.body;

            const response = await bidService.getBidDetail(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getAllBids = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const bidService = new BidService();

            const response = await bidService.getAllBids();

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error) {
            next(error);
            return;
        }
    }

    getUserOwnedBids = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const bidService = new BidService();

            const response = await bidService.getUserOwnedBids(req.user);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;    
        }
        catch(error) {
            next(error);
            return;
        }
    }
}

export default BidController;