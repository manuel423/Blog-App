const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  like: {
    type: Number,
    default: 0,
  },
  view: {
    type: Number,
    default: 0,
  },
});

blogSchema.set("timestamps", true);

module.exports = mongoose.model("Blog", blogSchema);
