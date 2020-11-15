const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

// describe('Exit Ticket Create', function () {
//
//    describe('will create exit ticket for teacher ', function(){
//        it("create exit ticket" , function () {
//            return axios.post(apiGatewayUrl + '/ExitTicket/create', { userId: "1", quiz:quiz, quizType:"Exit Ticket"}).then(function (res) {
//                console.log(res.data);
//                expect(res.data.ExitAdd).to.equal(true);
//            })
//        });
//    });
//  });

describe('Exit Ticket Started', function () {

    describe('Teacher presses start', function(){
        it('should receive a response that the quiz listener started or that it is already running', function () {
            return axios.get(apiGatewayUrl + '/ExitTicket/initiate', {params:{sessionName: 'test'}}).then(function (res) {
                expect(res.data.quizListenerStarted).to.equal(true);
            })
        });
    });

});

describe('Exit Ticket exist', function () {

     describe('check if exit/prompt exist ', function(){
         it("check if exit/prompt exist" , function () {
             return axios.get(apiGatewayUrl + '/ExitTicket/question',{params: { userId : "128"}})
              .then(function (res) {
                  expect(res.data.quizzes.length > 0).to.equal(true);
             })
         });
     });
   });

describe('Exit Ticket response', function () {

    describe('response being stored ', function(){
        it("new answer text" , function () {
            return axios.post(apiGatewayUrl + '/ExitTicket/response', { sessionId : 1, questionId: 1, answerText: "my response", userId: 1})
                .then(function (res) {
                    expect(res.data.contentExist).to.equal(true);
                })
        });
    });
});