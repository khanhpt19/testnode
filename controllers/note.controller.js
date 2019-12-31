const Note = require("../models/note.model");

module.exports = {
  create: async (req, res) => {
    try {
      const { title, content } = req.body;
      if (!title) {
        return res.status(400).json({
          status: 400,
          error: "Title must be not null"
        });
      }
      const note = await Note.create({
        title,
        content
      });
      return res.status(200).json({
        status: 200,
        message: "OK",
        note: note
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  },

  findAll: async (req, res) => {
    try {
      const notes = await Note.find();
      return res.status(200).json({
        status: 200,
        message: "OK",
        results: notes
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  },

  find: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (note != null) {
        return res.status(200).json({
          status: 200,
          message: "OK",
          note: note
        });
      } else {
        return res.status(404).json({
          status: 404,
          error: "Id not found"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  },

  update: async (req, res) => {
    try {
      const noteCheck = await Note.findById(req.params.id);
      if (noteCheck == null) {
        return res.status(404).json({
          status: 404,
          error: "Id not found"
        });
      } else {
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
        if (title == "") {
          return res.status(400).json({
            status: 400,
            error: "Title must be not null"
          });
        } else {
          return res.status(200).json({
            status: 200,
            message: "OK",
            note: note
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  },

  delete: async (req, res) => {
    try {
      const noteCheck = await Note.findById(req.params.id);
      if (noteCheck != null) {
        await Note.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          status: 200,
          message: "Deleted successfully"
        });
      } else {
        return res.status(404).json({
          status: 404,
          error: "Id not found"
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error"
      });
    }
  }
};
