import Content from "../models/Content/content.model";
import Tag, { TagDocument } from "../models/Content/tag.model";
import { CreateContentInput, UpdateContentInput } from "../models/Content/content.schema";
import { Types } from "mongoose";

// Create Content for User
export const createContent = async(input: CreateContentInput, userId: string) => {
    // Handle tags first - create or find existing tags
    let tagIds: Types.ObjectId[] = [];
    if (input.tags && input.tags.length > 0) {
        tagIds = await Promise.all(input.tags.map(async (tagName: string): Promise<Types.ObjectId> => {
            // Find existing tag or create new one
            let tag: TagDocument | null = await Tag.findOne({ name: tagName.toLowerCase() });
            if (!tag) {
                tag = await Tag.create({
                    name: tagName.toLowerCase(),
                    createdBy: userId
                });
            }
            return tag._id;
        }));
    }

    // Create content with resolved tag IDs
    const content = await Content.create({
        title: input.title,
        link: input.link,
        type: input.type,
        tags: tagIds,
        userId
    });

    // Return populated content
    return await Content.findById(content._id)
        .populate("tags", "name")
        .populate("userId", "username email");
}

export const updateContent = async (contentId: string, userId: string, update: UpdateContentInput) => {
    // If tags are included in the update, handle them first
    let updateData = { ...update };
    
    if (update.tags) {
        const tagIds = await Promise.all(
            update.tags.map(async (tagName: string | Types.ObjectId): Promise<Types.ObjectId> => {
                if (typeof tagName === 'string') {
                    let tag: TagDocument | null = await Tag.findOne({ name: tagName.toLowerCase() });
                    if (!tag) {
                        tag = await Tag.create({
                            name: tagName.toLowerCase(),
                            createdBy: userId
                        });
                    }
                    return tag._id;
                }
                return tagName; // if it's already an ObjectId
            })
        ) as Types.ObjectId[];
        updateData = { ...updateData, tags: tagIds };
    }

    const content = await Content.findOneAndUpdate(
        { _id: contentId, userId },
        updateData,
        { new: true }
    ).populate("tags", "name");

    if (!content) {
        throw new Error("Content not found");
    }

    return content;
}

export const getUserContents = async (userId: string) => {
    return await Content.find({ userId })
        .populate("tags", "name")
        .sort("-createdAt");
};

export const deleteContent = async (contentId: string, userId: string) => {
    const content = await Content.findOneAndDelete({ _id: contentId, userId });

    if (!content) {
        throw new Error("Content not found");
    }

    return content;
}