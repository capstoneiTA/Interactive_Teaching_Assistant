const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;
const apiGatewayUrl = `http://api-gateway:8080`;

function randomNameGenerator() {
    let name = 'test' + Math.random().toString(36).slice(2);
    return name;
}

const sameSessionName = randomNameGenerator();

describe('Session Creation', function () {

    describe('teacher verification success', function(){
        it('api-gateway should successfully verify teacher', function () {
            return axios.post(apiGatewayUrl + '/session/create', {sessionName: randomNameGenerator(), CreatedBy:1}).then(function (res) {
                expect(res.data.verified).to.equal(true);
            })
        });
    });

    describe('student verification failure', function(){
        it('api-gateway should reject non-teacher from creating a session', function () {
            return axios.post(apiGatewayUrl + '/session/create', {sessionName: randomNameGenerator(), CreatedBy: 2}).then(function (res) {
                expect(res.data.verified).to.equal(false);
            })
        });
    });

    describe('session add to database', function(){
        it('database should indicate that session info was successfully added', function () {
            return axios.post(apiGatewayUrl + '/session/create', {sessionName: sameSessionName, CreatedBy: 1}).then(function (res) {
                expect(res.data.dbAdd).to.equal(true);
            })
        });
    });

    describe('session not add duplicate name', function(){
        it('database should return an error if the session name already exists', function () {
            return axios.post(apiGatewayUrl + '/session/create', {sessionName: sameSessionName, CreatedBy: 1}).then(function (res) {
                expect(res.data.dbAdd).to.equal('Validation error');
            })
        });
    });



});

describe('Session Join', function(){
    describe(`Can enroll in session if not enrolled`, function(){
        it(`database should enroll client in a session if they aren't enrolled yet`, function () {
            return axios.post(apiGatewayUrl + '/session/join', {sessionName: sameSessionName, userId: 2}).then(function (res) {
                expect(res.data.dbAdd).to.equal(true);
            })
        });
    });

    describe(`Can't enroll in session if already enrolled`, function(){
        it(`database should not enroll client in a session if they are already enrolled`, function () {
            return axios.post(apiGatewayUrl + '/session/join', {sessionName: sameSessionName, userId: 2}).then(function (res) {
                expect(res.data.dbAdd).to.equal(false);
            })
        });
    });

    describe(`Can join existing session`, function(){
        it('database should tell the client when the session does exist', function () {
            return axios.post(apiGatewayUrl + '/session/join', {sessionName: sameSessionName, userId: 2}).then(function (res) {
                expect(res.data.sessionExists).to.equal(true);
            })
        });
    });

    describe(`Can't join non-existing session`, function(){
        it('database should tell the client when a session does not exist', function () {
            return axios.post(apiGatewayUrl + '/session/join', {sessionName: 'fakesessionName12345', userId: 2}).then(function (res) {
                expect(res.data.sessionExists).to.equal(false);
            })
        });
    });



});