import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { BelongsToManyGetAssociationsMixin } from "sequelize";

import Listing from "./Listing";

//Tags have many to many relation with Listings

interface TagAttributes{
    id: number;
    title: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, "id">{};

class Tag extends Model<TagAttributes, TagCreationAttributes> implements TagAttributes{
    id!: number;
    title!: string;

    public getListings!: BelongsToManyGetAssociationsMixin<Listing>;

    static initModel(sequelize: Sequelize)
    {
        Tag.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Tag",
                tableName: "tags",
                timestamps: true,
            }
        );
    }
}



export default Tag;