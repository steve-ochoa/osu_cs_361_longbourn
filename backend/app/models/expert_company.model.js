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

module.exports = {
	ExpertCompany, ExpertCompanyDbDto
};