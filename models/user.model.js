const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);
UserSchema.index({ username: "text" });

module.exports = mongoose.model("User", UserSchema);
