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
                template: '<div ui-view class="fade-in-up"></div>'
            })
            .state('app.ui.buttons', {
                url: '/buttons',
                templateUrl: 'assets_new/tpl/ui_buttons.html'
            })
            .state('app.ui.icons', {
                url: '/icons',
                templateUrl: 'assets_new/tpl/ui_icons.html'
            })
            .state('app.ui.grid', {
                url: '/grid',
                templateUrl: 'assets_new/tpl/ui_grid.html'
            })
            .state('app.ui.widgets', {
                url: '/widgets',
                templateUrl: 'assets_new/tpl/ui_widgets.html'
            })
            .state('app.ui.bootstrap', {
                url: '/bootstrap',
                templateUrl: 'assets_new/tpl/ui_bootstrap.html'
            })
            .state('app.ui.sortable', {
                url: '/sortable',
                templateUrl: 'assets_new/tpl/ui_sortable.html'
            })
            .state('app.ui.portlet', {
                url: '/portlet',
                templateUrl: 'assets_new/tpl/ui_portlet.html'
            })
            .state('app.ui.timeline', {
                url: '/timeline',
                templateUrl: 'assets_new/tpl/ui_timeline.html'
            })
            .state('app.ui.jvectormap', {
                url: '/jvectormap',
                templateUrl: 'assets_new/tpl/ui_jvectormap.html'
            })
            .state('app.ui.chart', {
                url: '/chart',
                templateUrl: 'assets_new/tpl/ui_chart.html'
            })
            // table
            .state('app.table', {
                url: '/table',
                template: '<div ui-view></div>'
            })
            .state('app.table.static', {
                url: '/static',
                templateUrl: 'assets_new/tpl/table_static.html'
            })
            .state('app.table.datatable', {
                url: '/datatable',
                templateUrl: 'assets_new/tpl/table_datatable.html'
            })
            .state('app.table.footable', {
                url: '/footable',
                templateUrl: 'assets_new/tpl/table_footable.html'
            })
            // form
            .state('app.form', {
                url: '/form',
                template: '<div ui-view class="fade-in"></div>'
            })
            .state('app.form.elements', {
                url: '/elements',
                templateUrl: 'assets_new/tpl/form_elements.html'
            })
            .state('app.form.validation', {
                url: '/validation',
                templateUrl: 'assets_new/tpl/form_validation.html'
            })
            .state('app.form.wizard', {
                url: '/wizard',
                templateUrl: 'assets_new/tpl/form_wizard.html'
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
            .state('app.page.post', {
                url: '/post',
                templateUrl: 'assets_new/tpl/page_post.html'
            })
            .state('app.page.search', {
                url: '/search',
                templateUrl: 'assets_new/tpl/page_search.html'
            })
            .state('app.page.invoice', {
                url: '/invoice',
                templateUrl: 'assets_new/tpl/page_invoice.html'
            })
            .state('app.docs', {
                url: '/docs',
                templateUrl: 'assets_new/tpl/docs.html'
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

            // fullCalendar
            .state('app.calendar', {
                url: '/calendar',
                templateUrl: 'assets_new/tpl/app_calendar.html',
                // use resolve to load other dependences
                resolve: {
                    deps: ['uiLoad',
                      function( uiLoad ){
                        return uiLoad.load( ['assets_new/js/jquery/fullcalendar/fullcalendar.css',
                                             'assets_new/js/jquery/jquery-ui-1.10.3.custom.min.js',
                                             'assets_new/js/jquery/fullcalendar/fullcalendar.min.js',
                                             'assets_new/js/app/calendar/ui-calendar.js',
                                             'assets_new/js/app/calendar/calendar.js']);
                    }]
                }
            })

            // mail
            .state('app.mail', {
                abstract: true,
                url: '/mail',
                templateUrl: 'assets_new/tpl/mail.html',
                // use resolve to load other dependences
                resolve: {
                    deps: ['uiLoad',
                      function( uiLoad ){
                        return uiLoad.load( ['assets_new/js/app/mail/mail.js',
                                             'assets_new/js/app/mail/mail-service.js',
                                             'assets_new/js/libs/moment.min.js']);
                    }]
                }
            })
            .state('app.mail.list', {
                url: '/inbox/{fold}',
                templateUrl: 'assets_new/tpl/mail.list.html'
            })
            .state('app.mail.detail', {
                url: '/{mailId:[0-9]{1,4}}',
                templateUrl: 'assets_new/tpl/mail.detail.html'
            })
            .state('app.mail.compose', {
                url: '/compose',
                templateUrl: 'assets_new/tpl/mail.new.html'
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