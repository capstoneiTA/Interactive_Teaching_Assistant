const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

describe('Chat creation', function () {

    describe('chat creation', function(){ // should change this test
        it('chat should be created', function () {
            return axios.post(apiGatewayUrl + '/chat/create', {sessionName: 'test'}).then(function (res) {
                expect(res.data.chat_created).to.equal(true);
            })
        });
    });
});

// describe('Message creation', function () {

//     describe('message creation', function(){ // should change this test
//         it('message should be created', function () {
//             return axios.post(apiGatewayUrl + '/chat/create', {userId: 1, sessionId: 2, replyTo: null, messsageContent: 'helloWorld'}).then(function (res) {
//                 expect(res.data).to.equal(true);
//             })
//         });
//     });
// });

