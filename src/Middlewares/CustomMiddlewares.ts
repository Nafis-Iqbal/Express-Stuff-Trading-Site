import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "sequelize";
import  jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import Redis from "ioredis";
//const redisClient = new Redis();

// Middleware to check for validation errors
export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),  // Return errors in a structured format
        });
        return;
    }

    next();  // Proceed if no validation errors
};

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        res.status(401).json({ error: "Unauthorized." });
        return;
    }

    const token = authHeader?.split(" ")[1];
    const secretKey = process.env.JWT_SECRET_KEY ?? "";

    try{
        const decoded = jwt.verify(token ?? "", secretKey);
        if (decoded && typeof decoded !== "string") {
            const userData = decoded as { id: number; email: string };
            req.user = userData;
        }
        
        next();
    }
    catch(error)
    {
        res.status(403).json({ 
            status: "Failed.",
            error: "Forbidden. Invalid token." 
        });
        return;
    }
}

// Global error handler middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled Error:", err); // Log the full error for debugging

    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";
    let errorDetails = process.env.NODE_ENV === "development" ? err.stack : undefined;

    // Handle Sequelize validation errors
    if (err instanceof ValidationError) {
        statusCode = 400;
        message = "Validation failed";
        errorDetails = err.errors.map(e => e.message); // Extract individual validation messages
    }

    // Handle unique constraint violations (like duplicate email)
    if (err.name === "SequelizeUniqueConstraintError") {
        statusCode = 400;
        message = "Duplicate entry: " + (err.errors?.[0]?.message || "Unique constraint violation.");
    }

    // Handle JWT authentication errors
    if (err instanceof JsonWebTokenError) {
        statusCode = 401;
        message = "Invalid authentication token.";
    }
    
    if (err instanceof TokenExpiredError) {
        statusCode = 401;
        message = "Session expired. Please log in again.";
    }

    // Handle missing routes
    if (err.message && err.message.includes("Cannot GET") || err.message.includes("Cannot POST")) {
        statusCode = 404;
        message = "Requested resource not found.";
    }

    // Handle bad JSON payload errors
    if (err.type === "entity.parse.failed") {
        statusCode = 400;
        message = "Invalid JSON payload.";
    }

    res.status(statusCode).json({
        status: "Failed",
        message,
        error: errorDetails,
    });
};

// export const authenticateTokenWithRedis = async (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith("Bearer "))
//     {
//         res.status(401).json({ error: "Unauthorized." });
//         return;
//     }

//     const token = authHeader?.split(" ")[1];
//     const secretKey = process.env.JWT_SECRET_KEY ?? "";

//     const isBlacklisted = await redisClient.get(`blacklist_${token}`);
//     if (isBlacklisted) {
//         res.status(401).json({
//             status: "Failed",
//             message: "Token is invalid. Please log in again." 
//         });
//         return;
//     }

//     try{
//         const decoded = jwt.verify(token ?? "", secretKey);
//         next();
//     }
//     catch(error)
//     {
//         res.status(403).json({ 
//             status: "Failed.",
//             error: "Forbidden. Invalid token." 
//         });
//         return;
//     }
// }
