import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Auth; // Customize as per your JWT payload
    }
  }
}
