'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {

  // Dashboard Routes
  var dashboard = require('../controllers/dashboard');
  app.get('/dashboard', auth.ensureAuthenticated, dashboard.getDashboard);
  app.post('/dashboard', auth.ensureAuthenticated, dashboard.createDashboard);

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

  // Device Routes
  var devices = require('../controllers/devices');
  app.get('/devices', auth.ensureAuthenticated, devices.getAll);
  app.get('/devices/items',auth.ensureAuthenticated, devices.getAllDevices);
  app.get('/devices/:id', auth.ensureAuthenticated, devices.getById);
  app.put('/devices/:id', auth.ensureAuthenticated, devices.update);
  app.del('/devices/:id', auth.ensureAuthenticated, devices.remove);
  app.post('/devices', auth.ensureAuthenticated, devices.create);

  // Sensor Routes
  var sensors = require('../controllers/sensors');
  app.get('/sensors', auth.ensureAuthenticated, sensors.getAll);
  app.get('/sensors/items',auth.ensureAuthenticated, sensors.getAllDevices);
  app.get('/sensors/:id', auth.ensureAuthenticated, sensors.getById);
  app.put('/sensors/:id', auth.ensureAuthenticated, sensors.update);
  app.del('/sensors/:id', auth.ensureAuthenticated, sensors.remove);
  app.post('/sensors', auth.ensureAuthenticated, sensors.create);

  // Section Routes
  var sections = require('../controllers/sections');
  app.get('/sections', auth.ensureAuthenticated, sections.getAll);
  app.get('/sections/items',auth.ensureAuthenticated, sections.getAllSections);
  app.get('/sections/:id', auth.ensureAuthenticated, sections.getById);
  app.put('/sections/:id', auth.ensureAuthenticated, sections.update);
  app.del('/sections/:id', auth.ensureAuthenticated, sections.remove);
  app.post('/sections', auth.ensureAuthenticated, sections.create);

}