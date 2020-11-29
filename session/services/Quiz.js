const axios = require('axios');

class Quiz {
    /**
     * Represents a quiz which can hold multiple choice, fill in the blank, and open ended questions
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
            socket.on('teacher start quiz', (teacherSocketId, quiz) => {
                this.handleStartQuiz(teacherSocketId, quiz);
            });
            socket.on('student submit quiz', (answersInfo, userId, sessionId)=>{
                this.handleStudentSubmitQuiz(answersInfo, userId, sessionId);
            })
            socket.on('Teacher end quiz from client', (quizId)=>{
                this.handleTeacherEndQuiz(quizId);
            })
        });
    }

    handleStartQuiz(teacherSocketId, quiz){
        this.namespace.emit('quiz for students', teacherSocketId, quiz);
    }

    handleStudentSubmitQuiz(answersInfo, studentId, sessionId) {
        const dbUrl = `http://db:5000`;
        //Send the student submission to the teacher
        this.namespace.emit('quiz submission from student', answersInfo, studentId, sessionId);

        //Save student submission to the database
        console.log("Saving student response from studentId: " + studentId)
        axios.post(dbUrl + '/quiz/responseStore', {userId: studentId, response: answersInfo, sessionId: sessionId}).then(function (res) {
            console.log("Student Response recorded: " + res.data.responseStored);
        })
    }

    handleTeacherEndQuiz(quizId){
        this.namespace.emit('teacher end quiz from server', quizId);
    }


    /**
     * methed compiles all questions into one list in a random order
     * @returns {QuizQuestion[]} - a QuizQuestion is either a MultipleChoiceQuestion, FillInTheBlankQuestion, or OpenEndedQuestion
     */
    randomizeQuestionOrder() {

    }

    /**
     * method handles a quiz response
     */
    handleQuizResponse() {

    }

    /**
     * method returns multiple choice question array
     * @returns {MultipleChoiceQuestion[]}
     */
    getMultipleChoiceQs() {

    }

    /** 
     * method sets the multiple choice question array
     */
    setMultipleChoiceQs() {

    }

    /**
     * method returns fill in the blank question array
     * @returns {FillInTheBlankQuestion[]} 
     */
    getFillInTheBlankQs() {

    }

    /**
     * method sets the fill in the blank question array
     */
    setFillInTheBlankQs() {

    }

    /**
     * method returns the open ended question array
     * @returns {OpenEndedQuestion}
     */
    getOpenEndedQs() {

    }

    /**
     * method sets the open ended question array
     */
    setOpenEndedQs() {

    }

}

module.exports = Quiz;