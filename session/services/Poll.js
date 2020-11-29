/**
 * Class representing an individual poll
 */
const axios = require('axios');
class Poll {

    /**
     * Represents a poll which can hold multiple choice, fill in the blank, and open ended questions
     * @constructor
     */
    constructor(sessionName, io) {
        this.sessionName = sessionName;
        this.io = io;
        this.namespace = io.of('/' + sessionName);
        this.listen();
    }

    //Create a listener here and a function to handle connections from students then send to teacher
    listen(){
        this.namespace.on('connection', (socket)=>{
            socket.on('teacher start poll', (teacherSocketId, poll) => {
                this.handleStartPoll(teacherSocketId, poll);
            });
            socket.on('student submit poll', (answersInfo, userId, sessionId)=>{
                this.handleStudentSubmitPoll(answersInfo, userId, sessionId);
            })
        });
    }

    handleStartPoll(teacherSocketId, poll){
        this.namespace.emit('poll for students', teacherSocketId, poll);
    }

    handleStudentSubmitPoll(answersInfo, studentId, sessionId) {
        const dbUrl = `http://db:5000`;
        //Send the student submission to the teacher
        this.namespace.emit('poll submission from student', answersInfo, studentId, sessionId);

        //Save student submission to the database
        console.log("Saving student response from studentId: " + studentId)
        axios.post(dbUrl + '/poll/responseStore', {userId: studentId, response: answersInfo, sessionId: sessionId}).then(function (res) {
            console.log("Student Response recorded: " + res.data.responseStored);
        })
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

module.exports = Poll;