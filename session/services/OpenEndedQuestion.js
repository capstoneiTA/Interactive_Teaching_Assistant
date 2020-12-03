/** The OpenEndedQuestion class defines the prompts (question) that will be received
 and set from the database
 */
class OpenEndedQuestion{
    /**
      *Choose and display openEnded question
      *@param {string} prompt - The question or statement that will be displayed
    */
    /*
        socket connection for Exit Tickets
    */
    constructor(sessionName, io)
    {
        this.sessionName = sessionName;
        this.io = io;
        this.namespace = io.of('/' + sessionName);
        this.listen();
    }

     //Create a listener here and a function to handle connections from students then send to teacher
    listen(){
        this.namespace.on('connection', (socket)=>{
            socket.on('teacher start exit', (teacherSocketId, quiz) => {
                this.handleStartQuiz(teacherSocketId, quiz);
            });

            socket.on('student submit exit', (sessionId, userId, answersInfo) =>{
              console.log("Student" + userId);
              console.log("Student responded " + answersInfo);
               this.handleSubmitExit(sessionId,userId,answersInfo);

            })
        });
    }

    handleStartQuiz(teacherSocketId, quiz){
        this.namespace.emit('exit for students', teacherSocketId, quiz);
    }

    handleSubmitExit(sessionId,studentId,answersInfo){
        const dbUrl = 'http://db:5000';
       //Send the student submission to the teacher
       this.namespace.emit('exit ticket submission from student', sessionId, studentId, answersInfo);

       console.log("Saving student response to be  " + answersInfo)
    }
     /**
      * Get the prompt string.
      * @return {string} The question/statement that will be responsible to connect with DB.
      */
    getPrompt(){
    return this.prompt;
    }

    /**
    * Set the question/statement.
    */
    setPrompt(prompt){
    return this.prompt;
    }

}
module.exports =  OpenEndedQuestion;