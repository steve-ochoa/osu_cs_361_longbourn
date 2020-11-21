const companyModel = require("../models/company.model");
const Company = companyModel.Company;
const CompanyDao = require("../daos/company_dao");

//Create a new Company
exports.create = (company, res) => {
    CompanyDao.create(company, res);
};

//Retrieve all Companies from the database
exports.findAll = (res) => {
    CompanyDao.fetchAll(res);
};

//Update Company
exports.update = (companyId, companyToUpdate, res) => {
    CompanyDao.updateById(companyId, companyToUpdate, res);
};