import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema(
    {
        body: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        parentId: {
            type: String,
            required: false,
            default: null
        },
        postId:{
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);


export default mongoose.models.Comments || mongoose.model("Comments", CommentsSchema);