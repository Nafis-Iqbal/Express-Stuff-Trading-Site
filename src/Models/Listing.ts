import { Model, DataTypes, Optional, Sequelize, BelongsToGetAssociationMixin } from "sequelize";
import { BelongsToManyGetAssociationsMixin, BelongsToManyAddAssociationsMixin, BelongsToManyRemoveAssociationsMixin } from "sequelize";
import { HasManyGetAssociationsMixin } from "sequelize";
import { listingStatus } from "../Types&Enums/Enums";

import Tag from "./Tag";
import User from "./User";
import Bid from "./Bid";

//Each listing can have multiple category tags, and bids under it.
//category tags will have many to many relation with Listing.
//Listing has one to many relation with bids.
//User has one to many relation with listings

interface ListingAttributes{
    id: number;
    user_id: number;
    title: string;
    description: string;
    location: string;
    exchange_items: string;
    price: number;
    status: listingStatus;
}

interface ListingCreationAttributes extends Optional<ListingAttributes, "id"|"status">{};

class Listing extends Model<ListingAttributes, ListingCreationAttributes> implements ListingAttributes{
    id!: number;
    user_id!: number;
    title!: string;
    description!: string;
    location!: string;
    exchange_items!: string;
    price!: number;
    status!: listingStatus;

    public getUser!: BelongsToGetAssociationMixin<User>;

    public getTags!: BelongsToManyGetAssociationsMixin<Tag>;
    public addTags!: BelongsToManyAddAssociationsMixin<Tag, number>;
    public removeTags!: BelongsToManyRemoveAssociationsMixin<Tag, number>;

    public getBids!: HasManyGetAssociationsMixin<Bid>;

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
                location: {
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
                    defaultValue: listingStatus.available
                },
            },
            {
                sequelize,
                modelName: "Listing",
                tableName: "listings",
                timestamps: true,
            }
        );
    }
}

export default Listing;