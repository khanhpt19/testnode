const Note = require("../models/note.model");

module.exports = {
  create: async (req, res) => {
    const { title, content } = req.body;
    const note = await Note.create({
      title,
      content
    });
    return res.send(note);
  },

  findAll: async (req, res) => {
    const notes = await Note.find();
    return res.send(notes);
  },

  find: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      return res.send(note);
    } catch (error) {
      res.send(error);
    }
  },

  update: async (req, res) => {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        new: true
      }
    );
    try {
      return res.status(201).send(note);
    } catch (error) {
      return res.send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Note.findByIdAndDelete(req.params.id);
      res.send({
        message: "Deleted successfully"
      });
    } catch (error) {
      res.send(error);
    }
  }
};
