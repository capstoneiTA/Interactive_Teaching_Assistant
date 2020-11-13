const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

function randomNameGenerator() {
    let name = 'test' + Math.random().toString(36).slice(2);
    return name;
}

describe('Poll Creation', function () {

    describe('Teacher creates a poll', function(){
        it('should successfully create a poll in db', function () {
            return axios.post(apiGatewayUrl + '/poll/create', {pollName:randomNameGenerator() + 'TestPoll', userId: 1}).then(function (res) {
                expect(res.data.pollCreation).to.equal(true);
            })
        });
    });
});