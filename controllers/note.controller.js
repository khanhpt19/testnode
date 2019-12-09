const Note = require("../models/note.model");

module.exports = {
  create: async (req, res) => {
    try {
      const { title, content } = req.body;
      const note = await Note.create({
        title,
        content
      });
      return res.status(200).send({
        message: "OK",
        status: 200,
        note: note
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  findAll: async (req, res) => {
    try {
      const notes = await Note.find();
      return res.status(200).send({
        message: "OK",
        status: 200,
        results: notes
      });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  find: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (note != null) {
        return res.status(200).send({
          message: "OK",
          status: 200,
          note: note
        });
      } else {
        return res.status(404).send({
          status: 404,
          error: "Id not found"
        });
      }
    } catch (error) {
      return res.status(500).send(error);
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
      if (note != null) {
        return res.status(200).send({
          message: "OK",
          status: 200,
          note: note
        });
      } else {
        return res.status(404).send({
          status: 404,
          error: "Id not found"
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  delete: async (req, res) => {
    try {
      await Note.findByIdAndDelete(req.params.id);
      res.status(200).send({
        message: "Deleted successfully"
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
