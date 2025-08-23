import { ImageRepository } from "../Repositories/ImageRepository";
import { UserRepository } from "../Repositories/UserRepository";
import { ListingRepository } from "../Repositories/ListingRepository";

export class ImageService {
    private imageRepository = new ImageRepository();
    private userRepository = new UserRepository();
    private listingRepository = new ListingRepository();

    async createUserImage(userData: Auth | undefined, imageURL: string) {
        if (!userData) {
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            };
        }

        try {
            // Check if user exists
            const user = await this.userRepository.findById(userData.id);
            if (!user) {
                return {
                    message: "User not found.",
                    status: "failed",
                    data: []
                };
            }

            const newImage = await this.imageRepository.createUserImage(userData.id, imageURL);

            if (newImage) {
                return {
                    message: "User image created successfully.",
                    status: "success",
                    data: newImage
                };
            } else {
                return {
                    message: "Failed to create user image.",
                    status: "failed",
                    data: []
                };
            }
        } catch (error) {
            console.error("Error creating user image:", error);
            return {
                message: "Error creating user image.",
                status: "failed",
                data: []
            };
        }
    }

    async createListingImage(userData: Auth | undefined, listing_id: number, imageURL: string) {
        if (!userData) {
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            };
        }

        try {
            // Check if listing exists and belongs to user
            const listing = await this.listingRepository.findById(listing_id);
            if (!listing) {
                return {
                    message: "Listing not found.",
                    status: "failed",
                    data: []
                };
            }

            if (listing.user_id !== userData.id) {
                return {
                    message: "Cannot add image to listing. Listing not owned by user.",
                    status: "failed",
                    data: []
                };
            }

            const newImage = await this.imageRepository.createListingImage(listing_id, imageURL);

            if (newImage) {
                return {
                    message: "Listing image created successfully.",
                    status: "success",
                    data: newImage
                };
            } else {
                return {
                    message: "Failed to create listing image.",
                    status: "failed",
                    data: []
                };
            }
        } catch (error) {
            console.error("Error creating listing image:", error);
            return {
                message: "Error creating listing image.",
                status: "failed",
                data: []
            };
        }
    }

    async getUserImages(user_id: number) {
        try {
            const userImages = await this.imageRepository.findImagesByUserId(user_id);

            return {
                message: "User images retrieved successfully.",
                status: "success",
                data: userImages || []
            };
        } catch (error) {
            console.error("Error retrieving user images:", error);
            return {
                message: "Failed to retrieve user images.",
                status: "failed",
                data: []
            };
        }
    }

    async getListingImages(listing_id: number) {
        try {
            const listingImages = await this.imageRepository.findImagesByListingId(listing_id);

            return {
                message: "Listing images retrieved successfully.",
                status: "success",
                data: listingImages || []
            };
        } catch (error) {
            console.error("Error retrieving listing images:", error);
            return {
                message: "Failed to retrieve listing images.",
                status: "failed",
                data: []
            };
        }
    }

    async createMultipleListingImages(userData: Auth | undefined, listing_id: number, imageURLs: string[]) {
        if (!userData) {
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            };
        }

        try {
            // Check if listing exists and belongs to user
            const listing = await this.listingRepository.findById(listing_id);
            if (!listing) {
                return {
                    message: "Listing not found.",
                    status: "failed",
                    data: []
                };
            }

            if (listing.user_id !== userData.id) {
                return {
                    message: "Cannot add images to listing. Listing not owned by user.",
                    status: "failed",
                    data: []
                };
            }

            const newImages = await this.imageRepository.createMultipleListingImages(listing_id, imageURLs);

            if (newImages) {
                return {
                    message: `Successfully created ${newImages.length} listing image(s).`,
                    status: "success",
                    data: newImages
                };
            } else {
                return {
                    message: "Failed to create listing images.",
                    status: "failed",
                    data: []
                };
            }
        } catch (error) {
            console.error("Error creating multiple listing images:", error);
            return {
                message: "Error creating listing images.",
                status: "failed",
                data: []
            };
        }
    }

    async deleteMultipleImages(userData: Auth | undefined, imageIds: number[]) {
        if (!userData) {
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed"
            };
        }

        try {
            // Get all images to verify ownership
            const images = await Promise.all(
                imageIds.map(id => this.imageRepository.findById(id))
            );

            // Check ownership for each image
            for (const image of images) {
                if (!image) {
                    return {
                        message: "One or more images not found.",
                        status: "failed"
                    };
                }

                let isOwner = false;
                if (image.isUserImage && image.user_id === userData.id) {
                    isOwner = true;
                } else if (image.isListingImage) {
                    const listing = await this.listingRepository.findById(image.listing_id);
                    if (listing && listing.user_id === userData.id) {
                        isOwner = true;
                    }
                }

                if (!isOwner) {
                    return {
                        message: "Cannot delete images. One or more images not owned by user.",
                        status: "failed"
                    };
                }
            }

            // Delete images if all ownership checks pass
            const deleteResult = await this.imageRepository.deleteMultipleImages(imageIds);

            return {
                message: `Successfully deleted ${deleteResult.deletedCount} out of ${deleteResult.requestedCount} image(s).`,
                status: "success",
                data: deleteResult
            };
        } catch (error) {
            console.error("Error deleting multiple images:", error);
            return {
                message: "Error deleting images.",
                status: "failed"
            };
        }
    }
}
