const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

let testQuiz = {quizName: 'My First Quiz', quizQuestions: [
        {prompt: 'What color is the sky?', options: ['Blue', 'Green', 'Red', 'Purple'], corrects: [true, false, false, false]},
        {prompt: 'What color is grass?', options: ['Blue', 'Green', 'Red', 'Purple'], corrects: [false, true, false, false]},
        {prompt: 'What color is dirt?', options: ['Blue', 'Brown', 'Red', 'Purple'], corrects: [false, true, false, false]},
        {prompt: 'How many states are in the USA?', options: ['50', '10000', '3', '19'], corrects: [true, false, false, false]},
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
            return axios.get(apiGatewayUrl + '/quiz/retrieve', {params: {userId: 1}}).then(function (res) {
                console.log(res.data);
                expect(res.data).to.equal(true);
            })
        });
    });

    // describe('User with no created quizzes attempts to retrieve quizzes', function(){
    //     it('should return an empty array', function () {
    //         return axios.get(apiGatewayUrl + '/quiz/retrieve', {params: {userId: 2}}).then(function (res) {
    //             expect(res.data.anyQuizzes).to.equal(false);
    //         })
    //     });
    // });

});



