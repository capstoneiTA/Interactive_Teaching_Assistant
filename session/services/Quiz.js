class Quiz {
    /**
     * Represents a quiz which can hold multiple choice, fill in the blank, and open ended questions
     * @constructor
     */
    constructor() {
        this.multipleChoiceQs = [];
        this.fillInTheBlankQs = [];
        this.openEndedQs = [];
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