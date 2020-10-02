/** The Message class defines any message sent in the class chat.
 * Messages can be sent, replied to, edited, and deleted
  */
class Message {
    /**
     * Create a message.
     * @param {number} id - The id value.
     * @param {string} content - The content of the message.
     * @param {Message} replyTo - The Message being replied to or Null.
     * @param {User} user - The user who created the message.
     */
    constructor(id, content, replyTo, user){
        this.id = id;
        this.content = content;
        this.replyTo = replyTo;
        this.user = user
        this.createTime = new Date();
    }
    
    /**
     * Get the id value.
     * @return {number} The id value.
     */
    getId(){
        return this.id;
    }

    /**
     * Set the id value.
     * Should be used to delete a message, (id = Null), without deleting replies
     * @param {string} content The content of the message.
     */
    setId(id){
        this.id = id;
    }

    /**
     * Get the content value.
     * @return {string} The content of the message.
     */
    getContent(){
        return this.content;
    }

    /**
     * Set the content value.
     * @param {string} content The content of the message.
     */
    setContent(content){
        this.content = content;
    }

    /**
     * Get the replyTo value.
     * @return {Message} The message being replied to.
     */
    getReplyTo(){
        return this.replyTo;
    }

    /**
     * Get the user value.
     * @return {User} The User who posted the message.
     */
    getUser(){
        return this.user;
    }

    /**
     * Set the user value.
     * Should be used to delete a message, (user = Null), without deleting replies
     * @param {User} user The content of the message.
     */
    setId(user){
        this.user = user;
    }

    /**
     * Get the Date value.
     * @return {Date} The date the message was created or altered.
     */
    getCreateTime(){
        return this.createTime;
    }

    /**
     * Set the createTime value.
     */
    setCreateTime(){
        this.createTime = Date();
    }
}