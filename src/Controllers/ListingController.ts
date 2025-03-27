import { Request, Response, NextFunction } from "express";

class ListingController{
    static getAllListings = async (req: Request, res: Response, next: NextFunction) => {
        res.json({message: "Try later...We are testing."});
    }
}

export default ListingController;