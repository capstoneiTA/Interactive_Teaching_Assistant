const expect = require("chai").expect;
const axios = require("axios");

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const apiGatewayUrl = `http://api-gateway:8080`;

describe("Chat creation", function () {
  describe("chat creation", function () {
    // should change this test
    it("chat should be created", function () {
      return axios
        .post(apiGatewayUrl + "/chat/join", { sessionName: "test" })
        .then(function (res) {
          expect(res.data.chat_created).to.equal(true);
        });
    });
  });
});

describe("message Create", function () {
  describe("message creation", function () {
    // should change this test
    it("message should be created", function () {
      return axios
        .post(apiGatewayUrl + "/messages/create", {
          userId: 1,
          sessionId: 2,
          replyTo: null,
          messageContents: "helloWorld",
        })
        .then(function (res) {
          console.log(res);
          // console.log(res.data)
          expect(res.data.messageCreation).to.equal(true);
          expect(res.data.messageContents).to.equal("helloWorld");
          // expect(res.data.name).to.equal('Helloworld');
          // expect(res.data.message).to.equal('Helloworld');
          // expect(res.data.message).to.equal('Helloworld');
        });
    });
  });
});

describe("message GET", function () {
  describe("get messages from a specific session", function () {
    // should change this test
    it("messages from session should be retreieved", function () {
      return axios
        .get(apiGatewayUrl + "/messages/get", {
          params: {
            sessionId: 2,
          },
        })
        .then(function (res) {
          console.log(res);
          // console.log(res.data)
          expect(res.data.messages[0].Message_Content).to.equal("helloWorld");
          expect(res.data.messages[0].User_ID).to.equal(1);
          expect(res.data.messages[0].Session_ID).to.equal(2);
        });
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
