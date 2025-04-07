import Tag from "../Models/Tag";

import { safeToJson } from "../Utils/Utilities";

export class TagRepository {
  async getTags() {
    return safeToJson(await Tag.findAll());
  }

  async getTagByTitle(title: string) {
    return safeToJson(await Tag.findOne({where: { title}}));
  }

  async getListingsByTagId(id: number) {
    const tag = await Tag.findByPk(id);

    if(tag){
      return safeToJson(await tag.getListings());
    }
    else return null;
  }

  async createTag(title: string) {
    return safeToJson(await Tag.create({ title }));
  }

  async updateTag(id: number, newTag: Partial<Tag>) {
    const [updatedRows] = await Tag.update(newTag, {
      where: {id}
    });

    if(updatedRows === 0){
      console.log("Tag not found");
      return false;
    }
    else{
      console.log("Tag updated successfully");
      return true;
    }
  }

  async deleteTag(id: number) {
    const deletedRows = await Tag.destroy({
      where: {id}
    });

    if(deletedRows === 0){
      console.log("Tag not found");
      return false;
    }
    else{
      console.log("Tag deleted successfully");
      return true;
    }
  }
}