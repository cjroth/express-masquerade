var path = require('path');
var express = require('express');
var request = require('supertest');
var should = require('should');
var masquerade = require('..');

describe('masquerade()', function() {

  it('should not affect the current user when the x-masquerade-as header is not set', function(done) {
    var app = createServer();
    request(app)
      .get('/profile')
      .end(function(err, res) {
        res.body.id.should.equal(1);
        done();
      });
  });

  it('should set the current user to the specified user when the x-masquerade-as header is set', function(done) {
    var app = createServer();
    request(app)
      .get('/profile')
      .set('x-masquerade-as', 2)
      .end(function(err, res) {
        res.body.id.should.equal(2);
        done();
      });
  });

  it('should work with custom header names', function(done) {
    var app = createServer({ header: 'masquerading-as' });
    request(app)
      .get('/profile')
      .set('masquerading-as', 2)
      .end(function(err, res) {
        res.body.id.should.equal(2);
        done();
      });
  });

  it('should ignore x-masquerade-as header if optional authorization function returns false', function(done) {
    var authorize = function(req) {
      return req.user.role === 'admin';
    };
    var app = createServer({ authorize: authorize });
    request(app)
      .get('/profile')
      .set('x-masquerade-as', 2)
      .end(function(err, res) {
        res.body.id.should.equal(1);
        done();
      });
  });

});

function createServer(options) {

  var app = express();

  app.use(function(req, res, next) {
    req.user = {
      id: 1,
      role: 'user',
      name: 'Chris'
    };
    next();
  });

  app.use(masquerade(function(id, done) {
    var user = {
      id: 2,
      role: 'user',
      name: 'Not Chris'
    };
    done(null, user);
  }, options));

  app.get('/profile', function(req, res, next) {
    res.json(req.user);
  });

  return app;

}