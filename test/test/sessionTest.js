const expect = require('chai').expect;
const axios = require('axios');

/**
 * Naming scheme: http://[Container Name]:[Container Port]
 */
const sessionUrl = `http://session:7000`;

describe('Session Connection Key Check', function () {
    it(`Should return 'session connected' if connected with correct key`, function () {
        return axios.post(sessionUrl + '/connectionTest', {key:1234}).then(function (res) {
            expect(res.data).to.equal('session connected');
        });
    });
});



