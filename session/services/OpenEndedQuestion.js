/** The OpenEndedQuestion class defines the prompts (question) that will be received
 and set from the database
 */
class OpenEndedQuestion{
    /**
      *Choose and display openEnded question
      *@param {string} prompt - The question or statement that will be displayed
    */

    constructor(prompt)
    {
        this.prompt = prompt;
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