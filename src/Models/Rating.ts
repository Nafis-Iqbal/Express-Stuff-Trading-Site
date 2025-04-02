import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";

interface RatingAttributes{
    id: number;
    rating: number;
    listing_id: number;
    trade_id: number;
    rating_giver_id: number;
    rating_taker_id: number;
    comment: string;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, "id">{};

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes{
    id!: number;
    rating!: number;
    listing_id!: number;
    trade_id!: number;
    rating_giver_id!: number;
    rating_taker_id!: number;
    comment!: string;

    public getRatingGiverUser!: BelongsToGetAssociationMixin<User>;
    public getRatingAcceptingUser!: BelongsToGetAssociationMixin<User>;

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
                trade_id: {
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
            },
            {
                sequelize,
                modelName: "Rating",
                tableName: "ratings",
                timestamps: true,
                hooks: {
                    beforeDestroy: async (rating) => {
                        throw new Error("Ratings cannot be deleted.");
                    }
                }
            }
        );
    }
}

export default Rating;