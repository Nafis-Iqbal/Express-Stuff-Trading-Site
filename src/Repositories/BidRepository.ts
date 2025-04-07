import Bid from "../Models/Bid"; // ORM model
import User from "../Models/User";

import { safeToJson } from "../Utils/Utilities";

export class BidRepository {
  async findAllListings()
  {
    return await Bid.findAll();
  }

  async findById(id: number) {
    return await Bid.findByPk(id); // Sequelize query
  }

  async findBidderUserByBidId(listing_id: number)
  {
    const bid = await this.findById(listing_id);

    if(bid){
      return await bid.getUser();
    }
    else return null;
  }

  async findUserBids(user_id: number){
    const bidderUser = await User.findByPk(user_id);

    if(bidderUser){
      return await bidderUser.getBids();
    }
    else{
      return null;
    }
  }

  async findUserBidOnListing(user_id: number, listing_id: number)
  {
    return await Bid.findOne({
      where: {bidder_id: user_id, listing_id}
    })
  }

  async createBid(bidder_id: number, listing_id: number, description: string, amount: number)
  {
    return await Bid.create({ bidder_id, listing_id, description, amount });
  }

  async updateBid(id: number, newBidData: Partial<Bid>)
  {
    return await Bid.update(newBidData, {
      where: {id}
    });
  }

  async deleteBid(id: number)
  {
    const deletedRows = await Bid.destroy({
      where: {id}
    });

    if(deletedRows === 0){
      console.log("Bid not found");
      return false;
    }
    else{
      console.log("Bid deleted successfully");
      return true;
    }
  }
}