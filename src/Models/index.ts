import sequelize from "../Config/database";

import User from "./User";
import Listing from "./Listing";
import Bid from "./Bid";
import Trade from "./Trade";
import Tag from "./Tag";
import Rating from "./Rating";
import Transaction from "./Transaction";
import ListingTags from "./ListingTags";
import Image from "./Image";

User.initModel(sequelize);
Listing.initModel(sequelize);
Bid.initModel(sequelize);
Trade.initModel(sequelize);
Tag.initModel(sequelize);
Rating.initModel(sequelize);
Transaction.initModel(sequelize);
ListingTags.initModel(sequelize);
Image.initModel(sequelize);

//IMAGE
//User has one to one relation with Image (profile picture).
//Listing has one to many relation with Images.

//USER
//has one to many relation with listings.

//LISTING
//category tags will have many to many relation with Listing.
//Listing has one to many relation with bids.
//User has one to many relation with listings.

//TAG
//Tags have many to many relation with Listings.

//BID
//has many to one relation with listings.
//has many to one relation with users.

//TRADE
//one to one relation with a listing.
//one to one relation with a transaction.

//RATING
//has many to one relation with users.

//TRANSACTION
//one to one relation with trade.
//D
//Image relationships
User.hasOne(Image, {foreignKey: "user_id", as: "profileImage", scope: {isUserImage: true}});
Image.belongsTo(User, {foreignKey: "user_id", as: "user"});

//D
User.hasMany(Listing, {foreignKey: "user_id", as: "listings"});
Listing.belongsTo(User, {foreignKey: "user_id", as:"user"});

//D
User.hasMany(Bid, {foreignKey: "bidder_id", as: "bids"});
Bid.belongsTo(User, {foreignKey: "bidder_id", as: "bidder"});

User.hasMany(Trade, {foreignKey: "buyer_id", as: "buyTrades"});
Trade.belongsTo(User, {foreignKey: "buyer_id", as: "buyerUser"});

User.hasMany(Trade, {foreignKey: "seller_id", as: "sellTrades"});
Trade.belongsTo(User, {foreignKey: "seller_id", as: "sellerUser"});

User.hasMany(Rating, {foreignKey: "rating_giver_id", as: "givenRatings"});
Rating.belongsTo(User, {foreignKey: "rating_giver_id", as: "ratingGiverUser"});

User.hasMany(Rating, {foreignKey: "rating_taker_id", as: "acceptedRatings"});
Rating.belongsTo(User, {foreignKey: "rating_taker_id", as: "ratingAcceptingUser"});

//D
Listing.hasMany(Bid, {foreignKey: "listing_id", as: "bids"});
Bid.belongsTo(Listing, {foreignKey: "listing_id", as: "parentListing"});

//D
Listing.belongsToMany(Tag, {through: ListingTags, foreignKey: "listing_id", otherKey: "tag_id", as: "tags"});
Tag.belongsToMany(Listing, {through: ListingTags, foreignKey: "tag_id", otherKey: "listing_id", as: "listings"});

Listing.hasOne(Trade, {foreignKey: "listing_id", as: "trade"});
Trade.belongsTo(Listing, {foreignKey: "listing_id", as: "listing"});

Listing.hasMany(Image, {foreignKey: "listing_id", as: "images", scope: {isListingImage: true}});
Image.belongsTo(Listing, {foreignKey: "listing_id", as: "listing"});

Trade.hasOne(Transaction, {foreignKey: "trade_id", as: "trade"});
Transaction.belongsTo(Trade, {foreignKey: "trade_id", as: "transaction"});

export {sequelize, User, Listing, Bid, Trade, Tag, Rating, Transaction, ListingTags, Image};







