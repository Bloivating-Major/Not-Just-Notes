import { Request, Response } from "express";
import { CreateUserInput, LoginInput } from "../models/user.schema";
import * as UserService from "../services/user.service";


// Create User Controller
export const createUserController = async(
    req : Request<{} , {}, CreateUserInput>,
    res : Response
) => {
    try{
        const user = await UserService.createUser(req.body);

        const token = user.generateToken();

        return res.status(201).json({
            status : "success",
            data : {
                user,
                token
            }
        });
    } catch (error : any){
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

        const user = await UserService.loginUser(req.body);

        const token = user.generateToken();

        return res.status(200).json({
            status : "success",
            data : {
                user,
                token
            }
        });

    } catch(error : any){
        return res.status(400).json({
            status : "fail",
            message : error.message,
        });
    }
}