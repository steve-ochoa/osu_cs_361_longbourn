const ExpertDao = require('../daos/expert_dao');

exports.create = (expert, res) => {
    ExpertDao.create(expert, res);
};

exports.findAll = (res) => {
    ExpertDao.fetchAll(res);
};

exports.findById = (expertId, res) => {
    ExpertDao.fetchById(expertId, res);
};

exports.update = (expertId, expertToUpdate, res) => {
    ExpertDao.updateById(expertId, expertToUpdate, res);
};
