import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

import { UserService } from "../Services/UserService"; 

//import Redis from "ioredis";
//const redisClient = new Redis();

class UserController{
    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const userService = new UserService();
            const { user_name, email, password } = req.body;

            const response = await userService.registerUser(user_name, email, password);
            
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch(error)
        {
            next(error);
            return;
        }
    }

    // Login function with async handler
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = new UserService();
            const { email, password } = req.body;

            const response = await userService.loginUser(email, password);
            
            res.status((response.status === "success") ? 201 : 400).json(response);
            return;  
        } catch (error) {
            next(error);
            return;
        }
    }; 

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = new UserService();
            const { id, user_name, role, bio, profile_picture, rating, credits } = req.body;

            const response = await userService.updateUser({id, user_name, role, bio, profile_picture, rating, credits});

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = new UserService();
            const { id } = req.body;

            const response = await userService.deleteUser(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getUserDetail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = new UserService();
            const { id } = req.body;

            const response = await userService.getUserDetail(id);

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = new UserService();

            const response = await userService.getAllUsers();

            res.status((response.status === "success") ? 201 : 400).json(response);
            return;
        }
        catch (error) {
            next(error);
            return;
        }
    }

    // Logout function
    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userService = new UserService();
            const authHeader = req.headers.authorization;

            if(!authHeader || !authHeader.startsWith("Bearer "))
            {
                res.status(401).json({ error: "Unauthorized. No token provided." });
                return;
            }

            const token = authHeader.split(" ")[1]; // Extract the token (Bearer <token>)
            if (!token) {
                res.status(401).json({ message: "Unauthorized. Invalid token format." });
                return;
            }

            const decoded: any = jwt.decode(token);
            if (!decoded || !decoded.exp) {
                res.status(400).json({ message: "Invalid token." });
                return;
            }

            const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

            //await redisClient.setex(`blacklist_${token}`, expiresIn, "blacklisted");

            res.json({ message: "Logout successful" });
        } catch (error) {
            next(error); // Pass the error to Express error handling middleware
            return;
        }
    };
}

export default UserController;