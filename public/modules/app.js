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
    'localytics.directives'

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
         /* .state('app.ui', {
                url: '/ui',
                template: '<div ui-view class="fade-in-right"></div>'
            })
            .state('app.ui.portlet', {
                url: '/portlet',
                templateUrl: 'assets/tpl/ui_portlet.html'
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


            // pages
            .state('app.page', {
                url: '/page',
                template: '<div ui-view class="fade-in-down"></div>'
            })
            .state('app.page.profile', {
                url: '/profile',
                templateUrl: 'assets/tpl/page_profile.html'
            })
            // others
            .state('access', {
                url: '/access',
                template: '<div ui-view class="fade-in-right-big smooth"></div>'
            })
            .state('access.signin', {
                url: '/signin',
                templateUrl: 'assets/tpl/page_signin.html',
                controller: 'LoginCtrl'
            })
            .state('access.signup', {
                url: '/signup',
                templateUrl: 'assets/tpl/page_signup.html'
            })
            .state('access.forgotpwd', {
                url: '/forgotpwd',
                templateUrl: 'assets/tpl/page_forgotpwd.html'
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

angular.module('app.filters', [])
    .filter('fromNow', function() {
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

    }])

    // bootstrap controller
    .controller('AccordionDemoCtrl', ['$scope', function($scope) {
        $scope.oneAtATime = true;

        $scope.groups = [
            {
                title: 'Accordion group header - #1',
                content: 'Dynamic group body - #1'
            },
            {
                title: 'Accordion group header - #2',
                content: 'Dynamic group body - #2'
            }
        ];

        $scope.items = ['Item 1', 'Item 2', 'Item 3'];

        $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push('Item ' + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }])
    .controller('AlertDemoCtrl', ['$scope', function($scope) {
        $scope.alerts = [
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
            { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
            { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
        ];

        $scope.addAlert = function() {
            $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }])
    .controller('ButtonsDemoCtrl', ['$scope', function($scope) {
        $scope.singleModel = 1;

        $scope.radioModel = 'Middle';

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };
    }])
    .controller('CarouselDemoCtrl', ['$scope', function($scope) {
        $scope.myInterval = 5000;
        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            slides.push({
                image: 'img/c' + slides.length + '.jpg',
                text: ['Carousel text #0','Carousel text #1','Carousel text #2','Carousel text #3'][slides.length % 4]
            });
        };
        for (var i=0; i<4; i++) {
            $scope.addSlide();
        }
    }])
    .controller('DropdownDemoCtrl', ['$scope', function($scope) {
        $scope.items = [
            'The first choice!',
            'And another choice for you.',
            'but wait! A third!'
        ];

        $scope.status = {
            isopen: false
        };

        $scope.toggled = function(open) {
            //console.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    }])
    .controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
        $scope.items = ['item1', 'item2', 'item3'];
        var ModalInstanceCtrl = function ($scope, $modalInstance, items) {
            $scope.items = items;
            $scope.selected = {
                item: $scope.items[0]
            };

            $scope.ok = function () {
                $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        $scope.open = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: ModalInstanceCtrl,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }])
    .controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $log.info('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    }])
    .controller('PopoverDemoCtrl', ['$scope', function($scope) {
        $scope.dynamicPopover = 'Hello, World!';
        $scope.dynamicPopoverTitle = 'Title';
    }])
    .controller('ProgressDemoCtrl', ['$scope', function($scope) {
        $scope.max = 200;

        $scope.random = function() {
            var value = Math.floor((Math.random() * 100) + 1);
            var type;

            if (value < 25) {
                type = 'success';
            } else if (value < 50) {
                type = 'info';
            } else if (value < 75) {
                type = 'warning';
            } else {
                type = 'danger';
            }

            $scope.showWarning = (type === 'danger' || type === 'warning');

            $scope.dynamic = value;
            $scope.type = type;
        };
        $scope.random();

        $scope.randomStacked = function() {
            $scope.stacked = [];
            var types = ['success', 'info', 'warning', 'danger'];

            for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
                var index = Math.floor((Math.random() * 4));
                $scope.stacked.push({
                    value: Math.floor((Math.random() * 30) + 1),
                    type: types[index]
                });
            }
        };
        $scope.randomStacked();
    }])
    .controller('TabsDemoCtrl', ['$scope', function($scope) {
        $scope.tabs = [
            { title:'Dynamic Title 1', content:'Dynamic content 1' },
            { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
        ];
    }])
    .controller('RatingDemoCtrl', ['$scope', function($scope) {
        $scope.rate = 7;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };
    }])
    .controller('TooltipDemoCtrl', ['$scope', function($scope) {
        $scope.dynamicTooltip = 'Hello, World!';
        $scope.dynamicTooltipText = 'dynamic';
        $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
    }])
    .controller('TypeaheadDemoCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.selected = undefined;
        $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
        // Any function returning a promise object can be used to load values asynchronously
        $scope.getLocation = function(val) {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: val,
                    sensor: false
                }
            }).then(function(res){
                var addresses = [];
                angular.forEach(res.data.results, function(item){
                    addresses.push(item.formatted_address);
                });
                return addresses;
            });
        };
    }])
    .controller('DatepickerDemoCtrl', ['$scope', function($scope) {
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1,
            class: 'datepicker'
        };

        $scope.initDate = new Date('2016-15-20');
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
    }])
    .controller('TimepickerDemoCtrl', ['$scope', function($scope) {
        $scope.mytime = new Date();

        $scope.hstep = 1;
        $scope.mstep = 15;

        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };

        $scope.ismeridian = true;
        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.update = function() {
            var d = new Date();
            d.setHours( 14 );
            d.setMinutes( 0 );
            $scope.mytime = d;
        };

        $scope.changed = function () {
            //console.log('Time changed to: ' + $scope.mytime);
        };

        $scope.clear = function() {
            $scope.mytime = null;
        };
    }])

    // Form controller
    .controller('FormDemoCtrl', ['$scope', function($scope) {
        $scope.notBlackListed = function(value) {
            var blacklist = ['bad@domain.com','verybad@domain.com'];
            return blacklist.indexOf(value) === -1;
        }
    }])

    // Flot Chart controller
    .controller('FlotChartDemoCtrl', ['$scope', function($scope) {
        $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];

        $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

        $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

        $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

        $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

        $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

        $scope.d2 = [];

        for (var i = 0; i < 20; ++i) {
            $scope.d2.push([i, Math.sin(i)]);
        }

        $scope.d3 = [
            { label: "iPhone5S", data: 40 },
            { label: "iPad Mini", data: 10 },
            { label: "iPad Mini Retina", data: 20 },
            { label: "iPhone4S", data: 12 },
            { label: "iPad Air", data: 18 }
        ];

        $scope.getRandomData = function() {
            var data = [],
                totalPoints = 150;
            if (data.length > 0)
                data = data.slice(1);
            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50,
                    y = prev + Math.random() * 10 - 5;
                if (y < 0) {
                    y = 0;
                } else if (y > 100) {
                    y = 100;
                }
                data.push(y);
            }
            // Zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i) {
                res.push([i, data[i]])
            }
            return res;
        }

        $scope.d4 = $scope.getRandomData();

    }])
    // jVectorMap controller
    .controller('JVectorMapDemoCtrl', ['$scope', function($scope) {
        $scope.world_markers = [
            {latLng: [41.90, 12.45], name: 'Vatican City'},
            {latLng: [43.73, 7.41], name: 'Monaco'},
            {latLng: [-0.52, 166.93], name: 'Nauru'},
            {latLng: [-8.51, 179.21], name: 'Tuvalu'},
            {latLng: [43.93, 12.46], name: 'San Marino'},
            {latLng: [47.14, 9.52], name: 'Liechtenstein'},
            {latLng: [7.11, 171.06], name: 'Marshall Islands'},
            {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
            {latLng: [3.2, 73.22], name: 'Maldives'},
            {latLng: [35.88, 14.5], name: 'Malta'},
            {latLng: [12.05, -61.75], name: 'Grenada'},
            {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
            {latLng: [13.16, -59.55], name: 'Barbados'},
            {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
            {latLng: [-4.61, 55.45], name: 'Seychelles'},
            {latLng: [7.35, 134.46], name: 'Palau'},
            {latLng: [42.5, 1.51], name: 'Andorra'},
            {latLng: [14.01, -60.98], name: 'Saint Lucia'},
            {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
            {latLng: [1.3, 103.8], name: 'Singapore'},
            {latLng: [1.46, 173.03], name: 'Kiribati'},
            {latLng: [-21.13, -175.2], name: 'Tonga'},
            {latLng: [15.3, -61.38], name: 'Dominica'},
            {latLng: [-20.2, 57.5], name: 'Mauritius'},
            {latLng: [26.02, 50.55], name: 'Bahrain'},
            {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
        ];

        $scope.usa_markers = [
            {latLng: [40.71, -74.00], name: 'New York'},
            {latLng: [34.05, -118.24], name: 'Los Angeles'},
            {latLng: [41.87, -87.62], name: 'Chicago'},
            {latLng: [29.76, -95.36], name: 'Houston'},
            {latLng: [39.95, -75.16], name: 'Philadelphia'},
            {latLng: [38.90, -77.03], name: 'Washington'},
            {latLng: [37.36, -122.03], name: 'Silicon Valley'}
        ];
    }])
;