const ExpertSkillDao = require('../daos/expert_skill_dao');

/*
Create expert_skills
*/
exports.create = (expertSkill, res) => {
    ExpertSkillDao.create(expertSkill, res);
};

/*
Find Skill(s) by ExpertId
*/
exports.fetchByExpertId = (expertId, res) => {
    ExpertSkillDao.fetchByExpertId(expertId, res);
};