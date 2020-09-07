const mongoose = require("mongoose");

const DolistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    index: true,
  },
  heading: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  priority: {
    type: String,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
});

const DoList = mongoose.model("dolist", DolistSchema);

module.exports = DoList;
