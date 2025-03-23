import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface ListingTagsAttributes {
  listing_id: number;
  tag_id: number;
}

class ListingTags extends Model<ListingTagsAttributes> {
    static initModel(sequelize: Sequelize){
        ListingTags.init(
            {
                listing_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: "listings", key: "id" },
                },
                tag_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: "tags", key: "id" },
                }
            },
            {
                sequelize,
                modelName: "ListingTags",
                tableName: "listing_tags",
                timestamps: false,
            }
        );
    }
}

export default ListingTags;
