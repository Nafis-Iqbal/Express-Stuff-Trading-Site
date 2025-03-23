import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { listingStatus } from "../Types&Enums/Enums";

//one to one relation with a listing

interface TradeAttributes {
    id: number;
    listing_id: number;
    buyer_id: number;
    seller_id: number;
    status: listingStatus;
    amount: number;
    created_at: Date
}

interface TradeCreationAttributes extends Optional<TradeAttributes, "id"|"created_at">{};

class Trade extends Model<TradeAttributes,TradeCreationAttributes> implements TradeAttributes{
    id!: number;
    buyer_id!: number;
    seller_id!: number;
    listing_id!: number;
    status!: listingStatus;
    amount!: number;
    created_at!: Date;

    static initModel(sequelize: Sequelize)
    {
        Trade.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                buyer_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                seller_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
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
                status: {
                    type: DataTypes.ENUM(...Object.values(listingStatus)),
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.INTEGER,
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
                modelName: "Trade",
                tableName: "trades",
                timestamps: true,
                underscored: true
            }
        );
    }
}

export default Trade;