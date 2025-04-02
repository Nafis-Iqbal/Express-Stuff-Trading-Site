import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface TransactionAttributes{
    id: number;
    listing_id: number;
    trade_id: number;
    buyer_id: number;
    seller_id: number;
    amount: number;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, "id">{};

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes{
    id!: number;
    listing_id!: number;
    trade_id!: number;
    buyer_id!: number;
    seller_id!: number;
    amount!: number;

    static initModel(sequelize: Sequelize)
    {
        Transaction.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                listing_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                trade_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "trades",
                        key: "id",
                    },
                },
                buyer_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                seller_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Transaction",
                tableName: "transactions",
                timestamps: true,
                hooks: {
                    beforeDestroy: async () => {
                        throw new Error("Transactions cannot be deleted.");
                    },
                    beforeUpdate: async () => {
                        throw new Error("Transactions cannot be updated.");
                    }
                }
            }
        );
    }
}

export default Transaction;