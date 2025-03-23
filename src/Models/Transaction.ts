import { Model, DataTypes, Optional, Sequelize } from "sequelize";

interface TransactionAttributes{
    id: number;
    listing_id: number;
    trade_id: number;
    buyer_id: number;
    seller_id: number;
    amount: number;
    created_at: Date;
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, "id"|"created_at">{};

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes{
    id!: number;
    listing_id!: number;
    trade_id!: number;
    buyer_id!: number;
    seller_id!: number;
    amount!: number;
    created_at!: Date;

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
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: "Transaction",
                tableName: "transactions",
                timestamps: true,
                underscored: true,
            }
        );
    }
}

Transaction.beforeUpdate(() => {
    throw new Error("Transactions cannot be modified.");
});

Transaction.beforeDestroy(() => {
    throw new Error("Transactions cannot be deleted.");
});

export default Transaction;