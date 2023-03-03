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
    url: {
      type: String,
      required: true,

    },
    creator: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    category: {
      type: String,
      required: true,
      default: "war",
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.NewsPosts ||
  mongoose.model("NewsPosts", NewsPostsSchema);
