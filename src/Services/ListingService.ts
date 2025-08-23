import { ListingRepository } from "../Repositories/ListingRepository";
import { ListingCreationAttributes, ListingAttributes } from "../Models/Listing";
import { listingStatus } from "../Types&Enums/Enums";
import { ImageService } from "./ImageService";
import { ImageRepository } from "../Repositories";

export class ListingService{
    private listingRepository = new ListingRepository();
    private imageService = new ImageService();
    private imageRepository = new ImageRepository();

    async createListing(userData: Auth | undefined, listingData: ListingCreationAttributes)
    {
        const {title, imageURLs} = listingData;

        if(!userData)
        {
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const listingWithTitleExists = await this.listingRepository.findUserListingByTitle(userData.id, title ?? "");

            if(listingWithTitleExists){
                return {
                    message: "Listing with title already exists.",
                    status: "failed",
                    data: []
                }
            }

            const newListing = await this.listingRepository.createListing(listingData);

            if(newListing){
                // Create images if imageURLs are provided
                let imageResult;
                if(imageURLs && imageURLs.length > 0) {
                    imageResult = await this.imageService.createMultipleListingImages(userData, newListing.id, imageURLs);
                    if(imageResult.status === "failed") {
                        console.warn("Listing created but images failed:", imageResult.message);
                    }
                }

                return {
                    message: "New listing created successfully.",
                    status: "success",
                    data: {
                        listing: newListing,
                        images: imageResult?.data || []
                    }
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

    async updateListing(userData: Auth | undefined, newListingData: Partial<Listing> & {id: number, imageURLs?: string[]})
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
                // Extract imageURLs before updating listing (since it's not a DB field)
                const { imageURLs, ...listingUpdateData } = newListingData;
                
                const updateStatus = await this.listingRepository.updateListing(newListingData.id, listingUpdateData);

                if(updateStatus){
                    // Create images if imageURLs are provided
                    let imageResult;
                    if(imageURLs && imageURLs.length > 0) {
                        imageResult = await this.imageService.createMultipleListingImages(userData, newListingData.id, imageURLs);
                        if(imageResult.status === "failed") {
                            console.warn("Listing updated but images failed:", imageResult.message);
                        }
                    }

                    return {
                        message: "Listing updated successfully.",
                        status: "success",
                        data: {
                            listing: "Updated",
                            images: imageResult?.data || []
                        }
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

    async deleteListingImages(userData: Auth | undefined, listing_id: number, imageIds: number[])
    {
        if(!userData)
        {
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed"
            }
        }

        try {
            // Verify listing ownership
            const listingOwnership = await this.verifyListingOwnership(listing_id, userData.id);

            if(!listingOwnership){
                return {
                    message: "Cannot delete images. Listing not owned by user.",
                    status: "failed"
                }
            }

            // Delete images using repository
            const deleteResult = await this.listingRepository.deleteListingImages(listing_id, imageIds);

            if(deleteResult.success){
                return {
                    message: `Successfully deleted ${deleteResult.deletedCount} image(s).`,
                    status: "success",
                    data: {
                        deletedCount: deleteResult.deletedCount,
                        notFoundIds: deleteResult.notFoundIds
                    }
                }
            }
            else{
                return {
                    message: deleteResult.message || "Failed to delete images.",
                    status: "failed"
                }
            }
        }
        catch(error){
            console.error("Error deleting images:", error);
            return {
                message: "Error occurred while deleting images.",
                status: "failed"
            }
        }
    }

    async getListingDetail(id: number)
    {
        let listingDetail: Listing = await this.listingRepository.findDetailById(id);
        const listingImages = await this.imageRepository.findImagesByListingId(id);

        if(listingDetail){
            const finalListingDetail = {
                ...listingDetail,  // Spread the listing data
                images: listingImages
            };

            return {
                message: "Listing detail retrieved successfully.",
                status: "success",
                data: finalListingDetail
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
        const listingViews = await this.listingRepository.findAllListingViews();
        const listingImages = await this.imageRepository.findAllListingsImages();

        if(listingViews){
            const finalListingViewList = listingViews.map((view: any) => {
                const viewImages = listingImages.filter((image: any) => image.listing_id === view.id);
                
                return {
                    ...view,
                    images: viewImages
                };
            });
            
            return {
                message: "All listing views retrieved successfully.",
                status: "success",
                data: finalListingViewList
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

    async getListingBidViews(id: number)
    {
        const listingBidViews = await this.listingRepository.findListingBidViews(id);

        if(listingBidViews)
        {
            return {
                message: "Listing bid views retrieved successfully.",
                status: "success",
                data: listingBidViews
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