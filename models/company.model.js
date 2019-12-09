const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: "{PATH} is required!"
    },
    website: String,
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note"
      }
    ]
  },
  {
    timestamp: true
  }
);

module.exports = mongoose.model("Company", CompanySchema);
