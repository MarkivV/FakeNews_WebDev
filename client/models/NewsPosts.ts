import mongoose from "mongoose";

const NewsPostsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        creator:{
            type: String,
            required: true,
            default: "Volodymyr Markiv"
        },
        tags: {
            type: [String],
            required: false,
        },
        image: {
            type: String,
            required: true,
        },
        published:{
            type: Boolean,
            required: true,
            default: true
        },
        category:{
            type: String,
            required: true,
            default: "Війна"
        },
    },
    { timestamps: true }
);


export default mongoose.models.NewsPosts || mongoose.model("NewsPosts", NewsPostsSchema);