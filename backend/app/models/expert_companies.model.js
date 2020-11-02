// SHC notes: 
// creates/retrieves expert_companies on DB
// From Slack group discussion:  3. models - implements the class definition (loose) and Database functions
// (code adapted from expert_skill.model.js)

const sql = require('./db');

class ExpertCompanies {
    constructor(expertId, companyId, name, description, industry, current, position, employedYears) {
        this.expertId = expertId;
        this.companyId = companyId;
        this.name = name;
        this.description = description;
        this.industry = industry;
        this.current = current;
        this.position = position;
        this.employedYears = employedYears;
    }

    static fromExpertCompaniesRow(expertCompaniesRow) {
        return new ExpertCompanies(
            expertCompaniesRow.expert_id,
            expertCompaniesRow.company_id,
            expertCompaniesRow.name,
            expertCompaniesRow.description,
            expertCompaniesRow.industry,
            expertCompaniesRow.current,
            expertCompaniesRow.position,
            expertCompaniesRow.employed_years
        );
    }

    static fromReqBody(reqBody) {
        return new ExpertCompanies(
            reqBody.expertId,
            reqBody.companyId,
            reqBody.name,
            reqBody.description,
            reqBody.industry,
            reqBody.current,
            reqBody.position,
            reqBody.employedYears
        )
    }
}

class ExpertCompaniesDbDto {
    constructor(expertCompanies) {
        this.expert_id = expertCompanies.expertId;
        this.company_id = expertCompanies.companyId;
        this.current = expertCompanies.current;
        this.position = expertCompanies.position;
        this.employed_years = expertSkill.employedYears;
    }
}


/*
ManyToMany Experts<->Companies relationship table INSERT.

We should never overwrite an Expert's fields nor a Companies's fields from this query.

Instead only INSERT records into the relationship table to assign
Companies<->Experts.
 */
ExpertCompanies.create = (newExpertCompanies, result) => {
    let expertCompaniesDb = new ExpertCompaniesDbDto(newExpertCompanies);
    console.log('Creating expertCompanies:');
    console.log(expertCompaniesDb);

    sql.query("INSERT INTO expert_companies (expert_company_id, expert_id, company_id, current, position, employed_years) VALUES (?,?,?,?,?,?)",
        [0, expertCompaniesDb.expert_id, expertCompaniesDb.company_id, expertCompaniesDb.current, expertCompaniesDb.position, expertCompaniesDb.employed_years],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("Created expertCompanies: ", newExpertCompanies);
            result(null, newExpertCompanies);
        });
};


ExpertCompanies.fetchByExpertId = (expertId, result) => {
    sql.query("SELECT ec.expert_id, ec.company_id, c.name, c.description, c.industry, ec.current, ec.position, ec.employed_years FROM expert_companies ec " +
        "JOIN companies c ON ec.company_id = c.company_id WHERE ec.expert_id = ?",
        [expertId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                var expertCompaniesArr = [];
                res.forEach(expertCompaniesRow => expertCompaniesArr.push(ExpertCompanies.fromExpertCompaniesRow(expertCompaniesRow)));
                console.log("expertCompanies:");
                console.log(expertCompaniesArr);
                result(null, expertCompaniessArr);
                return;
            }

            result({kind: "not_found"}, null);
        });
};

module.exports = ExpertCompanies;