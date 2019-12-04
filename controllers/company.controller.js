const Company = require("../models/company.model");

module.exports = {
  create: async (req, res) => {
    const { name, website } = req.body;
    const company = await Company.create({
      name,
      website
    });
    return res.send(company);
  },

  find: async (req, res) => {
    const company = await Company.find();
    return res.send(company);
  },

  notesByCompanyId: async (req, res) => {
    const { id } = req.params;
    const company = await Company.findById(id).populate("notes");

    res.send(company.notes);
  }
};

// exports.findAll = (req, res) => {
//   Company.find()
//     .populate("notes")
//     .then(companies => {
//       res.send(companies);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving companies"
//       });
//     });
// };

// exports.create = (req, res) => {
//   if (!req.body.name) {
//     return res.status(400).send({
//       message: "Name can not empty"
//     });
//   }
//   const company = new Company({
//     name: req.body.name,
//     website: req.body.website,
//     notes: req.body.notes
//   });

//   company
//     .save()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "Error when creating company"
//       });
//     });
// };
