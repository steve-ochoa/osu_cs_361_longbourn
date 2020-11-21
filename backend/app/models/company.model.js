class Company {
	constructor(companyId, name, description, industry){
		this.companyId = companyId;
		this.name = name;
		this.description = description;
		this.industry = industry;
	}

	static fromReqBody(reqBody){
		return new Company(
			reqBody.companyId,
			reqBody.name,
			reqBody.description,
			reqBody.industry
			);
	}

	static fromCompanyDbDto(companyDbDto){
		return new Company(
			companyDbDto.company_id,
			companyDbDto.name,
			companyDbDto.description,
			companyDbDto.industry
			);
	}

	static fromNewCompanyDbDto(companyId, newCompanyDbDto){
		return new Company(
			companyId,
			newCompanyDbDto.name,
			newCompanyDbDto.description,
			newCompanyDbDto.industry
			);
	}

}

class CompanyDbDto {
	constructor(company){
		this.company_id = company.companyId;
		this.name = company.name;
		this.description = company.description;
		this.industry = company.industry;
	}

}

module.exports = {
	Company, CompanyDbDto
}