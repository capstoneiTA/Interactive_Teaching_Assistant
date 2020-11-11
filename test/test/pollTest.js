const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;



describe('Poll Creation', function () {

    describe('Teacher creates a poll', function(){
        it('should sucessfully create a poll in db', function () {
            return axios.post(apiGatewayUrl + '/poll/create', {userId: 1, pollName:'TestPoll'}).then(function (res) {
                expect(res.data.questionsCreate).to.equal(true);
            })
        });
    });
});