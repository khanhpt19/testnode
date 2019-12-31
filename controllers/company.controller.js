const Company = require("../models/company.model");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, website, notes } = req.body;
      if (!name) {
        return res.status(400).json({
          status: 400,
          error: "Name must be not null"
        });
      }
      const company = await Company.create({
        name,
        website,
        notes
      });

      return res.status(200).json({
        status: 200,
        message: "OK",
        company: company
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Server error"
      });
    }
  },

  find: async (req, res) => {
    try {
      const company = await Company.findById(req.params.id).populate("notes");
      if (company != null) {
        return res.status(200).json({
          message: "OK",
          status: 200,
          company: company
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
        message: "Server error"
      });
    }
  },

  findAll: async (req, res) => {
    try {
      const company = await Company.find();
      return res.status(200).json({
        status: 200,
        message: "OK",
        results: company
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Server error"
      });
    }
  },

  update: async (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({
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
    try {
      if (company != null) {
        return res.status(200).json({
          message: "OK",
          status: 200,
          note: company
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
        message: "Server error"
      });
    }
  },

  delete: async (req, res) => {
    try {
      const companyCheck = await Company.findById(id);
      if (companyCheck != null) {
        await Company.findByIdAndDelete(req.params.id);
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
        message: "Server error"
      });
    }
  },

  notesByCompanyId: async (req, res) => {
    const { id } = req.params;
    try {
      const companyCheck = await Company.findById(id);
      if (companyCheck == null) {
        return res.status(404).json({
          status: 404,
          error: "Id not found"
        });
      } else {
        const company = await Company.findById(id).populate("notes");
        return res.status(200).json({
          status: 200,
          message: "OK",
          notes: company.notes
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
