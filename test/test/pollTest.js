const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;
const dbUrl = `http://db:5000`;

let testPoll = {pollName: randomNameGenerator(), pollQuestions: [
        {prompt: randomQuestionGenerator(), options:[{optionText: 'Rock'},{optionText: 'Paper'},{optionText: 'Scissor'}]}
    ]
};

// describe('Poll Creation', function () {
//
//     describe('Teacher creates a poll', function(){
//         it('should successfully create a poll in db', function () {
//             return axios.post(apiGatewayUrl + '/poll/create', {poll: testPoll, userId: 1}).then(function (res) {
//                 expect(res.data.pollCreation).to.equal(true);
//                 expect(res.data.questionAdded).to.equal(true);
//                 expect(res.data.optionAdded).to.equal(true); //some error with the option...
//             })
//         });
//     });
// });

describe('Poll Retrieval', function () {

    describe('Teacher Retrieves Polls', function(){
        it('should successfully retrieve all polls for a given users', function () {
            this.timeout(1000000);
            return axios.get(apiGatewayUrl + '/poll/retrieve', {params: {userId: 1}}).then(function (res) {
                expect(res.data.anyPolls).to.equal(true);
            })
        });
    });

    describe('User with no created polls attempts to retrieve polls', function(){
        it('should return an empty array', function () {
            return axios.get(apiGatewayUrl + '/poll/retrieve', {params: {userId: 2}}).then(function (res) {
                expect(res.data.anyPolls).to.equal(false);
            })
        });
    });

});

// describe('Poll Start', function () {
//
//     describe('Teacher starts a poll', function(){
//         it('should receive a response that the poll listener started or that it is already running', function () {
//             return axios.get(apiGatewayUrl + '/poll/start', {params:{sessionName: 'test'}}).then(function (res) {
//                 expect(res.data.pollListenerStarted).to.equal(true);
//             })
//         });
//     });
//
// });
//
// describe('Save Poll Response', function () {
//     // const sampleResponse = {
//     //     answers:[
//     //         {pollId: 1, questionId: 1, optionId: 1}
//     //     ],
//     // };
//
//     describe('Poll session saves the response sent by the student', function(){
//         it('should save the received poll response to the database', function () {
//             return axios.post(dbUrl + '/poll/responseStore', {userId: 1, response: sampleResponse, sessionId: 1}).then(function (res) {
//                 expect(res.data.responseStored).to.equal(true);
//             })
//         });
//     });
//
// });






/*Helper functions*/

function randomNameGenerator() {
    let name = 'testPoll' + Math.random().toString(36).slice(2);
    return name;
}

function randomQuestionGenerator() {
    let question = 'Which one will win?' + Math.random().toString(36).slice(2);
    return question;
}