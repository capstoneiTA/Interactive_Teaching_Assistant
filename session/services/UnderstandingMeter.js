class UnderstandingMeter{

    /**
    * Creating an understanding meter class
    * @constructor
    * @param {int} score - the score from student
    * @param {string} user - name of the user
    * @param {object} history - record changes {K = time: V = {score:int}}
    * */

    /*
    *   TODO
    *    add socket object
    *    add function to emit changes value to teacher side
    *    add function to listen for changes from student side
    *    add function to connect to session for both sides
    *
    * */

    constructor(score, user, history) {
        this.score = score;
        this.user = user;
        this.history = history;

    }

    /**
     * Return the understanding score of the student
     * @returns {Number} student's score
     */
    getScore() {
        return this.score;
    }

    /**
     * Allows modification of score
     * @param {int} newScore - the new score to be updated
     */
    setScore(newScore) {

    }

    /**
     * Return the name of the user
     * @returns {string} user
     */
    getUser() {
        return this.user;
    }

    /**
     * Update the history object of the user
     */
    recordChange() {
    }

    /**
     * Return the current time of session during run time
     * @return {Date} currTime - the current time when the func is called
     */
    getTime() {
    }





}