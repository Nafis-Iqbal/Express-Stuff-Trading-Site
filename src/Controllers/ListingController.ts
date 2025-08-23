import { Request, Response, NextFunction } from "express";
import { ListingService } from "../Services/ListingService";

class ListingController{
    createListing = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();

            const response = await listingService.createListing(req.user, req.body);
            
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error)
        {
            next(error);
            return;
        }
    }

    updateListing = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();

            const response = await listingService.updateListing(req.user, req.body);
            
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error)
        {
            next(error);
            return;
        }
    }

    deleteListing = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const listingService = new ListingService();
            const id = parseInt(req.query.id as string);

            const response = await listingService.deleteListing(req.user, id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    deleteListingImages = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const listingService = new ListingService();
            const { listing_id, imageIds } = req.body;

            const response = await listingService.deleteListingImages(req.user, listing_id, imageIds);

            res.status((response.status === "success") ? 200 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getListingDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const listingService = new ListingService();
            const id = parseInt(req.query.id as string);

            const response = await listingService.getListingDetail(id);
            console.log(response.data);
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    addListingTags = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();
            const { id, tag_list } = req.body;

            const response = await listingService.addListingTags(req.user, id, tag_list);
            
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error)
        {
            next(error);
            return;
        }
    }

    removeListingTags = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();
            const { id, tag_list } = req.body;

            const response = await listingService.removeListingTags(req.user, id, tag_list);
            
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error)
        {
            next(error);
            return;
        }
    }

    getAllListings = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();

            const response = await listingService.getAllListings();

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error) {
            next(error);
            return;
        }
    }

    getAllListingViews = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();

            const response = await listingService.getAllListingViews();

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error) {
            next(error);
            return;
        }
    }

    getUserListings = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();
            const user_id = parseInt(req.query.user_id as string);

            const response = await listingService.getUserListings(user_id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;    
        }
        catch(error) {
            next(error);
            return;
        }
    }

    getUserOwnedListings = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();

            const response = await listingService.getUserOwnedListings(req.user);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;    
        }
        catch(error) {
            next(error);
            return;
        }
    }

    getListingTags = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();
            const id = parseInt(req.query.id as string);

            const response = await listingService.getListingTags(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error) {
            next(error);
            return;
        }
    }

    getListingBids = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();
            const id = parseInt(req.query.id as string);

            const response = await listingService.getListingBids(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error) {
            next(error);
            return;
        }
    }

    getListingBidViews = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const listingService = new ListingService();
            const id = parseInt(req.query.id as string);

            const response = await listingService.getListingBidViews(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error) {
            next(error);
            return;
        }
    }
}

export default ListingController;