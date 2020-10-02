/**
 * Class representing an individual class session
 */
class Session {
    /**
     * @param sessionName the name of the session, used to join
     * @param owner the name of the user who created the session
     * @param report report object holding class session information
     */
    constructor(sessionName, owner, report) {
        this.users = [];
        this.sessionName = sessionName;
        this.owner = owner;
        this.startTime = new Date();
        this.servicesReport = report;
    }

    /**
     * gets a list of current users
     * @returns {string[]} a list of users
     */
    getUsers(){

    }

    /**
     * sets the users list
     * @param {string[]} users
     * @returns {boolean} true for success, false for failure
     */
    setUsers(users){

    }

    /**
     * adds a user to the session as well as the users list
     * @param {string} user
     * @returns {boolean} true for success, false for failure
     */
    addUser(user){

    }

    /**
     * gets the name of the user who controls the session
     * @returns {string} owner name
     */
    getOwner(){

    }

    /**
     * sets the name of the user who controls the session
     * @param {string} owner
     * @returns {boolean} true for success, false for failure
     */
    setOwner(owner){

    }

    /**
     * gets the name of the session
     * @returns {string} name of the session
     */
    getSessionName(){

    }

    /**
     * sets the name of the session
     * @param {string} name
     * @returns {boolean} true for success, false for failure
     */
    setSessionName(name){

    }

    /**
     * calculates the time from session start to the current time in seconds
     * @returns {int} elapsed time in seconds
     */
    getElapsedTime(){

    }
}