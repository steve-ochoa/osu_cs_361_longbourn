

class Expert {
    constructor(expertId, firstName, lastName, email, description, photoUrl, contactDetails, active) {
        this.expertId = expertId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.description = description;
        this.photoUrl = photoUrl;
        this.contactDetails = contactDetails;
        this.active = active;
    }

    static fromReqBody(reqBody) {
        return new Expert(
            reqBody.expertId,
            reqBody.firstName,
            reqBody.lastName,
            reqBody.email,
            reqBody.description,
            reqBody.photoUrl,
            reqBody.contactDetails,
            reqBody.active)
    }

    static fromExpertDb(expertDb) {
        return new Expert(
            expertDb.expert_id,
            expertDb.first_name,
            expertDb.last_name,
            expertDb.email,
            expertDb.description,
            expertDb.photo_url,
            null,
            expertDb.active)
    }

    static fromNewExpertDb(newExpertId, expertDb) {
        return new Expert(
            newExpertId,
            expertDb.first_name,
            expertDb.last_name,
            expertDb.email,
            expertDb.description,
            expertDb.photo_url,
            null,
            expertDb.active)
    }
}


class ExpertDb {
    constructor(expert) {
        this.expert_id = expert.expertId;
        this.first_name = expert.firstName;
        this.last_name = expert.lastName;
        this.email = expert.email;
        this.description = expert.description;
        this.photo_url = expert.photoUrl;
        this.active = expert.active;
    }
}

module.exports = {
    Expert, ExpertDb
};
