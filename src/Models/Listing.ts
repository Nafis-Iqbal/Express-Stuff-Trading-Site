import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { listingStatus } from "../Types&Enums/Enums";

//Each listing can have multiple category tags, and bids under it.
//category tags will have many to many relation with Listing.
//Listing has one to many relation with bids.
//User has one to many relation with listings

interface ListingAttributes{
    id: number;
    user_id: number;
    title: number;
    description: string;
    exchange_items: string;
    price: number;
    status: listingStatus;
    created_at: Date;
    updated_at: Date;
}

interface ListingCreationAttributes extends Optional<ListingAttributes, "id"|"created_at"|"updated_at">{};

class Listing extends Model<ListingAttributes, ListingCreationAttributes> implements ListingAttributes{
    id!: number;
    user_id!: number;
    title!: number;
    description!: string;
    exchange_items!: string;
    price!: number;
    status!: listingStatus;
    created_at!: Date;
    updated_at!: Date;

    static initModel(sequelize: Sequelize)
    {
        Listing.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "users",
                        key: "id",
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                exchange_items: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                price: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                status: {
                    type: DataTypes.ENUM(...Object.values(listingStatus)),
                    allowNull: false,
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "Listing",
                tableName: "listings",
                timestamps: true,
                underscored: true
            }
        );
    }
}

export default Listing;