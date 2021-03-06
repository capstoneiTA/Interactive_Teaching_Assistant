/**
 * Class representing an individual FillInTheBlankQuestion
 */
class FillInTheBlankQuestion {

    /**
     *
     * @param {string} prompt a question prompt
     * @param {int} answer index of the correct option. Will be -1 if no answer is necessary.
     */
    constructor(prompt, answer) {
        this.prompt = prompt;
        this.answer = answer;
    }

    /**
     * get the prompt string
     * @returns {string} prompt text
     * */
    getPrompt(){

    }

    /**
     * set the question prompt text
     * @param {string} promptText text for the question prompt
     * @returns {boolean} true on success, false on failure
     */
    setPrompt(promptText){

    }

    /**
     * get the prompt answer
     * @returns {int} answer index, corresponding to the options list
     * */
    getAnswer(){

    }

    /**
     * sets the correct option index
     * @param {int} answer
     * @returns {boolean} true on success, false on failure
     */
    setAnswer(answer){

    }

}