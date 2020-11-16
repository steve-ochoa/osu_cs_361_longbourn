const ExpertCompanyDao = require('../daos/expert_company_dao');

/*
Create expert_companies
*/
exports.create = (expertCompany, res) => {
    ExpertCompanyDao.create(expertCompany, res);
};

/*
Find Company/Companies by ExpertId
*/
exports.fetchByExpertId = (expertId, res) => {
    ExpertCompanyDao.fetchByExpertId(expertId, res);
};