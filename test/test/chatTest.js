const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

describe('Chat creation', function () {

    describe('chat creation', function(){ // should change this test
        it('chat should be created', function () {
            return axios.post(apiGatewayUrl + '/chat/join', {sessionName: 'test'}).then(function (res) {
                expect(res.data.chat_created).to.equal(true);
            })
        });
    });
});

describe('chat update', function () {

    describe('message creation', function(){ // should change this test
        it('message should be created', function () {
            return axios.post(apiGatewayUrl + '/chat/update', {userId: 1, sessionId: 2, replyTo: null, messageContent: 'helloWorld'}).then(function (res) {
                // console.log(res.data)
                expect(res.data.messageContent).to.equal('helloWorld');
                // expect(res.data.name).to.equal('Helloworld');
                // expect(res.data.message).to.equal('Helloworld');
                // expect(res.data.message).to.equal('Helloworld');
            })
        });
    });
});

// describe('chat get', function () {

//     describe('chat get', function(){ // should change this test
//         it('chat should be returned', function () {
//             return axios.get(apiGatewayUrl + '/chat', {
//                 params: {
//                     sessionId: 2
//                 }
//             }).then(function (res) {
//                 console.log(res.data)
//                 expect(res.data.messages).to.equal([])
//         });
//     });
// });
// });

