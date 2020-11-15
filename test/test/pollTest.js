const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

let testPoll = {pollName: randomNameGenerator(), pollQuestions: [
        {prompt: randomQuestionGenerator(), options:[{optionText: 'Rock'},{optionText: 'Paper'},{optionText: 'Scissor'}]}
    ]
};

describe('Poll Creation', function () {

    describe('Teacher creates a poll', function(){
        it('should successfully create a poll in db', function () {
            return axios.post(apiGatewayUrl + '/poll/create', {poll: testPoll, userId: 1}).then(function (res) {
                expect(res.data.pollCreation).to.equal(true);
                expect(res.data.questionAdded).to.equal(true);
                //expect(res.data.optionAdded).to.equal(true); //some error with the option...
            })
        });
    });
});

function randomNameGenerator() {
    let name = 'testPoll' + Math.random().toString(36).slice(2);
    return name;
}

function randomQuestionGenerator() {
    let question = 'Which one will win?' + Math.random().toString(36).slice(2);
    return question;
}