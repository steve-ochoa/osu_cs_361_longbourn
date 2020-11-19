const sql = require('./db');

const cd = require('../models/contact_details.model');
const ContactDetails = cd.ContactDetails;
const ContactDetailsDb = cd.ContactDetailsDb;

const expertModels = require('../models/expert.model');
const Expert = expertModels.Expert;
const ExpertDb = expertModels.ExpertDb;

exports.create = (newExpert, result) => {
    let expertDb = new ExpertDb(newExpert);
    console.log("Inserting expert:");
    console.log(expertDb);

    sql.getConnection(function (err, connection) {

        connection.beginTransaction(function (err) {

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

                //TODO pass connection into new method ContactDetails.createWithConnection()
                let contactDetailsDb = ContactDetailsDb.fromExpertId(res.insertId, newExpert.contactDetails);
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
                });
            });
        })
    });
};

exports.fetchById = (expertId, result) => {
    sql.query("SELECT * FROM experts WHERE expert_id = ? AND deleted='false' AND active", [expertId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            var expert = Expert.fromExpertDb(res[0]);
            console.log("Found expert: ", expert);

            ContactDetails.fetchByExpertId(expert.expertId, (err2, contactDetails) => {
                if (err2) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                expert.contactDetails = contactDetails;

                result(null, expert);
                return;
            });

        } else {
            result({kind: "not_found"}, null);
        }
    });
};

exports.fetchAll = result => {
    sql.query("SELECT * FROM experts WHERE deleted='false' AND active", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        var expertsArray = [];
        res.forEach(expertDb => expertsArray.push(Expert.fromExpertDb(expertDb)));
        console.log("experts: ", expertsArray);
        result(null, expertsArray);
    });
};

exports.updateById = (expertId, expertToUpdate, result) => {
    let expertDb = new ExpertDb(expertToUpdate);
    console.log("Updating expert:");
    console.log(expertDb);

    sql.getConnection(function (err, connection) {

        connection.beginTransaction(function (err) {

            connection.query("UPDATE experts SET first_name=?, last_name=?, email=?, description=?, photo_url=? WHERE expert_id=?",
                [expertDb.first_name, expertDb.last_name, expertDb.email, expertDb.description, expertDb.photo_url, expertId], (err, res) => {
                    if (err) {
                        connection.rollback();
                        connection.release();
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }

                    if (res.affectedRows === 0) {
                        //No Expert found with that expertId
                        result({kind: "not_found"}, null);
                        return;
                    }

                    console.log("Updated expert: ", expertDb);

                    //TODO pass connection into new method ContactDetails.createWithConnection()
                    let contactDetailsDb = ContactDetailsDb.fromExpertId(expertId, expertToUpdate.contactDetails);

                    console.log("Updating contactDetails: ", contactDetailsDb);

                    connection.query("UPDATE contact_details SET phone=?, work_email=?, school_email=?, github_user=?, linkedin_url=?, city=?, state=?, country=? WHERE expert_id=?",
                        [contactDetailsDb.phone, contactDetailsDb.work_email, contactDetailsDb.school_email, contactDetailsDb.github_user,
                            contactDetailsDb.linkedin_url, contactDetailsDb.city, contactDetailsDb.state, contactDetailsDb.country, expertId],
                        (err, res2) => {
                            if (err) {
                                connection.rollback();
                                connection.release();
                                result(err, null);
                                return;
                            }

                            if (res2.affectedRows === 0) {
                                //No ContactDetails found with that expertId
                                result({kind: "not_found"}, null);
                                return;
                            }

                            connection.commit();
                            connection.release();

                            console.log("Updated contactDetails: ", contactDetailsDb);

                            result(null, expertToUpdate);
                        });
                });
        })
    });
};
