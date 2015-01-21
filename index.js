// Server side function for node apps to support Quaderno

// https://github.com/quaderno/quaderno.js
var jwt = require('jwt-simple');

// stripeSecretKeyForQuaderno:String. Obtained from Quaderno via Settings -> Add Ons - > Stripe
module.exports = function(stripeSecretKeyForQuaderno){

	// Make a JSON Web Token
	// See https://github.com/quaderno/quaderno.js#creating-single-charges
	// amount:Number required. Whole number, in cents / pence / eurocents etc.
	// currency:String required. ISO_4217 currency code. See http://en.wikipedia.org/wiki/ISO_4217
	// date:Date optional (default current time). Generally only overridden for testing.
	// Returns JSONWebToken:String
	var getJSONWebToken = function(amount, currency, date){
		// defines the seconds since the UNIX epoch
		if ( ! date ) {
			date = new Date()
		}
		if ( ! currency ) {
			currency = 'USD'
		}
		var issuedAt = Math.floor( date.valueOf() / 1000 );
		var payload = {
		  "amount": amount,
		  "currency": currency,
		  "iat": issuedAt
		}
		return jwt.encode(payload, stripeSecretKeyForQuaderno);
	}

	// Decode a JSON Web Token
	// token:String required
	var decodeJSONWebToken = function(token){
		return jwt.decode(token, stripeSecretKeyForQuaderno);
	}

	return {
		getJSONWebToken: getJSONWebToken,
		decodeJSONWebToken: decodeJSONWebToken
	}
}
