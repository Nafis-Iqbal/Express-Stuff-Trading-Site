import sequelize from "../Config/database";
import { Model, DataTypes, Optional } from "sequelize";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    email_verified_at: Date | null;
    password: string;
    role: string;
    remember_token: string | null;
    created_at: Date;
    updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"|"email_verified_at"|"remember_token"|"created_at"|"updated_at">{};

class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes{
    id!: number;
    name!: string;
    email!: string;
    email_verified_at!: Date | null;
    password!: string;
    role!: string;
    remember_token!: string | null;
    created_at!: Date;
    updated_at!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "user",
        },
        remember_token: {
            type: DataTypes.STRING,
            allowNull: true,
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
        tableName: "users",
        timestamps: true,
        underscored: true
    }
);

export default User;

