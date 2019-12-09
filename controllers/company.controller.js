const Company = require("../models/company.model");

module.exports = {
  create: async (req, res) => {
    const { name, website, notes } = req.body;
    const company = await Company.create({
      name,
      website,
      notes
    });
    try {
      res.status(200).send(company);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error when creating company"
      });
    }
  },

  find: async (req, res) => {
    const { id } = req.params;
    const company = await Company.findById(id).populate("notes");
    return res.status(201).send(company);
  },

  findAll: async (req, res) => {
    const company = await Company.find();
    try {
      res.status(201).json(company);
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving companies"
      });
    }
  },

  update: async (req, res) => {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Company name can not be empty"
      });
    }
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        website: req.body.website,
        notes: req.body.notes
      },
      {
        new: true
      }
    ).populate("notes");
    return res.status(201).send(company);
  },

  delete: async (req, res) => {
    try {
      await Company.findByIdAndDelete(req.params.id);
      res.send({
        message: "Deleted successfully"
      });
    } catch (error) {
      return res.status(404).send({
        message: error
      });
    }
  },

  notesByCompanyId: async (req, res) => {
    const { id } = req.params;
    const company = await Company.findById(id).populate("notes");
    try {
      res.status(200).send(company.notes);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while retrieving notes"
      });
    }
  }
};
