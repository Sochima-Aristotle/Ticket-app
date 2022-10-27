const mongoose = require("mongoose");
const { stringify } = require("uuid");

const userSchema = mongoose.Schema(
  {
    name: {
      type: string,
      required: [true, "Please add a name"]
    },
    work: {
      type: string,
      required: [true, "Please add work"]
    },
    email: {
      type: string,
      required: [true, "Please add an email"]
    },
    password: {
      type: string,
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
