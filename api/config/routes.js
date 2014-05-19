'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // Panel Routes
  var panels = require('../controllers/panels');
  app.get('/panels', panels.getAll);
  app.get('/panels/items', panels.getAllPanels);
  app.get('/panels/:id', panels.getById);
  app.put('/panels/:id', panels.update);
  app.del('/panels/:id', panels.remove);
  app.post('/panels', panels.create);

}