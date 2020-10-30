const sql = require('./db.js');
const cd = require('./contact_details.model.js');
const ContactDetails = cd.ContactDetails;
const ContactDetailsDb = cd.ContactDetailsDb;

class Expert {
  constructor(expertId, firstName, lastName, email, description, photoUrl, contactDetails, active) {
    this.expertId = expertId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.description = description;
    this.photoUrl = photoUrl;
    this.contactDetails = contactDetails;
    this.active = active;
  }

  static fromReqBody(reqBody) {
    return new Expert(
      reqBody.expertId,
      reqBody.firstName, 
      reqBody.lastName, 
      reqBody.email, 
      reqBody.description, 
      reqBody.photoUrl, 
      reqBody.contactDetails,
      reqBody.active)
  }

  static fromExpertDb(expertDb) {
    return new Expert(
      expertDb.expert_id,
      expertDb.first_name,
      expertDb.last_name,
      expertDb.email,
      expertDb.description,
      expertDb.photo_url,
      expertDb.active)
  }

  static fromNewExpertDb(newExpertId, expertDb) {
    return new Expert(
      newExpertId, 
      expertDb.first_name,
      expertDb.last_name,
      expertDb.email,
      expertDb.description,
      expertDb.photo_url,
      null,
      expertDb.active)  
  }
};


class ExpertDb {
  constructor(expert) {
    this.expert_id = expert.expertId;
    this.first_name = expert.firstName;
    this.last_name = expert.lastName;
    this.email = expert.email;
    this.description = expert.description;
    this.photo_url = expert.photoUrl;
    this.active = expert.active;
  }
};


Expert.create = (newExpert, result) => {
  console.log(ContactDetails);

  let expertDb = new ExpertDb(newExpert);
  console.log("Inserting expert:");
  console.log(expertDb);

  sql.getConnection(function(err, connection) {

    connection.beginTransaction(function(err) {

      connection.query("INSERT INTO experts SET ?", expertDb, (err, res) => {
        if (err) {
          connection.rollback();
          connection.release();
          console.log("error: ", err);
          result(err, null);
          return;
        }

        var newExpertResult = Expert.fromNewExpertDb(res.insertId, expertDb);

        console.log("Created expert: ", newExpertResult);

        let contactDetailsDb = ContactDetailsDb.fromNewExpertId(res.insertId, newExpert.contactDetails);
        contactDetailsDb.expert_id = newExpertResult.expertId;

        console.log("Inserting contactDetails: ", contactDetailsDb);

        connection.query("INSERT INTO contact_details SET ?", contactDetailsDb, (err, res2) => {
          if (err) {
            connection.rollback();
            connection.release();
            result(err, null);
            return;
          }
          connection.commit();
          connection.release();

          var newContactDetailsResult = ContactDetails.fromNewContactDetailsDb(res2.insertId, contactDetailsDb);

          newExpertResult.contactDetails = newContactDetailsResult;

          console.log("Created contactDetails: ", newContactDetailsResult);

          console.log("Created new expert: ", newExpertResult);

          result(null, newExpertResult);
          return;
        });
      });
    })
  });
};


Expert.fetchById = (expertId, result) => {
  sql.query("SELECT * FROM experts WHERE expert_id = ? AND deleted='false'", [expertId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var expert = Expert.fromExpertDb(res[0]);
      console.log("Found expert: ", expert);
      result(null, expert);
      return;
    } else {
      result({ kind: "not_found" }, null);
    }
  });
};


Expert.fetchAll = result => {
  sql.query("SELECT * FROM experts WHERE deleted='false'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    expertsArray = [];
    res.forEach(expertDb => expertsArray.push(Expert.fromExpertDb(expertDb)));
    console.log("experts: ", expertsArray);
    result(null, expertsArray);
  });
};

/* TODO add all fields
Expert.updateById = (id, expert, result) => {
  sql.query(
    "UPDATE experts SET email = ?, name = ?, active = ? WHERE id = ?",
    [expert.email, expert.name, expert.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Expert with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated expert: ", { id: id, ...expert });
      result(null, { id: id, ...expert });
    }
  );
};
*/

module.exports = Expert;
