import { Image } from "../Models";
import { safeToJson } from "../Utils/Utilities";

export class ImageRepository {
    async findById(id: number) {
        return safeToJson(await Image.findByPk(id));
    }

    async findImagesByUserId(user_id: number) {
        return safeToJson(await Image.findAll({
            where: {
                user_id,
                isUserImage: true
            }
        }));
    }

    async findImagesByListingId(listing_id: number) {
        return safeToJson(await Image.findAll({
            where: {
                listing_id,
                isListingImage: true
            }
        }));
    }

    async findAllListingsImages() {
        return safeToJson(await Image.findAll({
            where: {
                isListingImage: true
            }
        }));
    }

    async findAllUserImages() {
        return safeToJson(await Image.findAll({
            where: {
                isUserImage: true
            }
        }));
    }

    async createUserImage(user_id: number, imageURL: string) {
        return safeToJson(await Image.create({
            user_id,
            imageURL,
            isUserImage: true,
            isListingImage: false
        }));
    }

    async createListingImage(listing_id: number, imageURL: string) {
        return safeToJson(await Image.create({
            listing_id,
            imageURL,
            isUserImage: false,
            isListingImage: true
        }));
    }

    async createMultipleListingImages(listing_id: number, imageURLs: string[]) {
        const images = imageURLs.map(url => ({
            listing_id,
            imageURL: url,
            isUserImage: false,
            isListingImage: true
        }));
        return safeToJson(await Image.bulkCreate(images));
    }

    async deleteMultipleImages(imageIds: number[]) {
        const deletedRows = await Image.destroy({
            where: { 
                id: imageIds 
            }
        });

        return {
            deletedCount: deletedRows,
            requestedCount: imageIds.length
        };
    }

    async deleteUserImages(user_id: number) {
        const deletedRows = await Image.destroy({
            where: {
                user_id,
                isUserImage: true
            }
        });

        return deletedRows;
    }

    async deleteListingImages(listing_id: number) {
        const deletedRows = await Image.destroy({
            where: {
                listing_id,
                isListingImage: true
            }
        });

        return deletedRows;
    }
}
