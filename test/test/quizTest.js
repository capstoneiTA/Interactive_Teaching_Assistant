const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;
const dbUrl = `http://db:5000`;

let testQuiz = {quizName: 'My First Quiz', quizQuestions: [


        {prompt: 'What color is the sky?', options: [{optionText: 'Blue', isCorrect: true}, {optionText: 'Green', isCorrect: false}, {optionText: 'Red', isCorrect: false}, {optionText: 'Purple', isCorrect: false}]},
        {prompt: 'What color is grass?', options: [{optionText: 'Blue', isCorrect: false}, {optionText: 'Green', isCorrect: true}, {optionText: 'Red', isCorrect: false}, {optionText: 'Purple', isCorrect: false}]},
        {prompt: 'What color is dirt?', options: [{optionText: 'Blue', isCorrect: false}, {optionText: 'Brown', isCorrect: true}, {optionText: 'Red', isCorrect: false}, {optionText: 'Purple', isCorrect: false}]},
        {prompt: 'How many states are in the USA?', options: [{optionText: '50', isCorrect: true}, {optionText: '1', isCorrect: false}, {optionText: '2', isCorrect: false}, {optionText: '3', isCorrect: false}]},
    ]
};

describe('Quiz Creation', function () {

    describe('Teacher creates a quiz', function(){
        it('should successfully enter quiz json into the database', function () {
            return axios.post(apiGatewayUrl + '/quiz/create', {userId: 1, quiz:testQuiz, quizType: 'Multiple Choice'}).then(function (res) {
                expect(res.data.questionsCreate).to.equal(true);
            })
        });
    });

});

describe('Quiz Retrieval', function () {

    describe('Teacher Retrieves Quizzes', function(){
        it('should successfully retrieve all quizzes for a given users', function () {
            this.timeout(10000);
            return axios.get(apiGatewayUrl + '/quiz/retrieve', {params: {userId: 1}}).then(function (res) {
                expect(res.data.anyQuizzes).to.equal(true);
            })
        });
    });

    describe('User with no created quizzes attempts to retrieve quizzes', function(){
        it('should return an empty array', function () {
            return axios.get(apiGatewayUrl + '/quiz/retrieve', {params: {userId: 2}}).then(function (res) {
                expect(res.data.anyQuizzes).to.equal(false);
            })
        });
    });

});

describe('Quiz Start', function () {

    describe('Teacher starts a quiz', function(){
        it('should receive a response that the quiz listener started or that it is already running', function () {
            return axios.get(apiGatewayUrl + '/quiz/start', {params:{sessionName: 'test'}}).then(function (res) {
                expect(res.data.quizListenerStarted).to.equal(true);
            })
        });
    });

});

describe('Save Quiz Response', function () {
    const sampleResponse = {
        answers:[
            {questionId: 73, answerId: 165},
            {questionId: 74, answerId: 169},
            {questionId: 75, answerId: 171},
        ],
        quizId: 43
    };

    describe('Quiz session saves the response sent by the student', function(){
        it('should save the received quiz response to the database', function () {
            return axios.post(dbUrl + '/quiz/responseStore', {userId: 1, response: sampleResponse, sessionId: 317}).then(function (res) {
                expect(res.data.responseStored).to.equal(true);
            })
        });
    });

});



