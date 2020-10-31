module.exports = app => {
  const experts = require("../controllers/expert.controller.js");

  // Create a new Expert
  app.post("/experts", experts.create);

  // Retrieve all experts
  app.get("/experts", experts.findAll);

  // Retrieve a single Expert with expertId
  app.get("/experts/:expertId", experts.findOne);

/*
  // Update a Expert with expertId
  app.put("/experts/:expertId", experts.update);
*/

};
