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

describe('sign in user', function () {

    describe('email and password is successful', function(){
        it("api-gateway needs authenticate that the user's email and password ", function () {
            return axios.post(apiGatewayUrl + '/login', {email: "testStudent@email.com" , password: "test"}).then(function (res) {
                console.log(res.data);
               expect(res.data).to.equal(true);
            })
        });
    });

   })