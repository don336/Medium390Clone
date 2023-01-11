import mongoose from "mongoose";

const newLocal = "User";
const { ObjectId } = mongoose.Schema.Types;
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  likes: [{ type: ObjectId, ref: newLocal }],
  comments: [
    {
      text: String,
      postedBy: { type: ObjectId, ref: newLocal },
    },
  ],

  dateCreated: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export default mongoose.model("Articles", articleSchema);
