import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import { HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasOneGetAssociationMixin} from "sequelize";

import Listing from "./Listing";
import Bid from "./Bid";
import Trade from "./Trade";
import Image from "./Image";

interface UserAttributes {
    id: number;
    user_name: string;
    email: string;
    email_verified_at: Date | null;
    password_hash: string;
    remember_token: string | null;
    bio: string;
    profile_picture: string;
    rating: number;
    credits: number;
    role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"|"email_verified_at"|"remember_token"|"bio"|"profile_picture"|"rating"|"credits"|"role">{};

class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes{
    id!: number;
    user_name!: string;
    email!: string;
    email_verified_at!: Date | null;
    password_hash!: string;
    remember_token!: string | null;
    bio!: string;
    profile_picture!: string;
    rating!: number;
    credits!: number;
    role!: string;

    public getListings!: HasManyGetAssociationsMixin<Listing>;
    public getBids!: HasManyGetAssociationsMixin<Bid>;
    public getTrades!: HasManyGetAssociationsMixin<Trade>;
    public getProfileImage!: HasOneGetAssociationMixin<Image>;

    static initModel(sequelize: Sequelize)
    {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user_name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                email_verified_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                },
                password_hash: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                remember_token: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                bio: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                profile_picture: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                rating: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                    defaultValue: 0.0,
                },
                credits: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 100.0,
                },
                role: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue: "user",
                },
            },
            {
                sequelize,
                modelName: "User",
                tableName: "users",
                timestamps: true,
            }
        );
    }
}

export default User;

