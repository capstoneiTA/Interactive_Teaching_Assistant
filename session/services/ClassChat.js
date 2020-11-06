class ClassChat {
    // this acts as server

    /**
     * Creating a chat class (Will have to load messages from database)
     * @constructor
     *
     */
    constructor(sessionName, io) {
        this.messages = [];
        this.io = io;
        this.sessionName = sessionName;
        this.namespace = io.of('/' + sessionName);
        this.listen();

    }

    listen() {
        // this is acting as server
        // this.io.sockets.on('connection', function(socket){
        //     socket.on('room', function(room){
        //         socket.join(room);
        //     });
        // });
        
        // let room = this.sessionName
        // this.io.sockets.in(room).emit('message', 'hello everyone');



        this.namespace.on('connection', socket => {
            socket.on('chat message from client', (msg, user)=>{
                console.log(msg, " AND ", user.firstName, " ", user.lastName)
                let data = [msg, user.firstName + ' ' + user.lastName]
                console.log(data)
                this.messages.push(data);
                this.namespace.emit('chat message from server', this.messages);
            })
        })




        // this.io.sockets.on('connection', (socket)=>{
        //     socket.on('ADD_USER', function(userId, sessionName){
        //         socket.userId = userId
        //         socket.room = sessionName
        //         socket.join(sessionName)
        //         socket.emit('UPDATE_CHAT', 'SERVER', 'you have connected to' + sessionName)
        //         socket.broadcast.to(sessionName).emit('updatechat', 'SERVER', userId + ' has connected to this room');
		//         socket.emit('UPDATE_ROOMS', rooms, sessionName);
        //     })

        //     socket.on('SEND_MESSAGE', function (data) {
        //         // we tell the client to execute 'updatechat' with 2 parameters
        //         this.io.sockets.in(socket.room).emit('UPDATE_CHAT', socket.username, data);
        //     });


            // socket.on('disconnect', function(){
            //     // remove the username from global usernames list
            //     delete usernames[socket.usernId];
            //     // update list of users in chat, client-side
            //     io.sockets.emit('updateusers', usernames);
            //     // echo globally that this client has left
            //     socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
            //     socket.leave(socket.room);
            // });




            
            // console.log(socket.id)
            // socket.on('SEND_MESSAGE', function(data){
            //     console.log('RECIEVE MESSAGE')
            //     this.io.emit('RECEIVE_MESSAGE', data)
            // })





            // socket.join(this.sessionName)
            // this.io.to(this.sessionName).emit('ENTERED ROOM')
            // // this.namespace.emit('plswork', 'Helloworld')
            // console.log('socket has joined chat')
            // socket.on('chat update', (userId,  newMessage) => {
            //     this.io.emit('chat update')
            //     console.log('Chat Update!')
            //     this.update(userId, newMessage);
            // });




}

    update(userId, newMessage){
        console.log('update')
        let data = {};
        data.userId= userId;
        data.newMessage = newMessage;
        this.io.emit('messages', this.messages);
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