import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import { UserRepository } from "../Repositories/UserRepository";

export class UserService{
    private userRepository = new UserRepository();
    
    async registerUser(user_name: string, email: string, password: string)
    {
        const existingUser = await this.userRepository.findByEmail(email);
                    
        if(existingUser)
        {
            return {
                message: "Error creating user. Email already exists.", 
                status: "failed" 
            };
        }
                    
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.userRepository.createUser(user_name, email, hashedPassword);
        
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email }, // Payload
            process.env.JWT_SECRET_KEY as string,  // Secret key
            { expiresIn: '2h' }                // Token expiration time
        );

        return {
            message: "User created successfully.",
            status: "success",
            data: {
                id: newUser.id,
                user: user_name,
                email: email,
            },
            auth_token: token
        };
    }

    async loginUser(email: string, password: string){
        const user = await this.userRepository.findByEmail(email);
        
        if(!user){
            return {
                status: "failed",
                message: "Email doesn't exist."
            };
        }
        else{
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if(passwordMatch){
                const token = jwt.sign(
                    { id: user.id, email: user.email }, // Payload
                    process.env.JWT_SECRET_KEY as string,  // Secret key
                    { expiresIn: '2h' }                // Token expiration time
                );

                return { 
                    status: "success", 
                    message: "Logged in successfully.", 
                    auth_token: token,
                };
            }
            else{
                return {
                    status: "failed",
                    message: "Wrong email or password."
                };
            } 
        } 
    }

    async getUserDetail(id: number)
    {
        const userData = (await this.userRepository.findById(id))?.get();

        if(userData){
            return {
                message: "User detail retrieved successfully",
                status: "success",
                data: userData
            };
        }
        else{
            return {
                message: "User not found",
                status: "failed",
                data: []
            }
        }
    }

    async getOwnUserDetail(userData: Auth | undefined)
    {
        if(!userData){
            return {
                message: "Error in authenticated user data. Check authentication process.",
                status: "failed",
                data: []
            }
        }
        else{
            const ownUserData = await this.userRepository.findById(userData.id);

            if(ownUserData){
                return {
                    message: "Own user detail retrieved successfully",
                    status: "success",
                    data: ownUserData
                };
            }
            else{
                return {
                    message: "User not found",
                    status: "failed",
                    data: []
                }
            }
        }
    }

    async updateUser(newUserData: {id: number, user_name: string, role: role, bio: string, profile_picture: string, rating: number, credits: number})
    {
        if(newUserData.id){
            const updateStatus = await this.userRepository.updateUser(newUserData.id, newUserData);

            if(updateStatus){
                return {
                    message: "User updated successfully.",
                    status: "success"
                }
            }
            else{
                return {
                    message: "Failed to update user.",
                    status: "failed"
                }
            }
        }
        else{
            return {
                message: "Cannot update user when id not specified.",
                status: "failed"
            }
        }
    }

    async deleteUser(id: number)
    {
        const deleteStatus = await this.userRepository.deleteUser(id);

        if(deleteStatus){
            return {
                message: "User deleted successfully.",
                status: "success"
            }
        }
        else{
            return {
                message: "Failed to delete user.",
                status: "failed"
            }
        }
    }

    async getAllUsers()
    {
        const usersData = await this.userRepository.findAllUsers();

        if(usersData){
            return {
                message: "Users data fetched successfully.",
                status: "success",
                data: usersData
            }
        }
        else{
            return {
                message: "Failed to fetch users data.",
                status: "failed",
                data: []
            }
        }
    }
}