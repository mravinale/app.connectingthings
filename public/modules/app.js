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
    'btford.socket-io',
    'nvd3ChartDirectives',
    'localytics.directives',
    'ui.gravatar'

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
  [ '$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
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
            .state('app.user.list', {
                url:'/list',
                templateUrl: 'modules/users/views/user_list.html',
                controller: 'UserListCtrl'
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
            .state('app.page', {
                url: '/page',
                template: '<div ui-view class="fade-in-down"></div>'
            })
            .state('app.page.profile', {
                url: '/profile',
                templateUrl: 'modules/base/views/profile.html'
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
                templateUrl: 'modules/base/views/forgotpwd.html'
            })
            .state('access.404', {
                url: '/404',
                templateUrl: 'assets/tpl/page_404.html'
            })

    }
  ]
)

.run(function ($rootScope, $sessionStorage, $location, sessionService,$state,userService) {


    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {

        $rootScope.currentUser = $sessionStorage.currentUser? $sessionStorage.currentUser : $rootScope.currentUser;

        // if no currentUser and on a page that requires authorization then try to update it
        // will trigger 401s if user does not have a valid session
        if (!$rootScope.currentUser && ([  '/logout', '/signup'].indexOf($location.path()) == -1 )) {

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
    prefix: 'assets/l10n/',
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
    easyPieChart:   ['assets/js/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
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
                uiLoad.load('assets/js/libs/screenfull.min.js').then(function(){
                    if (screenfull.enabled) {
                        el.removeClass('hide');
                    }
                    el.on('click', function(){
                        var target;
                        attr.target && ( target = $(attr.target)[0] );
                        el.toggleClass('active');
                        screenfull.toggle(target);
                    });
                });
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
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', function($scope, $translate, $localStorage) {
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
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false
            }
        }

        // save settings to local storage
        if ( angular.isDefined($localStorage.settings) ) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }
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

    }]);