const mongoose = require("mongoose");
const { stringify } = require("uuid");
const User = require("./userModels");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },

    product: {
      type: String,
      required: [true, "Please enter a product"],
      enum: ["android", "iPhone", "HP", "macbook pro", "Others"]
    },
    description: {
      type: String,
      required: [true, "Please enter a description"]
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "close"],
      default: "new"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
