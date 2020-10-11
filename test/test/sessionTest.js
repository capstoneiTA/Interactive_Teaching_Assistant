const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;
const apiGatewayUrl = `http://api-gateway:8080`;

describe('Session Creation', function () {

    describe('teacher verification success', function(){
        it('api-gateway should successfully verify teacher', function () {
            return axios.post(apiGatewayUrl + '/session/create', {sessionName: 'testSession', CreatedBy:1}).then(function (res) {
                expect(res.data).to.equal(true);
            })
        });
    });

    describe('student verification failure', function(){
        it('api-gateway should reject non-teacher from creating a session', function () {
            return axios.post(apiGatewayUrl + '/session/create', {sessionName: 'testSession', CreatedBy: 2}).then(function (res) {
                expect(res.data).to.equal(false);
            })
        });
    });

});