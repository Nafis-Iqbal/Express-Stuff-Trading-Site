import { BidRepository } from "../Repositories/BidRepository";
import { ListingRepository } from "../Repositories/ListingRepository";
import { ListingService } from "./ListingService";

export class BidService{
    private bidRepository = new BidRepository();
    private listingRepository = new ListingRepository();
    
    async createBid(userData: Auth | undefined, listing_id: number, description: string, amount: number)
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
            const listingService = new ListingService();
            const listingOwnership = await listingService.verifyListingOwnership(listing_id, userData.id);

            if(listingOwnership){
                return {
                    message: "Listing owned by user. Cannot bid on own listing.",
                    status: "failed",
                    data: []
                }
            }
            else{
                const userBidExistsOnListing = await this.bidRepository.findUserBidOnListing(userData.id, listing_id);

                if(userBidExistsOnListing){
                    return {
                        message: "Bid creation failed. User already mae a bid on the listing",
                        status: "failed",
                        data: []
                    }
                }
                else{
                    const newBid = await this.bidRepository.createBid(userData.id, listing_id, description, amount);

                    if(newBid){
                        return {
                            message: "New Bid created successfully.",
                            status: "success",
                            data: newBid
                        }
                    }
                    else{
                        return {
                            message: "Bid creation failed",
                            status: "failed",
                            data: []
                        }
                    }
                }
            }
        }
    }

    async updateBid(userData: Auth | undefined, newBidData: {id: number, description: string, amount: number})
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
            const bidOwnership = await this.verifyBidOwnership(newBidData.id, userData.id);

            if(bidOwnership){
                const updateStatus = await this.bidRepository.updateBid(newBidData.id, newBidData);

                if(updateStatus){
                    return {
                        message: "Bid updated successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to update Bid.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Failed to update bid. Bid not owned by user",
                    status: "failed"
                }
            }
            
        } 
    }

    async deleteBid(userData: Auth | undefined, id: number)
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
            const bidOwnership = await this.verifyBidOwnership(id, userData.id);

            if(bidOwnership){
                const deleteStatus = await this.bidRepository.deleteBid(id);

                if(deleteStatus){
                    return {
                        message: "Bid deleted successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to delete bid.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Failed to update bid. Bid not owned by user",
                    status: "failed"
                }
            }   
        }
    }

    async getBidDetail(id: number)
    {
        const bidDetail = await this.bidRepository.findById(id);

        if(bidDetail){
            return {
                message: "Bid detail retrieved successfully.",
                status: "success",
                data: bidDetail
            }
        }
        else{
            return {
                message: "Failed to retrieve bid data.",
                status: "failed",
                data: []
            }
        }
    }

    async getAllBids()
    {
        const allBids = await this.bidRepository.findAllListings();

        if(allBids){
            return {
                message: "All bids retrieved successfully.",
                status: "success",
                data: allBids
            }
        }
        else{
            return {
                message: "Failed to retrieve bids data.",
                status: "failed",
                data: []
            }
        }
    }

    async getUserOwnedBids(userData: Auth | undefined)
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
            const userBids = await this.bidRepository.findUserBids(userData.id);
    
            if(userBids){
                return {
                    message: "User bids retrieved successfully.",
                    status: "success",
                    data: userBids
                }
            }
            else{
                return {
                    message: "Failed to retrieve user bids data.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async getUserOwnedBidViews(userData: Auth | undefined)
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
            const userBids = await this.bidRepository.findUserBidViews(userData.id);
            console.log(userBids);
            if(userBids){
                return {
                    message: "User bids retrieved successfully.",
                    status: "success",
                    data: userBids
                }
            }
            else{
                return {
                    message: "Failed to retrieve user bids data.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async verifyBidOwnership(bid_id: number, user_id: number)
    {
        const bidderUser = await this.bidRepository.findBidderUserByBidId(bid_id);

        if(bidderUser && bidderUser.id === user_id){
            return true;
        }
        else return false;
    }
}