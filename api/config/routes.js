'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {

    // Dashboard Routes
    var myDashboard = require('../controllers/myDashboard');
    app.get('/mydashboard', auth.ensureAuthenticated, myDashboard.getMyDashboard);
    app.post('/mydashboard', auth.ensureAuthenticated, myDashboard.createMyDashboard);

    // Device Routes
    var dashboards = require('../controllers/dashboards');
    app.get('/dashboards', auth.ensureAuthenticated, dashboards.getAll);
    app.get('/dashboards/items', auth.ensureAuthenticated, dashboards.getAllDashboards);
    app.get('/dashboards/full/:id', auth.ensureAuthenticated, dashboards.getFullById);
    app.get('/dashboards/:id', auth.ensureAuthenticated, dashboards.getById);
    app.put('/dashboards/:id', auth.ensureAuthenticated, dashboards.update);
    app.del('/dashboards/:id', auth.ensureAuthenticated, dashboards.remove);
    app.post('/dashboards', auth.ensureAuthenticated, dashboards.create);

    // User Routes
    var users = require('../controllers/users');
    //app.post('/auth/users', users.create);
    app.get('/auth/users/:userId', auth.ensureAuthenticated, users.show);
    app.get('/auth/check_username/:username', auth.ensureAuthenticated, users.exists);

    app.get('/users', auth.ensureAuthenticated, users.getAll);
    app.get('/users/items', auth.ensureAuthenticated, users.getAllUsers);
    app.get('/users/:id', auth.ensureAuthenticated, users.getById);
    app.put('/users/:id', auth.ensureAuthenticated, users.update);
    app.del('/users/:id', auth.ensureAuthenticated, users.remove);
    app.post('/users', auth.ensureAuthenticated, users.create);

    // Session Routes
    var session = require('../controllers/session');
    app.post('/auth/session/user', session.signUp);
    app.get('/auth/session', auth.ensureAuthenticated, session.session);
    app.post('/auth/session', session.login);
    app.del('/auth/session', session.logout);
    app.put('/auth/session/confirm/:userId', session.confirmUser);


    // Panel Routes
    var panels = require('../controllers/panels');
    app.get('/panels', auth.ensureAuthenticated, panels.getAll);
    app.get('/panels/items', auth.ensureAuthenticated, panels.getAllPanels);
    app.get('/panels/:id', auth.ensureAuthenticated, panels.getById);
    app.put('/panels/:id', auth.ensureAuthenticated, panels.update);
    app.del('/panels/:id', auth.ensureAuthenticated, panels.remove);
    app.post('/panels', auth.ensureAuthenticated, panels.create);
    app.post('/panels/command', auth.ensureAuthenticated, panels.command);

    // Device Routes
    var devices = require('../controllers/devices');
    app.get('/devices', auth.ensureAuthenticated, devices.getAll);
    app.get('/devices/items', auth.ensureAuthenticated, devices.getAllDevices);
    app.get('/devices/full/:id', auth.ensureAuthenticated, devices.getFullById);
    app.get('/devices/:id', auth.ensureAuthenticated, devices.getById);
    app.put('/devices/:id', auth.ensureAuthenticated, devices.update);
    app.del('/devices/:id', auth.ensureAuthenticated, devices.remove);
    app.post('/devices', auth.ensureAuthenticated, devices.create);

    // Sensor Routes
    var sensors = require('../controllers/sensors');
    app.get('/sensors', auth.ensureAuthenticated, sensors.getAll);
    app.get('/sensors/items', auth.ensureAuthenticated, sensors.getAllDevices);
    app.get('/sensors/:id', auth.ensureAuthenticated, sensors.getById);
    app.put('/sensors/:id', auth.ensureAuthenticated, sensors.update);
    app.del('/sensors/:id', auth.ensureAuthenticated, sensors.remove);
    app.post('/sensors', auth.ensureAuthenticated, sensors.create);

    // Section Sections
    var sections = require('../controllers/sections');
    app.get('/sections', auth.ensureAuthenticated, sections.getAll);
    app.get('/sections/items', auth.ensureAuthenticated, sections.getAllSections);
    app.get('/sections/:id', auth.ensureAuthenticated, sections.getById);
    app.put('/sections/:id', auth.ensureAuthenticated, sections.update);
    app.del('/sections/:id', auth.ensureAuthenticated, sections.remove);
    app.post('/sections', auth.ensureAuthenticated, sections.create);

    // Camera Routes
    var cameras = require('../controllers/cameras');
    app.get('/cameras', auth.ensureAuthenticated, cameras.getAll);
    app.get('/cameras/items', auth.ensureAuthenticated, cameras.getAllCameras);
    app.get('/cameras/full/:id', auth.ensureAuthenticated, cameras.getFullById);
    app.get('/cameras/:id', auth.ensureAuthenticated, cameras.getById);
    app.put('/cameras/:id', auth.ensureAuthenticated, cameras.update);
    app.del('/cameras/:id', auth.ensureAuthenticated, cameras.remove);
    app.post('/cameras', auth.ensureAuthenticated, cameras.create);

    // Section Messages
    var messages = require('../controllers/messages');
    app.get('/messages', auth.ensureAuthenticated, messages.getAll);
    app.get('/messages/items', auth.ensureAuthenticated, messages.getAllMessages);

}