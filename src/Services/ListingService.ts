import { ListingRepository } from "../Repositories/ListingRepository";

export class ListingService{
    private listingRepository = new ListingRepository();
    
    async createListing(userData: Auth | undefined, title: string, description: string, location: string, exchange_items: string, price: number)
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
            const listingWithTitleExists = await this.listingRepository.findUserListingByTitle(userData.id, title);

            if(listingWithTitleExists){
                return {
                    message: "Listing with title already exists.",
                    status: "failed",
                    data: []
                }
            }

            const newListing = await this.listingRepository.createListing(userData.id, title, description, location, exchange_items, price);

            if(newListing){
                return {
                    message: "New listing created successfully.",
                    status: "success",
                    data: newListing
                }
            }
            else{
                return {
                    message: "List creation failed",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async updateListing(userData: Auth | undefined, newListingData: {id: number, title: string, description: string, location: string, exchange_items: string, price: number, status: listingStatus})
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
            const listingOwnership = await this.verifyListingOwnership(newListingData.id, userData.id);

            if(listingOwnership){
                const updateStatus = await this.listingRepository.updateListing(newListingData.id, newListingData);

                if(updateStatus){
                    return {
                        message: "Listing updated successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to update listing.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Failed to update listing. Listing not owned by user",
                    status: "failed"
                }
            }
        } 
    }

    async deleteListing(userData: Auth | undefined, id: number)
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
            const listingOwnership = await this.verifyListingOwnership(id, userData.id);

            if(listingOwnership){
                const deleteStatus = await this.listingRepository.deleteListing(id);

                if(deleteStatus){
                    return {
                        message: "Listing deleted successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to delete listing.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Failed to update listing. Listing not owned by user",
                    status: "failed"
                }
            }   
        }
    }

    async getListingDetail(id: number)
    {
        const listingDetail = await this.listingRepository.findById(id);

        if(listingDetail){
            return {
                message: "Listing detail retrieved successfully.",
                status: "success",
                data: listingDetail
            }
        }
        else{
            return {
                message: "Failed to retrieve listing data.",
                status: "failed",
                data: []
            }
        }
    }

    async getAllListings()
    {
        const allListings = await this.listingRepository.findAllListings();

        if(allListings){
            return {
                message: "All listings retrieved successfully.",
                status: "success",
                data: allListings
            }
        }
        else{
            return {
                message: "Failed to retrieve listings data.",
                status: "failed",
                data: []
            }
        }
    }

    async getAllListingViews()
    {
        const allListingViews = await this.listingRepository.findAllListings();

        if(allListingViews){
            return {
                message: "All listing views retrieved successfully.",
                status: "success",
                data: allListingViews
            }
        }
        else{
            return {
                message: "Failed to retrieve listing views data.",
                status: "failed",
                data: []
            }
        }
    }

    async getUserListings(user_id: number)
    {
        const userListings = await this.listingRepository.findUserListings(user_id);
    
        if(userListings){
            return {
                message: "User listings retrieved successfully.",
                status: "success",
                data: userListings
            }
        }
        else{
            return {
                message: "Failed to retrieve user listings data.",
                status: "failed",
                data: []
            }
        }
    }

    async getUserOwnedListings(userData: Auth | undefined)
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
            const userListings = await this.listingRepository.findUserListings(userData.id);
    
            if(userListings){
                return {
                    message: "User listings retrieved successfully.",
                    status: "success",
                    data: userListings
                }
            }
            else{
                return {
                    message: "Failed to retrieve user listings data.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async addListingTags(userData: Auth|undefined, id: number, tag_list: number[])
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const listingOwnership = await this.verifyListingOwnership(id, userData.id);

            if(listingOwnership)
            {
                const updateStatus = await this.listingRepository.addListingTags(id, tag_list);

                if(updateStatus){
                    return {
                        message: "Listing tag data updated successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to update listing tags.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Failed to update listing. Listing not owned by user",
                    status: "failed"
                }
            }
        }
    }

    async removeListingTags(userData: Auth | undefined, id: number, tag_list: number[])
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const listingOwnership = await this.verifyListingOwnership(id, userData.id);

            if(listingOwnership){
                const updateStatus = await this.listingRepository.removeListingTags(id, tag_list);

                if(updateStatus){
                    return {
                        message: "Listing updated successfully.",
                        status: "success"
                    }
                }
                else{
                    return {
                        message: "Failed to update listing.",
                        status: "failed"
                    }
                }
            }
            else{
                return {
                    message: "Failed to update listing. Listing not owned by user",
                    status: "failed"
                }
            }
        } 
    }

    async getListingTags(id: number)
    {
        const listingTags = await this.listingRepository.findListingTags(id);

        if(listingTags)
        {
            return {
                message: "Listing tags retrieved successfully.",
                status: "success",
                data: listingTags
            }
        }
        else{
            return {
                message: "Listing has no tags added, or listing doesn't exist.",
                status: "failed",
                data: []
            }
        }
    }

    async getListingBids(id: number)
    {
        const listingBids = await this.listingRepository.findListingBids(id);

        if(listingBids)
        {
            return {
                message: "Listing bids retrieved successfully.",
                status: "success",
                data: listingBids
            }
        }
        else{
            return {
                message: "Listing has no bids added, or listing doesn't exist.",
                status: "failed",
                data: []
            }
        }
    }

    async verifyListingOwnership(listing_id: number, user_id: number)
    {
        const listingUser = await this.listingRepository.findListingUserByListingId(listing_id);

        if(listingUser && listingUser.id === user_id){
            return true;
        }
        else return false;
    }
}