import { TagRepository } from "../Repositories/TagRepository";

export class TagService{
    private tagRepository = new TagRepository();

    async createTag(title: string)
    {
        const tagExists = await this.tagRepository.getTagByTitle(title);

        if(tagExists){
            return {
                message: "Tag allready exists.",
                status: "failed",
                data: []
            }
        }
        else{
            const newTag = await this.tagRepository.createTag(title);

            if(newTag){
                return {
                    message: "Tag created successfully.",
                    status: "success",
                    data: newTag
                }
            }
            else{
                return {
                    message: "Failed to create tag.",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async updateTag(newTagData: {id: number, title: string})
    {
        if(newTagData.id){
            const updateStatus = await this.tagRepository.updateTag(newTagData.id, newTagData);

            if(updateStatus){
                return {
                    message: "Tag updated successfully.",
                    status: "success",
                }
            }
            else{
                return {
                    message: "Failed to update tag.",
                    status: "failed"
                }
            }
        }
        else{
            return {
                message: "Cannot update tag when id not specified.",
                status: "failed"
            }
        }
    }

    async deleteTag(id: number)
    {
        const deleteStatus = await this.tagRepository.deleteTag(id);

        if(deleteStatus){
            return {
                message: "Tag deleted successfully.",
                status: "success"
            }
        }
        else{
            return {
                message: "Failed to delete tag.",
                status: "failed"
            }
        }
    }

    async getAllTags()
    {
        const tagData = await this.tagRepository.getTags();

        if(tagData && tagData.length > 0){
            return {
                message: "Tags retrieved successfully",
                status: "success",
                data: tagData
            }
        }
        else{
            return {
                message: "No tags created on the server, or error retrieving tags",
                status: "failed",
                data: []
            }
        }
    }

    async getListingsByTag(id: number)
    {
        const listingsData = await this.tagRepository.getListingsByTagId(id);

        if(listingsData && listingsData.length > 0){
            return {
                message: "Listings by given tag retrieved successfully",
                status: "success",
                data: listingsData
            }
        }
        else{
            return {
                message: "No listings created on the server, or error retrieving listings by tags",
                status: "failed",
                data: []
            }
        }
    }
}