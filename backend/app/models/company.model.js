const sql = require('./db.js')

class Company {
	constructor(companyId, name, description, industry){
		this.companyId = companyId;
		this.name = name;
		this.description = description;
		this.indsutry = industry;
	}

	static fromReqBody(reqBody){
		return new Company(
			reqBody.companyId,
			reqBody.name,
			reqBody.description,
			reqBody.industry
			)
	}

	static fromCompanyDbDto(companyDbDto){
		return new Company(
			companyDbDto.company_id,
			companyDbDto.name,
			companyDbDto.description,
			companyDbDto.industry
			)
	}

	static fromNewCompanyDbDto(companyId, newCompanyDvDto){
		return new Company(
			companyId,
			companyDbDto.name,
			companyDbDto.description,
			companyDbDto.industry
			)
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

Company.create = (newCompany, result) => {
	let companyDbDto = new CompanyDbDto(newCompany);
	console.log("Creating company:");
	console.log(companyDbDto);

	sql.query("INSERT INTO companies SET ?", companyDbDto, (err, res) => {
		if (err){
			console.log("error: ", err);
			result(err, null);
			return;
		}

		var newCompanyResult = Company.fromNewCompanyDbDto(res.insertId, companyDbDto);

		console.log("Created company: ", newCompanyResult);
		result(null, newCompanyResult);
	});
};

Company.fetchAll = result => {
	sql.query("SELECT * FROM companies", (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(null, err);
			return;
		}

		var companiesArray = [];
		res.forEach(companyDbDto => companiesArray.push(Company.fromCompanyDbDto(companyDbDto)));
		console.log("companies: ", companiesArray);
		result(null, companiesArray);
	})

}

module.exports = {
	Company, CompanyDbDto
}