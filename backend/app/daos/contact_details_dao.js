const sql = require('./db');

const ContactDetailsModel = require('../models/contact_details.model.js');
const ContactDetails = ContactDetailsModel.ContactDetails;
const ContactDetailsDb = ContactDetailsModel.ContactDetailsDb;
//TODO Add method for createWithConnection() that has logic from expert model DAO

exports.fetchByExpertId = (expertId, result) => {
    sql.query("SELECT * FROM contact_details WHERE expert_id = ?", [expertId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            var contactDetails = ContactDetails.fromContactDetailsDb(res[0]);
            console.log("Found contactDetails: ", contactDetails);

            result(null, contactDetails);
            return;
        }

        // Else no Not found
        result({kind: "not_found"}, null);
    });
};

