class UnderstandingMeter{

    /**
    * Creating an understanding meter class
    * @constructor
    * @param {int} score - the score from student
    * @param {string} user - name of the user
    * @param {object} history - record changes {K = time: V = {score:int}}
    * */

    constructor(score, user, history) {
        this.score = score;
        this.user = user;
        this.history = history;

        this.io = io;
        this.sessionName = sessionName;
        this.namespace = io.of('/' + sessionName);
    }

    //Create a listener here and a function to handle connections from students then send to teacher
    listen() {
        this.namespace.on('connect', this.handleConnection);
    }

    handleConnection = (socket) => {
        socket.join(this.namespace); //Join the proper room

        //TODO meter update socket.on
        socket.on('update', (param) => {
            this.update();
        });
    };

    update(){
        //TODO EMIT data to teacher meter

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