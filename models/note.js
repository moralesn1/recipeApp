const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  text: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
