# Quaderno Server

[![Build Status](https://travis-ci.org/mikemaccana/quaderno-server.png)](https://travis-ci.org/mikemaccana/quaderno-server)

## Installation

This is a small module designed for node.js servers to help calculate JSON web tokens (JWTs) for one-off charges in [Quaderno JS](http://quaderno.io).

## Usage

    var quadernoServer = require('quaderno-server')(quadernoSecretKey);

### Getting a web token

There are two options:

 - __amount__ Number, required. Whole number, in cents / pence / eurocents etc.
 - __currency__ String, defaults to 'USD'. ISO_4217 currency code. See http://en.wikipedia.org/wiki/ISO_4217
 - __description__ String, optional. The statement you want to show on your receipt. https://quaderno.io/docs/guides/charge-form/
 - __date__ Date, optional (default current time)

Run it with:

    var jsonWebToken = quadernoServer.getJSONWebToken(amount, currency, description, date)

This will return JSONWebToken:String, which you can use in createCharge() in 

### Getting a web token for PayPal subscriptions

There are two options:

 - __amount__ Number, required. Whole number, in cents / pence / eurocents etc.
 - __currency__ String, defaults to 'USD'. ISO_4217 currency code. See http://en.wikipedia.org/wiki/ISO_4217
 - __unit__  String, required. Defaults to M.  Specify the units of the subscription frequency (D, W, M, Y)
 - __duration__ Number, required. Defaults to 1. Specify the subscription frequency, eg: 1, 2, 3, 6, 12, 18, 24 etc
 - __description__ String, optional. The statement you want to show on your receipt. https://quaderno.io/docs/guides/charge-form/
 - __date__ Date, optional (default current time)

Run it with:

    var jsonWebToken = quadernoServer.getJSONPayPalSubWebToken(amount, currency, unit, duration, description, date)

This will return JSONWebToken:String, which you can use in createSubscription() in 

## Tests

Run `mocha`
