/**
 * Class representing an individual poll
 */
class Poll {

    /**
     *
     * @param  {MultipleChoiceQuestion} question a multiple choice question object to ask for the poll
     * @param {int} pollId poll id from database
     */
    constructor(question, pollId) {
        this.question = question;
        this.pollId = pollId;
        this.responses = [];
    }

    /**
     * returns the current poll question
     * @returns {MultipleChoiceQuestion} the current poll question
     */
    getPollQuestion(){

    }

    /**
     * sets the current poll question
     * @param {MultipleChoiceQuestion} question
     * @returns {boolean} true on success, false on failure
     */
    setPollQuestion(question){

    }

    /**
     * returns the current poll id, which is set from the database
     * @returns {int} the current pollid, set from the database
     */
    getPollId(){

    }

    /**
     * sets the current poll id from the database
     * @param {int} id
     * @returns {boolean} true on success, false on failure
     */
    setPollId(id){

    }

    /**
     * handles incoming poll responses from clients and stores them
     * @param {int} response a response from the client, corresponding to a question option index
     * @returns {boolean} true on success, false on failure
     */
    handlePollResponse(response){

    }

}