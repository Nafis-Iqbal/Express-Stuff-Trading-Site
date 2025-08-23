import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";

import User from "./User";
import Listing from "./Listing";

interface ImageAttributes {
    id: number;
    imageURL: string;
    isUserImage: boolean;
    isListingImage: boolean;
    user_id?: number | null;
    listing_id?: number | null;
}

interface ImageCreationAttributes extends Optional<ImageAttributes, "id" | "user_id" | "listing_id">{};

class Image extends Model<ImageAttributes, ImageCreationAttributes> implements ImageAttributes {
    id!: number;
    imageURL!: string;
    isUserImage!: boolean;
    isListingImage!: boolean;
    user_id!: number | null;
    listing_id!: number | null;

    // Association mixins
    public getUser!: BelongsToGetAssociationMixin<User>;
    public getListing!: BelongsToGetAssociationMixin<Listing>;

    static initModel(sequelize: Sequelize) {
        Image.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                imageURL: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isUserImage: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                isListingImage: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: "users",
                        key: "id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
                listing_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: "listings",
                        key: "id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
            },
            {
                sequelize,
                modelName: "Image",
                tableName: "images",
                timestamps: true,
                validate: {
                    // Custom validation to ensure either user_id or listing_id is set
                    eitherUserOrListing() {
                        if ((this.isUserImage && !this.user_id) || (this.isListingImage && !this.listing_id)) {
                            throw new Error('Image must belong to either a user or a listing based on its type');
                        }
                        if (this.isUserImage && this.isListingImage) {
                            throw new Error('Image cannot be both user image and listing image');
                        }
                        if (!this.isUserImage && !this.isListingImage) {
                            throw new Error('Image must be either a user image or a listing image');
                        }
                    }
                }
            }
        );
    }
}

export default Image;
