import { DataTypes, Sequelize } from "sequelize";
import { config } from "dotenv";
import sequelize from "../Config/database";

import User from "./User";
import Listing from "./Listing";
import Bid from "./Bid";
import Trade from "./Trade";
import Tag from "./Tag";
import Rating from "./Rating";
import Transaction from "./Transaction";

User.initModel(sequelize);
Listing.initModel(sequelize);
Bid.initModel(sequelize);
Trade.initModel(sequelize);
Tag.initModel(sequelize);
Rating.initModel(sequelize);
Transaction.initModel(sequelize);

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

//TRANSACTION
//one to one relation with trade.

User.hasMany(Listing, {foreignKey: "user_id", as: "listings"});
Listing.belongsTo(User, {foreignKey: "user_id", as:"owner"});

User.hasMany(Bid, {foreignKey: "user_id", as: "bids"});
Bid.belongsTo(User, {foreignKey: "user_id", as: "owner"});

User.hasMany(Rating, {foreignKey: "rating_giver_id", as: "givenRatings"});
Rating.belongsTo(User, {foreignKey: "rating_giver_id", as: "ratingGiverUser"});

User.hasMany(Rating, {foreignKey: "rating_taker_id", as: "acceptedRatings"});
Rating.belongsTo(User, {foreignKey: "rating_taker_id", as: "ratingAcceptingUser"});

Listing.hasMany(Bid, {foreignKey: "listing_id", as: "bids"});
Bid.belongsTo(Listing, {foreignKey: "listing_id", as: "parentListing"});

Listing.belongsToMany(Tag, {through: "ListingTags", foreignKey: "listing_id", otherKey: "tag_id", as: "tags"});
Tag.belongsToMany(Listing, {through: "ListingTags", foreignKey: "tag_id", otherKey: "listing_id", as: "listings"});

Listing.hasOne(Trade, {foreignKey: "listing_id", as: "trade"});
Trade.belongsTo(Listing, {foreignKey: "listing_id", as: "listing"});

Trade.hasOne(Transaction, {foreignKey: "trade_id", as: "trade"});
Transaction.belongsTo(Trade, {foreignKey: "trade_id", as: "transaction"});







