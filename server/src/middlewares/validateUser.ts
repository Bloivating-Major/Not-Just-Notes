import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateUser = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Change this part to only validate req.body
        await schema.parseAsync(req.body);
        next();
    } catch (error: any) {
        // Improve error formatting
        const errorMessages = JSON.parse(error.message);
        return res.status(400).json({
            status: "fail",
            errors: errorMessages.map((err: any) => ({
                field: err.path[0],
                message: err.message
            }))
        });
    }
}