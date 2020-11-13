const sql = require("../daos/db")

class ExpertCompany {
	constructor(expertId, companyId, name, description, industry, current, position, employedYears){
		this.expertId = expertId;
		this.companyId = companyId;
		this.name = name;
		this.description = description;
		this.industry = industry;
		this.current = current;
		this.position = position;
		this.employedYears = employedYears;
	}

	static fromReqBody(reqBody){
		return new ExpertCompany(
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

	static fromExpertCompanyRow(expertCompanyRow){
		return new ExpertCompany(
			expertCompanyRow.expert_id,
			expertCompanyRow.company_id,
			expertCompanyRow.name,
			expertCompanyRow.description,
			expertCompanyRow.industry,
			expertCompanyRow.current,
			expertCompanyRow.position,
			expertCompanyRow.employed_years
			)


	}
}


class ExpertCompanyDbDto {
	constructor(expertCompany) {
		this.expert_id = expertCompany.expertId;
		this.company_id = expertCompany.companyId;
		this.current = expertCompany.current;
		this.position = expertCompany.position;
		this.employed_years = expertCompany.employedYears;
	}
}

/*
ManyToMany Experts<->Companies relationship table INSERT.

We should never overwrite an Expert's fields nor a Company's fields from this query.

Instead only INSERT records into the relationship table to assign
Companies<->Experts.
 */

 ExpertCompany.create = (newExpertCompany, result) => {
 	const expertCompanyDbDto = new ExpertCompanyDbDto(newExpertCompany);
 	console.log('Creating new ExpertCompany:');
	console.log(expertCompanyDbDto);

 	sql.query("INSERT INTO expert_companies (expert_company_id, expert_id, company_id, current, position, employed_years) VALUES (?,?,?,?,?,?)",
 		[0, expertCompanyDbDto.expert_id, expertCompanyDbDto.company_id, expertCompanyDbDto.current, expertCompanyDbDto.position, expertCompanyDbDto.employed_years], 
 		(err, res) => {
 			if (err){
				console.log("error: ", err);
				result(err, null);
				return;
			}

			console.log("Created ExpertCompany: ", newExpertCompany);
			result(null, newExpertCompany);
 		});

 };

 ExpertCompany.fetchByExpertId = (expertId, result) => {
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
			var expertCompaniesArr = [];
			res.forEach(expertCompanyRow => expertCompaniesArr.push(ExpertCompany.fromExpertCompanyRow(expertCompanyRow)));
			console.log("expertCompanies:");
			console.log(expertCompaniesArr);
			result(null, expertCompaniesArr);
			return;
		}

		result({kind: "not_found"}, null)
	});
		
};

module.exports = ExpertCompany;