const sql = require('./db.js');

class ContactDetails {
	constructor(contact_details) {
		this.contact_details_id = contact_details.contact_details_id;
		this.expert_id = contact_details.expert_id;
		this.phone = contact_details.phone;
		this.work_email = contact_details.work_email;
		this.school_email = contact_details.school_email;
		this.github_user = contact_details.github_user;
		this.linkedin_url = contact_details.linkedin_url;
		this.city = contact_details.city;
		this.state = contact_details.state;
		this.country = contact_details.country;
	}
}

ContactDetails.fetchByExpertId = (expertId, result) => {
  sql.query("SELECT * FROM contact_details WHERE expert_id = ?", [expertId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found expert: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Expert with the id
    result({ kind: "not_found" }, null);
  });
};


module.exports = ContactDetails;