import { z } from "zod"
import { Types } from "mongoose"

// This will be used for creating content
export const contentSchema = z.object({
    title: z.string({
        required_error: "Title is required"
    }).min(1, "Title cannot be empty"),
    link: z.string({
        required_error: "Link is required"
    }).url("Invalid URL format"),
    tags: z.array(
        z.string({
            required_error: "Tag is required"
        })
    ).optional().default([]),
    type: z.enum(["article", "video", "course", "other"], {
        required_error: "Content Type is required"
    })
});

// This will be used for updating content
export const updateContentSchema = contentSchema.partial();

// Base type from Zod schema
type BaseContentInput = z.infer<typeof contentSchema>;

// Export types with proper typing for MongoDB ObjectIds
export type CreateContentInput = BaseContentInput;

// Separate interface for update that overrides the tags type
export type UpdateContentInput = Omit<Partial<BaseContentInput>, 'tags'> & {
    tags?: string[] | Types.ObjectId[];
};