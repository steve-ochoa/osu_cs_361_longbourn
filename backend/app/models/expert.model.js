const sql = require("./db.js");

class Expert {
  constructor(expert) {
  this.first_name = expert.first_name;
  this.last_name = expert.last_name;
  this.email = expert.email;
  this.description = expert.description;
  this.photo_url = expert.photo_url;
  this.active = expert.active;
  }
};

/*
Expert.create = (newExpert, result) => {
  sql.query("INSERT INTO experts SET ?", newExpert, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created expert: ", { id: res.insertId, ...newExpert });
    result(null, { id: res.insertId, ...newExpert });
  });
};

*/

Expert.fetchById = (expertId, result) => {
  sql.query("SELECT * FROM experts WHERE expert_id = ? AND deleted='false'", [expertId], (err, res) => {
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


Expert.fetchAll = result => {
  sql.query("SELECT * FROM experts WHERE deleted='false'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("experts: ", res);
    result(null, res);
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
