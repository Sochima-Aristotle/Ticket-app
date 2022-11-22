const mongoose = require("mongoose");
const { stringify } = require("uuid");
const User = require("./userModels");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket"
    },
    description: {
      type: String,
      required: [true, "Please enter a description"]
    },
    isStaff: {
      type: String,
      default: false
    },
    staffId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);
