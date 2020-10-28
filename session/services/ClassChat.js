class ClassChat {

    /**
     * Creating a chat class (Will have to load messages from database)
     * @constructor
     *
     */
    constructor(sessionName, io) {
        this.messages = ['hello', 'goodbye'];
        this.history = {};
        this.io = io;
        this.sessionName = sessionName;
        this.namespace = io.of('/' + sessionName);
        this.listen();

    }

    listen() {
        this.namespace.on('connection', (socket)=>{
            this.namespace.emit('plswork', 'Helloworld')
            console.log('socket has joined chat')
            socket.on('chat update', (userId,  newMessage) => {

                console.log('ChatUpdate')
                this.update(userId, newMessage);
            
            });

    })


}

    update(userId, newMessage){
        console.log('update')
        let data = {};
        data.userId= userId;
        data.newMessage = newMessage;
        this.namespace.emit('messages', this.messages);
    }

    /**
     * Get message from db
     * @return {string} messages from db
     */
    getMessage() {

    }

    /**
     * Update message from db
     */
    setMessagesFromDb() {

    }

    /**
     * Collect message from User
     */
    recieveMessageFromUser() {

    }

}
module.exports = ClassChat;