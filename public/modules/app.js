'use strict';

angular.module('app', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'http-auth-interceptor',
  'ui.bootstrap',
  'ui.sortable',
  'autofill-directive',
  'ngStorage',
  'btford.socket-io',
  'ngTable',
  'nvd3ChartDirectives',
  'localytics.directives'
])
  .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            /*  .when('/', {
             templateUrl: 'modules/base/views/main.html',
             controller: 'MainCtrl'
             })*/
            .when('/login', {
                templateUrl: 'modules/base/views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/signup', {
                templateUrl: 'modules/base/views/signup.html',
                controller: 'SignupCtrl'
            })
            .when('/panel/add', {
                templateUrl: 'modules/panels/views/panel_add.html',
                controller: 'PanelAddCtrl'
            })
            .when('/panel/edit/:id', {
                templateUrl: 'modules/panels/views/panel_edit.html',
                controller: 'PanelEditCtrl'
            })
            .when('/panel/list', {
                templateUrl: 'modules/panels/views/panel_list.html',
                controller: 'PanelListCtrl'
            })
            .when('/dashboard/me', {
                templateUrl: 'modules/dashboards/views/dashboard_me.html',
                controller: 'MyDashboardCtrl'
            })
            .when('/dashboard/add', {
                templateUrl: 'modules/dashboards/views/dashboard_add.html',
                controller: 'DashboardAddCtrl'
            })
            .when('/dashboard/edit/:id', {
                templateUrl: 'modules/dashboards/views/dashboard_edit.html',
                controller: 'DashboardEditCtrl'
            })
            .when('/dashboard/list', {
                templateUrl: 'modules/dashboards/views/dashboard_list.html',
                controller: 'DashboardListCtrl'
            })
            .when('/device/add', {
                templateUrl: 'modules/devices/views/device_add.html',
                controller: 'DeviceAddCtrl'
            })
            .when('/device/edit/:id', {
                templateUrl: 'modules/devices/views/device_edit.html',
                controller: 'DeviceEditCtrl'
            })
            .when('/device/list', {
                templateUrl: 'modules/devices/views/device_list.html',
                controller: 'DeviceListCtrl'
            })
            .when('/sensor/add', {
                templateUrl: 'modules/sensors/views/sensor_add.html',
                controller: 'SensorAddCtrl'
            })
            .when('/sensor/edit/:id', {
                templateUrl: 'modules/sensors/views/sensor_edit.html',
                controller: 'SensorEditCtrl'
            })
            .when('/sensor/list', {
                templateUrl: 'modules/sensors/views/sensor_list.html',
                controller: 'SensorListCtrl'
            })
            .when('/section/add', {
                templateUrl: 'modules/sections/views/section_add.html',
                controller: 'SectionAddCtrl'
            })
            .when('/section/edit/:id', {
                templateUrl: 'modules/sections/views/section_edit.html',
                controller: 'SectionEditCtrl'
            })
            .when('/section/list', {
                templateUrl: 'modules/sections/views/section_list.html',
                controller: 'SectionListCtrl'
            })
            .otherwise({
                redirectTo: '/dashboard/me'
            });
        $locationProvider.html5Mode(false);
    })

  .run(function ($rootScope, $sessionStorage, $location, sessionService) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {

      $rootScope.currentUser = $sessionStorage.currentUser? $sessionStorage.currentUser : $rootScope.currentUser;

      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!$rootScope.currentUser && ([ '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {

          sessionService.getCurrentUser()
              .success(function (response, status, headers, config) {
                  $sessionStorage.currentUser = response;
              })
              .error(function(error, status, headers, config) {
                  $location.path('/login');
                  console.log(error)
              });
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  });