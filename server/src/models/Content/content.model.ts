import mongoose from "mongoose"

// Mongoose Schema for Database
const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    link: {
        type: String,
        required: [true, "Link is required"],
        trim: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    }],
    type: {
        type: String,
        required: [true, "Content Type is required"],
        enum: ["article", "video", "course", "other"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    }
},
    {
        timestamps: true,
    }
);

export interface ContentDocument extends mongoose.Document {
    title: string,
    link: string,
    tags: mongoose.Schema.Types.ObjectId[],
    type: string,
    userId: mongoose.Schema.Types.ObjectId,
}

// Creating Content Model
const Content = mongoose.model<ContentDocument>("Content", contentSchema);

export default Content;