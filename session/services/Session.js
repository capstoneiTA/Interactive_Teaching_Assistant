/**
 * Class representing an individual class session
 */
class Session {
    /**
     * @param sessionName the name of the session, used to join
     * @param owner the name of the user who created the session
     * @param report report object holding class session information
     */
    constructor(sessionName, io) {
        this.students = [];
        this.teachers = [];
        this.io = io;
        this.sessionName = sessionName;
        this.namespace = io.of('/' + sessionName);
        this.startTime = Math.floor(new Date().getTime() /1000);
        this.listen();
    }
    /**
     * calculates the time from session start to the current time in seconds
     * @returns {int} elapsed time in seconds
     */
    getElapsedTime(){
        let currentTime = Math.floor(new Date().getTime() /1000);
        return currentTime - this.startTime;
    }

    /**************SOCKET.IO HANDLING******************/
    listen (){
        this.namespace.on('connection', (socket)=>{
            let userId;
            let type;

            // initialize values
            socket.on('session init', (firstName, lastName, userType, User_ID, sockId) =>{
                if(sockId === socket.id){
                    userId = User_ID;
                    type = userType;
                }
                this.handleInitUser(firstName, lastName, type, userId, sockId);
            });

            //Disconnection
            socket.on('disconnect', (reason) => {
                if(userId !== undefined){
                    this.handleDisconnect(reason, userId, type, socket);
                }
            });
            }

        );
    }


    /**
     * Collects user info on connection and stores it for usage
     * @param firstName first name of user
     * @param lastName last name of user
     * @param type type of user (Student or Teacher)
     * @param userId (User_ID from database)
     * @param sockId (socket id of user)
     */
    handleInitUser(firstName, lastName, type, userId, sockId){
        let user = {};
        user.firstName = firstName;
        user.lastName = lastName;
        user.userId = userId;
        user.sockId = sockId;

        let idFound = false;
        if(type === 'Teacher'){
            for(let i = 0; i < this.teachers.length; i ++){
                if(this.teachers[i].userId === userId){
                    idFound = true;
                }
            }
            if(!idFound){
                this.teachers.push(user);
            }
        }else{
            for(let i = 0; i < this.students.length; i ++){
                if(this.students[i].userId === userId){
                    idFound = true;
                }
            }
            if(!idFound){
                this.students.push(user);
            }
        }
        this.namespace.emit('teacherList', this.teachers);
        this.namespace.emit('studentList', this.students);
    }

    /**
     * Handles user disconnection from the session
     * Removes user info from the session lists and broadcasts the new user list to clients
     * @param reason reason for disconnection
     * @param userId user id of user
     * @param type type of user (Student or Teacher)
     */
    handleDisconnect(reason, userId, type){

        if(type === 'Teacher'){
            //Remove user from the teachers list
            for(let i = 0; i < this.teachers.length; i++){
                if(this.teachers[i]['userId'] === userId ){
                    this.teachers.splice(i, 1);
                }
            }
            //Remove from teacherList of all clients
            this.namespace.emit('teacherList', this.teachers);
        }else{
            //Remove user from the students list
            for(let i = 0; i < this.students.length; i++){
                if(this.students[i]['userId'] === userId ){
                    this.students.splice(i, 1);
                }
            }
            //Remove from teacherList of all clients
            this.namespace.emit('studentList', this.students);
        }
    }
}

module.exports = Session;