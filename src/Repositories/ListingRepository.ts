import Listing from "../Models/Listing";
import { User } from "../Models";

export class ListingRepository {
  async findAllListings()
  {
    return await Listing.findAll();
  }

  async findById(id: number) {
    return await Listing.findByPk(id); // Sequelize query
  }

  async findByTitle(title: string) {
    return await Listing.findOne({where: {title}}); // Sequelize query
  }

  async findUserListingByTitle(user_id: number, title: string) {
    return await Listing.findOne({where: {user_id, title}}); // Sequelize query
  }

  async findListingUserByListingId(listing_id: number)
  {
    const listing = await this.findById(listing_id);

    if(listing){
      return await listing.getUser();
    }
    else return null;
  }

  async findListingTags(id: number) {
    const listing = await this.findById(id);

    if(listing){
      return await listing.getTags();
    }
    else return null;
  }

  async findListingBids(id: number) {
    const listing = await this.findById(id);

    if(listing){
      return await listing.getBids();
    }
    else return null;
  }

  async findUserListings(user_id: number){
    const listingUser = await User.findByPk(user_id);

    if(listingUser){
      return await listingUser.getListings();
    }
    else{
      return null;
    }
  }

  async createListing(user_id: number, title: string, description: string, location: string, exchange_items:string, price: number)
  {
    return await Listing.create({ user_id, title, description, location, exchange_items, price });
  }

  async updateListing(id: number, newListingData: Partial<Listing>)
  {
    return await Listing.update(newListingData, {
      where: {id}
    });
  }

  async addListingTags(id: number, tag_list: number[])
  {
    const listing = await this.findById(id);

    if(listing){
      try{
        const addListingTagsResult = await listing.addTags(tag_list);
        return true;
      }
      catch(error){
        console.log("Error adding listing tags. Error: " + error);
        return false;
      }
    }
    else return false;
  }

  async removeListingTags(id: number, tag_list: number[])
  {
    const listing = await this.findById(id);

    if(listing){
      try{
        const removeListingTagsResult = await listing.removeTags(tag_list);
        return true;
      }
      catch(error){
        console.log("Error removing listing tags.");
        return false;
      }
    }
    else return false;
  }

  async deleteListing(id: number)
  {
    const deletedRows = await Listing.destroy({
      where: {id}
    });

    if(deletedRows === 0){
      console.log("Listing not found");
      return false;
    }
    else{
      console.log("Listing deleted successfully");
      return true;
    }
  }
}