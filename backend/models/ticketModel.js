const mongoose = require("mongoose");
const { stringify } = require("uuid");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User
    },

    email: {
      type: String,
      required: [true, "Please add an email"]
    },
    password: {
      type: String,
      required: [true, "Please add a password"]
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("user", userSchema);
