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
    'app.controllers'
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
            .otherwise('/app/dashboard');
        $stateProvider            
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'assets_new/tpl/app.html'
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'assets_new/tpl/app_dashboard.html'
            })
            .state('app.ui', {
                url: '/ui',
                template: '<div ui-view class="fade-in-right"></div>'
            })

            .state('app.ui.portlet', {
                url: '/portlet',
                templateUrl: 'assets_new/tpl/ui_portlet.html'
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
            .state('lockme', {
                url: '/lockme',
                templateUrl: 'assets_new/tpl/page_lockme.html'
            })
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.signin', {
                url: '/signin',
                templateUrl: 'assets_new/tpl/page_signin.html'
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
    sortable:       ['assets_new/js/jquery/sortable/jquery.sortable.js'],
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