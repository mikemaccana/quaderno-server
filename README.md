# Quaderno Server

## Installation

This is a small module designed for node.js servers to help calculate JSON web tokens (JWTs) for one-off charges in [Quaderno JS](http://quaderno.io).

## Usage

    var quadernoServer = require('quaderno-server')(quadernoSecretKey);

### Getting a web token

There are two options:

 - __amount__ Number, required. Whole number, in cents / pence / eurocents etc.
 - __currency__ String, defaults to 'USD'. ISO_4217 currency code. See http://en.wikipedia.org/wiki/ISO_4217

    var jsonWebToken = quadernoServer.getJSONWebToken(amount, currency)

THis will return JSONWebToken:String, which you can use in createCharge() in 

## Tests

Run `mocha`
