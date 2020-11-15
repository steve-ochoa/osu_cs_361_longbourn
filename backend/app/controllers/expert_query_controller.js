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