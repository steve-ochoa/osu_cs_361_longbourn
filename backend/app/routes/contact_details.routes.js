module.exports = app => {
  const contact_details = require("../controllers/contact_details.controller");

/*
  // Create new ContactDetails
  app.post("/contact_details", experts.create);
*/

  // Retrieve ContactDetails for one Expert by expertId
  app.get("/contact_details/:expertId", contact_details.findOneByExpertId);


/*
  // Update ContactDetails 
  app.put("/contact_details/:expertId", contact_details.update);
*/

};
