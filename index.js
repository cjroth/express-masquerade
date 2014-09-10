module.exports = function(getUser, options) {

  return function(req, res, next) {

    options = options || {};
    options.header = options.header || 'x-masquerade-as';

    var id = req.get(options.header);
    if (!id) return next();

    if (typeof options.authorize === 'function' && !options.authorize(req)) {
      return next();
    }

    getUser(id, function(err, user) {
      req.user = user;
      next();
    });

  };

};