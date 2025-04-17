import { NextFunction, Request, Response } from "express";
import User from "../models/User/user.model";

export interface AuthRequest extends Request{
    user? : any
}

export const authMiddleware = async (req : AuthRequest, res : Response, next : NextFunction) => {
    try {
        // Get Token from Header
        const token = req.headers.authorization?.split(" ")[1];

        // If token is not present
        if(!token){
            return res.status(401).json({
                status : "fail",
                message : "Unauthorized",
            });
        }

        // Verify Token
        const decodedToken = await User.verifyToken(token);

        // Get User from Database
        const user = await User.findById(decodedToken.id);

        // If user not found
        if(!user){
            return res.status(401).json({
                status : "fail",
                message : "User not found",
            });
        }

        // Attach User to Request
        req.user = user;
        next();
    } catch (error : any) {
        return res.status(401).json({
            status : "fail",
            message : "Invalid Token",
        });
    }
}