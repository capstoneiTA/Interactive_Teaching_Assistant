const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

function randomEmailGenerator() {
    let email = 'test' + Math.random().toString(36).slice(2) + '@email.com';
    return email;
}

const generatedEmail = randomEmailGenerator();

describe('sign up user', function () {

    describe('user successfully signs up', function(){
        it("if email is unique, user successfully signs up", function () {
            return axios.post(apiGatewayUrl + '/signup', {email: generatedEmail , password: "password", firstName: 'test', lastName: 'test', type: 'Student'}).then(function (res) {
                expect(res.data.dbAdd).to.equal(true);
            })
        });
    });

    describe('no duplicate emails', function(){
        it("if email is not unique, user receives error", function () {
            return axios.post(apiGatewayUrl + '/signup', {email: "test@email.com" , password: "password", firstName: 'test', lastName: 'test', type: 'Student'}).then(function (res) {
                expect(res.data.errors[0].message).to.equal('Users.Email must be unique');
            })
        });
    });
});

describe('login user', function () {

    describe('email and password is successful', function(){
        it("api-gateway needs authenticate that the user's email and password ", function () {
            return axios.post(apiGatewayUrl + '/login', {email: "test4@email.com" , password: "password"}).then(function (res) {
               expect(res.data.success).to.equal(true);
            })
        });
    });

});
describe('wrong password', function () {

    describe('it will check if both the password and email match the account', function(){

        it("api-gateway needs to handle a correct email but wrong password ", function (){
            return axios.post(apiGatewayUrl + '/login', {email: "test4@email.com" , password: "wrongPassword"}).then(function (res) {
                expect(res.data).to.equal('failure');
            })
        });
    });

});