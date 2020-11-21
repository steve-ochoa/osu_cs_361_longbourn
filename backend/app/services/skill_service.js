const Skill = require('../models/skill.model').Skill;
const SkillDao = require('../daos/skill_dao');

exports.create = (skill, res) => {
    SkillDao.create(skill, res);
};

exports.findAll = (res) => {
    SkillDao.fetchAll(res);
};

exports.update = (skillId, skillToUpdate, res) => {
    SkillDao.updateById(skillId, skillToUpdate, res);

};
