import { Model, DataTypes, Optional, Sequelize } from "sequelize";

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
    created_at: Date;
    updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"|"email_verified_at"|"remember_token"|"created_at"|
"updated_at"|"bio"|"profile_picture"|"rating"|"credits"|"role">{};

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
    created_at!: Date;
    updated_at!: Date;

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
                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "User",
                tableName: "users",
                timestamps: true,
                underscored: true
            }
        );
    }
}

export default User;

