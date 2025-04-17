import { Request, Response } from "express";
import { CreateUserInput, LoginInput } from "../models/User/user.schema";
import * as UserService from "../services/user.service";


// Create User Controller
export const createUserController = async(
    req : Request<{} , {}, CreateUserInput>,
    res : Response
) => {
    try{
        // Create User
        const user = await UserService.createUser(req.body);

        // Generate Token
        const token = user.generateToken();

        // Return Response
        return res.status(201).json({
            status : "success",
            data : {
                user,
                token
            }
        });
    } catch (error : any){
        // Return Error
        return res.status(400).json({
            status : "fail",
            message : error.message,
        });
    }
}

export const loginUserController = async (
    req : Request<{} , {}, LoginInput>,
    res : Response
) => {
    try{

        // Login User
        const user = await UserService.loginUser(req.body);

        // Generate Token
        const token = user.generateToken();

        // Return Response
        return res.status(200).json({
            status : "success",
            data : {
                user,
                token
            }
        });

    } catch(error : any){
        // Return Error
        return res.status(400).json({
            status : "fail",
            message : error.message,
        });
    }
}