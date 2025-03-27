import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import Redis from "ioredis";
import User from "../Models/User";

//const redisClient = new Redis();

class UserController{
    static createUser = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { user_name, email, password } = req.body;
            
            const existingUser = await User.findOne({
                where: { email: email } 
            });
            
            if(existingUser)
            {
                res.status(400).json({ message: "Error creating user. Email already exists.", status: "Failed" });
                return;
            }
            
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                user_name,
                email,
                password_hash: hashedPassword,
            });
            
            res.status(201).json({
                message: "User created successfully.",
                status: "success",
                data: {
                    id: newUser.id,
                    user: user_name,
                    email: email,
                }
            });
            return;
        }
        catch(error)
        {
            next(error);
            return;
        }
    }

    // Login function with async handler
    static login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: {email}});

            if(!user){
                res.status(401).json({
                    status: "failed",
                    message: "Email doesn't exist."
                });
                return;
            }
            else{
                const passwordMatch = await bcrypt.compare(password, user.password_hash);

                if(passwordMatch){
                    const token = jwt.sign(
                        { id: user.id, email: user.email }, // Payload
                        process.env.JWT_SECRET_KEY as string,  // Secret key
                        { expiresIn: '1h' }                // Token expiration time
                    );

                    res.status(200).json({ 
                        status: "success", 
                        message: "Logged in successfully.", 
                        auth_token: token,
                    });
                    return;
                }
                else{
                    res.status(401).json({
                        status: "failed",
                        message: "Wrong email or password."
                    });
                    return;
                } 
            }       
        } catch (error) {
            next(error);
            return;
        }
    };    

    // Logout function
    static logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
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