const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    token: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Token", TokenSchema);
