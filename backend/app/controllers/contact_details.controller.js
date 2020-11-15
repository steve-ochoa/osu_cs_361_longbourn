const ContactDetailsServices = require('../services/contact_details_services')

// Find ContactDetails for one Expert
exports.findOneByExpertId = (req, res) => {
    ContactDetailsServices.findOneByExpertId(req,res);
};
