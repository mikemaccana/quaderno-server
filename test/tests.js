// Tests. Mocha/assert style. See
// http://visionmedia.github.com/mocha/
// http://nodejs.org/docs/latest/api/assert.html

var assert = require('assert')

var pretendStripeAccessToken = 'abcdef123'

var quaderoServer = require('../index.js')(pretendStripeAccessToken)

var log = console.log.bind(console)

var testPrice = 1000

var testProductDesc = 'Test Product'

var testCurrency = 'USD'

var testSubscriptionUnit = 'M'

var testSubscriptionDuration = 3

var testResult = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhbW91bnQiOjEwMDAsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJUZXN0IFByb2R1Y3QiLCJpYXQiOjE0MjE3Njc1ODd9.xvaR5O4ld6Np0oGJ7DbJd-Rn-lkLQx30nHnuXxs82Zg'

var testPayPalResult = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhbW91bnQiOjEwMDAsImN1cnJlbmN5IjoiVVNEIiwic3Vic2NyaXB0aW9uX3VuaXQiOiJNIiwic3Vic2NyaXB0aW9uX2R1cmF0aW9uIjozLCJkZXNjcmlwdGlvbiI6IlRlc3QgUHJvZHVjdCIsImlhdCI6MTQyMTc2NzU4N30.4Y8YpvR_0-bcdoQM9LEMfqwCQ9CqWWm4iFazcSUSwFo'

suite('quaderoServer', function(){

	suite('token encoding', function(){
		test('encodes the payload accurately', function(){
			var token = quaderoServer.getJSONWebToken(testPrice, testCurrency, testProductDesc, new Date(1421767587931) )
			assert.equal(token, testResult);
		});
		test('decodes the payload accurately', function(){
			var payload = quaderoServer.decodeJSONWebToken(testResult)
			assert.deepEqual(payload, {
				"amount": testPrice,
				"currency": testCurrency,
                "description": testProductDesc,
				"iat": 1421767587
			});
		});
	});
	suite('token encoding for paypal subscriptions', function(){
		test('encodes the payload accurately', function(){
			var token = quaderoServer.getJSONPayPalSubWebToken(testPrice, testCurrency, testSubscriptionUnit, testSubscriptionDuration, testProductDesc, new Date(1421767587931) )
			assert.equal(token, testPayPalResult);
        });
		test('decodes the payload accurately', function(){
			var payload = quaderoServer.decodeJSONPayPalSubWebToken(testPayPalResult)
			assert.deepEqual(payload, {
				"amount": testPrice,
				"currency": testCurrency,
                "subscription_unit": testSubscriptionUnit,
                "subscription_duration": testSubscriptionDuration,
                "description": testProductDesc,
				"iat": 1421767587
			});
		});
	});
});
