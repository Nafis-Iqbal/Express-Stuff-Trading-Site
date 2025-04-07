import { Request, Response, NextFunction } from "express";

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

export function safeToJson(data: any): any {
    if (Array.isArray(data)) {
      return data.map(d => d?.toJSON?.() ?? d);
    }
    
    if (data?.toJSON) {
      return data.toJSON();
    }

    return data;
}
  
