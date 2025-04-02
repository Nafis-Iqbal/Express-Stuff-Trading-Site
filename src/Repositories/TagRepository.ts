import Tag from "../Models/Tag"; // ORM model

export class TagRepository {
  async getTags() {
    return await Tag.findAll();
  }

  async getTagByTitle(title: string) {
    return await Tag.findOne({where: { title}});
  }

  async getListingsByTagId(id: number) {
    const tag = await Tag.findByPk(id);

    if(tag){
      return await tag.getListings();
    }
    else return null;
  }

  async createTag(title: string) {
    return await Tag.create({ title });
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