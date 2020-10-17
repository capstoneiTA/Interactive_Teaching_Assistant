const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

describe('Record Meter Change', function () {

    describe('student send update', function(){
        it('student change should successfully record in db', function () {
            return axios.post(apiGatewayUrl + '/uMeter/update', {sessionId: 1, userId: 2, uValue: 3, timeStamp: 50}).then(function (res) {
                console.log(res.data);
                expect(res.data.uChangeAdd).to.equal(true);
            })
        });
    });
});