const sql = require('./db');

const expertCompanyModels = require('../models/expert_company.model');
const ExpertCompany = expertCompanyModels.ExpertCompany;
const ExpertCompanyDb = expertCompanyModels.ExpertCompanyDbDto;

exports.create = (newExpertCompany, result) => {
    // using req.body rececived, create new ExpertCompanyDb
    let expertCompanyDB = new ExpertCompanyDb(newExpertCompany);
    console.log("Inserting new expert_companies:");
    console.log(expertCompanyDB);

    // connect to sql and crate new entry in database
    sql.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
            connection.query("INSERT INTO expert_companies (expert_company_id, expert_id, company_id, current, position, employed_years) VALUES (?,?,?,?,?,?)",
            [0, expertCompanyDB.expert_id, expertCompanyDB.company_id, expertCompanyDB.current, expertCompanyDB.position, expertCompanyDB.employed_years], 
            (err, res) => {        
                    if (err) {
                        connection.rollback();
                        connection.release();
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                connection.commit();
                connection.release();
                console.log("New expert_companies inserted in DB: ", newExpertCompany);
                result(null, newExpertCompany);
            });
        })
    });


}


exports.fetchByExpertId = (expertId, result) => {
        sql.query("SELECT ec.expert_id, ec.company_id, c.name, c.description, c.industry, ec.current, ec.position, ec.employed_years FROM expert_companies ec " + 
        "JOIN companies c ON ec.company_id = c.company_id WHERE ec.expert_id = ?",
        [expertId],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
			if (res.length){
				var expertCompanyArr = [];
				res.forEach(expertCompanyRow => expertCompanyArr.push(ExpertCompany.fromExpertCompanyRow(expertCompanyRow)));
				console.log("expertCompany:");
				console.log(expertCompanyArr);
				result(null, expertCompanyArr);
				return;
			}
            else
    			result({kind: "not_found"}, null)
    });
};


