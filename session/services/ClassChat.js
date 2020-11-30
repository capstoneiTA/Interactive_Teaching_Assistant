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
    this.namespace = io.of("/" + sessionName);
    this.listen();
  }

  listen() {
    this.namespace.on("connection", (socket) => {
      socket.on("chat message from client", (message) => {
        let data = {
          Session_ID: message.Session_ID,
          Message_Content: message.Message_Content,
          user: message.user,
          replyTo: message.replyTo,
        };
        console.log("DATA", data);
        this.messages.push(data);
        this.namespace.emit("chat message from server", this.messages);
      });
    });
  }

  update(userId, newMessage) {
    console.log("update");
    let data = {};
    data.userId = userId;
    data.newMessage = newMessage;
    this.io.emit("messages", this.messages);
  }

  /**
   * Get message from db
   * @return {string} messages from db
   */
  getMessage() {}

  /**
   * Update message from db
   */
  setMessagesFromDb() {}

  /**
   * Collect message from User
   */
  recieveMessageFromUser() {}
}
module.exports = ClassChat;
