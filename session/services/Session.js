/**
 * Class representing an individual class session
 */
class Session {
    /**
     * @param sessionName the name of the session, used to join
     * @param owner the name of the user who created the session
     * @param report report object holding class session information
     */
    constructor(sessionName, owner, report, io) {
        this.users = [];
        this.io = io;
        this.sessionName = sessionName;
        this.namespace = io.of('/' + sessionName);
        this.owner = owner;
        this.startTime = new Date();
        this.servicesReport = report;
        this.listen();
    }

    /**
     * gets a list of current users
     * @returns {string[]} a list of users
     */
    getUsers(){

    }

    /**
     * sets the users list
     * @param {string[]} users
     * @returns {boolean} true for success, false for failure
     */
    setUsers(users){

    }

    /**
     * adds a user to the session as well as the users list
     * @param {string} user
     * @returns {boolean} true for success, false for failure
     */
    addUser(user){

    }

    /**
     * gets the name of the user who controls the session
     * @returns {string} owner name
     */
    getOwner(){

    }

    /**
     * sets the name of the user who controls the session
     * @param {string} owner
     * @returns {boolean} true for success, false for failure
     */
    setOwner(owner){

    }

    /**
     * gets the name of the session
     * @returns {string} name of the session
     */
    getSessionName(){

    }

    /**
     * sets the name of the session
     * @param {string} name
     * @returns {boolean} true for success, false for failure
     */
    setSessionName(name){

    }

    /**
     * calculates the time from session start to the current time in seconds
     * @returns {int} elapsed time in seconds
     */
    getElapsedTime(){

    }

    /**************SOCKET.IO HANDLING******************/
    listen() {
        this.namespace.on('connection', this.handleConnection);
    }

    handleConnection = (socket) => {
        socket.join(this.namespace); //Join the proper room

        //Broadcast welcome new users
        //Listen for the 'welcome' from client and broadcast to everyone else, except that user
        socket.on('welcome', (msg, firstName,lastName, id) => {
            this.welcome(msg, firstName, lastName, id);
        });

        //Disconnection
        socket.on('disconnect', (reason, firstName, lastName) => {
            this.disconnect(reason, firstName, lastName);
        });

    };

    welcome(msg, fn, ln, id){
        //broadcast to all current clients except for the newly join with the welcome message
        socket.broadcast.to(this.name).emit('welcome', msg);

        //Check if name is already in online list
        let nameFound = false;
        for(let i = 0; i < this.users.length; i ++){
            if(this.users[i]['firstName'] == firstName && this.users[i]['lastName'] == lastName){
                nameFound = true;
            }
        }

        if(!nameFound){
            let userinfo = {'firstName': firstName, 'lastName': lastName, 'socketid':id};
            this.users.push(userinfo);
        }
        //emit the list of current users to the newly joined client
        this.namespace.emit('userList', this.users);
    }

    disconnect(reason, firstName, lastName){
        socket.broadcast.to(this.namespace).emit('userLeave', `${firstName} left the class`);

        //Remove user from the userlist
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i]['firstName'] === firstName && this.users[i]['lastName'] === lastName){
                this.users.splice(i, 1);
            }
        }

        //Remove from userlist of all clients
        this.namespace.emit('userList', this.users);
    }
}

module.exports = Session;