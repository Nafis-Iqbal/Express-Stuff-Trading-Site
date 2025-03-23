import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface RatingAttributes{
    id: number;
    rating: number;
    listing_id: number;
    rating_giver_id: number;
    rating_taker_id: number;
    comment: string;
    created_at: Date;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, "id"|"created_at">{};

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes{
    id!: number;
    rating!: number;
    listing_id!: number;
    rating_giver_id!: number;
    rating_taker_id!: number;
    comment!: string;
    created_at!: Date;

    static initModel(sequelize: Sequelize)
    {
        Rating.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                rating: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
                listing_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                rating_giver_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "users",
                        key: "id",
                    }
                },
                rating_taker_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "users",
                        key: "id",
                    }
                },
                comment: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                }
            },
            {
                sequelize,
                modelName: "Rating",
                tableName: "ratings",
                timestamps: true,
                underscored: true,
            }
        );
    }
}

Rating.beforeDestroy(() => {
    throw new Error("Ratings cannot be deleted.");
});

export default Rating;