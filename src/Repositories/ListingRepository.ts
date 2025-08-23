import { sequelize, User, Listing, Bid, Image } from "../Models";
import { ListingCreationAttributes } from "../Models/Listing";

import { safeToJson } from "../Utils/Utilities";
import { Sequelize, Op } from "sequelize";

export class ListingRepository {
  async findAllListings()
  {
    return safeToJson(await Listing.findAll());
  }

  async findAllListingViews()
  {
    const listingsWithTopBidId = safeToJson(await Listing.findAll({
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("bids.id")), "bidsCount"],
          [Sequelize.fn("MAX", Sequelize.col("bids.amount")), "highestBidPrice"],
          [
            Sequelize.literal(`(
              SELECT id FROM bids AS b 
              WHERE b.listing_id = Listing.id 
              ORDER BY b.amount DESC 
              LIMIT 1
            )`),
            "topBidId"
          ]
        ]
      },
      include: {
        model: Bid,
        as: "bids",
        attributes: [],
      },
      where: {
        status: 'available'
      },
      group: ["Listing.id"]
    }));

    const topBidIdsList = listingsWithTopBidId.map((listingView: any) => {
      return listingView['topBidId'];
    });

    const highestBidsOfListings = safeToJson(await Bid.findAll({
      attributes: [
        'id',
        'description',
        'listing_id',
        'amount',
        'bidder_id',
        [Sequelize.col('bidder.user_name'), 'bidder_name'], // Renaming user_name from bidder
        [Sequelize.col('bidder.profile_picture'), 'bidder_picture'], // Renaming profile_picture from bidder
      ],
      include: [
        {
          model: User,
          as: "bidder",
          attributes: []
        }
      ],
      where: {
        id: {
          [Op.in]: topBidIdsList
        }
      }
    }));

    const listingViews = listingsWithTopBidId.map((listingView: any) => {
      listingView['topBid'] = highestBidsOfListings.find((bid: Bid) => bid.id === listingView['topBidId']);
      return listingView;
    });

    return listingViews;
  }

  async findById(id: number) {
    return safeToJson(await Listing.findByPk(id)); // Sequelize query
  }

  async findDetailById(id: number) {
    return safeToJson(await Listing.findAll({
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("bids.id")), "bidsCount"]
        ]
      },
      include: {
        model: Bid,
        as: "bids",
        attributes: [],
      },
      where: {
        id
      },
      group: ["Listing.id"]
    })); // Sequelize query
  }

  async findByTitle(title: string) {
    return safeToJson(await Listing.findOne({
      where: {title}
    })); // Sequelize query
  }

  async findUserListingByTitle(user_id: number, title: string) {
    return safeToJson(await Listing.findOne({
      where: {user_id, title}
    })); // Sequelize query
  }

  async findListingUserByListingId(listing_id: number)
  {
    const listing = await Listing.findByPk(listing_id);

    if(listing){
      return safeToJson(await listing.getUser());
    }
    else return null;
  }

  async findListingTags(id: number) {
    const listing = await this.findById(id);

    if(listing){
      return safeToJson(await listing.getTags());
    }
    else return null;
  }

  async findListingBids(id: number) {
    const listing = await Listing.findByPk(id);

    if(listing){
      return safeToJson(await listing.getBids());
    }
    else return null;
  }

  async findListingBidViews(id: number) {
    return safeToJson(await Bid.findAll({
      attributes: {
        include: [
          'id',
          'description',
          'amount',
          'bidder_id',
          [Sequelize.col("bidder.user_name"), "bidder_name"],
          [Sequelize.col("bidder.profile_picture"), "bidder_picture"],
        ]
      },
      include: {
        model: User,
        as: "bidder",
        attributes: ['user_name', 'profile_picture']
      },
      where: {
        listing_id: id
      }
    }));
  }

  async findUserListings(user_id: number)
  {
    return safeToJson(await Listing.findAll({
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("bids.id")), "bidsCount"],
          [Sequelize.fn("MAX", Sequelize.col("bids.amount")), "highestBidPrice"]
        ]
      },
      include: {
        model: Bid,
        as: "bids",
        attributes: [],
      },
      where: {
        user_id
      },
      group: ["Listing.id"]
    }));
  }

  async createListing(listingData: ListingCreationAttributes)
  {
    return await Listing.create({ ...listingData });
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

  async deleteListingImages(listing_id: number, imageIds: number[])
  {
    try {
      // Verify that the images belong to the listing and are listing images
      const imagesToDelete = await Image.findAll({
        where: {
          id: imageIds,
          listing_id: listing_id,
          isListingImage: true
        }
      });

      const foundImageIds = imagesToDelete.map(img => img.id);
      const notFoundIds = imageIds.filter(id => !foundImageIds.includes(id));

      // Delete the found images
      const deletedRows = await Image.destroy({
        where: {
          id: foundImageIds,
          listing_id: listing_id,
          isListingImage: true
        }
      });

      return {
        success: true,
        deletedCount: deletedRows,
        notFoundIds: notFoundIds,
        message: `Deleted ${deletedRows} image(s). ${notFoundIds.length > 0 ? `Images not found: ${notFoundIds.join(', ')}` : ''}`
      };
    }
    catch(error) {
      console.error("Error deleting listing images:", error);
      return {
        success: false,
        deletedCount: 0,
        notFoundIds: imageIds,
        message: "Error occurred while deleting images."
      };
    }
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