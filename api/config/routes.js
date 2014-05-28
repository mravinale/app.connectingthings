'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', auth.ensureAuthenticated, users.show);
  app.get('/auth/check_username/:username', auth.ensureAuthenticated, users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // Panel Routes
  var panels = require('../controllers/panels');
  app.get('/panels', auth.ensureAuthenticated, panels.getAll);
  app.get('/panels/items',auth.ensureAuthenticated,  panels.getAllPanels);
  app.get('/panels/:id', auth.ensureAuthenticated, panels.getById);
  app.put('/panels/:id', auth.ensureAuthenticated, panels.update);
  app.del('/panels/:id', auth.ensureAuthenticated, panels.remove);
  app.post('/panels', auth.ensureAuthenticated, panels.create);

  // Dashboard Routes
   var dashboard = require('../controllers/dashboard');
  app.get('/dashboard', auth.ensureAuthenticated, dashboard.getDashboard);
  app.post('/dashboard', auth.ensureAuthenticated, dashboard.createDashboard);

}