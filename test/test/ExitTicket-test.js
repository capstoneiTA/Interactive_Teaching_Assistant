const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

describe('Exit Ticket Create', function () {

    describe('will create exit ticket for teacher ', function(){
        it("create exit ticket" , function () {
            return axios.post(apiGatewayUrl + '/ExitTicket/create', {quizName: "test", prompt: "testPrompt", userId: "1", quizType:"Exit Ticket"}).then(function (res) {
                console.log(res.data);
                expect(res.data.ExitAdd).to.equal(true);
            })
        });
    });
  });