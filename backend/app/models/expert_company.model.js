const sql = require("./db")

class ExpertCompany {
	constructor(expertCompanyId, expertId, companyId, name, description, industry, current, position, employedYears){
		this.expertCompanyId = expertCompanyId;
		this.expertId = expertId;
		this.companyId = companyId;
		this.name = name;
		this.description = description;
		this.industry = industry;
		this.current = current;
		this.position = postion;
		this.employedYears = employedYears;
	}

	static fromReqBody(reqBody){
		return new ExpertCompany(
			reqBody.expertCompanyId,
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
			expertCompanyRow.expertCompanyId,
			expertCompanyRow.expertId,
			expertCompanyRow.companyId,
			expertCompanyRow.name,
			expertCompanyRow.description,
			expertCompanyRow.industry,
			expertCompanyRow.current,
			expertCompanyRow.position,
			expertCompanyRow.employedYears
			)


	}
}


class ExpertCompanyDbDto {
	constructor(expert_company_id, expert_id, company_id, current, position, employed_years) {
		this.expert_company_id = expert_company_id;
		this.expert_id = expert_id;
		this.company_id = company_id;
		this.current = current;
		this.position = position;
		this.empoyed_years = employed_years;
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
 		[0, expertCompanyDbDto.expert_company_id, expertCompanyDbDto.expert_id, expertCompanyDbDto.company_id, expertCompanyDbDto.current,
 		expertCompanyDbDto.position, expertCompanyDbDto.employed_years], 
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
	sql.query("SELECT ec.expert_id, ec.company_id, c.name, c.description, c.industry, ec.term, ec.current, ec.position, ec.employed_years FROM expert_companies ec " + 
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