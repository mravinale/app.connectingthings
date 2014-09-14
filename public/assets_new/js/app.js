'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'ui.jq',
    'ui.validate',
    'pascalprecht.translate',
    'app.filters',
    'app.services',
    'app.directives',
    'app.controllers',

    'ui.sortable',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngTable',
    'http-auth-interceptor',
    'autofill-directive',
    'btford.socket-io',
    'nvd3ChartDirectives',
    'localytics.directives'

  ])
.run(
  [          '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;        
    }
  ]
)
.config(
  [          '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;

        $urlRouterProvider
            .otherwise('app/dashboard/me');
        $stateProvider            
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'assets_new/tpl/app.html'
            })
        /*
            .state('app.ui', {
                url: '/ui',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.ui.portlet', {
                url: '/portlet',
                templateUrl: 'assets_new/tpl/ui_portlet.html'
            })*/
            //dashboard
            .state('app.dashboard', {
                url: '/dashboard',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.dashboard.me', {
                url: '/me',
                templateUrl: 'modules/dashboards/views/dashboard_me.html',
                controller: 'MyDashboardCtrl'
            })
            .state('app.dashboard.add', {
                url: '/add',
                templateUrl: 'modules/dashboards/views/dashboard_add.html',
                controller: 'DashboardAddCtrl'
            })
            .state('app.dashboard.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/dashboards/views/dashboard_edit.html',
                controller: 'DashboardEditCtrl'
            })
            .state('app.dashboard.list', {
                url:'/list',
                templateUrl: 'modules/dashboards/views/dashboard_list.html',
                controller: 'DashboardListCtrl'
            })
            //sections
            .state('app.section', {
                url: '/section',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.section.add', {
                url: '/add',
                templateUrl: 'modules/sections/views/section_add.html',
                controller: 'SectionAddCtrl'
            })
            .state('app.section.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/sections/views/section_edit.html',
                controller: 'SectionEditCtrl'
            })
            .state('app.section.list', {
                url:'/list',
                templateUrl: 'modules/sections/views/section_list.html',
                controller: 'SectionListCtrl'
            })
            //panels
            .state('app.panel', {
                url: '/panel',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.panel.add', {
                url: '/add',
                templateUrl: 'modules/panels/views/panel_add.html',
                controller: 'PanelAddCtrl'
            })
            .state('app.panel.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/panels/views/panel_edit.html',
                controller: 'PanelEditCtrl'
            })
            .state('app.panel.list', {
                url:'/list',
                templateUrl: 'modules/panels/views/panel_list.html',
                controller: 'PanelListCtrl'
            })
            //devices
            .state('app.device', {
                url: '/section',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.device.add', {
                url: '/add',
                templateUrl: 'modules/devices/views/device_add.html',
                controller: 'DeviceAddCtrl'
            })
            .state('app.device.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/devices/views/device_edit.html',
                controller: 'DeviceEditCtrl'
            })
            .state('app.device.list', {
                url:'/list',
                templateUrl: 'modules/devices/views/device_list.html',
                controller: 'DeviceListCtrl'
            })
            //sensors
            .state('app.sensor', {
                url: '/section',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.sensor.add', {
                url: '/add',
                templateUrl: 'modules/sensors/views/sensor_add.html',
                controller: 'SensorAddCtrl'
            })
            .state('app.sensor.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/sensors/views/sensor_edit.html',
                controller: 'SensorEditCtrl'
            })
            .state('app.sensor.list', {
                url:'/list',
                templateUrl: 'modules/sensors/views/sensor_list.html',
                controller: 'SensorListCtrl'
            })


            // pages
            .state('app.page', {
                url: '/page',
                template: '<div ui-view class="fade-in-down"></div>'
            })
            .state('app.page.profile', {
                url: '/profile',
                templateUrl: 'assets_new/tpl/page_profile.html'
            })
            // others
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.signin', {
                url: '/signin',
                templateUrl: 'assets_new/tpl/page_signin.html',
                controller: 'LoginCtrl'
            })
            .state('access.signup', {
                url: '/signup',
                templateUrl: 'assets_new/tpl/page_signup.html'
            })
            .state('access.forgotpwd', {
                url: '/forgotpwd',
                templateUrl: 'assets_new/tpl/page_forgotpwd.html'
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'assets_new/tpl/page_404.html'
            })

    }
  ]
)

.run(function ($rootScope, $sessionStorage, $location, sessionService,$state) {

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
                $state.transitionTo('access.signin')
              //  $location.path('/login');
                console.log(error)
            });
        }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
        $state.transitionTo('access.signin')
      //  $location.path('/login');
        return false;
    });
})

.config(['$translateProvider', function($translateProvider){

  // Register a loader for the static files
  // So, the module will search missing translation tables under the specified urls.
  // Those urls are [prefix][langKey][suffix].
  $translateProvider.useStaticFilesLoader({
    prefix: 'assets_new/l10n/',
    suffix: '.json'
  });

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en');

  // Tell the module to store the language in the local storage
  $translateProvider.useLocalStorage();

}])

/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */

.constant('JQ_CONFIG', {
    easyPieChart:   ['assets_new/js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline:      ['assets_new/js/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot:           ['assets_new/js/jquery/charts/flot/jquery.flot.min.js', 
                        'assets_new/js/jquery/charts/flot/jquery.flot.resize.js',
                        'assets_new/js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                        'assets_new/js/jquery/charts/flot/jquery.flot.spline.js',
                        'assets_new/js/jquery/charts/flot/jquery.flot.orderBars.js',
                        'assets_new/js/jquery/charts/flot/jquery.flot.pie.min.js'],
    slimScroll:     ['assets_new/js/jquery/slimscroll/jquery.slimscroll.min.js'],
 //   sortable:       ['assets_new/js/jquery/sortable/jquery.sortable.js'],
    nestable:       ['assets_new/js/jquery/nestable/jquery.nestable.js',
                        'assets_new/js/jquery/nestable/nestable.css'],
    filestyle:      ['assets_new/js/jquery/file/bootstrap-filestyle.min.js'],
    slider:         ['assets_new/js/jquery/slider/bootstrap-slider.js',
                        'assets_new/js/jquery/slider/slider.css'],
    chosen:         ['assets_new/js/jquery/chosen/chosen.jquery.min.js',
                        'assets_new/js/jquery/chosen/chosen.css'],
    TouchSpin:      ['assets_new/js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                        'assets_new/js/jquery/spinner/jquery.bootstrap-touchspin.css'],
    wysiwyg:        ['assets_new/js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                        'assets_new/js/jquery/wysiwyg/jquery.hotkeys.js'],
    dataTable:      ['assets_new/js/jquery/datatables/jquery.dataTables.min.js',
                        'assets_new/js/jquery/datatables/dataTables.bootstrap.js',
                        'assets_new/js/jquery/datatables/dataTables.bootstrap.css'],
    vectorMap:      ['assets_new/js/jquery/jvectormap/jquery-jvectormap.min.js', 
                        'assets_new/js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                        'assets_new/js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                        'assets_new/js/jquery/jvectormap/jquery-jvectormap.css'],
    footable:       ['assets_new/js/jquery/footable/footable.all.min.js',
                        'assets_new/js/jquery/footable/footable.core.css']
    }
)
;