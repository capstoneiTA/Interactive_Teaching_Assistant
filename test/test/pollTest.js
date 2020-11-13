const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;



describe('Poll Creation', function () {

    describe('Teacher creates a poll', function(){
        it('should successfully create a poll in db', function () {
            return axios.post(apiGatewayUrl + '/poll/create', {pollName:'TestPoll', userId: 1}).then(function (res) {
                expect(res.data.pollCreation).to.equal(true);
                console.log("error message: ", res.data.error);
            })
        });
    });
});