const mongoose = require("mongoose");

const ApptsSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  exercise: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("appts", ApptsSchema);
