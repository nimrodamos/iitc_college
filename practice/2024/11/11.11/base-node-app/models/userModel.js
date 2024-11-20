const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.fName} ${this.lName}`;
});

module.exports = mongoose.model("User", userSchema);
