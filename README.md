# express-masquerade

[![NPM Version](https://img.shields.io/npm/v/express-masquerade.svg?style=flat)](https://www.npmjs.org/package/express-masquerade)
[![NPM Downloads](https://img.shields.io/npm/dm/express-masquerade.svg?style=flat)](https://www.npmjs.org/package/express-masquerade)
[![Node.js Version](https://img.shields.io/badge/node.js->=_0.8-brightgreen.svg?style=flat)](http://nodejs.org/download/)
[![Build Status](http://img.shields.io/travis/cjroth/express-masquerade.svg?style=flat)](https://travis-ci.org/cjroth/express-masquerade)
[![Coverage Status](https://img.shields.io/coveralls/cjroth/express-masquerade.svg?style=flat)](https://coveralls.io/r/cjroth/express-masquerade)
[![Gittip](http://img.shields.io/gittip/cjroth.svg)](https://www.gittip.com/cjroth/)

#### Masquerade as other users via `x-masquerade-as` header middleware. Plays well with [passport](http://passportjs.org/).

Add it as middleware. The first parameter is a function that gets a user by id:

```js
var express = require('express');
var masquerade = require('express-masquerade');

var app = express();

app.use(masquerade(function(id, next) {
  User.find(id).complete(next);
}));
```

This will set `req.user` to the user with an id of 2:

```bash
curl localhost:3000/profile --header "x-masquerade-as: 2"
```

## Installation

```bash
$ npm install express-masquerade
```

## Options

Pass options as the second parameter:

```
app.use(require('express-masquerade')(getUser, options));
```

#### `header` (string)
Use a different header than `x-masquerade-as`.
```
var options = {
  header: 'masquerading-as'
};
```

#### `authorize` (function)
Set a function to authorize whether or not the user has permission to masquerade. Should return true or false.
```
var options = {
  authorize: function(req) {
    return req.user.role === 'admin';
  }
};
```
## [MIT Licensed](LICENSE)