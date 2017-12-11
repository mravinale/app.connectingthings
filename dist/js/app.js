'use strict';

//http://blog.mailgun.com/how-to-send-transactional-emails-in-a-nodejs-app-using-the-mailgun-api/
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
    'psResponsive',
    'btford.socket-io',
    'nvd3ChartDirectives',
    'localytics.directives',
    'ui.gravatar',
    'reCAPTCHA',
    'oitozero.ngSweetAlert',
    'multiStepForm',
    'dcbImgFallback',
    'rt.encodeuri',
    'gridster',
    'angular-loading-bar',
    'stripe.checkout',
    'ng-bootstrap-alerts',
    'ngTableToCsv',
    'hljs'
  ])
.run(
  [ '$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
  ]
)
.config(
  [ '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', 'reCAPTCHAProvider','cfpLoadingBarProvider','StripeCheckoutProvider','hljsServiceProvider', '$httpProvider',
    function ($stateProvider,   $urlRouterProvider,   $controllerProvider,   $compileProvider,   $filterProvider,   $provide, reCAPTCHAProvider, cfpLoadingBarProvider,StripeCheckoutProvider, hljsServiceProvider, $httpProvider) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;

        $httpProvider.interceptors.push('authInterceptor');

        hljsServiceProvider.setOptions({
            // replace tab with 4 spaces
            tabReplace: '  '
        });


        StripeCheckoutProvider.defaults({
            //key:"pk_test_agLRPGqaMYh95gLab6nsKlwu"
            key: "pk_live_HUDm43LunKfEDyG1tdspWixx"
        });


        reCAPTCHAProvider.setOptions({
            theme: 'white'
        });

        cfpLoadingBarProvider.includeSpinner = false;

        $urlRouterProvider
            .otherwise('app/dashboard/me');
        $stateProvider            
            .state('app', {
                abstract: true,
                url: '/app',
                templateUrl: 'modules/base/views/app.html'
            })

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
                url: '/device',
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
            //triggers
            .state('app.trigger', {
                url: '/trigger',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.trigger.add', {
                url: '/add',
                templateUrl: 'modules/triggers/views/trigger_add.html',
                controller: 'TriggerAddCtrl'
            })
            .state('app.trigger.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/triggers/views/trigger_edit.html',
                controller: 'TriggerEditCtrl'
            })
            .state('app.trigger.list', {
                url:'/list',
                templateUrl: 'modules/triggers/views/trigger_list.html',
                controller: 'TriggerListCtrl'
            })
            //sensors
            .state('app.sensor', {
                url: '/sensor',
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

            //cameras
            .state('app.camera', {
                url: '/camera',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.camera.add', {
                url: '/add',
                templateUrl: 'modules/cameras/views/camera_add.html',
                controller: 'CameraAddCtrl'
            })
            .state('app.camera.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/cameras/views/camera_edit.html',
                controller: 'CameraEditCtrl'
            })
            .state('app.camera.list', {
                url:'/list',
                templateUrl: 'modules/cameras/views/camera_list.html',
                controller: 'CameraListCtrl'
            })

            //users
            .state('app.user', {
                url: '/user',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.user.add', {
                url: '/add',
                templateUrl: 'modules/users/views/user_add.html',
                controller: 'UserAddCtrl'
            })
            .state('app.user.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/users/views/user_edit.html',
                controller: 'UserEditCtrl'
            })
            .state('app.user.settings', {
                url: '/settings/:id',
                templateUrl: 'modules/users/views/user_settings.html',
                controller: 'UserSettingsCtrl'
            })
            .state('app.user.list', {
                url:'/list',
                templateUrl: 'modules/users/views/user_list.html',
                controller: 'UserListCtrl'
            })

            //message
            .state('app.message', {
                url: '/message',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.message.list', {
                url:'/list',
                templateUrl: 'modules/messages/views/message_list.html',
                controller: 'MessageListCtrl'
            })

            //organization
            .state('app.organization', {
                url: '/organization',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.organization.add', {
                url: '/add',
                templateUrl: 'modules/organizations/views/organization_add.html',
                controller: 'OrganizationAddCtrl'
            })
            .state('app.organization.edit', {
                url: '/edit/:id',
                templateUrl: 'modules/organizations/views/organization_edit.html',
                controller: 'OrganizationEditCtrl'
            })
            .state('app.organization.list', {
                url:'/list',
                templateUrl: 'modules/organizations/views/organization_list.html',
                controller: 'OrganizationListCtrl'
            })

            // pages
            .state('app.public', {
                url: '/public',
                template: '<div ui-view class="fade-in-down"></div>'
            })
            .state('app.public.dashboard', {
                url: '/dashboard/:id',
                controller: 'publicCtrl',
                templateUrl: 'modules/base/views/dashboard.html'
            })
            .state('app.public.list', {
              url: '/list',
              controller: 'publicListCtrl',
              templateUrl: 'modules/base/views/dashboard_list.html'
            })
            // others
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.signin', {
                url: '/signin',
                templateUrl: 'modules/base/views/login.html',
                controller: 'LoginCtrl'
            })
            .state('access.signup', {
                url: '/signup',
                templateUrl: 'modules/base/views/signup.html',
                controller: 'SignupCtrl'
            })
            .state('access.forgotpwd', {
                url: '/forgotpwd',
                templateUrl: 'modules/base/views/forgotpwd.html',
                controller: 'ForgotPwdCtrl'
            })
            .state('access.changepwd', {
              url: '/changepwd',
              templateUrl: 'modules/base/views/changepwd.html',
              controller: 'ChangePwdCtrl'
            })
            .state('access.suscription', {
                url: '/suscription',
                templateUrl: 'modules/base/views/suscription.html',
                controller: 'SuscriptionCtrl'
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'assets/tpl/page_404.html'
            })

    }
  ]
)

.run(['$rootScope', '$localStorage', '$location', 'sessionService', '$state', 'userService', function ($rootScope, $localStorage, $location, sessionService,$state,userService) {

    $rootScope.showHeader = true;

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {

        $rootScope.currentUser = $localStorage.currentUser? $localStorage.currentUser : $rootScope.currentUser;

        if($rootScope.currentUser) {
            window.Intercom('boot', {
                app_id: "rvvvm6rx",
                // TODO: The current logged in user's full name
                name: $rootScope.currentUser.username,
                // TODO: The current logged in user's email address.
                email: $rootScope.currentUser.email,
                // TODO: The current logged in user's sign-up date as a Unix timestamp.
                created_at: 1234567890
            });

            SupportKit.init({
                appToken: 'c4petjl63pxfthtruwknea5in',
                name: $rootScope.currentUser.username,
                email: $rootScope.currentUser.email
            });
        }


        // if no currentUser and on a page that requires authorization then try to update it
        // will trigger 401s if user does not have a valid session
        if (!$rootScope.currentUser && (['/logout', '/access/signin', '/access/signup', '/access/suscription'].indexOf($location.path()) == -1 )) {

            if($location.path().indexOf("/app/public/dashboard/") > -1) return;
            if($location.path().indexOf("/app/public/list") > -1) return;
            if($location.path().indexOf("/access/changepwd") > -1) return;

            sessionService.getCurrentUser()
            .success(function (response, status, headers, config) {
                $localStorage.currentUser = response;
            })
            .error(function(error, status, headers, config) {
                $state.transitionTo('access.signin');
                console.log(error)
            });
        }
    });

    $rootScope.$on('$locationChangeSuccess', function (event, toState, toParams, fromState) {
        /*
        if(toState.name == "app.public.dashboard") {
            $rootScope.showHeader = false;
            $rootScope.noMenuStyle =  { "padding-top": "0px", "margin-left": "-60px", "width": "105%", "background-color": "none" }
        }
        else{
            $rootScope.showHeader = true;
            $rootScope.noMenuStyle =  {}
        }

        */


    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
        $state.transitionTo('access.signin')
        return false;
    });
}])

.config(['$translateProvider', function($translateProvider){

  // Register a loader for the static files
  // So, the module will search missing translation tables under the specified urls.
  // Those urls are [prefix][langKey][suffix].
  $translateProvider.useStaticFilesLoader({
    prefix: 'assets/l10n/',
    suffix: '.json'
  });

  // Tell the module what language to use by default
  $translateProvider.preferredLanguage('en');

  // Tell the module to store the language in the local storage
  $translateProvider.useLocalStorage();

}])

.constant('JQ_CONFIG', {
  //  easyPieChart:   ['assets/js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
    sparkline:      ['assets/js/jquery/charts/sparkline/jquery.sparkline.min.js'],
    plot:           ['assets/js/jquery/charts/flot/jquery.flot.min.js',
                        'assets/js/jquery/charts/flot/jquery.flot.resize.js',
                        'assets/js/jquery/charts/flot/jquery.flot.tooltip.min.js',
                        'assets/js/jquery/charts/flot/jquery.flot.spline.js',
                        'assets/js/jquery/charts/flot/jquery.flot.orderBars.js',
                        'assets/js/jquery/charts/flot/jquery.flot.pie.min.js'],
    slimScroll:     ['assets/js/jquery/slimscroll/jquery.slimscroll.min.js'],
    sortable:       ['assets/js/jquery/sortable/jquery.sortable.js'],
    nestable:       ['assets/js/jquery/nestable/jquery.nestable.js',
                        'assets/js/jquery/nestable/nestable.css'],
    filestyle:      ['assets/js/jquery/file/bootstrap-filestyle.min.js'],
    slider:         ['assets/js/jquery/slider/bootstrap-slider.js',
                        'assets/js/jquery/slider/slider.css'],
    chosen:         ['assets/js/jquery/chosen/chosen.jquery.min.js',
                        'assets/js/jquery/chosen/chosen.css'],
    TouchSpin:      ['assets/js/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                        'assets/js/jquery/spinner/jquery.bootstrap-touchspin.css'],
    wysiwyg:        ['assets/js/jquery/wysiwyg/bootstrap-wysiwyg.js',
                        'assets/js/jquery/wysiwyg/jquery.hotkeys.js'],
    dataTable:      ['assets/js/jquery/datatables/jquery.dataTables.min.js',
                        'assets/js/jquery/datatables/dataTables.bootstrap.js',
                        'assets/js/jquery/datatables/dataTables.bootstrap.css'],
    vectorMap:      ['assets/js/jquery/jvectormap/jquery-jvectormap.min.js',
                        'assets/js/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                        'assets/js/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                        'assets/js/jquery/jvectormap/jquery-jvectormap.css'],
    footable:       ['assets/js/jquery/footable/footable.all.min.js',
                        'assets/js/jquery/footable/footable.core.css']
    });

angular.module('app.filters', []).filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        }
    });
angular.module('app.services', []);


angular.module('app.directives', ['ui.load'])
    .directive('uiShift', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            replace: true,
            link: function(scope, el, attr) {
                // get the $prev or $parent of this el
                var _el = $(el),
                    _window = $(window),
                    prev = _el.prev(),
                    parent,
                    width = _window.width()
                    ;

                !prev.length && (parent = _el.parent());

                function sm(){
                    $timeout(function () {
                        var method = attr.uiShift;
                        var target = attr.target;
                        _el.hasClass('in') || _el[method](target).addClass('in');
                    });
                }

                function md(){
                    parent && parent['prepend'](el);
                    !parent && _el['insertAfter'](prev);
                    _el.removeClass('in');
                }

                (width < 768 && sm()) || md();

                _window.resize(function() {
                    if(width !== _window.width()){
                        $timeout(function(){
                            (_window.width() < 768 && sm()) || md();
                            width = _window.width();
                        });
                    }
                });
            }
        };
    }])
    .directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
        return {
            restrict: 'AC',
            replace: true,
            link: function(scope, el, attr) {
                el.on('click', function(e) {
                    e.preventDefault();
                    var classes = attr.uiToggleClass.split(','),
                        targets = (attr.target && attr.target.split(',')) || Array(el),
                        key = 0;
                    angular.forEach(classes, function( _class ) {
                        var target = targets[(targets.length && key)];
                        ( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
                        $( target ).toggleClass(_class);
                        key ++;
                    });
                    $(el).toggleClass('active');

                    function magic(_class, target){
                        var patt = new RegExp( '\\s' +
                            _class.
                                replace( /\*/g, '[A-Za-z0-9-_]+' ).
                                split( ' ' ).
                                join( '\\s|\\s' ) +
                            '\\s', 'g' );
                        var cn = ' ' + $(target)[0].className + ' ';
                        while ( patt.test( cn ) ) {
                            cn = cn.replace( patt, ' ' );
                        }
                        $(target)[0].className = $.trim( cn );
                    }
                });
            }
        };
    }])
    .directive('uiNav', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            replace: true,
            link: function(scope, el, attr) {
                var _window = $(window);
                var _mb = 768;
                // unfolded
                $(el).on('click', 'a', function(e) {
                    var _this = $(this);
                    _this.parent().siblings( ".active" ).toggleClass('active');
                    _this.parent().toggleClass('active');
                    _this.next().is('ul') && e.preventDefault();
                    _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').toggleClass('show') );
                });

                // folded
                var wrap = $('.app-aside'), next;
                $(el).on('mouseenter', 'a', function(e){
                    if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb )) return;
                    var _this = $(this);

                    next && next.trigger('mouseleave.nav');

                    if( _this.next().is('ul') ){
                        next = _this.next();
                    }else{
                        return;
                    }

                    next.appendTo(wrap).css('top', _this.offset().top - _this.height());
                    next.on('mouseleave.nav', function(e){
                        next.appendTo(_this.parent());
                        next.off('mouseleave.nav');
                        _this.parent().removeClass('active');
                    });
                    _this.parent().addClass('active');

                });

                wrap.on('mouseleave', function(e){
                    next && next.trigger('mouseleave.nav');
                });
            }
        };
    }])
    .directive('uiScroll', ['$location', '$anchorScroll', function($location, $anchorScroll) {
        return {
            restrict: 'AC',
            replace: true,
            link: function(scope, el, attr) {
                el.on('click', function(e) {
                    $location.hash(attr.uiScroll);
                    $anchorScroll();
                });
            }
        };
    }])
    .directive('uiFullscreen', ['uiLoad', function(uiLoad) {
        return {
            restrict: 'AC',
            template:'<i class="fa fa-expand fa-fw text"></i><i class="fa fa-compress fa-fw text-active"></i>',
            link: function(scope, el, attr) {
                el.addClass('hide');
               // uiLoad.load('assets/js/screenfull.min.js').then(function(){
                    if (screenfull.enabled) {
                        el.removeClass('hide');
                    }
                    el.on('click', function(){
                        var target;
                        attr.target && ( target = $(attr.target)[0] );
                        el.toggleClass('active');
                        screenfull.toggle(target);
                    });
              //  });
            }
        };
    }])
    .directive('uiButterbar', ['$rootScope', function($rootScope) {
        return {
            restrict: 'AC',
            template:'<span class="bar"></span>',
            link: function(scope, el, attrs) {
                el.addClass('butterbar hide');
                scope.$on('$stateChangeStart', function(event) {
                    el.removeClass('hide').addClass('active');
                });
                scope.$on('$stateChangeSuccess', function( event, toState, toParams, fromState ) {
                    event.targetScope.$watch('$viewContentLoaded', function(){
                        el.addClass('hide').removeClass('active');
                    })
                });
            }
        };
    }]);

angular.module('app.controllers', ['pascalprecht.translate', 'ngCookies'])
    .controller('AppCtrl', ['$scope','$rootScope', '$translate', '$localStorage','$route', '$location', function($scope,$rootScope, $translate, $localStorage, $route, $location) {
        // add 'no-touch' 'ie' classes to html
        var isTouchDevice = !!('ontouchstart' in window);
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        !isTouchDevice && $('html').addClass('no-touch');
        isIE && $('html').addClass('ie');

        // config
        $scope.app = {
            name: 'ConnectingThings',
            version: '1.0.3',
            // for chart colors
            color: {
                primary: '#7266ba',
                info:    '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger:  '#f05050',
                light:   '#e8eff0',
                dark:    '#3a3f51',
                black:   '#1c2b36'
            },
            settings: {
                themeID: 10,
                navbarHeaderColor: 'bg-info dker',
                navbarCollapseColor: 'bg-info dk',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                noMenu: ""
            }
        }

          $rootScope.app = $scope.app;

        // save settings to local storage
       /* if ( angular.isDefined($localStorage.settings) ) {
            $scope.app.settings = $localStorage.settings;
        } else {*/
            $localStorage.settings = $scope.app.settings;
       // }

        $scope.$watch('app.settings', function(){ $localStorage.settings = $scope.app.settings; }, true);

        // angular translate
        $scope.langs = {en:'English', es_ES:'Spanish'};
        $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
        $scope.setLang = function(langKey) {
            // set the current lang
            $scope.selectLang = $scope.langs[langKey];
            // You can change the language during runtime
            $translate.use(langKey);
        };


        $rootScope.$on("$stateChangeSuccess", function (event, current, previous, rejection) {
                window.Intercom('update');

                if(_.contains(["/access/signin", "/access/signup", "/access/forgotpwd", "/access/suscription"], $location.$$url)){
                    $rootScope.enableExternal = true;
                } else {
                    $rootScope.enableExternal = false;
                }

                if(current.name == "app.public.dashboard") {
                    $scope.app.settings.asideFixed = true;
                    $scope.app.settings.asideFolded = true;
                }
         });

    }]);
angular.module('app')

.constant('baseUrl', 'https://dev.connectingthings.io/')

;
'use strict';
angular.module('app')
    .controller('MyDashboardCtrl', ['$scope', 'panelService', 'sectionService', '$localStorage', 'dashboardService', '$rootScope', '$modal', '$log', 'SweetAlert', function ($scope, panelService, sectionService, $localStorage, dashboardService, $rootScope, $modal, $log, SweetAlert) {

        $scope.dashboards = [];
        $scope.items = [];
        $scope.tab = { name:null, id:null };
        $scope.dashStyle = {color:'rgba(0,0,0,.075)'};
        $scope.areOptionsEnabled = true;

        $scope.setTab = function(dashboard){
            $scope.tab.name = dashboard.name;
            $scope.tab.id = dashboard._id;
            $scope.init();
        };

        $scope.toggleView = function(){
            $scope.showOptions = !$scope.showOptions;
        };

        $scope.init = function(){

            dashboardService.getAllDashboards()
            .success(function (response, status, headers, config) {
                $scope.dashboards = response;

                _.each( $scope.dashboards, function(dashboard){
                    var items = _.union(dashboard.panels, dashboard.sections);
                    dashboard.items = items.length <= 0?  [{}] : items;
                });
                $scope.tab.name = $scope.tab.name? $scope.tab.name : response[0].name;
                $scope.tab.id = $scope.tab.id? $scope.tab.id : response[0]._id;
                $localStorage.currentDashboard = $scope.tab;

            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });
      };

        $rootScope.$on('reload-myDashboard', function(event, args) {
          $scope.init();
        });


        $scope.gridsterOpts = {
          minColumns: 1,
          swapping: true,
          avoid_overlapped_widgets:true,
          width: 'auto',
          colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
          rowHeight: '80', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
          resizable: {
            enabled: true,
            start: function(event, uiWidget, $element) {},
            resize: function(event, uiWidget, $element) {},
            stop: function(event, uiWidget, $element) {}
          },
          draggable: {
            enabled: true, // whether dragging items is supported
            start: function(event, $element, widget) {}, // optional callback fired when drag is started,
            drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
            stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
          }

        };


      //var watcher = toggleWatch('dashboards', function(newitems, olditems){
        $scope.$watch('dashboards', function(newitems, olditems){


            var cleanedNewItems = angular.fromJson(angular.toJson(newitems));
            var cleanedOldItems = angular.fromJson(angular.toJson(olditems));

            var delta = jsondiffpatch.diff( cleanedNewItems,  cleanedOldItems);

            if(!delta || !_.values(delta)[0] || ! _.values(delta)[0].items ) return;

            var sections = _.where(cleanedNewItems,{name: $scope.tab.name})[0].sections;
            if(!sections) return;

            var sectionChanged = _.values(delta)[0].sections;
            var sectionChangedKey = parseInt(_.first(_.keys(sectionChanged)));

            if(sections[sectionChangedKey]) {
                sectionService.update(sections[sectionChangedKey])
                    .success(function(response, status, headers, config) {
                        $localStorage.myDashboards = $scope.dashboards;
                        //console.log(sections[sectionChangedKey]);
                    }).error(function(response, status, headers, config) {
                    console.log(response);
                });
            }

            var panels = _.where(cleanedNewItems,{name: $scope.tab.name})[0].panels;
            if(!panels) return;

            var panelChanged = _.values(delta)[0].panels;
            var panelChangedKey = parseInt(_.first(_.keys(panelChanged)));

            if(panels[panelChangedKey]) {
                panelService.update(panels[panelChangedKey])
                  .success(function(response, status, headers, config) {
                    $localStorage.myDashboards = $scope.dashboards;
                    //console.log(panels[panelChangedKey]);
                  }).error(function(response, status, headers, config) {
                    console.log(response);
                });
            }

      }, true);


        $scope.editDashboard = function(){
            var modalInstance = $modal.open({
                templateUrl: '../modules/dashboards/views/dashboard_edit.html',
                controller: 'DashboardEditCtrl',
                size: 'lg',
                resolve: {
                    dashboardId: function () {
                        return $scope.tab.id;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.init();
            }, function () {
                $log.info('editDashboard dismissed at: ' + new Date());
            });

        };

        $scope.addDashboard = function(){
            var modalInstance = $modal.open({
                templateUrl: '../modules/dashboards/views/dashboard_add.html',
                controller: 'DashboardAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.init();
            }, function () {
                $log.info('addDashboard dismissed at: ' + new Date());
            });

        };

        $scope.addPanel = function () {
          var modalInstance = $modal.open({
            templateUrl: '../modules/panels/views/panel_add_container.html',
            controller: 'PanelAddContainerCtrl',
            size: 'lg'
          });

          modalInstance.result.then(function () {
            $scope.init();
          }, function () {
            $log.info('newDashboard dismissed at: ' + new Date());
          });
        };

      $scope.addSection = function () {
        var modalInstance = $modal.open({
          templateUrl: '../modules/sections/views/section_add.html',
          controller: 'SectionAddCtrl',
          size: 'lg'
        });

        modalInstance.result.then(function () {
          $scope.init();
        }, function () {
          $log.info('newSection dismissed at: ' + new Date());
        });
      };


      $scope.deleteDashboard = function(){
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to recover this dashboard!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel please!"
          },
          function(isConfirm) {
            if (isConfirm) {

              dashboardService.remove($scope.tab.id)
                .success(function (response, status, headers, config) {
                  $scope.setTab($scope.dashboards[0]);
                  $scope.init();
                })
                .error(function (response, status, headers, config) {
                  $log.info('deleted dashboard dismissed at: ' + new Date());
                });
            }
          });

      };

       // watcher();
        $scope.init();

        /* TODO: realtime dashboard items update
         var toggleWatch = function(watchExpr, fn) {
            var watchFn;
            return function() {
                if (watchFn) {
                    watchFn();
                    watchFn = undefined;
                    console.log("Disabled " + watchExpr);
                } else {
                    watchFn = $scope.$watch(watchExpr, fn, true);
                    console.log("Enabled " + watchExpr);
                }
            };
         };


         socket.on('panel.update.completed', function (message) {
            console.log(message);
            testWatcher()
            $scope.init();

            console.log(findDeep( $scope.dashboards[0].sections[0], message._id ));
            $scope.dashboards[0].sections[0].panels = angular.fromJson(message);
            var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });

            //testWatcher()
            $timeout(function(){
            testWatcher()
            }, 3000);
         });
         */

    }]);

'use strict';
angular.module('app').controller('LoginCtrl', ['$scope', '$rootScope', 'authService', '$localStorage', '$location', '$modal', '$log', function ($scope, $rootScope,authService,$localStorage, $location,$modal, $log) {
    $scope.errors =  {};
    $scope.submitted = false;
    $rootScope.showHeader = true;

    $scope.init = function(form) { };

    $scope.login = function(form) {
        $scope.submitted = true;
        if(form.email.$error.required) return;

      authService.login($scope.user)
            .success(function (response, status, headers, config) {
                var params = authService.parseToken(response.token);
                $localStorage.currentUser = params.user;
                $rootScope.currentUser =  $localStorage.currentUser;
                $location.path('/');


            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
                $scope.errors.other = response.message;
            });
    };

    var showTutorial = function (deviceId) {

      var modalInstance = $modal.open({
        templateUrl: '/modules/base/views/modals/tutorial.html',
        controller: 'tutorialCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function () {
        $log.info('editDevice ok at: ' + new Date());
      }, function () {
        $log.info('editDevice dismissed at: ' + new Date());
      });
    };


    $scope.init();
}]);
'use strict';

angular.module('app').controller('SignupCtrl', ['$scope', '$rootScope', '$location', 'sessionService', '$localStorage', 'reCAPTCHA', function ($scope,$rootScope, $location, sessionService,$localStorage, reCAPTCHA) {

    $scope.user = {};
    $scope.submitted = false;
    reCAPTCHA.setPublicKey('6LctfAITAAAAAMCUAZHyTfTb2TE-Nhx7Bb2wJspE');

    //$scope.$watch('user.captcha', function() {
        //$scope.form.error.mongoose = null;
        //$scope.form.$setPristine();
    //},true);

    $scope.register = function(form) {
        $scope.errors = {};
        $scope.submitted = true;

        sessionService.create($scope.user)
        .success(function (response, status, headers, config) {
            $rootScope.currentUser = null;
            $localStorage.$reset();
            $location.path('/access/suscription').search( {'message': 'Check your email for complete your sign up process'});
        })
        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
              //  $scope.submitted = false;
            });
            //$scope.errors.other = response.message;
        });

    };
}]);
'use strict';

angular.module('app').controller('ForgotPwdCtrl', ['$scope', '$rootScope', '$location', 'sessionService', '$localStorage', 'reCAPTCHA', function ($scope,$rootScope, $location, sessionService,$localStorage, reCAPTCHA) {

    $rootScope.enableExternal = true;

    $scope.sendChangePwdEmail = function(form) {
        $scope.errors = {};
        $scope.submitted = true;

        sessionService.sendChangePwdEmail($scope.email)
        .success(function (response, status, headers, config) {
            $rootScope.currentUser = null;
            $localStorage.$reset();
            $location.path('/access/signin').search({});
        })

        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
        });

    };
}]);
'use strict';

angular.module('app').controller('ChangePwdCtrl', ['$scope', '$rootScope', '$location', 'sessionService', '$localStorage', function ($scope,$rootScope, $location, sessionService,$localStorage) {

    $scope.guid = $location.search().guid;
    $rootScope.enableExternal = true;

    $scope.changePassword = function(form) {
        $scope.errors = {};
        $scope.submitted = true;


        if(!$scope.password){
          form["password"].$setValidity('mongoose', false);
          $scope.errors["password"] = "Field required";

          return;
        }

        if(!$scope.password2){
          form["password2"].$setValidity('mongoose', false);
          $scope.errors["password2"] = "Field required";

          return;
        }

        if($scope.password !== $scope.password2){
          form["password"].$setValidity('mongoose', false);
          $scope.errors["password"] = "Password does not not match";

          form["password2"].$setValidity('mongoose', false);
          $scope.errors["password2"] = "Password does not not match";
          return;
        }

        sessionService.confirmPwd({
          guid: $scope.guid,
          pwd: $scope.password
        })
        .success(function (response, status, headers, config) {
            $rootScope.currentUser = null;
            $localStorage.$reset();
            $location.path('/access/signin').search({});
        })
        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
        });

    };
}]);
'use strict';

angular.module('app').controller('SuscriptionCtrl', ['$scope', '$rootScope', '$location', 'sessionService', function ($scope,$rootScope, $location, sessionService) {

    $rootScope.enableExternal = true;

    $scope.init = function(form) {

        $scope.isButtonLoginEnabled = false;
        $scope.isButtonSignupEnabled = false;

        if($location.search().message){
            $scope.message = $location.search().message;
            $scope.isButtonLoginEnabled = false;
            $scope.isButtonSignupEnabled = false;
        }
        if($location.search().confirmation){

            var confirmationId = $location.search().confirmation;

            sessionService.confirmUser(confirmationId)
                .success(function (response, status, headers, config) {
                    if(response === null){
                        $scope.message = 'Sorry, this confirmation has expired, create a new account';
                        $scope.isButtonSignupEnabled = true;
                    } else {
                        $scope.message = 'Congratulations, now you are able to login!';
                        $scope.isButtonLoginEnabled = true;
                    }
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                    $scope.errors.other = response.message;
                });
        }

    };

    $scope.init();
}]);
'use strict';

angular.module('app').controller('NavbarCtrl', ['$scope', '$rootScope', '$localStorage', 'sessionService', '$state', function ($scope,$rootScope,$localStorage, sessionService, $state) {



}]);

'use strict';

angular.module('app').controller('HeaderCtrl', ['$scope', '$rootScope', '$modal', '$localStorage', 'sessionService', '$location', '$state', '$log', 'authService', function ($scope,  $rootScope, $modal, $localStorage, sessionService, $location, $state, $log, authService) {

  $scope.settings = function() {

      //http://blog.reactandbethankful.com/angular-multi-step-form/#/inside-modal
        var modalInstance = $modal.open({
            templateUrl: '/modules/users/views/user_settings.html',
            controller: 'UserSettingsCtrl',
            size: 'lg',
            resolve: {
                userId: function () {
                    return $localStorage.currentUser._id;
                }
            }
        });
    };

    $scope.showTutorial = function () {
      var modalInstance = $modal.open({
        templateUrl: '/modules/base/views/modals/tutorial.html',
        controller: 'tutorialCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function () {
        $log.info('showTutorial ok at: ' + new Date());
      }, function () {
        $log.info('showTutorial dismissed at: ' + new Date());
      });
    };

    $scope.payment = function () {
        var modalInstance = $modal.open({
            templateUrl: '/modules/base/views/modals/payment.html',
            controller: 'paymentCtrl',
            size: 'lg',
            resolve: {
                userId: function () {
                    return $localStorage.currentUser._id;
                }

            }
        });

        modalInstance.result.then(function () {
            $log.info('editDevice ok at: ' + new Date());
        }, function () {
            $log.info('editDevice dismissed at: ' + new Date());
        });
    };

    $scope.logout = function() {
     // authService.logout();
      authService.logout();
      $rootScope.currentUser = undefined;
      //$localStorage.$reset();
      location.reload();
      $state.transitionTo('access.signin');


    };


    $scope.addDashboard = function(){
      var modalInstance = $modal.open({
        templateUrl: '/modules/dashboards/views/dashboard_add.html',
        controller: 'DashboardAddCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function () {
        $rootScope.$broadcast('reload-myDashboard');
      }, function () {
        $log.info('addDashboard dismissed at: ' + new Date());
      });

    };


}]);

'use strict';

angular.module('app')
    .controller('publicCtrl', ['$scope', '$rootScope', 'panelService', 'sectionService', '$localStorage', 'publicService', '$routeParams', '$state', '$route', 'psResponsive', '$window', function ($scope, $rootScope, panelService, sectionService, $localStorage, publicService, $routeParams, $state, $route, psResponsive, $window) {

            $scope.dashboards = [];
            $scope.tab = { name:null, id:null };
            $scope.areOptionsEnabled = false;

            $scope.setTab = function(dashboard){
              $scope.tab.name = dashboard.name;
              $scope.tab.id = dashboard._id;
              $scope.init();
            };

            $rootScope.showHeader = false;
            $rootScope.app.settings.asideFolded = true;

            $scope.$on("$destroy", function(){
              $rootScope.showHeader = true;
              $rootScope.app.settings.asideFolded = false;
              $rootScope.noMenuStyle =  {}
            });

            if(psResponsive('< small')){
                $rootScope.noMenuStyle =  { "padding-top": "0px", "width": "105%", "background-color": "none" }
            } else{
                $rootScope.noMenuStyle =  { "padding-top": "0px", "margin-left": "-60px", "width": "105%", "background-color": "none" }
            }

            angular.element($window).on('resize', function () {
                if(psResponsive('< small')){
                    $rootScope.noMenuStyle =  { "padding-top": "0px", "width": "105%", "background-color": "none" }
                } else{
                    $rootScope.noMenuStyle =  { "padding-top": "0px", "margin-left": "-60px", "width": "105%", "background-color": "none" }
                }

            });

            $scope.gridsterOpts = {
              minColumns: 1,
              swapping: false,
              avoid_overlapped_widgets:true,
              width: 'auto',
              colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
              rowHeight: '80', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
              resizable: {
                enabled: false,
                start: function(event, uiWidget, $element) {},
                resize: function(event, uiWidget, $element) {},
                stop: function(event, uiWidget, $element) {}
              },
              draggable: {
                enabled: false, // whether dragging items is supported
                start: function(event, $element, widget) {}, // optional callback fired when drag is started,
                drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
                stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
              }

            };

            $scope.init = function() {

                publicService.getAllDashboards($state.params.id) //iL4bJVGT820
                    .success(function (response, status, headers, config) {
                        $scope.dashboards = response;
                        if (!response || !response[0] ) return;

                        $scope.user = response[0].owner ? response[0].owner : null;
                        if ($rootScope.currentUser &&  $rootScope.currentUser.email !== 'mravinale@gmail.com' && (!$scope.user || $scope.user.accountType == 'Free')) return;

                        _.each( $scope.dashboards, function(dashboard){
                          var items = _.union(dashboard.panels, dashboard.sections);
                          dashboard.items = items.length <= 0?  [{}] : items;
                        });

                        $scope.tab.name = $scope.tab.name? $scope.tab.name : response[0].name;
                        $scope.tab.id = $scope.tab.id? $scope.tab.id : response[0]._id;
                        $localStorage.currentDashboard = $scope.tab;


                    })
                    .error(function (response, status, headers, config) {
                        $state.transitionTo('access.signin');
                    });
            };

            $scope.init();
    }]);


'use strict';

angular.module('app')
    .controller('publicListCtrl', ['$scope', '$rootScope', 'panelService', 'sectionService', '$localStorage', 'publicService', '$routeParams', '$state', '$route', 'psResponsive', '$window', function ($scope, $rootScope, panelService, sectionService, $localStorage, publicService, $routeParams, $state, $route, psResponsive, $window) {

            $scope.tab = null;

            $scope.setTab = function(id){
                $scope.tab = id;
            };

            $rootScope.showHeader = false;
            $rootScope.app.settings.asideFolded = true;

            $scope.$on("$destroy", function(){
              $rootScope.showHeader = true;
              $rootScope.app.settings.asideFolded = false;
              $rootScope.noMenuStyle =  {}
            });

            if(psResponsive('< small')){
                $rootScope.noMenuStyle =  { "padding-top": "0px", "width": "105%", "background-color": "none" }
            } else{
                $rootScope.noMenuStyle =  { "padding-top": "0px", "margin-left": "-60px", "width": "105%", "background-color": "none" }
            }

            angular.element($window).on('resize', function () {
                if(psResponsive('< small')){
                    $rootScope.noMenuStyle =  { "padding-top": "0px", "width": "105%", "background-color": "none" }
                } else{
                    $rootScope.noMenuStyle =  { "padding-top": "0px", "margin-left": "-60px", "width": "105%", "background-color": "none" }
                }

            });

            $scope.filterAccounts = function (user) {

              if($rootScope.currentUser &&  $rootScope.currentUser.email === 'mravinale@gmail.com'){
                return true;
              } else {
                return user.accountType !== 'free';
              }

            };

            publicService.getAllUsers()
              .success(function (response, status, headers, config) {
                  //$scope.users = response;

                  if($rootScope.currentUser &&  $rootScope.currentUser.email === 'mravinale@gmail.com'){
                    $scope.users = response;
                  } else {
                    $scope.users = _.reject(response, function (user) {
                      return user.accountType == 'free';
                    });
                  }

                  $scope.devices = _.reduce( $scope.users, function(memo, user){ return memo + user.statistics.devices; }, 0);
                  $scope.messages = _.reduce( $scope.users, function(memo, user){ return memo + user.statistics.messages; }, 0);
                  $scope.sensors = _.reduce( $scope.users, function(memo, user){ return memo + user.statistics.sensors; }, 0);
              })
              .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.type;
                });
              });


    }]);


'use strict';

angular.module('app')
  .controller('tutorialCtrl', ['$scope', '$rootScope', 'deviceService', 'sensorService', '$modalInstance', 'userService', function ($scope, $rootScope, deviceService, sensorService, $modalInstance, userService) {

    $scope.user = {
      showTutorial: $rootScope.currentUser.showTutorial,
      _id: $rootScope.currentUser._id,
      username: $rootScope.currentUser.username,
      email: $rootScope.currentUser.email
    };

    $scope.$watch(
      "user.showTutorial", function(val) {
        console.log(val)
        userService.update($scope.user)
          .success(function (response, status, headers, config) {
            console.log(response)
          })
          .error(function (response, status, headers, config) {
            console.error(response) //TODO: add logly
          })
      }

    );

    $scope.steps = [
      {
        templateUrl: '/modules/base/views/modals/tutorial/tutorial_sensor_add.html',
        controller: 'TutorialSensorAddCtrl'
      },
      {
        templateUrl: '/modules/base/views/modals/tutorial/tutorial_device_add.html',
        controller: 'TutorialDeviceAddCtrl'
      },
      {
        templateUrl: '/modules/base/views/modals/tutorial/tutorial_panel_add.html',
        controller: 'TutorialPanelAddCtrl'
      },
      {
        templateUrl: '/modules/base/views/modals/tutorial/tutorial_section_add.html',
        controller: 'TutorialSectionAddCtrl'
      },
      {
        templateUrl: '/modules/base/views/modals/tutorial/tutorial_dashboard_add.html',
        controller: 'TutorialDashboardAddCtrl'
      }
    ];

  }]);

'use strict';

//add
angular.module('app')
    .controller('paymentCtrl', ['$scope', '$rootScope', '$modalInstance', 'userService', 'userId', 'alerts', 'StripeCheckout', '$http', function ($scope, $rootScope, $modalInstance, userService, userId, alerts, StripeCheckout, $http) {


        $scope.user = { };
        var alert = null;
        var handler = null;
        var token = "sk_live_sTn2T9WqJhZpGzo5P9yXcNTl";
        //var token = "sk_test_ZEqEfWGLO1W1mJQpQu4bzSwi";

        var formalizer = function(data ){
            var str = [];
            for (var d in data)
                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
            return str.join("&");
        };


        StripeCheckout.load()
            .then(function(result){
                 
                handler = StripeCheckout.configure({
                    name: "ConnectingThings",
                    image: "assets/img/logo.png",
                    locale:"auto",
                    token: function(token, args) {
                        // $log.debug("Got stripe token: " + token.id);
                    }
                });

            })
            .catch(function(response, status, headers, config) {
                console.log(response);
                alert = alerts.create("An error has occurred, try again", 'danger');
            });

            userService.getById(userId)
                .success(function (response, status, headers, config) {
                    $scope.user = response;
                    console.log(response);

                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                    alert = alerts.create("An error has occurred, try again", 'danger');
                });

        $scope.doFreeCheckout = function() {

             $http({
                method: 'DELETE',
                url: 'https://api.stripe.com/v1/subscriptions/'+ $scope.user.subscription,
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            .then(function(result){

                $scope.user.accountType =  "free";
                $scope.user.subscription =  null;

                userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.currentUser.accountType = $scope.user.accountType;
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                });

            },function() {

                alert = alerts.create("An error has occurred, try again", 'danger');
            });


        };

        $scope.doBronzeCheckout = function() {

            if(!$scope.isAccountReady ("bronze")) return;

            handler.open({
                description: "Bronze Plan",
                amount: 100
            })
            .then(function(result) {
                //console.log("Got Stripe token: " + result[0].id);
                if($scope.user.customerId){
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers/'+ $scope.user.customerId,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })

                } else {
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })
                }

            })
            .then(function(result) {
                    debugger
                $scope.user.customerId =  result.data.id;

                if($scope.user.subscription){

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions/'+ $scope.user.subscription,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            plan: 'bronze'
                        })
                    });
                } else {

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            customer: $scope.user.customerId,
                            plan: 'bronze'
                        })
                    });
                }

                })
            .then(function(result){

                $scope.user.accountType =  "bronze";
                $scope.user.subscription =  result.data.id;

                userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.currentUser.accountType = $scope.user.accountType;
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                });

            },function() {
                alert = alerts.create("An error has occurred, try again", 'danger');
            });


        };

        $scope.doSilverCheckout = function() {

            if(!$scope.isAccountReady ("silver")) return;

            handler.open({
                description: "Silver Plan",
                amount: 500
            })
            .then(function(result) {
                //console.log("Got Stripe token: " + result[0].id);
                if($scope.user.customerId){
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers/'+ $scope.user.customerId,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })

                } else {
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })
                }

            })
            .then(function(result) {
                //console.log("Got Stripe token: " + result[0].id);

                $scope.user.customerId =  result.data.id;

                if($scope.user.subscription){

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions/'+ $scope.user.subscription,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            plan: 'silver'
                        })
                    });
                } else {

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            customer:  $scope.user.customerId,
                            plan: 'silver'
                        })
                    });
                }

            })
            .then(function(result){

                $scope.user.accountType =  "silver";
                $scope.user.subscription =  result.data.id;

                userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.currentUser.accountType = $scope.user.accountType;
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                });

            },function() {

                alert = alerts.create("An error has occurred, try again", 'danger');
            });


        };

        $scope.doGoldCheckout = function(token) {

            if(!$scope.isAccountReady ("gold")) return;

            handler.open({
                description: "Golden Plan",
                amount: 1000
            })
            .then(function(result) {
                //console.log("Got Stripe token: " + result[0].id);
                if($scope.user.customerId){
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers/'+ $scope.user.customerId,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })

                } else {
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })
                }

            })
            .then(function(result) {

                $scope.user.customerId =  result.data.id;

                if($scope.user.subscription){

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions/'+ $scope.user.subscription,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            plan: 'gold'
                        })
                    });
                } else {

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            customer:  $scope.user.customerId,
                            plan: 'gold'
                        })
                    });
                }

            })
            .then(function(result){

                $scope.user.accountType =  "gold";
                $scope.user.subscription =  result.data.id;

                userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.currentUser.accountType = $scope.user.accountType;
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                });

            },function() {

                alert = alerts.create("An error has occurred, try again", 'danger');
            });


        };

        $scope.cancel = function () {
            alerts.dismiss(alert);
            $modalInstance.dismiss('cancel');
        };

        $scope.isAccountReady = function(newAccountType){

            if($scope.user.accountType =="silver" && newAccountType == "bronze" &&
                ($scope.user.statistics.devices >= 5 || $scope.user.statistics.sensors >= 10) ){
                alert = alerts.create("you should have less than 5 devices and 10 sensors", 'danger');
                return false;
            }

            if($scope.user.accountType =="gold" && newAccountType == "bronze" &&
                ($scope.user.statistics.devices >= 5 || $scope.user.statistics.sensors >= 10) ){
                alert = alerts.create("you should have less than 5 devices and 10 sensors", 'danger');
                return false;
            }

            if($scope.user.accountType =="gold" && newAccountType == "silver" &&
                ($scope.user.statistics.devices >= 10 || $scope.user.statistics.sensors >= 15) ){
                alert = alerts.create("you should have less than 10 devices and 15 sensors", 'danger');
                return false;
            }

            return true;

        }

    }]);

'use strict';

angular.module('app').factory('authService', ['$http', '$window', function ($http, $window) {

  var authService = {};

  // Save the token in the local storage
  authService.saveToken = function(token) {
    $window.localStorage.jwtToken = token;
  };

  // Retrieve the token in the local storage
  authService.getToken = function() {
    return $window.localStorage.jwtToken;
  };

  // Login - Make a request to the api for authenticating
  authService.login = function (credentials) {
    return $http.post('/auth/session', credentials);
  };

  // Logout
  authService.logout = function () {
    if (authService.getToken()) {
      $window.localStorage.removeItem('jwtToken');
    }
  };

  // Check if the user is authenticated
  authService.isAuthed = function () {

    var token = authService.getToken();

    if (token) {

      var params = authService.parseToken(token);
      var dateNow = Math.round(new Date().getTime() / 1000);

      // If the token has not expired
      return dateNow <= params.exp;

    } else {

      return false;

    }
  };

  // Parse the JSON Web Token
  authService.parseToken = function (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-','+').replace('_','/');
    return JSON.parse($window.atob(base64));
  };

  return authService;
}]);

// Inject the $interceptor to avoid circular dependencies
angular.module('app').factory('authInterceptor', ['$q', '$injector', 'baseUrl', function ($q, $injector, baseUrl) {

  return {

    // Automatically attach Authorization header
    request: function (config) {

      var AuthService = $injector.get('authService');
      var token = AuthService.getToken();

      config.url = config.url.split("/")[0] !== "" || config.url.includes(".html")? config.url : baseUrl+config.url.replace(/^\//, "");
      var isCommand = config.url.search("/resources/") != -1;
      if (token && !isCommand) {
        config.headers['x-access-token'] = token;
      }

      config.headers['Content-Type'] = 'application/json; charset=UTF-8';

      return config;

    },

    // If a token was sent back, then save it
    response: function (res) {

      var token = res.data.token;
      var AuthService = $injector.get('authService');

      if (token) {
        AuthService.saveToken(token);
      }

      return res;
    },

    // Automatically attach Authorization header
    responseError: function (rejection) {

      return $q.reject(rejection);

    },
  };

}]);

'use strict';

angular.module('app')
    .controller('DashboardAddCtrl', ['$scope', 'dashboardService', 'panelService', 'sectionService', '$location', '$modalInstance', function ($scope, dashboardService, panelService, sectionService, $location, $modalInstance) {

    $scope.dashboard = {  };


    $scope.save = function (form) {
        $scope.errors = {};

        dashboardService.create($scope.dashboard)
        .success(function (response, status, headers, config) {
            $modalInstance.close();
        }).error(function (response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });

    };

    panelService.getAllPanels() //TODO: use backedn filtering
        .success(function (response, status, headers, config) {

            var nonSelectedPanels = _.filter(response, function(panel){ return _.isUndefined(panel.dashboard) });
            if(_.isEmpty($scope.dashboard.panels)){
                $scope.panels =  nonSelectedPanels;
            } else {
                var selectedDashboardPanels = _.map($scope.dashboard.panels, function(panelId){ return _.where(response, {_id: panelId})[0] });
                $scope.panels =  _.union(nonSelectedPanels, selectedDashboardPanels);
            }
        })
        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });


    sectionService.getAllSections()//TODO: use backedn filtering
        .success(function (response, status, headers, config) {
            var nonSelectedSections = _.filter(response, function(section){ return _.isUndefined(section.dashboard) });
            if(_.isEmpty($scope.dashboard.sections)){
                $scope.sections =  nonSelectedSections;
            } else {
                var selectedDashboardSections = _.map($scope.dashboard.sections, function(sectionId){ return _.where(response, {_id: sectionId})[0] });
                $scope.sections =  _.union(nonSelectedSections, selectedDashboardSections);
            }
            
        })
        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function(error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });

        $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

'use strict';
angular.module('app')
    .controller('DashboardEditCtrl', ['$scope', '$routeParams', 'dashboardService', 'sectionService', 'panelService', '$location', '$modalInstance', 'dashboardId', function ($scope, $routeParams, dashboardService, sectionService, panelService, $location, $modalInstance, dashboardId) {

        $scope.dashboard = { addedPanels:[],removedPanels:[], addedSections:[], removedSections:[] };
        var originalPanels = [];
        var originalSections = [];


        dashboardService.getById(dashboardId)
            .success(function (response, status, headers, config) {
                $scope.dashboard = _.extend(response, $scope.dashboard);
                originalPanels = angular.copy($scope.dashboard.panels);
                originalSections = angular.copy($scope.dashboard.panels)
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            $scope.dashboard.addedPanels = _.filter($scope.dashboard.panels, function(panel){ return !(_.contains(originalSections, panel));});
            $scope.dashboard.removedPanels = _.filter(originalPanels, function(panel){ return !(_.contains($scope.dashboard.panels, panel));});

            $scope.dashboard.addedSections = _.filter($scope.dashboard.sections, function(section){ return !(_.contains(originalSections, section));});
            $scope.dashboard.removedSections = _.filter(originalSections, function(section){ return !(_.contains($scope.dashboard.panels, section));});

            dashboardService.update($scope.dashboard)
                  .success(function (response, status, headers, config) {
                      $modalInstance.close();
                  })
                  .error(function(response, status, headers, config) {
                      angular.forEach(response.errors, function(error, field) {
                          form[field].$setValidity('mongoose', false);
                          $scope.errors[field] = error.message;
                      });
                  });

        };

        panelService.getAllPanels()
            .success(function (response, status, headers, config) {
                var nonSelectedPanels = _.filter(response, function(panel){ return _.isUndefined(panel.dashboards) });
                if(_.isEmpty($scope.dashboard.panels)){
                    $scope.panels =  nonSelectedPanels;
                } else {
                    var selectedDashboardPanels = _.map($scope.dashboard.panels, function(panelId){ return _.where(response, {_id: panelId})[0] });
                    $scope.panels =  _.union(nonSelectedPanels, selectedDashboardPanels);
                }

                // console.log( $scope.panels);
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        sectionService.getAllSections()
            .success(function (response, status, headers, config) {

                $scope.sections =  response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';

angular.module('app')
    .controller('DashboardListCtrl', ['$scope', '$rootScope', 'dashboardService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, $rootScope, dashboardService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    dashboardService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);
                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
            });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        };

        $scope.newDashboard = function () {
            var modalInstance = $modal.open({
                templateUrl: 'dashboard_add',
                controller: 'DashboardAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('newDashboard dismissed at: ' + new Date());
            });
        };

        $scope.editDashboard = function (dashboardId) {

            var modalInstance = $modal.open({
                templateUrl: 'dashboard_edit',
                controller: 'DashboardEditCtrl',
                size: 'lg',
                resolve: {
                    dashboardId: function () {
                        return dashboardId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('editDashboard dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(dashboard){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this dashboard!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                dashboardService.remove(dashboard._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });
              }
            });
        };

      $rootScope.$on('reload-tableParams', function(event, args) {
        $scope.tableParams.reload();
      });

      $scope.initDataTable();

    }]);

'use strict';

angular.module('app')
    .controller('SectionAddCtrl', ['$scope', 'sectionService', 'panelService', 'dashboardService', '$location', '$localStorage', '$modalInstance', function ($scope, sectionService,panelService, dashboardService, $location, $localStorage, $modalInstance) {

        $scope.section = { isPublic: true, dashboard: $localStorage.currentDashboard.id };

        $scope.save = function(form) {
            $scope.errors = {};

           sectionService.create($scope.section)
                .success(function (response, status, headers, config) {
                   $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        dashboardService.getAllDashboards()
          .success(function(response, status, headers, config) {
            $scope.dashboards = response;
          })
          .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });

    }]);

'use strict';
angular.module('app')
    .controller('SectionEditCtrl', ['$scope', '$routeParams', 'sectionService', 'dashboardService', '$location', '$localStorage', 'panelService', '$modalInstance', 'sectionId', function ($scope, $routeParams, sectionService, dashboardService, $location, $localStorage, panelService, $modalInstance, sectionId) {

      $scope.section = {  };

        sectionService.getById(sectionId)
            .success(function (response, status, headers, config) {
                $scope.section = response;
                $scope.section.dashboard = $localStorage.currentDashboard.id
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            sectionService.update($scope.section)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        dashboardService.getAllDashboards()
          .success(function(response, status, headers, config) {
            $scope.dashboards = response;
          })
          .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });

    }]);

'use strict';

angular.module('app')
    .controller('SectionListCtrl', ['$scope', '$rootScope', 'sectionService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, $rootScope, sectionService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    sectionService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);
                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        };

        $scope.newSection = function () {
            var modalInstance = $modal.open({
                templateUrl: 'section_add',
                controller: 'SectionAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('newSection dismissed at: ' + new Date());
            });
        };

        $scope.editSection = function (sectionId) {

            var modalInstance = $modal.open({
                templateUrl: 'section_edit',
                controller: 'SectionEditCtrl',
                size: 'lg',
                resolve: {
                    sectionId: function () {
                        return sectionId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('editSection dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(section){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this section!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                sectionService.remove(section._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });
              }
            });
        };

      $rootScope.$on('reload-tableParams', function(event, args) {
        $scope.tableParams.reload();
      });


      $scope.initDataTable();

    }]);

'use strict';

angular.module('app')
    .controller('PanelListCtrl', ['$scope', '$rootScope', 'panelService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, $rootScope, panelService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

    $scope.errors = {};
    $scope.filters = {  searchFilter: '' };

    angular.element($window).on('resize', function () {
        $scope.tableParams.sizeFlag = psResponsive('> small');
        $scope.tableParams.typeFlag = psResponsive('> small');
    });

    $scope.initDataTable = function () {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            },
            filter: $scope.filters
        }, {
            total: 0,           // length of data
            getData: function ($defer, params) {
                panelService.getAll(params).success(function (response, status, headers, config) {
                    params.total(response.count);
                    $defer.resolve(response.data);

                }).error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
            }
        });
        $scope.tableParams.sizeFlag = psResponsive('> small');
        $scope.tableParams.typeFlag = psResponsive('> small');
    };

    $scope.newPanel = function () {
        var modalInstance = $modal.open({
            templateUrl: 'modules/panels/views/panel_add_container.html',
            controller: 'PanelAddContainerCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function () {
            $scope.tableParams.reload();
        }, function () {
            $log.info('newDashboard dismissed at: ' + new Date());
        });
    };

    $scope.editPanel = function (panelId) {

        var modalInstance = $modal.open({
            templateUrl: '../modules/panels/views/panel_edit_container.html',
            controller: 'PanelEditContainerCtrl',
            size: 'lg',
            resolve: {
                panelId: function () {
                    return panelId;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.tableParams.reload();
        }, function () {
            $log.info('editDashboard dismissed at: ' + new Date());
        });
    };

    $scope.delete = function (panel) {

      SweetAlert.swal({
          title: "Are you sure?",
          text: "Your will not be able to recover this panel!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!"
        },
        function(isConfirm) {
          if (isConfirm) {
            panelService.remove(panel._id)
              .success(function (response, status, headers, config) {
                $scope.tableParams.reload();
              }).error(function (response, status, headers, config) {
                angular.forEach(response.errors, function (error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.type;
                });
              });
          }
        });
    };

    $rootScope.$on('reload-tableParams', function(event, args) {
      $scope.tableParams.reload();
    });


    $scope.initDataTable();

}]);


'use strict';

angular.module('app')
    .controller('PanelCodeCtrl', ['$scope', '$modalInstance', 'host', 'topic', 'value', function ($scope, $modalInstance, host, topic, value) {

        $scope.host = host;
        $scope.topic = topic;
        $scope.value = value;
        $scope.tab = 'cURL';

        $scope.setTab = function(tabName){

            $scope.tab = tabName;

        };


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);


'use strict';

angular.module('app')
    .controller('PanelAddContainerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.user = {
            showTutorial: $rootScope.currentUser.showTutorial,
            _id: $rootScope.currentUser._id,
            username: $rootScope.currentUser.username,
            email: $rootScope.currentUser.email
        };



        $scope.steps = [
            {
                templateUrl: '/modules/panels/views/external/panel_add.html',
                controller: 'PanelAddCtrl'
            },
            {
                templateUrl: '/modules/panels/views/external/sensor_add.html',
                controller: 'PanelSensorAddCtrl'
            },
            {
                templateUrl: '/modules/panels/views/external/device_add.html',
                controller: 'PanelDeviceAddCtrl'
            }

        ];

    }]);


'use strict';

angular.module('app')
    .controller('PanelEditContainerCtrl', ['$scope', '$rootScope', 'panelId', '$location', function ($scope, $rootScope, panelId, $location) {

        $scope.user = {
            showTutorial: $rootScope.currentUser.showTutorial,
            _id: $rootScope.currentUser._id,
            username: $rootScope.currentUser.username,
            email: $rootScope.currentUser.email,
            panelId: panelId
        };

        $location.search({ panelId:panelId });


        $scope.steps = [
            {
                templateUrl: '/modules/panels/views/external/panel_edit.html',
                controller: 'PanelEditCtrl'
            },
            {
                templateUrl: '/modules/panels/views/external/sensor_add.html',
                controller: 'PanelSensorAddCtrl'
            },
            {
                templateUrl: '/modules/panels/views/external/device_add.html',
                controller: 'PanelDeviceAddCtrl'
            }

        ];

    }]);

'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('PanelAddCtrl', ['$scope', 'panelService', 'deviceService', 'cameraService', 'dashboardService', '$location', '$localStorage', function ($scope, panelService, deviceService, cameraService, dashboardService, $location, $localStorage) {

        $scope.panel = { isPublic: true, dashboard: $localStorage.currentDashboard.id };

        var params =  $location.search();

        $scope.addSensor = function(){
            $location.search({id: 2, deviceId: $scope.panel.device });
        };

        $scope.addDevice = function(){
            $location.search('id', 3);
        };

        $scope.save = function(form) {
            $scope.errors = {};

            panelService.create($scope.panel)
                .success(function(response, status, headers, config) {
                    $scope.$finish();
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        $scope.$watch('panel.device', function(deviceId) {

            if(!deviceId) return;

            deviceService.getFullById(deviceId)
                .success(function(response, status, headers, config) {
                    $scope.sensors = response.sensors;
                    $scope.panel.sensor = params.sensorId? params.sensorId : ($scope.sensors[0] ? $scope.sensors[0]._id : null);
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        });

        $scope.$watch('panel.camera', function(camera) {

            if(camera) {
                $scope.panel.sensor = null;
                $scope.panel.device = null;
                $scope.panel.section = null;
            }

        });

        $scope.$watch('panel.sensor', function(sensor) {

            if(sensor) {
                $scope.panel.camera = null;
                $scope.panel.section = null;
            }

        });

        deviceService.getAllDevices()
            .success(function(response, status, headers, config) {
                $scope.devices = response;
                $scope.panel.device = params.deviceId? params.deviceId : ($scope.devices[0] ? $scope.devices[0]._id : null);
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        cameraService.getAllCameras()
            .success(function(response, status, headers, config) {
                $scope.cameras = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        dashboardService.getAllDashboards()
            .success(function(response, status, headers, config) {
                $scope.dashboards = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });


    }]);

'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('PanelEditCtrl', ['$scope', '$routeParams', 'panelService', 'dashboardService', 'deviceService', 'cameraService', '$location', '$localStorage', function ($scope, $routeParams, panelService, dashboardService, deviceService, cameraService, $location, $localStorage) {

        $scope.panel = { };

        var params =  $location.search();

        $scope.addSensor = function(){
          $location.search({ id: 2, panelId: params.panelId, deviceId: $scope.panel.device });
        };

        $scope.addDevice = function(){
          $location.search({ id: 3, panelId: params.panelId });
        };

        panelService.getById(params.panelId)
            .success(function(response, status, headers, config) {
                $scope.panel = response;
                $scope.panel.dashboard = $localStorage.currentDashboard.id
            }).error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        deviceService.getAllDevices()
            .success(function(response, status, headers, config) {
                $scope.devices = response;
                $scope.panel.device = params.deviceId? params.deviceId : ( $scope.panel.device?  $scope.panel.device :  $scope.devices[0]._id);
            }).error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        cameraService.getAllCameras()
          .success(function(response, status, headers, config) {
            $scope.cameras = response;
          })
          .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });

      dashboardService.getAllDashboards()
        .success(function(response, status, headers, config) {
          $scope.dashboards = response;
        })
        .error(function(response, status, headers, config) {
          angular.forEach(response.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });

        $scope.save = function(form) {
            $scope.errors = {};

            panelService.update($scope.panel)
                .success(function(response, status, headers, config) {
                  $scope.$finish();
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.$watch('panel.device', function(deviceId) {

            if(!deviceId) return;

            deviceService.getFullById(deviceId)
                .success(function(response, status, headers, config) {
                    $scope.sensors = response.sensors;
                    $scope.panel.sensor = params.sensorId? params.sensorId : ($scope.panel.sensor ? $scope.panel.sensor : $scope.sensors[0]._id);
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        });

        $scope.$watch('panel.camera', function(camera) {

            if(camera) {
                $scope.panel.sensor = null;
                $scope.panel.device = null;
            }

        });

        $scope.$watch('panel.sensor', function(sensor) {

            if(sensor) {
                $scope.panel.camera = null;
            }

        });


    }]);

'use strict';

angular.module('app')
    .controller('PanelSensorAddCtrl', ['$scope', 'sensorService', 'deviceService', '$location', function ($scope, sensorService, deviceService, $location) {

        var alert = null;
        $scope.sensor = { };
        $scope.device = { };
        var params =  $location.search();

        deviceService.getById(params.deviceId)
          .success(function (response, status, headers, config) {
            $scope.device = response
          })
          .error(function(response, status, headers, config) {
            alert= alerts.create("There was an error trying to save the transaction, please try again", 'danger');
          });

        $scope.save = function(form) {
            $scope.errors = {};

          //TODO handle errors
            sensorService.create($scope.sensor)
                .success(function (sensorResponse, status, headers, config) {
                  params.sensorId = sensorResponse._id;
                  $scope.device.sensors.push(sensorResponse._id);

                  deviceService.update($scope.device)
                    .success(function (deviceResponse, status, headers, config) {
                      params.id = 1;
                      $location.search(params);
                    })
                    .error(function(response, status, headers, config) {
                        alert= alerts.create("There was an error trying to save the transaction, please try again", 'danger');
                    });

                })
                .error(function(response, status, headers, config) {
                    if(!response.errors && response.message){
                        alert= alerts.create(response.message, 'danger');
                    }
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        $scope.goBack = function(){
            $location.search('id', 1);
        }


    }]);

'use strict';

angular.module('app')
    .controller('PanelDeviceAddCtrl', ['$scope', '$rootScope', 'deviceService', 'sensorService', '$filter', '$location', function ($scope,$rootScope, deviceService, sensorService, $filter,$location) {

        var alert = null;
        $scope.device = { name:"" };

        var params =  $location.search();

        $scope.$watch('device.name', function() {
            $scope.device.name = $filter('lowercase')($scope.device.name);
        });

        $scope.save = function(form) {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                    params.id = 1;
                    params.deviceId = response._id;
                    $location.search( params );
                })
                .error(function(response, status, headers, config) {
                    if(!response.errors && response.message){
                        alert= alerts.create(response.message, 'danger');
                    }
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };


          $scope.goBack = function(){
              $location.search('id', 1);
          }

    }]);

'use strict';

angular.module('app')
    .controller('DeviceAddCtrl', ['$scope', 'deviceService', 'sensorService', '$modalInstance', '$filter', 'alerts', function ($scope, deviceService, sensorService, $modalInstance, $filter,alerts) {

        var alert = null;
        $scope.device = { name:"" };

        $scope.$watch('device.name', function() {
          $scope.device.name = $filter('lowercase')($scope.device.name);
        });


        $scope.save = function(form) {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    if(!response.errors && response.message){
                        alert= alerts.create(response.message, 'danger');
                    }
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        sensorService.getAllSensors()
            .success(function (response, status, headers, config) {
                $scope.sensors = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.cancel = function () {
            alerts.dismiss(alert);
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';
angular.module('app')
    .controller('DeviceEditCtrl', ['$scope', '$routeParams', 'deviceService', 'sensorService', '$location', '$modalInstance', 'deviceId', '$filter', function ($scope, $routeParams, deviceService, sensorService, $location, $modalInstance, deviceId, $filter) {

        $scope.device = { name:"" };

        $scope.$watch('device.name', function() {
          $scope.device.name = $filter('lowercase')($scope.device.name);
        });

        deviceService.getById(deviceId)
            .success(function (response, status, headers, config) {
                $scope.device = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            deviceService.update($scope.device)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        sensorService.getAllSensors()
            .success(function (response, status, headers, config) {
                $scope.sensors = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };


    }]);

'use strict';

angular.module('app')
    .controller('DeviceListCtrl', ['$scope', '$rootScope', 'deviceService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, $rootScope, deviceService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    deviceService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);

                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        };


        $scope.newDevice = function () {
            var modalInstance = $modal.open({
                templateUrl: 'device_add',
                controller: 'DeviceAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('newDevice dismissed at: ' + new Date());
            });
        };

        $scope.editDevice = function (deviceId) {

            var modalInstance = $modal.open({
                templateUrl: 'device_edit',
                controller: 'DeviceEditCtrl',
                size: 'lg',
                resolve: {
                    deviceId: function () {
                        return deviceId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('editDevice dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this device!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                deviceService.remove(device._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });
              }
            });
        };
          $rootScope.$on('reload-tableParams', function(event, args) {
              $scope.tableParams.reload();
          });

        $scope.initDataTable();

    }]);

'use strict';

angular.module('app')
    .controller('SensorAddCtrl', ['$scope', 'sensorService', '$location', '$modalInstance', '$filter', 'alerts', function ($scope, sensorService,$location, $modalInstance, $filter, alerts) {

        var alert = null;
        $scope.sensor = { tag:"" };

        $scope.$watch('sensor.tag', function() {
          $scope.sensor.tag= $filter('lowercase')($scope.sensor.tag);
        });

        $scope.save = function(form) {
            $scope.errors = {};

           sensorService.create($scope.sensor)
                .success(function (response, status, headers, config) {
                   $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    if(!response.errors && response.message){
                        alert= alerts.create(response.message, 'danger');
                    }
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        $scope.cancel = function () {
            alerts.dismiss(alert);
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';
angular.module('app')
    .controller('SensorEditCtrl', ['$scope', '$routeParams', 'sensorService', '$modalInstance', 'sensorId', '$filter', function ($scope, $routeParams, sensorService, $modalInstance, sensorId, $filter) {

        $scope.sensor = { tag:"" };

        $scope.$watch('sensor.tag', function() {
          $scope.sensor.tag= $filter('lowercase')($scope.sensor.tag);
        });

        sensorService.getById(sensorId)
            .success(function (response, status, headers, config) {
                $scope.sensor = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            sensorService.update($scope.sensor)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';

angular.module('app')
    .controller('SensorListCtrl', ['$scope', '$rootScope', 'sensorService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, $rootScope, sensorService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    sensorService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);

                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
            $scope.tableParams.tagFlag = psResponsive('> small');
        };

        $scope.newSensor = function () {
            var modalInstance = $modal.open({
                templateUrl: 'sensor_add',
                controller: 'SensorAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('new sensor dismissed at: ' + new Date());
            });
        };

        $scope.editSensor = function (sensorId) {

            var modalInstance = $modal.open({
                templateUrl: 'sensor_edit',
                controller: 'SensorEditCtrl',
                size: 'lg',
                resolve: {
                    sensorId: function () {
                        return sensorId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('edit sensor dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this sensor!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                sensorService.remove(device._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });
              }
            });
        }
          $rootScope.$on('reload-tableParams', function(event, args) {
              $scope.tableParams.reload();
          });

        $scope.initDataTable();

    }]);

'use strict';

angular.module('app')
    .controller('CameraAddCtrl', ['$scope', 'cameraService', 'sensorService', '$location', '$modalInstance', function ($scope, cameraService, sensorService, $location, $modalInstance ) {

        $scope.camera = { };

        $scope.save = function(form) {
            $scope.errors = {};

            cameraService.create($scope.camera)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';
angular.module('app')
    .controller('CameraEditCtrl', ['$scope', '$routeParams', 'cameraService', 'sensorService', '$location', '$modalInstance', 'cameraId', function ($scope, $routeParams, cameraService, sensorService, $location, $modalInstance , cameraId) {

        $scope.camera = { };

        cameraService.getById(cameraId)
            .success(function (response, status, headers, config) {
                $scope.camera = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            cameraService.update($scope.camera)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';

angular.module('app')
    .controller('CameraListCtrl', ['$scope', 'cameraService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, cameraService, ngTableParams, $modal, $log, psResponsive,$window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    cameraService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);
                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        };



        $scope.newCamera = function () {
            var modalInstance = $modal.open({
                templateUrl: 'camera_add',
                controller: 'CameraAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('newDashboard dismissed at: ' + new Date());
            });
        };

        $scope.editCamera = function (cameraId) {

            var modalInstance = $modal.open({
                templateUrl: 'camera_edit',
                controller: 'CameraEditCtrl',
                size: 'lg',
                resolve: {
                    cameraId: function () {
                        return cameraId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('editDashboard dismissed at: ' + new Date());
            });
        };


        $scope.delete =  function(camera){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this camera!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                cameraService.remove(camera._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });
              }
            });
        }


        $scope.initDataTable();

    }]);

'use strict';

angular.module('app')
    .controller('MessageListCtrl', ['$scope', '$rootScope', 'messageService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, $rootScope, messageService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    topic: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    messageService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);

                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        };



        $scope.delete =  function(message){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this message!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                messageService.remove(message._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });
              }
            });
        };
          $rootScope.$on('reload-tableParams', function(event, args) {
              $scope.tableParams.reload();
          });

        $scope.initDataTable();

    }]);

'use strict';

angular.module('app')
    .controller('UserAddCtrl', ['$scope', 'userService', '$location', '$modalInstance', '$rootScope', 'organizationService', function ($scope, userService,$location, $modalInstance, $rootScope, organizationService) {

        $scope.user = {};
        $scope.errors = {};

        $scope.updateOrganization = function(form) {
            form.organization.$error.mongoose = false;
        };

        $scope.save = function(form) {
           userService.create($scope.user)
                .success(function (response, status, headers, config) {
                   $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        organizationService.getAllOrganizations()
            .success(function (response, status, headers, config) {
                $scope.organizations = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';
angular.module('app')
    .controller('UserEditCtrl', ['$scope', '$routeParams', 'userService', '$localStorage', '$modalInstance', 'userId', 'organizationService', function ($scope, $routeParams, userService, $localStorage, $modalInstance, userId, organizationService) {

        $scope.user = { };

				$scope.updateOrganization = function(form) {
					form.organization.$error.mongoose = false;
				};

        userService.getById(userId)
            .success(function (response, status, headers, config) {
                $scope.user = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};
            userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {

                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        organizationService.getAllOrganizations()
            .success(function (response, status, headers, config) {
                $scope.organizations = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';

angular.module('app')
    .controller('UserListCtrl', ['$scope', 'userService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, userService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.emailFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    userService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);

                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.emailFlag = psResponsive('> small');
        };

        $scope.newUser = function () {
            var modalInstance = $modal.open({
                templateUrl: 'user_add',
                controller: 'UserAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('new user dismissed at: ' + new Date());
            });
        };

        $scope.editUser = function (userId) {

            var modalInstance = $modal.open({
                templateUrl: 'user_edit',
                controller: 'UserEditCtrl',
                size: 'lg',
                resolve: {
                    userId: function () {
                        return userId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('edit user dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this user!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
              },
            function(isConfirm){
              if (isConfirm) {

                userService.remove(device._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });

              }
            });


        }


        $scope.initDataTable();

    }]);

'use strict';
angular.module('app')
    .controller('UserSettingsCtrl', ['$scope', '$rootScope', 'md5Helper', '$routeParams', 'userService', '$localStorage', '$modalInstance', 'userId', 'organizationService', function ($scope, $rootScope, md5Helper, $routeParams, userService, $localStorage, $modalInstance, userId, organizationService) {

        $scope.user = { };


        userService.getById(userId)
            .success(function (response, status, headers, config) {
                $scope.user = response;
                $scope.user.hash = md5Helper.createHash($scope.user.email);
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.username = $scope.user.username;
                    $rootScope.iftt = $scope.user.iftt;
                    $rootScope.publicAvatar = "https://avatars.io/"+$scope.user.publicAvatar;
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        organizationService.getAllOrganizations()
            .success(function (response, status, headers, config) {
                $scope.organizations = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';
/*
 * http://kevin.vanzonneveld.net
 *     original by: Webtoolkit.info (http://www.webtoolkit.info/)
 *   namespaced by: Michael White (http://getsprink.com)
 *      tweaked by: Jack
 *     improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 *        input by: Brett Zamir (http://brett-zamir.me)
 *     bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 *      depends on: utf8_encode
 *       example 1: md5('Kevin van Zonneveld');
 *       returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
 *  Adapted to AngularJS Service by: Jim Lavin (http://jimlavin.net)
 *  after injecting into your controller, directive or service
 *       example 1: md5.createHash('Kevin van Zonneveld');
 *       returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
 */

angular.module('app').factory('md5Helper', function() {

    var md5 = {

      createHash: function(str) {

        var xl;

        var rotateLeft = function(lValue, iShiftBits) {
          return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        };

        var addUnsigned = function(lX, lY) {
          var lX4, lY4, lX8, lY8, lResult;
          lX8 = (lX & 0x80000000);
          lY8 = (lY & 0x80000000);
          lX4 = (lX & 0x40000000);
          lY4 = (lY & 0x40000000);
          lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
          if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
          }
          if (lX4 | lY4) {
            if (lResult & 0x40000000) {
              return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
              return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
          } else {
            return (lResult ^ lX8 ^ lY8);
          }
        };

        var _F = function(x, y, z) {
          return (x & y) | ((~x) & z);
        };
        var _G = function(x, y, z) {
          return (x & z) | (y & (~z));
        };
        var _H = function(x, y, z) {
          return (x ^ y ^ z);
        };
        var _I = function(x, y, z) {
          return (y ^ (x | (~z)));
        };

        var _FF = function(a, b, c, d, x, s, ac) {
          a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
          return addUnsigned(rotateLeft(a, s), b);
        };

        var _GG = function(a, b, c, d, x, s, ac) {
          a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
          return addUnsigned(rotateLeft(a, s), b);
        };

        var _HH = function(a, b, c, d, x, s, ac) {
          a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
          return addUnsigned(rotateLeft(a, s), b);
        };

        var _II = function(a, b, c, d, x, s, ac) {
          a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
          return addUnsigned(rotateLeft(a, s), b);
        };

        var convertToWordArray = function(str) {
          var lWordCount;
          var lMessageLength = str.length;
          var lNumberOfWords_temp1 = lMessageLength + 8;
          var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
          var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
          var lWordArray = new Array(lNumberOfWords - 1);
          var lBytePosition = 0;
          var lByteCount = 0;
          while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount += 1;
          }
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4) * 8;
          lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
          lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
          lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
          return lWordArray;
        };

        var wordToHex = function(lValue) {
          var wordToHexValue = '',
            wordToHexValue_temp = '',
            lByte, lCount;
          for (lCount = 0; lCount <= 3; lCount += 1) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            wordToHexValue_temp = '0' + lByte.toString(16);
            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length - 2, 2);
          }
          return wordToHexValue;
        };

        var x = [],
          k, AA, BB, CC, DD, a, b, c, d, S11 = 7,
          S12 = 12,
          S13 = 17,
          S14 = 22,
          S21 = 5,
          S22 = 9,
          S23 = 14,
          S24 = 20,
          S31 = 4,
          S32 = 11,
          S33 = 16,
          S34 = 23,
          S41 = 6,
          S42 = 10,
          S43 = 15,
          S44 = 21;

        //str = this.utf8_encode(str);
        x = convertToWordArray(str);
        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        xl = x.length;
        for (k = 0; k < xl; k += 16) {
          AA = a;
          BB = b;
          CC = c;
          DD = d;
          a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
          d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
          c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
          b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
          a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
          d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
          c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
          b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
          a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
          d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
          c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
          b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
          a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
          d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
          c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
          b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
          a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
          d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
          c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
          b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
          a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
          d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453);
          c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
          b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
          a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
          d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
          c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
          b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
          a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
          d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
          c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
          b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
          a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
          d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
          c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
          b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
          a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
          d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
          c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
          b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
          a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
          d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
          c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
          b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
          a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
          d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
          c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
          b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
          a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244);
          d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
          c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
          b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
          a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
          d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
          c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
          b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
          a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
          d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
          c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314);
          b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
          a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
          d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
          c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
          b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
          a = addUnsigned(a, AA);
          b = addUnsigned(b, BB);
          c = addUnsigned(c, CC);
          d = addUnsigned(d, DD);
        }

        var temp = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);

        return temp.toLowerCase();
      }

    };

    return md5;

  })
'use strict';

angular.module('app')
    .controller('OrganizationAddCtrl', ['$scope', 'organizationService', '$location', '$modalInstance', function ($scope, organizationService,$location, $modalInstance) {

        $scope.organization = { };
        $scope.errors = {};

        $scope.save = function(form) {

           organizationService.create($scope.organization)
                .success(function (response, status, headers, config) {
                   $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
		           debugger
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';
angular.module('app')
    .controller('OrganizationEditCtrl', ['$scope', '$routeParams', 'organizationService', '$localStorage', '$modalInstance', 'organizationId', function ($scope, $routeParams, organizationService, $localStorage, $modalInstance, organizationId) {

        $scope.organization = { };

        organizationService.getById(organizationId)
            .success(function (response, status, headers, config) {
                $scope.organization = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            organizationService.update($scope.organization)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);

'use strict';

angular.module('app')
    .controller('OrganizationListCtrl', ['$scope', 'organizationService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, organizationService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    organizationService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);

                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        };

        $scope.newOrganization = function () {
            var modalInstance = $modal.open({
                templateUrl: 'organization_add',
                controller: 'OrganizationAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('new organization dismissed at: ' + new Date());
            });
        };

        $scope.editOrganization = function (organizationId) {

            var modalInstance = $modal.open({
                templateUrl: 'organization_edit',
                controller: 'OrganizationEditCtrl',
                size: 'lg',
                resolve: {
                    organizationId: function () {
                        return organizationId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('edit organization dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this organization!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
            },
            function(isConfirm) {
              if (isConfirm) {
                organizationService.remove(device._id)
                  .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                  })
                  .error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                      form[field].$setValidity('mongoose', false);
                      $scope.errors[field] = error.type;
                    });
                  });
              }
            });
        };


        $scope.initDataTable();

    }]);

'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('TriggerAddCtrl', ['$scope', '$rootScope', '$filter', 'triggerService', 'deviceService', 'cameraService', '$location', '$modalInstance', function ($scope, $rootScope,$filter, triggerService, deviceService, cameraService, $location, $modalInstance ) {

    $scope.trigger = { threshold: 300 };

      $scope.$watch('trigger.name', function() {
        $scope.trigger.name= $filter('lowercase')($scope.trigger.name);
      });


    $scope.save = function (form) {
      $scope.errors = {};

      triggerService.create($scope.trigger)
        .success(function (response, status, headers, config) {
          $modalInstance.close();
        }).error(function (response, status, headers, config) {
          angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
    };

    $scope.$watch('trigger.device', function (deviceId) {

      deviceService.getFullById(deviceId)
        .success(function (response, status, headers, config) {
          $scope.sensors = response.sensors;
          $scope.trigger.sensor = response.sensors[0]._id;
        }).error(function (response, status, headers, config) {
          angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
    });

      $scope.$watch('trigger.action', function (action) {
        if(action=='Send email to') {
          $scope.trigger.target = $rootScope.currentUser.email;
        }else if(action=='Send to IFTTT'){
            $scope.trigger.target = $rootScope.currentUser.iftt;
          }

      });

    deviceService.getAllDevices()
      .success(function (response, status, headers, config) {
        $scope.devices = response;
        $scope.trigger.device = $scope.devices[0] ? $scope.devices[0]._id : null;
      })
      .error(function (response, status, headers, config) {
        angular.forEach(response.errors, function (error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  }]);

'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('TriggerEditCtrl', ['$scope', '$rootScope', '$filter', '$routeParams', 'triggerService', 'deviceService', 'cameraService', '$location', '$modalInstance', 'triggerId', function ($scope, $rootScope, $filter, $routeParams, triggerService, deviceService, cameraService, $location, $modalInstance , triggerId) {

        $scope.trigger = { };

        $scope.$watch('trigger.name', function() {
            $scope.trigger.name= $filter('lowercase')($scope.trigger.name);
        });

        triggerService.getById(triggerId)
            .success(function(response, status, headers, config) {
                $scope.trigger = response
            }).error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        deviceService.getAllDevices()
            .success(function(response, status, headers, config) {
                $scope.devices = response;
            }).error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form) {
            $scope.errors = {};

            triggerService.update($scope.trigger)
                .success(function(response, status, headers, config) {
                    $modalInstance.close();
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.$watch('trigger.device', function(deviceId) {

            deviceService.getFullById(deviceId)
                .success(function(response, status, headers, config) {
                    $scope.sensors = response.sensors;
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        });


        $scope.$watch('trigger.action', function (action) {
            if(action=='Send email to') {
                $scope.trigger.target = $rootScope.currentUser.email;
            }
            else if(action=='Send to IFTTT'){
                $scope.trigger.target = $rootScope.currentUser.iftt;
            }

        });

        deviceService.getAllDevices()
            .success(function(response, status, headers, config) {
                $scope.devices = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });


        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };


    }]);

'use strict';

angular.module('app')
    .controller('TriggerListCtrl', ['$scope', 'triggerService', 'ngTableParams', '$modal', '$log', 'psResponsive', '$window', 'SweetAlert', function ($scope, triggerService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

    $scope.errors = {};
    $scope.filters = {  searchFilter: '' };

    angular.element($window).on('resize', function () {
        $scope.tableParams.ruleFlag = psResponsive('> small');
        $scope.tableParams.valueFlag = psResponsive('> small');
        $scope.tableParams.descriptionFlag = psResponsive('> small');
    });

    $scope.initDataTable = function () {
        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            },
          filter: $scope.filters
        }, {
            total: 0,           // length of data
            getData: function ($defer, params) {
                triggerService.getAll(params).success(function (response, status, headers, config) {
                    params.total(response.count);
                    $defer.resolve(response.data);

                }).error(function (response, status, headers, config) {
                    angular.forEach(response.errors, function (error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
            }
        });
        $scope.tableParams.ruleFlag = psResponsive('> small');
        $scope.tableParams.valueFlag = psResponsive('> small');
        $scope.tableParams.descriptionFlag = psResponsive('> small');
    };

    $scope.newTrigger = function () {
        var modalInstance = $modal.open({
            templateUrl: 'trigger_add',
            controller: 'TriggerAddCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function () {
            $scope.tableParams.reload();
        }, function () {
            $log.info('newDashboard dismissed at: ' + new Date());
        });
    };

    $scope.editTrigger = function (triggerId) {

        var modalInstance = $modal.open({
            templateUrl: 'trigger_edit',
            controller: 'TriggerEditCtrl',
            size: 'lg',
            resolve: {
                triggerId: function () {
                    return triggerId;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.tableParams.reload();
        }, function () {
            $log.info('editDashboard dismissed at: ' + new Date());
        });
    };

    $scope.delete = function (trigger) {

      SweetAlert.swal({
          title: "Are you sure?",
          text: "Your will not be able to recover this trigger!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel please!"
        },
        function(isConfirm) {
          if (isConfirm) {
            triggerService.remove(trigger._id)
              .success(function (response, status, headers, config) {
                $scope.tableParams.reload();
              }).error(function (response, status, headers, config) {
                angular.forEach(response.errors, function (error, field) {
                  form[field].$setValidity('mongoose', false);
                  $scope.errors[field] = error.type;
                });
              });
          }
        });

    };

    $scope.initDataTable();

}]);

'use strict';

/* Services */
angular.module('app').service('sessionService', ['$http', function ($http) {

    this.confirmUser = function (id) {
        return $http.put('/auth/session/confirm/'+id);
    };

    this.create = function (user) {
        return $http.post('/auth/session/user', user);
    };

    this.sendChangePwdEmail = function(email){
      return $http.post('/auth/session/sendPwdEmail',{ email: email });
    };

    this.confirmPwd = function(params){
      return $http.post('/auth/session/confirmPwd/'+params.guid,{ password: params.pwd });
    };

    this.login = function (provider,user) {
        return $http.post('/auth/session', {
            provider: provider,
            email: user.email,
            password: user.password,
            rememberMe: user.rememberMe
        });
    };

    this.remove = function () {
        return $http.delete('/auth/session/');
    };

    this.getCurrentUser = function () {
        return $http.delete('/auth/session/');
    };
}]);
'use strict';

/* Services */
angular.module('app').service('panelService', ['$http', function ($http) {

    this.getAll = function(params){
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        };

        return $http.get('/panels', { params :paramsToSend });
    };

    this.getAllPanels = function(){

        return $http.get('/panels/items');
    };

    this.getById = function(panelId){
        return $http.get('/panels/'+panelId);
    };

    this.create = function (panel) {
        return $http.post('/panels', panel);
    };

    this.remove = function (panelId) {
        return $http.delete('/panels/'+panelId);
    };

    this.update = function ( panel) {
        return $http.put('/panels/'+panel._id, panel);
    };

    this.command = function (command) {
        return $http.post('/panels/command', command);
    };
}]);
'use strict';

angular.module('app').service('cameraService', ['$http', function ($http) {

    this.getAll = function(params) {
        var paramsToSend = {
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        };

        return $http.get('/cameras', { params : paramsToSend });
    };

    this.getAllCameras = function(){
        return $http.get('/cameras/items');
    };

    this.getById = function(panelId){
        return $http.get('/cameras/'+panelId);
    };

    this.getFullById = function(panelId){
        return $http.get('/cameras/full/'+panelId);
    };

    this.create = function (camera) {
        return $http.post('/cameras', camera);
    };

    this.remove = function (cameraId) {
        return $http.delete('/cameras/'+cameraId);
    };

    this.update = function ( panel) {
        return $http.put('/cameras/'+panel._id, panel);
    };
}]);
'use strict';

angular.module('app').service('userService', ['$http', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        };

        return $http.get('/users', { params : paramsToSend });
    };

    this.getAllUsers = function(){
        return $http.get('/users/items');
    };

    this.getById = function(userId){
        return $http.get('/users/'+userId);
    };

    this.create = function (user) {
        return $http.post('/users', user);
    };

    this.remove = function (userId) {
        return $http.delete('/users/'+userId);
    };

    this.update = function ( user) {
        return $http.put('/users/'+user._id, user);
    };
}]);
'use strict';

/* Services */
angular.module('app').service('triggerService', ['$http', function ($http) {

    this.getAll = function(params){
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        };

        return $http.get('/triggers', { params :paramsToSend });
    };

    this.getAllTriggers = function(){

        return $http.get('/triggers/items');
    };

    this.getById = function(triggerId){
        return $http.get('/triggers/'+triggerId);
    };

    this.create = function (trigger) {
        return $http.post('/triggers', trigger);
    };

    this.remove = function (triggerId) {
        return $http.delete('/triggers/'+triggerId);
    };

    this.update = function ( trigger) {
        return $http.put('/triggers/'+trigger._id, trigger);
    };

    this.command = function (command) {
        return $http.post('/triggers/command', command);
    };
}]);
'use strict';

angular.module('app').service('deviceService', ['$http', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        }

        return $http.get('/devices', { params : paramsToSend });
    };

    this.getAllDevices = function(){
        return $http.get('/devices/items');
    };

    this.getById = function(panelId){
        return $http.get('/devices/'+panelId);
    };

    this.getFullById = function(panelId){
        return $http.get('/devices/full/'+panelId);
    };

    this.create = function (device) {
        return $http.post('/devices', device);
    };

    this.remove = function (deviceId) {
        return $http.delete('/devices/'+deviceId);
    };

    this.update = function ( panel) {
        return $http.put('/devices/'+panel._id, panel);
    };
}]);
'use strict';

angular.module('app').service('sensorService', ['$http', function ($http) {

    this.getAll = function(params) {
      var paramsToSend ={
        page: params.page() -1,
        count: params.count(),
        orderBy: params.sorting(),
        search: params.filter().searchFilter
      };

        return $http.get('/sensors', { params : paramsToSend });
    };

    this.getAllSensors = function(){
        return $http.get('/sensors/items');
    };

    this.getById = function(sensorId){
        return $http.get('/sensors/'+sensorId);
    };

    this.create = function (sensor) {
        return $http.post('/sensors', sensor);
    };

    this.remove = function (sensorId) {
        return $http.delete('/sensors/'+sensorId);
    };

    this.update = function ( sensor) {
        return $http.put('/sensors/'+sensor._id, sensor);
    };
}]);
'use strict';

angular.module('app').service('sectionService', ['$http', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        };

        return $http.get('/sections', { params : paramsToSend });
    };

    this.getAllSections = function(){
        return $http.get('/sections/items');
    };

    this.getById = function(sectionId){
        return $http.get('/sections/'+sectionId);
    };

    this.create = function (section) {
        return $http.post('/sections', section);
    };

    this.remove = function (sectionId) {
        return $http.delete('/sections/'+sectionId);
    };

    this.update = function ( section) {
        return $http.put('/sections/'+section._id, section);
    };
}]);
'use strict';

/* Services */
angular.module('app').service('dashboardService', ['$http', function ($http) {


    this.getMyDashboard = function(){
        return $http.get('/mydashboard');
    };

    this.createMyDashboard = function (dashboardsChanges) {
        return $http.post('/mydashboard', dashboardsChanges);
    };


    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        };

        return $http.get('/dashboards', { params : paramsToSend });
    };

    this.getAllDashboards = function(){
        return $http.get('/dashboards/items');
    };

    this.getById = function(dashboardId){
        return $http.get('/dashboards/'+dashboardId);
    };

    this.getFullById = function(dashboardId){
        return $http.get('/dashboards/full/'+dashboardId);
    };

    this.create = function (dashboard) {
        return $http.post('/dashboards', dashboard);
    };

    this.remove = function (dashboardId) {
        return $http.delete('/dashboards/'+dashboardId);
    };

    this.update = function ( dashboard) {
        return $http.put('/dashboards/'+dashboard._id, dashboard);
    };
}]);
'use strict';

angular.module('app').service('messageService', ['$http', function ($http) {

    this.getAll = function(params){
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        }

        return $http.get('/messages', { params: paramsToSend });
    };

    this.getAllMessages = function(param){

        return $http.get('/messages/items', { params : {topic: param } });
    };

    this.getById = function(panelId){
        return $http.get('/messages/'+panelId);
    };

    this.remove = function (messageId) {
        return $http.delete('/messages/'+messageId);
    };

}]);
'use strict';

angular.module('app').service('organizationService', ['$http', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        };

        return $http.get('/organizations', { params : paramsToSend });
    };

    this.getAllOrganizations = function(){
        return $http.get('/organizations/items');
    };

    this.getById = function(organizationId){
        return $http.get('/organizations/'+organizationId);
    };

    this.create = function (organization) {
        return $http.post('/organizations', organization);
    };

    this.remove = function (organizationId) {
        return $http.delete('/organizations/'+organizationId);
    };

    this.update = function ( organization) {
        return $http.put('/organizations/'+organization._id, organization);
    };
}]);
'use strict';

angular.module('app')
  .constant('focusConfig', {
    focusClass: 'focused'
  })

  .directive('onFocus', ['focusConfig', function (focusConfig) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$focused = false;
        element
          .bind('focus', function(evt) {
            element.addClass(focusConfig.focusClass);
            scope.$apply(function() {ngModel.$focused = true;});
          })
          .bind('blur', function(evt) {
            element.removeClass(focusConfig.focusClass);
            scope.$apply(function() {ngModel.$focused = false;});
          });
      }
    }
  }]);

'use strict';

angular.module('app')
/**
 * Removes server error when user updates input
 */
  .directive('mongooseError', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        element.on('keydown', function() {
          return ngModel.$setValidity('mongoose', true);
        });
      }
    };
  });

'use strict';

angular.module('app')
  .directive('headway', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $.getScript("https://cdn.headwayapp.co/widget.js");
      }
    }
  });

/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelGauge', ['socket', 'messageService', '$modal', '$log', '$rootScope', 'SweetAlert', 'panelService', '$location', function (socket, messageService, $modal, $log, $rootScope, SweetAlert, panelService, $location) {
        return {
            scope:{
                name:"@",
                topic:"@",
                key:"@",
                sensor:"@",
                device:"@",
                panel:"@",
                tag:"@",
                label:"@",
                min:"=",
                max:"=",
                size:"=",
                initValue:"="
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default" ng-mouseover="panelCogStyle=dark" ng-mouseleave="panelCogStyle=grey">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                        '<div class="pull-right" ng-if="areOptionsEnabled">'+
                            '<div class="btn-group">'+
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                    '<a href class="dropdown-toggle ng-binding" ng-style="panelCogStyle" data-toggle="dropdown" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+
                                    '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                        '<li><a href ng-click="editSensor()" >Edit Sensor</a></li>'+
                                        '<li><a href ng-click="editDevice()" >Edit Device</a></li>'+
                                        '<li><a href ng-click="editPanel()" >Edit Panel</a></li>'+
                                        '<li><a href ng-click="deletePanel()" >Delete Panel</a></li>'+
                                        '<li class="divider"></li>'+
                                        '<li><a href ng-click="showCode()" >Show Code Example</a></li>'+
                                    '</ul>'+
                                '</li>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="panel-body" style="height: 233px ;">'+
                        '<div class="text-center">'+
                            '<gauge min="min" max="max" size="size" value="gaugeValue" label="{{label}}" class="gauge"></gauge>'+
                        '</div>'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {
              scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
              scope.grey= {color:'rgba(0,0,0, 0)'};
              scope.dark= {color:'rgba(0,0,0,.35)'};

              scope.gaugeValue = scope.initValue? scope.initValue : 0;
              scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";

              var items = [ ];

              messageService.getAllMessages(scope.topic)
                .success(function (response, status, headers, config) {
                  angular.forEach(response, function(message) {
                    var item = angular.fromJson(message);
                    if(item && item.value !== 0) {
                      items.push({ timestamp: moment(item.createdAt).toDate(), value: item.value });
                    }

                  });

                  scope.gaugeValue =  _.sortBy(items, 'timestamp').reverse()[0]? _.sortBy(items, 'timestamp').reverse()[0].value : "0";
                })
                .error(function(response, status, headers, config) {
                  console.error( response);
                });


                socket.on(scope.topic, function (message) {
                    scope.gaugeValue = angular.fromJson(message).value;
                });

                scope.showCode = function(){
                  $modal.open({
                    templateUrl: '../modules/panels/views/panel_code.html',
                    controller: 'PanelCodeCtrl',
                    size: 'lg',
                    resolve: {
                      host: function () {
                        return "app.connectingthings.io";
                      },
                      topic: function () {
                        return "key/"+scope.topic.split("/")[1]+"/device/"+scope.topic.split("/")[2]+"/tag/"+scope.topic.split("/")[3];
                      },
                      value: function () {
                        return  "12";
                      }
                    }
                  });
                };

                scope.editSensor = function(){
                     $modal.open({
                        templateUrl: '../modules/sensors/views/sensor_edit.html',
                        controller: 'SensorEditCtrl',
                        size: 'lg',
                        resolve: {
                            sensorId: function () {
                                return scope.sensor;
                            }
                        }
                    });
                };

                scope.editDevice = function(){
                    $modal.open({
                        templateUrl: '../modules/devices/views/device_edit.html',
                        controller: 'DeviceEditCtrl',
                        size: 'lg',
                        resolve: {
                            deviceId: function () {
                                return scope.device;
                            }
                        }
                    });
                };

                scope.editPanel = function(){
                    var modalInstance = $modal.open({
                        templateUrl: '../modules/panels/views/panel_edit_container.html',
                        controller: 'PanelEditContainerCtrl',
                        size: 'lg',
                        resolve: {
                            panelId: function () {
                                return scope.panel;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $rootScope.$broadcast('reload-myDashboard');
                    }, function () {
                        $log.info('editPanel dismissed at: ' + new Date());
                    });
                };

              scope.deletePanel = function(){
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this panel!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel please!"
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      panelService.remove(scope.panel)
                        .success(function (response, status, headers, config) {
                          $rootScope.$broadcast('reload-myDashboard');
                        }).error(function (response, status, headers, config) {
                        $log.info('error deleting the panel');
                      });
                    }
                  });
              };

            }
        };
    }]);

/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//http://danielcrisp.github.io/angular-rangeslider/
//https://stackoverflow.com/questions/2943222/find-objects-between-two-dates-mongodb
'use strict';
angular.module('app')
    .directive('panelD3Chart', ['socket', 'messageService', '$modal', '$log', '$rootScope', 'SweetAlert', 'panelService', '$location', function (socket, messageService, $modal, $log, $rootScope, SweetAlert, panelService, $location) {
        return {
            scope:{
                yrange:"@",
                topic:"@",
                key:"@",
                name:"@",
                sensor:"@",
                device:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default" ng-mouseover="panelCogStyle=dark" ng-mouseleave="panelCogStyle=grey">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                        '<div class="pull-right" ng-if="areOptionsEnabled">'+
                            '<div class="btn-group">'+
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                    '<a href class="dropdown-toggle ng-binding" ng-style="panelCogStyle" data-toggle="dropdown" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+
                                    '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                        '<li><a href ng-click="editSensor()" >Edit Sensor</a></li>'+
                                        '<li><a href ng-click="editDevice()" >Edit Device</a></li>'+
                                        '<li><a href ng-click="editPanel()" >Edit Panel</a></li>'+
                                        '<li><a href ng-click="deletePanel()" >Delete Panel</a></li>'+
                                        '<li><a href ng-click="clean()" >Clean Panel</a></li>'+
                                        '<li class="divider"></li>'+
                                        '<li><a href ng-click="showCode()" >Show Code Example</a></li>'+
                                    '</ul>'+
                                '</li>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="panel-body">'+
                        '<div class="text-center" style="margin-top: -35px;">'+
                            '<nvd3-line-chart'+
                                ' data="values"'+
                                ' xAxisTickFormat="xAxisTickFormatFunction()"'+
                                ' yAxisTickFormat="yAxisTickFormatFunction()"'+
                                ' showXAxis="true"'+
                                ' showYAxis="true"'+
                                ' showYAxis="true"'+
                                ' noData="No Data Yet :( "'+
                                ' isArea="true"'+
                                ' tooltips="true"'+
                                ' interactive="true"'+
                                ' tooltipcontent="toolTipContentFunction()"'+
                                ' >'+
                            '</nvd3-line-chart>'+

                        '</div>'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                var items = [];
                var lastValue = null;

                scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
                scope.grey= {color:'rgba(0,0,0, 0)'};
                scope.dark= {color:'rgba(0,0,0,.35)'};
                scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";

                scope.values =[ { "values": [],"key": scope.name, color: '#26A69A' }];
                messageService.getAllMessages(scope.topic)
                    .success(function (response, status, headers, config) {

                        angular.forEach(response, function(message) {
                            var item = angular.fromJson(message);
                            if(!item || !item.value) return;

                            if(item.value  == "0" || item.value  == "1") {
                                if(lastValue == item.value ) return;
                                items.push([moment(item.createdAt).add(-1, "milliseconds").valueOf(), item.value == "1" ? 0 : 1]);
                            }

                            items.push([ moment(item.createdAt).valueOf(), parseInt(item.value) ]);
                            lastValue = item.value;
                        });

                        if(items.length === 0)  items.push([ moment().valueOf(), 0 ]);

                        scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name, color: '#26A69A' } ];

                    })
                    .error(function(response, status, headers, config) {
                        console.error( response);
                    });

                scope.xAxisTickFormatFunction = function(){
                    return function(d){
                        return d3.time.format('%H:%M:%S')(moment(d).toDate());
                    }
                };
                scope.yAxisTickFormatFunction = function(){
                    return function(d){
                        return d;
                    }
                };
                scope.toolTipContentFunction = function(){
                    return function(key, x, y, e, graph) {
                        return '<p><strong>Time: </strong>' +  x +'</p>'+
                               '<p><strong>Value: </strong>' +  y +'</p>'
                    }
                };

                scope.clean = function(){
                    items = [];

                    if(lastValue  == "0" || lastValue  == "1") {
                      items.push([ moment().add(-1, "milliseconds").valueOf(), lastValue == "1"? 0 : 1  ]);
                    }
                    items.push([ moment().valueOf(), 0 ]);

                    scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name,color: '#26A69A' } ];
                };

                socket.on(scope.topic, function (message) {

                        var item = angular.fromJson(message);
                        if(!item || !item.value) return;

                        var messageValue = item.value;

                        if(messageValue == "0" || messageValue == "1") {
                            var lastValue = _.sortBy(items, function(o) { return o[0]; })[1] ? _.last(_.sortBy(items, function(o) { return o[0]; }))[1] : "0" ;

                            if(lastValue == messageValue ) return;
                            items.push([moment().add(-1, "milliseconds").valueOf(), messageValue == "1"? 0 : 1 ]);
                        }

                        items.push([ moment().valueOf(), parseInt(messageValue) ]);

                        if(items.length > 10){
                          items = _.rest(_.sortBy(items, function(o) { return o[0]; }));
                        }

                        scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name, color: '#26A69A' } ];

                });

                scope.showCode = function(){
                    $modal.open({
                        templateUrl: '../modules/panels/views/panel_code.html',
                        controller: 'PanelCodeCtrl',
                        size: 'lg',
                        resolve: {
                            host: function () {
                                return "app.connectingthings.io";
                            },
                            topic: function () {
                                return "key/"+scope.topic.split("/")[1]+"/device/"+scope.topic.split("/")[2]+"/tag/"+scope.topic.split("/")[3];
                            },
                            value: function () {
                                return  "12";
                            }
                        }
                    });
                };

                scope.editSensor = function(){
                    $modal.open({
                        templateUrl: '../modules/sensors/views/sensor_edit.html',
                        controller: 'SensorEditCtrl',
                        size: 'lg',
                        resolve: {
                            sensorId: function () {
                                return scope.sensor;
                            }
                        }
                    });
                };

                scope.editDevice = function(){
                    $modal.open({
                        templateUrl: '../modules/devices/views/device_edit.html',
                        controller: 'DeviceEditCtrl',
                        size: 'lg',
                        resolve: {
                            deviceId: function () {
                                return scope.device;
                            }
                        }
                    });
                };

                scope.editPanel = function(){
                    var modalInstance = $modal.open({
                        templateUrl: '../modules/panels/views/panel_edit_container.html',
                        controller: 'PanelEditContainerCtrl',
                        size: 'lg',
                        resolve: {
                            panelId: function () {
                                return scope.panel;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $rootScope.$broadcast('reload-myDashboard');
                    }, function () {
                        $log.info('editPanel dismissed at: ' + new Date());
                    });
                };

                scope.deletePanel = function(){
                    SweetAlert.swal({
                          title: "Are you sure?",
                          text: "Your will not be able to recover this panel!",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "No, cancel please!"
                      },
                      function(isConfirm) {
                          if (isConfirm) {
                              panelService.remove(scope.panel)
                                .success(function (response, status, headers, config) {
                                    $rootScope.$broadcast('reload-myDashboard');
                                }).error(function (response, status, headers, config) {
                                  $log.info('error deleting the panel');
                              });
                          }
                      });
                };

            }
        };
    }]);

/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelInfo', ['socket', 'messageService', '$modal', '$log', '$rootScope', 'SweetAlert', 'panelService', '$location', 'psResponsive', function (socket, messageService, $modal, $log, $rootScope, SweetAlert, panelService, $location,psResponsive) {
        return {
            scope:{
                name:"@",
                topic:"@",
                key:"@",
                label:"@",
                sensor:"@",
                device:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default" ng-mouseover="panelCogStyle=dark" ng-mouseleave="panelCogStyle=grey">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                        '<div class="pull-right" ng-if="areOptionsEnabled">'+
                            '<div class="btn-group">'+
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                    '<a href class="dropdown-toggle ng-binding" ng-style="panelCogStyle" data-toggle="dropdown" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+
                                    '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                        '<li><a href ng-click="editSensor()" >Edit Sensor</a></li>'+
                                        '<li><a href ng-click="editDevice()" >Edit Device</a></li>'+
                                        '<li><a href ng-click="editPanel()" >Edit Panel</a></li>'+
                                        '<li><a href ng-click="deletePanel()" >Delete Panel</a></li>'+
                                        '<li class="divider"></li>'+
                                        '<li><a href ng-click="showCode()" >Show Code Example</a></li>'+
                                    '</ul>'+
                                '</li>'+
                            '</div>'+
                        '</div>'+
                     '</div>'+
                    '<div class="panel-body">'+
                        '<div class="list-group"  style="overflow-y: auto;min-height: 228px">'+
                            '<a href="#" class="list-group-item" ng-repeat="item in values.data">'+
                                '<i class="fa fa-envelope fa-fw"></i> {{item.value}}{{label}}'+
                                '<span class="pull-right text-muted small">'+
                                    '<em>{{item.timestamp  | date:"medium"}}</em>'+
                                '</span>'+
                            '</a>'+
                        '</div>'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                var items = [ ];

                scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
                scope.grey= {color:'rgba(0,0,0, 0)'};
                scope.dark= {color:'rgba(0,0,0,.35)'};
                scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";

                messageService.getAllMessages(scope.topic)
                  .success(function (response, status, headers, config) {
                    angular.forEach(response, function(message) {
                      var item = angular.fromJson(message);
                      if(item && item.value !== 0) {
                        items.push({ timestamp: moment(item.createdAt).toDate(), value: item.value });
                      }

                    });

                    scope.values = { data: _.sortBy(items, 'timestamp'), max: 3000 };
                    $(element.children()[1]).children().height( $(element).height() - 80 );
                  })
                  .error(function(response, status, headers, config) {
                    console.error( response);
                  });

                scope.$watch(
                  function () { return $(element).height(); },
                  function (newValue, oldValue) {

                    if (psResponsive('> small') && newValue !== oldValue) {
                      $(element.children()[1]).children().height( newValue - 80 )
                    }
                  }
                );


               socket.on(scope.topic, function (message) {

                    var item = angular.fromJson(message);
                    item.timestamp = Date.now();

                    items.push(item);
                    if (items.length > 3000)  items.shift();

                    scope.values = { data: items, max: 3000 };

                });

                scope.showCode = function(){
                  $modal.open({
                    templateUrl: '../modules/panels/views/panel_code.html',
                    controller: 'PanelCodeCtrl',
                    size: 'lg',
                    resolve: {
                      host: function () {
                        return "app.connectingthings.io";
                      },
                      topic: function () {
                        return "key/"+scope.topic.split("/")[1]+"/device/"+scope.topic.split("/")[2]+"/tag/"+scope.topic.split("/")[3];
                      },
                      value: function () {
                        return  "12";
                      }
                    }
                  });
                };

                scope.editSensor = function(){
                    $modal.open({
                        templateUrl: '../modules/sensors/views/sensor_edit.html',
                        controller: 'SensorEditCtrl',
                        size: 'lg',
                        resolve: {
                            sensorId: function () {
                                return scope.sensor;
                            }
                        }
                    });
                };

                scope.editDevice = function(){
                    $modal.open({
                        templateUrl: '../modules/devices/views/device_edit.html',
                        controller: 'DeviceEditCtrl',
                        size: 'lg',
                        resolve: {
                            deviceId: function () {
                                return scope.device;
                            }
                        }
                    });
                };

              scope.editPanel = function(){
                var modalInstance = $modal.open({
                  templateUrl: '../modules/panels/views/panel_edit_container.html',
                  controller: 'PanelEditContainerCtrl',
                  size: 'lg',
                  resolve: {
                    panelId: function () {
                      return scope.panel;
                    }
                  }
                });

                modalInstance.result.then(function () {
                  $rootScope.$broadcast('reload-myDashboard');
                }, function () {
                  $log.info('editPanel dismissed at: ' + new Date());
                });
              };

              scope.deletePanel = function(){
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this panel!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel please!"
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      panelService.remove(scope.panel)
                        .success(function (response, status, headers, config) {
                          $rootScope.$broadcast('reload-myDashboard');
                        }).error(function (response, status, headers, config) {
                        $log.info('error deleting the panel');
                      });
                    }
                  });
              };

            }
        };
    }]);

/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelSwitch', ['socket', 'panelService', 'messageService', '$modal', '$log', '$rootScope', 'SweetAlert', '$location', '$http', 'baseUrl', function (socket, panelService, messageService, $modal, $log, $rootScope, SweetAlert, $location,$http,baseUrl) {
        return {
            scope:{
                name:"@",
                topic:"@",
                key:"@",
                label:"@",
                url:"@",
                protocol:"@",
                tag:"@",
                sensor:"@",
                device:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default" ng-mouseover="panelCogStyle=dark" ng-mouseleave="panelCogStyle=grey">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                        '<div class="pull-right" ng-if="areOptionsEnabled">'+
                            '<div class="btn-group">'+
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                    '<a href class="dropdown-toggle ng-binding" ng-style="panelCogStyle" data-toggle="dropdown" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+
                                    '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                        '<li><a href ng-click="editSensor()" >Edit Sensor</a></li>'+
                                        '<li><a href ng-click="editDevice()" >Edit Device</a></li>'+
                                        '<li><a href ng-click="editPanel()" >Edit Panel</a></li>'+
                                        '<li><a href ng-click="deletePanel()" >Delete Panel</a></li>'+
                                        '<li class="divider"></li>'+
                                        '<li><a href ng-click="showCode()" >Show Code Example</a></li>'+
                                    '</ul>'+
                                '</li>'+
                            '</div>'+
                        '</div>'+
                     '</div>'+
                    '<div class="panel-body text-center" style="margin-bottom: 65px;margin-top: 30px">'+
                        '<span class="toggle">'+
                            '<input checked type="checkbox" ng-model="toggleButton">'+
                                '<label data-off="&#10006;" data-on="&#10004;"></label>'+
                                '<div ng-class="'+"{'led-green' : toggleButton, 'led-off' : !toggleButton }"+'"  style="margin-top: 120px;"></div>'+
                        '</span>'+
                    ' </div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

              var items = [ ];

              scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
              scope.grey= {color:'rgba(0,0,0, 0)'};
              scope.dark= {color:'rgba(0,0,0,.35)'};
              scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";

              messageService.getAllMessages(scope.topic)
                .success(function (response, status, headers, config) {
                  angular.forEach(response, function(message) {
                    var item = angular.fromJson(message);
                    if(item && item.value !== 0) {
                      items.push({ timestamp: moment(item.createdAt).toDate(), value: item.value });
                    }

                  });

                  scope.toggleButton =  _.sortBy(items, 'timestamp').reverse()[0] ? _.sortBy(items, 'timestamp').reverse()[0] .value  == "1" : false;
                })
                .error(function(response, status, headers, config) {
                  console.error( response);
                });

                socket.on(scope.topic, function (message) {

                  var messageValue = angular.fromJson(message).value;
                  if(messageValue !== "0" && messageValue !== "1" ) return;

                  scope.toggleButton = messageValue == "1";
                });

                scope.$watch('toggleButton', function(toggle, lastToogle) {

                    if(toggle == lastToogle) return;

                    var infoToSend = {
                        topic:"key/"+scope.key+"/device/"+scope.topic.split("/")[2]+"/tag/"+scope.tag,
                        message: {value: (toggle)? "1" : "0"}
                    };


                  //$http.put(window.location.protocol+"//"+window.location.hostname+':3001/resources/'+infoToSend.topic, infoToSend.message)
                  $http.put(baseUrl.replace(/:3000\//, "").replace(/io\//, "io")+":3001/resources/"+infoToSend.topic, infoToSend.message)
                  .success(function (response, status, headers, config) {
                    //console.log(response);
                  })
                  .error(function(response, status, headers, config) {
                    console.error( response);
                  });

                   /*panelService.command(infoToSend)
                        .success(function (response, status, headers, config) {
                           console.log(response);
                        })
                        .error(function(response, status, headers, config) {
                          console.error( response);
                        });*/
                });

                scope.showCode = function(){
                  $modal.open({
                    templateUrl: '../modules/panels/views/panel_code.html',
                    controller: 'PanelCodeCtrl',
                    size: 'lg',
                    resolve: {
                      host: function () {
                        return baseUrl;
                      },
                      topic: function () {
                        return "key/"+scope.topic.split("/")[1]+"/device/"+scope.topic.split("/")[2]+"/tag/"+scope.topic.split("/")[3];
                      },
                      value: function () {
                        return  "1";
                      }
                    }
                  });
                };

                scope.editSensor = function(){
                    $modal.open({
                        templateUrl: '../modules/sensors/views/sensor_edit.html',
                        controller: 'SensorEditCtrl',
                        size: 'lg',
                        resolve: {
                            sensorId: function () {
                                return scope.sensor;
                            }
                        }
                    });
                };

                scope.editDevice = function(){
                    $modal.open({
                        templateUrl: '../modules/devices/views/device_edit.html',
                        controller: 'DeviceEditCtrl',
                        size: 'lg',
                        resolve: {
                            deviceId: function () {
                                return scope.device;
                            }
                        }
                    });
                };

                scope.editPanel = function(){
                  var modalInstance = $modal.open({
                    templateUrl: '../modules/panels/views/panel_edit_container.html',
                    controller: 'PanelEditContainerCtrl',
                    size: 'lg',
                    resolve: {
                      panelId: function () {
                        return scope.panel;
                      }
                    }
                  });

                  modalInstance.result.then(function () {
                    $rootScope.$broadcast('reload-myDashboard');
                  }, function () {
                    $log.info('editPanel dismissed at: ' + new Date());
                  });
                };

              scope.deletePanel = function(){
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this panel!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel please!"
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      panelService.remove(scope.panel)
                        .success(function (response, status, headers, config) {
                          $rootScope.$broadcast('reload-myDashboard');
                        }).error(function (response, status, headers, config) {
                        $log.info('error deleting the panel');
                      });
                    }
                  });
              };

            }
        };
    }]);

/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
//http://www.foscam.es/descarga/ipcam_cgi_sdk.pdf
'use strict';
angular.module('app')
    .directive('panelCamera', ['socket', '$http', '$interval', '$modal', '$log', '$rootScope', 'SweetAlert', 'panelService', '$location', function (socket, $http, $interval, $modal, $log, $rootScope, SweetAlert, panelService, $location) {
        return {
            scope:{
                name:"@",
                login:"@",
                password:"@",
                url:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default" ng-mouseover="panelCogStyle=dark" ng-mouseleave="panelCogStyle=grey">' +
                    '<div class="panel-heading">'+
                        '<i ></i> {{name}}'+
                        '<div class="pull-right" ng-if="areOptionsEnabled">'+
                            '<div class="btn-group">'+
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                    '<a href class="dropdown-toggle ng-binding" data-toggle="dropdown" ng-style="panelCogStyle" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+

                                    '<ul class="dropdown-menu dropdown-menu-right animated fadeInRight">'+

                                        '<li><a href ng-click="editPanel()" >Edit Panel</a></li>'+
                                        '<li><a href ng-click="deletePanel()" >Delete Panel</a></li>'+
                                        '<li class="divider"></li>'+
                                        '<li><a href ng-click="reload()" class="glyphicon glyphicon-refresh" > Reload</a></li>'+
                                        '<li><a href ng-mousedown="moveUp()" ng-mouseup="stopUp()" class="glyphicon glyphicon-arrow-up" > Move Up</a></li>'+
                                        '<li><a href ng-mousedown="moveDown()" ng-mouseup="stopDown()" class="glyphicon glyphicon-arrow-down" > Move Down</a></li>'+
                                        '<li><a href ng-mousedown="moveLeft()" ng-mouseup="stopLeft()" class="glyphicon glyphicon-arrow-left" > Move Left</a></li>'+
                                        '<li><a href ng-mousedown="moveRight()" ng-mouseup="stopRight()" class="glyphicon glyphicon-arrow-right" > Move Right</a></li>'+
                                    '</ul>'+
                                '</li>'+
                            '</div>'+
                        '</div>'+
                     '</div>'+
                    '<div class="panel-body" style="height: 233px;text-align: center">'+
                        '<img ng-src="{{stream}}" style="max-width:100%; max-height:100%">'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
                scope.grey= {color:'rgba(0,0,0, 0)'};
                scope.dark= {color:'rgba(0,0,0,.35)'};

                scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";
                scope.stream = 'assets/img/noSignal.png';
                var stream = scope.url+"/videostream.cgi?user="+ scope.login +"&pwd="+ scope.password + '&cb=' + new Date().getTime();

                //pooling waiting the conversion
                var interval = $interval(function(){
                  scope.reload()
                }, 2000, 5);

                scope.reload = function() {
                  var image = new Image();
                  image.onerror = function () {
                    scope.stream = '/assets/img/noSignal.png';
                  };
                  image.onload = function () {
                    if(interval) {
                      $interval.cancel(interval);
                    }
                    scope.stream = stream;
                  };
                  image.src = stream;
                };

                scope.$on('$destroy', function() {
                  if(!interval) return;
                  $interval.cancel(interval);
                });

                scope.moveUp = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=0&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.stopUp = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=1&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.moveDown = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=2&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.stopDown = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=3&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.moveLeft = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=4&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.stopLeft = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=5&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.moveRight = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=6&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.stopRight = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=7&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.editPanel = function(){
                    var modalInstance = $modal.open({
                        templateUrl: '../modules/panels/views/panel_edit_container.html',
                        controller: 'PanelEditContainerCtrl',
                        size: 'lg',
                        resolve: {
                            panelId: function () {
                                return scope.panel;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $rootScope.$broadcast('reload-myDashboard');
                    }, function () {
                        $log.info('editPanel dismissed at: ' + new Date());
                    });
                };

                scope.deletePanel = function(){
                    SweetAlert.swal({
                          title: "Are you sure?",
                          text: "Your will not be able to recover this panel!",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "No, cancel please!"
                      },
                      function(isConfirm) {
                          if (isConfirm) {
                              panelService.remove(scope.panel)
                                .success(function (response, status, headers, config) {
                                    $rootScope.$broadcast('reload-myDashboard');
                                }).error(function (response, status, headers, config) {
                                  $log.info('error deleting the panel');
                              });
                          }
                      });
                };

            }
        };
}]);

/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelLed', ['socket', 'messageService', '$modal', '$log', '$rootScope', 'SweetAlert', 'panelService', '$location', function (socket, messageService, $modal, $log, $rootScope, SweetAlert, panelService, $location) {
        return {
            scope:{
                name:"@",
                topic:"@",
                key:"@",
                label:"@",
                url:"@",
                protocol:"@",
                tag:"@",
                sensor:"@",
                device:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
            ' <div class="panel panel-default" ng-mouseover="panelCogStyle=dark" ng-mouseleave="panelCogStyle=grey">' +
              '<div class="panel-heading">'+
                '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                  '<div class="pull-right" ng-if="areOptionsEnabled">'+
                    '<div class="btn-group">'+
                        '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                            '<a href class="dropdown-toggle ng-binding" ng-style="panelCogStyle" data-toggle="dropdown" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+
                            '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                '<li><a href ng-click="editSensor()" >Edit Sensor</a></li>'+
                                '<li><a href ng-click="editDevice()" >Edit Device</a></li>'+
                                '<li><a href ng-click="editPanel()" >Edit Panel</a></li>'+
                                '<li><a href ng-click="deletePanel()" >Delete Panel</a></li>'+
                                '<li class="divider"></li>'+
                                '<li><a href ng-click="showCode()" >Show Code Example</a></li>'+
                            '</ul>'+
                        '</li>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
               '<div class="panel-body text-center" style="margin-bottom: 65px;margin-top: 30px">'+
                    '<div ng-class="'+"{'led-blue' : toggleLed, 'led-off' : !toggleLed }"+'"  style="width:80px;height:80px"></div>'+
                '</div>'+
            '</div>'  ,
            link: function postLink(scope, element, attrs) {

              var items = [ ];
              scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
              scope.grey= {color:'rgba(0,0,0, 0)'};
              scope.dark= {color:'rgba(0,0,0,.35)'};
              scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";

              messageService.getAllMessages(scope.topic)
                .success(function (response, status, headers, config) {
                  angular.forEach(response, function(message) {
                    var item = angular.fromJson(message);
                    if(item && item.value !== 0) {
                      items.push({ timestamp: moment(item.createdAt).toDate(), value: item.value });
                    }

                  });

                  scope.toggleLed =  _.sortBy(items, 'timestamp').reverse()[0] ? _.sortBy(items, 'timestamp').reverse()[0] .value  == "1" : false;
                })
                .error(function(response, status, headers, config) {
                  console.error( response);
                });

                socket.on(scope.topic, function (message) {

                  var messageValue = angular.fromJson(message).value;
                  if(messageValue !== "0" && messageValue !== "1" ) return;

                  scope.toggleLed = messageValue == "1";
                });

              scope.$watch(
                function () { return $(element).height(); },
                function (newValue, oldValue) {
                  if (newValue !== oldValue) {

                    var height =  $(element.children()[1]).children().height();
                    var width =  $(element.children()[1]).children().width();

                    debugger
                   // config.size = height < width? height - 60 : width - 60;

                  }
                }
              );

              scope.showCode = function(){
                $modal.open({
                  templateUrl: '../modules/panels/views/panel_code.html',
                  controller: 'PanelCodeCtrl',
                  size: 'lg',
                  resolve: {
                    host: function () {
                      return "app.connectingthings.io";
                    },
                    topic: function () {
                      return "key/"+scope.topic.split("/")[1]+"/device/"+scope.topic.split("/")[2]+"/tag/"+scope.topic.split("/")[3];
                    },
                    value: function () {
                      return  "12";
                    }
                  }
                });
              };

                scope.editSensor = function(){
                    $modal.open({
                        templateUrl: '../modules/sensors/views/sensor_edit.html',
                        controller: 'SensorEditCtrl',
                        size: 'lg',
                        resolve: {
                            sensorId: function () {
                                return scope.sensor;
                            }
                        }
                    });
                };

                scope.editDevice = function(){
                    $modal.open({
                        templateUrl: '../modules/devices/views/device_edit.html',
                        controller: 'DeviceEditCtrl',
                        size: 'lg',
                        resolve: {
                            deviceId: function () {
                                return scope.device;
                            }
                        }
                    });
                };

              scope.editPanel = function(){
                var modalInstance = $modal.open({
                  templateUrl: '../modules/panels/views/panel_edit_container.html',
                  controller: 'PanelEditContainerCtrl',
                  size: 'lg',
                  resolve: {
                    panelId: function () {
                      return scope.panel;
                    }
                  }
                });

                modalInstance.result.then(function () {
                  $rootScope.$broadcast('reload-myDashboard');
                }, function () {
                  $log.info('editPanel dismissed at: ' + new Date());
                });
              };

              scope.deletePanel = function(){
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this panel!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel please!"
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      panelService.remove(scope.panel)
                        .success(function (response, status, headers, config) {
                          $rootScope.$broadcast('reload-myDashboard');
                        }).error(function (response, status, headers, config) {
                          $log.info('error deleting the panel');
                      });
                    }
                  });
              };


            }
        };
    }]);

'use strict';
angular.module('app')
    .directive('panelSection', ['socket', '$http', '$interval', '$modal', '$log', '$rootScope', 'SweetAlert', 'sectionService', '$location', function (socket, $http, $interval, $modal, $log, $rootScope, SweetAlert, sectionService, $location) {
        return {
            scope:{
                name:"@",
                section:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                '<div class="row" >'+
                    '<div class="col-lg-12" ng-mouseover="panelStyle=dark" ng-mouseleave="panelStyle=grey">'+
                        '<h3 class="row-header" style="cursor:move" >{{name}}'+
                            '<span class="section_options"  style="margin-left: 20px" >'+
                                '<div class="btn-group" style="font-size: 20px" ng-if="areOptionsEnabled">'+
                                    '<li type="button" class="dropdown hidden-sm">'+
                                        '<a href class="dropdown-toggle ng-binding" ng-style="panelStyle" data-toggle="dropdown" aria-haspopup="true" aria-haspopup="true" aria-expanded="false"> ' +
                                            '<i class="fa fa-cog fa-fw"></i>'+
                                        '</a>'+
                                        '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                            '<li>' +
                                                '<a href ng-click="editSection()" >Edit Section</a>' +
                                            '</li>'+
                                            '<li><a href ng-click="deleteSection()" >Delete Section</a></li>'+
                                        '</ul>'+
                                    '</li>'+
                                '</div>'+
                            '</span>'+
                        '</h3>'+
                    '</div>'+
                '</div>',
            link: function postLink(scope, element, attrs) {

                scope.panelStyle = {color:'rgba(0,0,0,0)'};

                scope.grey= {color:'rgba(0,0,0, 0)'};
                scope.dark= {color:'rgba(0,0,0,.35)'};
                scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";

                scope.editSection = function(){
                    var modalInstance = $modal.open({
                        templateUrl: '../modules/sections/views/section_edit.html',
                        controller: 'SectionEditCtrl',
                        size: 'lg',
                        resolve: {
                            sectionId: function () {
                                return scope.section;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $rootScope.$broadcast('reload-myDashboard');
                    }, function () {
                        $log.info('editDashboard dismissed at: ' + new Date());
                    });

                };


                scope.deleteSection = function(){
                    SweetAlert.swal({
                          title: "Are you sure?",
                          text: "Your will not be able to recover this section!",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "No, cancel please!"
                      },
                      function(isConfirm) {
                          if (isConfirm) {
                              sectionService.remove(scope.section)
                                .success(function (response, status, headers, config) {
                                    $rootScope.$broadcast('reload-myDashboard');
                                }).error(function (response, status, headers, config) {
                                  $log.info('error deleting the panel');
                              });
                          }
                      });
                };

            }
        };
}]);

/**
 * Copied from https://github.com/lithiumtech/angular_and_d3
 */

function Gauge(element, configuration)
{
    this.element = element;

    var self = this; // for internal d3 functions

    this.configure = function(configuration)
    {
        this.config = configuration;

        this.config.size = this.config.size * 0.9;

        this.config.raduis = this.config.size * 0.97 / 2;
        this.config.cx = this.config.size / 2;
        this.config.cy = this.config.size / 2;

        this.config.min = undefined != configuration.min ? configuration.min : 0;
        this.config.max = undefined != configuration.max ? configuration.max : 100;
        this.config.range = this.config.max - this.config.min;

        this.config.majorTicks = configuration.majorTicks || 5;
        this.config.minorTicks = configuration.minorTicks || 2;

        this.config.greenColor 	= configuration.greenColor || "#109618";
        this.config.yellowColor = configuration.yellowColor || "#ecbf52";
        this.config.redColor 	= configuration.redColor || "#EC6952";

        this.config.transitionDuration = configuration.transitionDuration || 500;
    }

    this.render = function()
    {
        this.body = d3.select( this.element )
            .append("svg:svg")
            .attr("class", "gauge")
            .attr("width", this.config.size)
            .attr("height", this.config.size);

        this.body.append("svg:circle")
            .attr("cx", this.config.cx)
            .attr("cy", this.config.cy)
            .attr("r", this.config.raduis)
            .style("fill", "#ccc")
            .style("stroke", "#000")
            .style("stroke-width", "0.5px");

        this.body.append("svg:circle")
            .attr("cx", this.config.cx)
            .attr("cy", this.config.cy)
            .attr("r", 0.9 * this.config.raduis)
            .style("fill", "#fff")
            .style("stroke", "#e0e0e0")
            .style("stroke-width", "2px");

        for (var index in this.config.greenZones)
        {
            this.drawBand(this.config.greenZones[index].from, this.config.greenZones[index].to, self.config.greenColor);
        }

        for (var index in this.config.yellowZones)
        {
            this.drawBand(this.config.yellowZones[index].from, this.config.yellowZones[index].to, self.config.yellowColor);
        }

        for (var index in this.config.redZones)
        {
            this.drawBand(this.config.redZones[index].from, this.config.redZones[index].to, self.config.redColor);
        }

        if (undefined != this.config.label)
        {
            var fontSize = Math.round(this.config.size / 9);
            this.body.append("svg:text")
                .attr("x", this.config.cx)
                .attr("y", this.config.cy / 2 + fontSize / 2)
                .attr("dy", fontSize / 2)
                .attr("text-anchor", "middle")
                .text(this.config.label)
                .style("font-size", fontSize + "px")
                .style("fill", "#333")
                .style("stroke-width", "0px");
        }

        var fontSize = Math.round(this.config.size / 16);
        var majorDelta = this.config.range / (this.config.majorTicks - 1);
        for (var major = this.config.min; major <= this.config.max; major += majorDelta)
        {
            var minorDelta = majorDelta / this.config.minorTicks;
            for (var minor = major + minorDelta; minor < Math.min(major + majorDelta, this.config.max); minor += minorDelta)
            {
                var point1 = this.valueToPoint(minor, 0.75);
                var point2 = this.valueToPoint(minor, 0.85);

                this.body.append("svg:line")
                    .attr("x1", point1.x)
                    .attr("y1", point1.y)
                    .attr("x2", point2.x)
                    .attr("y2", point2.y)
                    .style("stroke", "#666")
                    .style("stroke-width", "1px");
            }

            var point1 = this.valueToPoint(major, 0.7);
            var point2 = this.valueToPoint(major, 0.85);

            this.body.append("svg:line")
                .attr("x1", point1.x)
                .attr("y1", point1.y)
                .attr("x2", point2.x)
                .attr("y2", point2.y)
                .style("stroke", "#333")
                .style("stroke-width", "2px");

            if (major == this.config.min || major == this.config.max)
            {
                var point = this.valueToPoint(major, 0.63);

                this.body.append("svg:text")
                    .attr("x", point.x)
                    .attr("y", point.y)
                    .attr("dy", fontSize / 3)
                    .attr("text-anchor", major == this.config.min ? "start" : "end")
                    .text(major)
                    .style("font-size", fontSize + "px")
                    .style("fill", "#333")
                    .style("stroke-width", "0px");
            }
        }

        var pointerContainer = this.body.append("svg:g").attr("class", "pointerContainer");

        var midValue = (this.config.min + this.config.max) / 2;

        var pointerPath = this.buildPointerPath(midValue);

        var pointerLine = d3.svg.line()
            .x(function(d) { return d.x })
            .y(function(d) { return d.y })
            .interpolate("basis");

        pointerContainer.selectAll("path")
            .data([pointerPath])
            .enter()
            .append("svg:path")
            .attr("d", pointerLine)
            .style("fill", "#ec5034")
            .style("stroke", "#ec5034")
            .style("fill-opacity", 0.7)

        pointerContainer.append("svg:circle")
            .attr("cx", this.config.cx)
            .attr("cy", this.config.cy)
            .attr("r", 0.12 * this.config.raduis)
            .style("fill", "#26A69A")
            .style("stroke", "#666")
            .style("opacity", 1);

        var fontSize = Math.round(this.config.size / 10);
        pointerContainer.selectAll("text")
            .data([midValue])
            .enter()
            .append("svg:text")
            .attr("x", this.config.cx)
            .attr("y", this.config.size - this.config.cy / 4 - fontSize)
            .attr("dy", fontSize / 2)
            .attr("text-anchor", "middle")
            .style("font-size", fontSize + "px")
            .style("fill", "#000")
            .style("stroke-width", "0px");

        this.redraw(this.config.min, 0);
    }

    this.buildPointerPath = function(value)
    {
        var delta = this.config.range / 13;

        var head = valueToPoint(value, 0.85);
        var head1 = valueToPoint(value - delta, 0.12);
        var head2 = valueToPoint(value + delta, 0.12);

        var tailValue = value - (this.config.range * (1/(270/360)) / 2);
        var tail = valueToPoint(tailValue, 0.28);
        var tail1 = valueToPoint(tailValue - delta, 0.12);
        var tail2 = valueToPoint(tailValue + delta, 0.12);

        return [head, head1, tail2, tail, tail1, head2, head];

        function valueToPoint(value, factor)
        {
            var point = self.valueToPoint(value, factor);
            point.x -= self.config.cx;
            point.y -= self.config.cy;
            return point;
        }
    }

    this.drawBand = function(start, end, color)
    {
        if (0 >= end - start) return;

        this.body.append("svg:path")
            .style("fill", color)
            .attr("d", d3.svg.arc()
                .startAngle(this.valueToRadians(start))
                .endAngle(this.valueToRadians(end))
                .innerRadius(0.65 * this.config.raduis)
                .outerRadius(0.85 * this.config.raduis))
            .attr("transform", function() { return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(270)" });
    }

    this.redraw = function(value, transitionDuration)
    {
        var pointerContainer = this.body.select(".pointerContainer");

        pointerContainer.selectAll("text").text(Math.round(value));

        var pointer = pointerContainer.selectAll("path");
        pointer.transition()
            .duration(undefined != transitionDuration ? transitionDuration : this.config.transitionDuration)
            //.delay(0)
            //.ease("linear")
            //.attr("transform", function(d)
            .attrTween("transform", function()
            {
                var pointerValue = value;
                if (value > self.config.max) pointerValue = self.config.max + 0.02*self.config.range;
                else if (value < self.config.min) pointerValue = self.config.min - 0.02*self.config.range;
                var targetRotation = (self.valueToDegrees(pointerValue) - 90);
                var currentRotation = self._currentRotation || targetRotation;
                self._currentRotation = targetRotation;

                return function(step)
                {
                    var rotation = currentRotation + (targetRotation-currentRotation)*step;
                    return "translate(" + self.config.cx + ", " + self.config.cy + ") rotate(" + rotation + ")";
                }
            });
    }

    this.valueToDegrees = function(value)
    {
        // thanks @closealert
        //return value / this.config.range * 270 - 45;
        return value / this.config.range * 270 - (this.config.min / this.config.range * 270 + 45);
    }

    this.valueToRadians = function(value)
    {
        return this.valueToDegrees(value) * Math.PI / 180;
    }

    this.valueToPoint = function(value, factor)
    {
        return { 	x: this.config.cx - this.config.raduis * factor * Math.cos(this.valueToRadians(value)),
            y: this.config.cy - this.config.raduis * factor * Math.sin(this.valueToRadians(value)) 		};
    }

    // initialization
    this.configure(configuration);
}
'use strict';

angular.module('app')
    .factory('socket', ['socketFactory', 'baseUrl', function (socketFactory,baseUrl) {
        return socketFactory({
            prefix: '',
            ioSocket: io.connect(baseUrl)
        });
        //ioSocket: io.connect(window.location.protocol+"//"+window.location.host)
}]);
/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */

'use strict';
angular.module('app')
  .directive('gauge', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        label: '@',
        min: '=',
        max: '=',
        value: '=',
        size:'='
      },
      link: function postLink(scope, element, attrs) {
        var config = {
          size: scope.size? scope.size : 220,
          label: attrs.label,
          min: undefined !== scope.min ? scope.min : 0,
          max: undefined !== scope.max ? scope.max : 100,
          minorTicks: 5
        };

        var range = config.max - config.min;
        config.yellowZones = [
          { from: config.min + range * 0.75, to: config.min + range * 0.9 }
        ];
        config.redZones = [
          { from: config.min + range * 0.9, to: config.max }
        ];

        scope.gauge = new Gauge(element[0], config);
        scope.gauge.render();
        scope.gauge.redraw(scope.value);

        scope.$watch('value', function () {
          var height = $(element).parent().parent().parent().height();
          var width = $(element).parent().parent().parent().width();

          if (scope.gauge) {
            config.size = height < width? height - 60 : width - 60;
            $( element ).children().remove();
            scope.gauge = new Gauge(element[0], config);
            scope.gauge.render();
            scope.gauge.redraw(scope.value);
          }
        });

        scope.$watch(
          function () { return $(element).parent().parent().parent().height(); },
          function (newValue, oldValue) {
            if (newValue !== oldValue) {

              var height = $(element).parent().parent().parent().height();
              var width = $(element).parent().parent().parent().width();

              config.size = height < width? height - 60 : width - 60;
              $( element ).children().remove();
              scope.gauge = new Gauge(element[0], config);
              scope.gauge.render();
              scope.gauge.redraw(scope.value);
            }
          }
        );

        scope.$watch(
          function () { return $(element).parent().parent().parent().width(); },
          function (newValue, oldValue) {
            if (newValue !== oldValue) {

              var height = $(element).parent().parent().parent().height();
              var width = $(element).parent().parent().parent().width();

              config.size = height < width? height - 60 : width - 60;
              $( element ).children().remove();
              scope.gauge = new Gauge(element[0], config);
              scope.gauge.render();
              scope.gauge.redraw(scope.value);
            }
          }
        );

      }
    };
  });

'use strict';

angular.module('app')
  .directive('lineChart', function () {
    return {
      template: '<div></div>',
      scope: {
        chart: '=',
        ymin:'=',
        ymax:'='
      },
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element) {

        var lineChart = new google.visualization.LineChart(element[0]);

        function draw(chart) {
          var data = chart.data;

          var table = new google.visualization.DataTable();
          table.addColumn('datetime');
          table.addColumn('number');
          table.addRows(data.length);

          var view = new google.visualization.DataView(table);

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            table.setCell(i, 0, new Date(item.timestamp));
            var value = parseFloat(item.value);
            table.setCell(i, 1, value);
          }

          var last = data[data.length - 1];
          var max = new Date(last.timestamp);
          var min = new Date(data[0].timestamp) //new Date(last.timestamp - chart.max * 1000);

          var chartOptions = {
            legend: 'none',
            vAxis: { minValue: scope.ymin ? scope.ymin : 0, maxValue: scope.ymax ? scope.ymax :100 },
            hAxis: { viewWindow: { min: min, max: max }}
          };

          lineChart.draw(view, chartOptions);
        }

        scope.$watch('chart', function (chart) {
          if (chart && chart.data && chart.max) {
            draw(chart);
         //   $(".line-chart").children().css("height", "");
         //   $(".line-chart div").css("position", "relative");
          }
        });
      }
    };
  });

'use strict';

/* Services */
angular.module('app').service('publicService', ['$http', function ($http) {

    this.getAllDashboards = function(id){
        return $http.get('/public/dashboards/user/'+id);
    };


    this.getAllUsers = function(){
        return $http.get('/auth/session/users/items');
    };


}]);
'use strict';

angular.module('app')
    .controller('TutorialSensorAddCtrl', ['$scope', '$rootScope', 'sensorService', function ($scope,$rootScope, sensorService) {

        var alert = null;
        $scope.sensor = { };

        $scope.save = function(form) {
            $scope.errors = {};

           sensorService.create($scope.sensor)
                .success(function (response, status, headers, config) {
                  $rootScope.$broadcast('reload-tableParams');
                  $scope.$nextStep();
                })
                .error(function(response, status, headers, config) {
                    if(!response.errors && response.message){
                        alert= alerts.create(response.message, 'danger');
                    }
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

    $scope.autocomplete = function(form) {

      $scope.sensor = {
        name: "Temperature",
        tag: "temperature",
        description:"Temperature Sensor Demo"
      }

    }



    }]);

'use strict';

angular.module('app')
    .controller('TutorialDeviceAddCtrl', ['$scope', '$rootScope', 'deviceService', 'sensorService', '$location', function ($scope,$rootScope, deviceService, sensorService, $location) {

        var alert = null;
        $scope.device = { };

        $scope.save = function(form) {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                  $rootScope.$broadcast('reload-tableParams');
                  $scope.$nextStep();
                })
                .error(function(response, status, headers, config) {
                    if(!response.errors && response.message){
                        alert= alerts.create(response.message, 'danger');
                    }
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        sensorService.getAllSensors()
            .success(function (response, status, headers, config) {
                $scope.sensors = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

            $scope.autocomplete = function(form) {

              $scope.device = {
                name: "arduino",
                description: "Arduino Demo",
                sensors:[$scope.sensors[0]._id]
              }

            }


    }]);

'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
  .controller('TutorialPanelAddCtrl', ['$scope', '$rootScope', 'panelService', 'deviceService', 'cameraService', '$location', function ($scope, $rootScope, panelService, deviceService, cameraService, $location ) {

    $scope.panel = { isPublic: true };

    $scope.save = function(form) {
      $scope.errors = {};

      panelService.create($scope.panel)
        .success(function(response, status, headers, config) {
          $rootScope.$broadcast('reload-tableParams');
          $scope.$nextStep();
        }).error(function(response, status, headers, config) {
          angular.forEach(response.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });

    };

    $scope.$watch('panel.device', function(deviceId) {

      deviceService.getFullById(deviceId)
        .success(function(response, status, headers, config) {
          $scope.sensors = response.sensors;
        }).error(function(response, status, headers, config) {
          angular.forEach(response.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
    });

    $scope.$watch('panel.camera', function(camera) {

      if(camera) {
        $scope.panel.sensor = null;
        $scope.panel.device = null;
      }

    });

    $scope.$watch('panel.sensor', function(sensor) {

      if(sensor) {
        $scope.panel.camera = null;
      }

    });

    deviceService.getAllDevices()
      .success(function(response, status, headers, config) {
        $scope.devices = response;
        $scope.panel.device = $scope.devices[0]?  $scope.devices[0]._id : null;
      })
      .error(function(response, status, headers, config) {
        angular.forEach(response.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });

    cameraService.getAllCameras()
      .success(function(response, status, headers, config) {
        $scope.cameras = response;
      })
      .error(function(response, status, headers, config) {
        angular.forEach(response.errors, function(error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });

    $scope.autocomplete = function() {

      $scope.panel = {
        type: "gauge",
        name: "Panel Temperature",
        device: $scope.devices[0]._id,
        sensor: $scope.sensors[0]._id,
        size: "small",
        isPublic: true
      }

    }


  }]);

'use strict';

angular.module('app')
    .controller('TutorialSectionAddCtrl', ['$scope', '$rootScope', 'sectionService', 'panelService', function ($scope, $rootScope, sectionService,panelService) {

        $scope.section = { isPublic: true };

        $scope.save = function(form) {
            $scope.errors = {};

           sectionService.create($scope.section)
                .success(function (response, status, headers, config) {
                   $rootScope.$broadcast('reload-tableParams');
                   $scope.$nextStep();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        panelService.getAllPanels()
            .success(function (response, status, headers, config) {
                $scope.panels = response;
                console.log(response);

            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

    $scope.autocomplete = function() {

      $scope.section = {
        description: "Temperature Group Demo",
        name: "Temperature Group",
        panels: [$scope.panels[0]._id],
        isPublic: true
      }

    }

    }]);

'use strict';

angular.module('app')
    .controller('TutorialDashboardAddCtrl', ['$scope', '$rootScope', 'dashboardService', 'sectionService', function ($scope, $rootScope, dashboardService, sectionService) {

    $scope.dashboard = { };

    $scope.save = function (form) {
        $scope.errors = {};

        dashboardService.create($scope.dashboard)
        .success(function (response, status, headers, config) {
            $rootScope.$broadcast('reload-tableParams');
            $rootScope.$broadcast('reload-myDashboard');
            $scope.$finish();
        }).error(function (response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });

    };

    sectionService.getAllSections()
    .success(function (response, status, headers, config) {
        $scope.sections = response;
    }).error(function (response, status, headers, config) {
        angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
        });
    });

    $scope.autocomplete = function() {

      $scope.dashboard = {
        description: "Demo Dashboard",
        name: "Demo",
        sections: [$scope.sections[0]._id],
        isPublic: true
      }

    }

}]);
