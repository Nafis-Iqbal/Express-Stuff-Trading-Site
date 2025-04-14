import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";

import User from "./User";
import Listing from "./Listing";
//has many to one relation with listings
//has many to one relation with users

interface BidAttributes{
    id: number;
    listing_id: number;
    description: string;
    amount: number;
    bidder_id: number;
}

interface BidCreationAttributes extends Optional<BidAttributes, "id">{};

class Bid extends Model<BidAttributes, BidCreationAttributes> implements BidAttributes{
    id!: number;
    listing_id!: number;
    description!: string;
    amount!: number;
    bidder_id!: number;

    getBidder!: BelongsToGetAssociationMixin<User>;
    getListing!: BelongsToGetAssociationMixin<Listing>; 

    static initModel(sequelize: Sequelize)
    {
        Bid.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                listing_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "listings",
                        key: "id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                bidder_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "users",
                        key: "id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
            },
            {
                sequelize,
                modelName: "Bid",
                tableName: "bids",
                timestamps: true,
            }
        );
    }
}



export default Bid;