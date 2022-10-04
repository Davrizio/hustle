const mongoose = require("mongoose");

const ClientExerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
  },
  repititions: {
    type: Number,
  },
  client: {
    type: String,
  },
  appointment: {
    type: Date,
    require: true,
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

module.exports = mongoose.model("clientExercise", ClientExerciseSchema);
