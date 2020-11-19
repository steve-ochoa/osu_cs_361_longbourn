const ExpertQueryService = require('../services/expert_query_service');

/*
Experts By Course
 */
exports.findExpertsByCourseId = (req, res) => {
    ExpertQueryService.findExpertsByCourseId(req.params.courseId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that courseId ${req.params.courseId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such courseId " + req.params.courseId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

exports.findExpertsByCourseNumber = (req, res) => {
    ExpertQueryService.findExpertsByCourseNumber(req.params.courseNumber, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that course number ${req.params.courseNumber}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such courseNumber " + req.params.courseNumber
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

exports.findExpertsByCourseName = (req, res) => {
    ExpertQueryService.findExpertsByCourseName(req.params.courseName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that course name ${req.params.courseName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such courseName " + req.params.courseName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

/*
Experts By Company
*/
exports.findExpertsByCompanyId = (req, res) => {
    ExpertQueryService.findExpertsByCompanyId(req.params.companyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that companyId ${req.params.companyId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such companyId " + req.params.companyId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

exports.findExpertsByCompanyName = (req, res) => {
    ExpertQueryService.findExpertsByCompanyName(req.params.companyName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that company name ${req.params.companyName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such companyName " + req.params.companyName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

exports.findExpertsByCompanyIndustry = (req, res) => {
    ExpertQueryService.findExpertsByCompanyIndustry(req.params.companyIndustry, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that company industry ${req.params.companyIndustry}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such companyIndustry " + req.params.companyIndustry
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};


/*
Experts By Skill
*/
exports.findExpertsBySkillId = (req, res) => {
    ExpertQueryService.findExpertsBySkillId(req.params.skillId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that skillId ${req.params.skillId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such skillId " + req.params.skillId
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

exports.findExpertsBySkillName = (req, res) => {
    ExpertQueryService.findExpertsBySkillName(req.params.skillName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that skill name ${req.params.skillName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such skillName " + req.params.skillName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

/*
Experts By Name
 */
exports.findExpertsByFirstName = (req, res) => {
    ExpertQueryService.findExpertsByFirstName(req.params.firstName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that firstName ${req.params.firstName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such firstName " + req.params.firstName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};

exports.findExpertsByLastName = (req, res) => {
    ExpertQueryService.findExpertsByLastName(req.params.lastName, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No Experts with that lastName ${req.params.lastName}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Expert with such lastName " + req.params.lastName
                });
            }
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(data)
        }
    });
};
