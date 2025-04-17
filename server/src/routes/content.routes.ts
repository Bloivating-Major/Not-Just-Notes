import { Router } from "express";
import { validateSchema as validateContent } from "../middlewares/validateSchema";
import { contentSchema, updateContentSchema } from "../models/Content/content.schema";
import * as contentController from "../controllers/content.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// All routes are protected
// @ts-ignore
router.use(authMiddleware);

// Create Content
// @ts-ignore
router.post("/", validateContent(contentSchema), contentController.createContentController);

// Get User Contents
// @ts-ignore
router.get("/", contentController.getUserContentsController);


// Update Content
// @ts-ignore
router.patch("/:contentId", validateContent(updateContentSchema), contentController.updateContentController);

// Delete Content
// @ts-ignore
router.delete("/:contentId", contentController.deleteContentController);


export default router;