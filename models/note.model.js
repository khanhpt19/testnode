const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: "{PATH} is required!"
    },
    content: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }
  },
  {
    timestamps: true
  }
);

NoteSchema.index({title:"text"});

module.exports = mongoose.model("Note", NoteSchema);
