import mongoose from "mongoose"

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tag name is required"],
        trim: true,
        unique: [true, "Tag already exists"],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    }
}, {
    timestamps: true,
})

export interface TagDocument extends mongoose.Document {
    name: string;
    createdBy: mongoose.Types.ObjectId;
    _id: mongoose.Types.ObjectId;
}

const Tag = mongoose.model<TagDocument>("Tag", tagSchema);

export default Tag;