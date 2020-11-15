const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

let testPoll = {pollName: "Test poll", pollQuestions: [
        {prompt: 'Which one will win?', options:[{optionText: 'Rock'},{optionText: 'Paper'},{optionText: 'Scissor'}]}
    ]
};

describe('Poll Creation', function () {

    describe('Teacher creates a poll', function(){
        it('should successfully create a poll in db', function () {
            return axios.post(apiGatewayUrl + '/poll/create', {poll: testPoll, userId: 1}).then(function (res) {
                expect(res.data.pollCreation).to.equal(true);
            })
        });
    });
});