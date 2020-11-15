const sql = require('./db');

const companyModels = require('../models/company.model');

const Company = companyModels.Company;
const CompanyDbDto = companyModels.CompanyDbDto;

exports.create = (newCompany, result) => {
	let companyDbDto = new CompanyDbDto(newCompany);
	console.log("Inserting company:");
	console.log(companyDbDto);

	sql.getConnection(function(err, connection) {

		connection.beginTransaction(function (err){

			connection.query("INSERT INTO companies SET ?", companyDbDto, (err, res) => {
				if (err){
					console.log("error: ", err);
					result(err, null);
					return;
				}

				connection.commit();
				connection.release();

				var newCompanyResult = Company.fromNewCompanyDbDto(res.insertId, companyDbDto);

				console.log("Created company: ", newCompanyResult);
				result(null, newCompanyResult);

			});
		});

	});
};

exports.fetchAll = result => {
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

};

exports.updateById = (id, company, result) => {
    console.log(company.company_number)
    
    sql.getConnection(function(err, connection){

    	connection.beginTransaction(function (err) {

		    sql.query("UPDATE companies SET name = ?,description = ?, industry = ? WHERE company_id = ?",
		        [company.name, company.description, company.industry, id],
		        (err, res) => {
		            if(err){
		                console.log("error: ", err);
		                result(null, err);
		                return
		            }

		            if (res.affectedRows == 0){
		                result({kind : "not_found"}, null);
		                return;
		            }

		            connection.commit();
		            connection.release();

		            console.log("updated company: ", {id: id, ...company});
		            result(null, {id: id, ...company});
		        
		        });
		});
    });
};

