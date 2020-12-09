const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

describe('Understanding Meter Change', function () {

    describe('student send update', function(){
        it('student change should successfully record in db', function () {
            return axios.post(apiGatewayUrl + '/uMeter/update', {sessionId: 1, userId: 2, uValue: 3, timeStamp: 50}).then(function (res) {
                expect(res.data.uChangeAdd).to.equal(true);
            })
        });
    });
});

describe('Understanding Meter Create', function () {

    describe('Understanding meter created by someone enrolled', function(){
        it(`if a student is enrolled in the session, they should be allowed to create the understanding meter`, function () {
            return axios.post(apiGatewayUrl + '/uMeter/create', {sessionId: 149, userId: 1}).then(function (res) {
                expect(res.data.isEnrolled).to.equal(true);
            })
        });
    });

    describe(`Understanding meter not created by someone who isn't enrolled`, function(){
        it(`if a student is not enrolled in the session, they shouldn't be allowed to create the understanding meter`, function () {
            return axios.post(apiGatewayUrl + '/uMeter/create', {sessionId: 909090, userId: 1}).then(function (res) {
                expect(res.data.isEnrolled).to.equal(false);
            })
        });
    });

    describe(`Understanding meter session name returned if student is enrolled`, function(){
        it(`if a student is enrolled, the session name should be returned`, function () {
            return axios.post(apiGatewayUrl + '/uMeter/create', {sessionId: 149, userId: 1}).then(function (res) {
                expect(res.data.sessionName).to.equal('hello');
            })
        });
    });


});