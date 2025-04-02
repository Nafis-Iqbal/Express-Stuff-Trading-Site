import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { BelongsToGetAssociationMixin } from "sequelize";
import { tradeStatus } from "../Types&Enums/Enums";

import User from "./User";

//one to one relation with a listing

interface TradeAttributes {
    id: number;
    listing_id: number;
    buyer_id: number;
    seller_id: number;
    status: tradeStatus;
    amount: number;
}

interface TradeCreationAttributes extends Optional<TradeAttributes, "id" | "status">{};

class Trade extends Model<TradeAttributes,TradeCreationAttributes> implements TradeAttributes{
    id!: number;
    buyer_id!: number;
    seller_id!: number;
    listing_id!: number;
    status!: tradeStatus;
    amount!: number;

    public getBuyerUser!: BelongsToGetAssociationMixin<User>;
    public getSellerUser!: BelongsToGetAssociationMixin<User>;

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
                    type: DataTypes.ENUM(...Object.values(tradeStatus)),
                    allowNull: false,
                    defaultValue: tradeStatus.pending
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Trade",
                tableName: "trades",
                timestamps: true,
            }
        );
    }
}

export default Trade;