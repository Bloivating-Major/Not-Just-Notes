import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { CreateContentInput, UpdateContentInput } from "../models/Content/content.schema";
import * as ContentService from "../services/content.service";

// Create Content Controller
export const createContentController = async (
    req : AuthRequest,
    res : Response
) => {
    try {
        const userId = req.user._id;
        const content = await ContentService.createContent(req.body, userId);
        return res.status(201).json({
            status : "success",
            data : content,
        });
    } catch (error: any) {
        return res.status(400).json({
            status : "fail",
            message : error.message,
        });
    }
}

// Get User Contents Controller
export const getUserContentsController = async (
    req : AuthRequest,
    res : Response
) => {
    try {
        const userId = req.user._id;
        const contents = await ContentService.getUserContents(userId);
        return res.status(200).json({
            status : "success",
            data : contents,
        });
    } catch (error: any) {
        return res.status(400).json({
            status : "fail",
            message : error.message,
        });
    }
}

// Update Content Controller
export const updateContentController = async (
    req : AuthRequest,
    res : Response
) => {
    try {
        const userId = req.user._id;
        const contentId = req.params.contentId;
        const update = req.body;
        const content = await ContentService.updateContent(contentId, userId, update);
        return res.status(200).json({
            status : "success",
            data : content,
        });
    } catch (error: any) {
        return res.status(400).json({
            status : "fail",
            message : error.message,
        });
    }
}

// Delete Content Controller
export const deleteContentController = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const userId = req.user._id;
        const contentId = req.params.contentId;
        const content = await ContentService.deleteContent(contentId, userId);
        return res.status(200).json({
            status: "success",
            data: content,
        });
    } catch (error: any) {
        return res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

