'use strict';

var path = require('path')

module.exports = function(app) {

    // Auth & Session Routes
    var session = require('../controllers/session');
    var auth = require('../controllers/auth');
    app.post('/auth/session', auth.authenticate);
    app.del('/auth/session', session.logout);
    app.post('/auth/session/user', session.signUp);
    app.get('/auth/session/users/items',  session.getAllUsers);
    app.put('/auth/session/confirm/:userId', session.confirmUser);
    app.post('/auth/session/sendPwdEmail',  session.sendChangePwdEmail);
    app.post('/auth/session/confirmPwd/:guid',  session.confirmPwd);

    app.get('/auth/session', auth.verifySignature, session.session);

    // Dashboard Routes
    var myDashboard = require('../controllers/myDashboard');
    app.get('/mydashboard', auth.verifySignature, myDashboard.getMyDashboard);
    app.post('/mydashboard', auth.verifySignature, myDashboard.createMyDashboard);

    var publics = require('../controllers/public');
    app.get('/public/dashboards/user/:key',  publics.getAllDashboards);

    // Device Routes
    var dashboards = require('../controllers/dashboards');
    app.get('/dashboards', auth.verifySignature, dashboards.getAll);
    app.get('/dashboards/items', auth.verifySignature, dashboards.getAllDashboards);
    app.get('/dashboards/full/:id', auth.verifySignature, dashboards.getFullById);
    app.get('/dashboards/:id', auth.verifySignature, dashboards.getById);
    app.put('/dashboards/:id', auth.verifySignature, dashboards.update);
    app.del('/dashboards/:id', auth.verifySignature, dashboards.remove);
    app.post('/dashboards', auth.verifySignature, dashboards.create);

    // User Routes
    var users = require('../controllers/users');
    //app.post('/auth/users', users.create);
    app.get('/auth/users/:userId', auth.verifySignature, users.show);
    app.get('/auth/check_username/:username', auth.verifySignature, users.exists);

    app.get('/users', auth.verifySignature, users.getAll);
    app.get('/users/items', auth.verifySignature, users.getAllUsers);
    app.get('/users/:id', auth.verifySignature, users.getById);
    app.put('/users/:id', auth.verifySignature, users.update);
    app.del('/users/:id', auth.verifySignature, users.remove);
    app.post('/users', auth.verifySignature, users.create);

    // Panel Routes
    var panels = require('../controllers/panels');
    app.get('/panels', auth.verifySignature, panels.getAll);
    app.get('/panels/items', auth.verifySignature, panels.getAllPanels);
    app.get('/panels/:id', auth.verifySignature, panels.getById);
    app.put('/panels/:id', auth.verifySignature, panels.update);
    app.del('/panels/:id', auth.verifySignature, panels.remove);
    app.post('/panels', auth.verifySignature, panels.create);
    app.post('/panels/command',  panels.command); //TODO: We need to secure this

    // Device Routes
    var devices = require('../controllers/devices');
    app.get('/devices', auth.verifySignature, devices.getAll);
    app.get('/devices/items', auth.verifySignature, devices.getAllDevices);
    app.get('/devices/full/:id', auth.verifySignature, devices.getFullById);
    app.get('/devices/:id', auth.verifySignature, devices.getById);
    app.put('/devices/:id', auth.verifySignature, devices.update);
    app.del('/devices/:id', auth.verifySignature, devices.remove);
    app.post('/devices', auth.verifySignature, devices.create);

    // Trigger Routes
    var triggers = require('../controllers/triggers');
    app.get('/triggers', auth.verifySignature, triggers.getAll);
    app.get('/triggers/items', auth.verifySignature, triggers.getAllTriggers);
    app.get('/triggers/:id', auth.verifySignature, triggers.getById);
    app.put('/triggers/:id', auth.verifySignature, triggers.update);
    app.del('/triggers/:id', auth.verifySignature, triggers.remove);
    app.post('/triggers', auth.verifySignature, triggers.create);

    // Sensor Routes
    var sensors = require('../controllers/sensors');
    app.get('/sensors', auth.verifySignature, sensors.getAll);
    app.get('/sensors/items', auth.verifySignature, sensors.getAllDevices);
    app.get('/sensors/:id', auth.verifySignature, sensors.getById);
    app.put('/sensors/:id', auth.verifySignature, sensors.update);
    app.del('/sensors/:id', auth.verifySignature, sensors.remove);
    app.post('/sensors', auth.verifySignature, sensors.create);

    // Section Sections
    var sections = require('../controllers/sections');
    app.get('/sections', auth.verifySignature, sections.getAll);
    app.get('/sections/items', auth.verifySignature, sections.getAllSections);
    app.get('/sections/:id', auth.verifySignature, sections.getById);
    app.put('/sections/:id', auth.verifySignature, sections.update);
    app.del('/sections/:id', auth.verifySignature, sections.remove);
    app.post('/sections', auth.verifySignature, sections.create);

    // Camera Routes
    var cameras = require('../controllers/cameras');
    app.get('/cameras', auth.verifySignature, cameras.getAll);
    app.get('/cameras/items', auth.verifySignature, cameras.getAllCameras);
    app.get('/cameras/full/:id', auth.verifySignature, cameras.getFullById);
    app.get('/cameras/:id', auth.verifySignature, cameras.getById);
    app.put('/cameras/:id', auth.verifySignature, cameras.update);
    app.del('/cameras/:id', auth.verifySignature, cameras.remove);
    app.post('/cameras', auth.verifySignature, cameras.create);

    // Section Messages
    var messages = require('../controllers/messages');
    app.get('/messages', auth.verifySignature, messages.getAll);
    app.get('/messages/items', messages.getAllMessages); //TODO: We need to secure this
    app.del('/messages/:id', auth.verifySignature, messages.remove);

    // Organization Routes
    var organizations = require('../controllers/organizations');
    app.get('/organizations/items', auth.verifySignature, organizations.getAllOrganizations);
    app.get('/organizations', auth.verifySignature, organizations.getAll);
    app.get('/organizations/:id', auth.verifySignature, organizations.getById);
    app.put('/organizations/:id', auth.verifySignature, organizations.update);
    app.del('/organizations/:id', auth.verifySignature, organizations.remove);
    app.post('/organizations', auth.verifySignature, organizations.create);
}