import { Model, DataTypes, Optional, Sequelize } from "sequelize";

//has many to one relation with listings
//has many to one relation with users

interface BidAttributes{
    id: number;
    listing_id: number;
    description: string;
    amount: number;
    bidder_id: number;
    created_at: Date;
}

interface BidCreationAttributes extends Optional<BidAttributes, "id">{};

class Bid extends Model<BidAttributes, BidCreationAttributes> implements BidAttributes{
    id!: number;
    listing_id!: number;
    description!: string;
    amount!: number;
    bidder_id!: number;
    created_at!: Date;

    static initModel(sequelize: Sequelize)
    {
        Bid.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
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
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                amount: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                bidder_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: "users",
                        key: "id",
                    },
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                },
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "Bid",
                tableName: "bids",
                timestamps: true,
                underscored: true,
            }
        );
    }
}



export default Bid;