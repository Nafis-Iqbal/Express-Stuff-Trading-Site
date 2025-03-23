import { Model, DataTypes, Optional, Sequelize } from "sequelize";

//Tags have many to many relation with Listings

interface TagAttributes{
    id: number;
    title: string;
    created_at: Date;
}

class Tag extends Model<TagAttributes> implements TagAttributes{
    id!: number;
    title!: string;
    created_at!: Date;

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
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "Tag",
                tableName: "tags",
                timestamps: true,
                underscored: true,
            }
        );
    }
}



export default Tag;