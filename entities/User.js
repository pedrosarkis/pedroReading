module.exports = class User {
    constructor({email, oauth, username}) {
        this.email = email
        this.oauth = oauth
        this.username = username
    }
}