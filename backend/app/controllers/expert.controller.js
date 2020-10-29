const Expert = require("../models/expert.model.js");


/*
// Create and Save a new Expert
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }


  // Create a Expert
  const expert = new Expert({
    email: req.body.email,
    name: req.body.name,
    active: req.body.active
  });

  // Save Expert in the database
  Expert.create(expert, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Expert."
      });
    else res.send(data);
  });
};
*/

// Retrieve all Experts from the database.
exports.findAll = (req, res) => {
  Expert.fetchAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving experts."
      });
    else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data)
    }
  });
};

// Find a single Expert with a expertId
exports.findOne = (req, res) => {
  Expert.fetchById(req.params.expertId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Expert with id ${req.params.expertId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Expert with id " + req.params.expertId
        });
      }
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data)
    };
  });
};


// Update a Expert identified by the expertId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Expert.updateById(
    req.params.expertId,
    new Expert(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No Expert with expert_id ${req.params.expertId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Expert with expert_id " + req.params.expertId
          });
        }
      } else res.send(data);
    }
  );
};
