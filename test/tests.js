// Tests. Mocha/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

var assert = require('assert')

var pretendStripeAccessToken = 'abcdef123'

var quaderoServer = require('quaderno-server')(pretendStripeAccessToken);

var log = console.log.bind(console)

var testPrice = 1000

var testResult = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhbW91bnQiOjEwMDAsImN1cnJlbmN5IjoiVVNEIiwiaWF0IjoxNDIxNzY3NTg3fQ.OQB-3M7OMalZPJDcgzMrTRM7JrNUvUqjaRWm_7fj8Po'

suite('quaderoServer', function(){

	suite('token encoding', function(){
		test('encodes the payload accurately', function(){
			var token = quaderoServer.getJSONWebToken(testPrice, 'USD', new Date(1421767587931) )
			assert.equal(token, testResult);
		});
		test('decodes the payload accurately', function(){
			var payload = quaderoServer.decodeJSONWebToken(testResult)
			assert.deepEqual(payload, {
				"amount": testPrice,
				"currency": "USD",
				"iat": 1421767587
			});
		});
	});
});
