class Report {
    /**
     * Represents a Report object that holds session info/stats
     * @constuctor 
     * @param {ClassChat} ClassChat - ClassChat object containing messages
     */
    constructor(ClassChat) {
        this.understandingMeters = [];
        this.polls = [];
        this.quizzes = [];
        this.sessionChat = ClassChat;
    }

    /**
     * method to retrieve understanding meters 
     * @returns {UnderstandingMeter[]}
     */
    getUnderstandingMeters() {

    }

    /**
     * method to retrieve polls 
     * @returns {Poll[]}
     */
    getPolls() {

    }

    /**
     * method to retrieve quizzes
     * @returns {Quiz[]}
     */
    getQuizzes() {

    }

    /**
     * method to retrieve session chat
     * @returns {ClassChat}
     */
    getSessionChat() {

    }
}