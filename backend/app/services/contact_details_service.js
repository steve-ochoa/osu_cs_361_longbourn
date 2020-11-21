const ContactDetailsDao = require('../daos/contact_details_dao')

// // Create Contact Details
// exports.create = (contactDetails, res) => {
//     ContactDetailsDao.create(contactDetails, res);
// }

// Find ContactDetails for one Expert
exports.findOneByExpertId = (expertId, res) => {
    ContactDetailsDao.fetchByExpertId(expertId, res);
};

// // Update ContactDetails for a given expertid
// exports.update = (expertId, contactDetailsToUpdate, res) => {
//     ExpertDao.updateById(expertId, contactDetailsToUpdate, res);
// };