'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        yeoman: {
            // configurable paths
            app: require('./bower.json').publicPath || 'public',
            dist: require('./bower.json').publicPath || 'public/dist'
        },
        bower: {
            install: {
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        karma: {
          unit: {
            configFile: 'test/karma.conf.js'
          }
        },
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'server.js'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            express: {
                files: [
                    'server.js',
                    'api/{,*//*}*.{js,json}'
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            },
            livereload: {
                options: {
                    livereload: { livereload: true }
                },
                files: [
                    '<%= yeoman.app %>{,*/}*.html',
                    '<%= yeoman.app %>/modules/**/**/{,*/}*.html',
                    '<%= yeoman.app %>/modules/**/**/{,*/}*.js',
                    '<%= yeoman.app %>/styles/{,*/}*.css'
                ]
            }
        },
        useminPrepare: {
            html: 'dist/index.html',
            options: {
                dest:  'dist'
            }
        },
        usemin: {
            html: ['dist/index.html'],
            options: {
                dirs: ['dist']
            }
        },
        clean: {
            dist: {
                src: ['dist']
            }
        },
        copy: {
            dist:  {
                files: [
                    { expand: true, cwd: 'public/assets/fonts/', src: ['**'], dest: 'dist/assets/fonts/'},
                    { expand: true, cwd: 'public/assets/img/', src: ['**'], dest: 'dist/assets/img/'},
                    { expand: true, cwd: 'public/assets/l10n/', src: ['**'], dest: 'dist/assets/l10n/'},
                    { expand: true, cwd: 'public/modules/', src: ['**/views/**/*'], dest: 'dist/modules/'},
                    { expand: true, cwd: 'public/assets/templates/', src: ['**'], dest: 'dist/assets/templates/'},
                    { src: 'public/favicon.ico', dest: 'dist/favicon.ico'},
                    { src: 'public/index.html', dest: 'dist/index.html'},
                    { src: 'public/lib/chosen/chosen-sprite.png', dest: 'dist/assets/css/chosen-sprite.png'}
                ]
            }
        },
        concat: {
            style: {
                files: [
                    {
                        dest: 'dist/assets/css/style.css',
                        src: [
                                '<%= yeoman.app %>/assets/css/bootstrap.min.css',
                                '<%= yeoman.app %>/lib/nvd3/nv.d3.min.css',
                                '<%= yeoman.app %>/lib/chosen/chosen.css',
                                '<%= yeoman.app %>/lib/ng-table/ng-table.min.css',
                                '<%= yeoman.app %>/assets/css/font-awesome.min.css',
                                '<%= yeoman.app %>/assets/css/app.css',
                                '<%= yeoman.app %>/assets/css/app-admin.css',
                                '<%= yeoman.app %>/assets/css/animate.css',
                                '<%= yeoman.app %>/assets/css/simple-line-icons.css',
                                '<%= yeoman.app %>/lib/sweetalert/dist/sweetalert.css',
                                '<%= yeoman.app %>/lib/angular-gridster/dist/angular-gridster.min.css',
                                '<%= yeoman.app %>/lib/angular-loading-bar/build/loading-bar.min.css'

                        ]
                    }
                ]
            },
            app: {
                files: [
                    {
                    dest: 'dist/js/vendor.js',
                    src: [
                      '<%= yeoman.app %>/assets/js/jquery/jquery.min.js',
                      '<%= yeoman.app %>/assets/js/jquery-ui-1.10.4.min.js',

                      '<%= yeoman.app %>/assets/js/angular/angular.min.js',
                      '<%= yeoman.app %>/assets/js/angular/angular-cookies.min.js',
                      '<%= yeoman.app %>/assets/js/angular/angular-animate.min.js',
                      '<%= yeoman.app %>/assets/js/angular/angular-ui-router.min.js',
                      '<%= yeoman.app %>/assets/js/angular/angular-translate.js',
                      '<%= yeoman.app %>/assets/js/angular/ngStorage.min.js',
                      '<%= yeoman.app %>/assets/js/angular/ui-load.js',
                      '<%= yeoman.app %>/assets/js/angular/ui-jq.js',
                      '<%= yeoman.app %>/assets/js/angular/ui-validate.js',
                      '<%= yeoman.app %>/assets/js/angular/ui-bootstrap-tpls.min.js',
                      '<%= yeoman.app %>/assets/js/angular-ui.sorteable.js',
                      '<%= yeoman.app %>/assets/js/screenfull.min.js',

                      '<%= yeoman.app %>/assets/js/screenfull.min.js',
                      '<%= yeoman.app %>/assets/js/ps-responsive.js',
                      '<%= yeoman.app %>/assets/js/jquery/charts/easypiechart/jquery.easy-pie-chart.js',
                      '<%= yeoman.app %>/lib/angular-chosen-localytics/dist/angular-chosen.js',
                      '<%= yeoman.app %>/lib/angular-socket-io/socket.js',
                      '<%= yeoman.app %>/lib/angular-resource/angular-resource.js',
                      '<%= yeoman.app %>/lib/angular-cookies/angular-cookies.js',
                      '<%= yeoman.app %>/lib/angular-sanitize/angular-sanitize.js',
                      '<%= yeoman.app %>/lib/angular-route/angular-route.js',
                      '<%= yeoman.app %>/lib/angular-http-auth/src/http-auth-interceptor.js',
                      '<%= yeoman.app %>/lib/supportkit/dist/supportkit.min.js',
                      '<%= yeoman.app %>/lib/sweetalert/dist/sweetalert.min.js',
                      '<%= yeoman.app %>/lib/angular-sweetalert/SweetAlert.min.js',
                      '<%= yeoman.app %>/lib/angular-encode-uri/dist/angular-encode-uri.min.js',
                      '<%= yeoman.app %>/lib/jsondiffpatch/public/build/jsondiffpatch-full.min.js',
                      '<%= yeoman.app %>/lib/jsondiffpatch/public/build/jsondiffpatch-formatters.min.js'
                    ]
                  },
                  {
                    dest: 'dist/js/vendor2.js',
                    src: [


                      '<%= yeoman.app %>/lib/socket.io-client/socket.io.js',
                      '<%= yeoman.app %>/lib/autofill-directive/autofill-directive.js',
                      '<%= yeoman.app %>/lib/underscore/underscore.js',
                      '<%= yeoman.app %>/lib/ng-table/ng-table.min.js',
                      '<%= yeoman.app %>/lib/chosen/chosen.jquery.js',
                      '<%= yeoman.app %>/lib/momentjs/moment.js',
                      '<%= yeoman.app %>/lib/d3/d3.js',
                      '<%= yeoman.app %>/lib/nvd3/nv.d3.js',
                      '<%= yeoman.app %>/lib/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
                      '<%= yeoman.app %>/lib/angular-gravatar/build/md5.js',
                      '<%= yeoman.app %>/lib/angular-gravatar/build/angular-gravatar.js',
                      '<%= yeoman.app %>/lib/angular-re-captcha/angular-re-captcha.js',
                      '<%= yeoman.app %>/lib/angular-touch/angular-touch.js',
                      '<%= yeoman.app %>/lib/supportkit/dist/supportkit.min.js',
                      '<%= yeoman.app %>/lib/angular-multi-step-form/dist/browser/angular-multi-step-form.min.js',
                      '<%= yeoman.app %>/lib/angular-img-fallback/angular.dcb-img-fallback.min.js',
                      '<%= yeoman.app %>/lib/javascript-detect-element-resize/jquery.resize.js',
                      '<%= yeoman.app %>/lib/angular-gridster/dist/angular-gridster.min.js',
                      '<%= yeoman.app %>/lib/angular-loading-bar/build/loading-bar.min.js'

                    ]
                  },
                  {
                    dest: 'dist/js/app.js',
                    src: [

                      '<%= yeoman.app %>/modules/app.js',
                      '<%= yeoman.app %>/modules/dashboards/controllers/dashboard_me.js',
                      '<%= yeoman.app %>/modules/base/controllers/login.js',
                      '<%= yeoman.app %>/modules/base/controllers/signup.js',
                      '<%= yeoman.app %>/modules/base/controllers/forgotpwd.js',
                      '<%= yeoman.app %>/modules/base/controllers/changepwd.js',
                      '<%= yeoman.app %>/modules/base/controllers/suscription.js',
                      '<%= yeoman.app %>/modules/base/controllers/navbar.js',
                      '<%= yeoman.app %>/modules/base/controllers/header.js',
                      '<%= yeoman.app %>/modules/base/controllers/public.js',
                      '<%= yeoman.app %>/modules/base/controllers/public_list.js',
                      '<%= yeoman.app %>/modules/base/controllers/tutorial.js',
                      '<%= yeoman.app %>/modules/dashboards/controllers/dashboard_add.js',
                      '<%= yeoman.app %>/modules/dashboards/controllers/dashboard_edit.js',
                      '<%= yeoman.app %>/modules/dashboards/controllers/dashboard_list.js',
                      '<%= yeoman.app %>/modules/sections/controllers/section_add.js',
                      '<%= yeoman.app %>/modules/sections/controllers/section_edit.js',
                      '<%= yeoman.app %>/modules/sections/controllers/section_list.js',
                      '<%= yeoman.app %>/modules/panels/controllers/panel_add.js',
                      '<%= yeoman.app %>/modules/panels/controllers/panel_edit.js',
                      '<%= yeoman.app %>/modules/panels/controllers/panel_list.js',
                      '<%= yeoman.app %>/modules/devices/controllers/device_add.js',
                      '<%= yeoman.app %>/modules/devices/controllers/device_edit.js',
                      '<%= yeoman.app %>/modules/devices/controllers/device_list.js',
                      '<%= yeoman.app %>/modules/sensors/controllers/sensor_add.js',
                      '<%= yeoman.app %>/modules/sensors/controllers/sensor_edit.js',
                      '<%= yeoman.app %>/modules/sensors/controllers/sensor_list.js',
                      '<%= yeoman.app %>/modules/cameras/controllers/camera_add.js',
                      '<%= yeoman.app %>/modules/cameras/controllers/camera_edit.js',
                      '<%= yeoman.app %>/modules/cameras/controllers/camera_list.js',
                      '<%= yeoman.app %>/modules/users/controllers/user_add.js',
                      '<%= yeoman.app %>/modules/users/controllers/user_edit.js',
                      '<%= yeoman.app %>/modules/users/controllers/user_list.js',
                      '<%= yeoman.app %>/modules/users/controllers/user_settings.js',
                      '<%= yeoman.app %>/modules/users/factories/md5.js',
                      '<%= yeoman.app %>/modules/organizations/controllers/organization_add.js',
                      '<%= yeoman.app %>/modules/organizations/controllers/organization_edit.js',
                      '<%= yeoman.app %>/modules/organizations/controllers/organization_list.js',
                      '<%= yeoman.app %>/modules/triggers/controllers/trigger_add.js',
                      '<%= yeoman.app %>/modules/triggers/controllers/trigger_edit.js',
                      '<%= yeoman.app %>/modules/triggers/controllers/trigger_list.js',
                      '<%= yeoman.app %>/modules/base/services/Session.js',
                      '<%= yeoman.app %>/modules/panels/services/panel_service.js',
                      '<%= yeoman.app %>/modules/cameras/services/camera_service.js',
                      '<%= yeoman.app %>/modules/users/services/user_service.js',
                      '<%= yeoman.app %>/modules/triggers/services/trigger_service.js',
                      '<%= yeoman.app %>/modules/devices/services/device_service.js',
                      '<%= yeoman.app %>/modules/sensors/services/sensor_service.js',
                      '<%= yeoman.app %>/modules/sections/services/section_service.js',
                      '<%= yeoman.app %>/modules/dashboards/services/dashboard_service.js',
                      '<%= yeoman.app %>/modules/panels/services/message_service.js',
                      '<%= yeoman.app %>/modules/organizations/services/organization_service.js',
                      '<%= yeoman.app %>/modules/common/directives/onFocus.js',
                      '<%= yeoman.app %>/modules/common/directives/mongooseError.js',
                      '<%= yeoman.app %>/modules/common/directives/headway.js',
                      '<%= yeoman.app %>/modules/panels/directives/panel_gauge.js',
                      '<%= yeoman.app %>/modules/panels/directives/panel_lineD3Chart.js',
                      '<%= yeoman.app %>/modules/panels/directives/panel_info.js',
                      '<%= yeoman.app %>/modules/panels/directives/panel_switch.js',
                      '<%= yeoman.app %>/modules/panels/directives/panel_camera.js',
                      '<%= yeoman.app %>/modules/panels/directives/panel_led.js',
                      '<%= yeoman.app %>/modules/common/vendor/gauge.js',
                      '<%= yeoman.app %>/modules/common/factories/websocket.js',
                      '<%= yeoman.app %>/modules/common/directives/gauge.js',
                      '<%= yeoman.app %>/modules/common/directives/lineChart.js',
                      '<%= yeoman.app %>/modules/base/services/Public.js',
                      '<%= yeoman.app %>/modules/base/controllers/modals/tutorial/tutorial_sensor_add.js',
                      '<%= yeoman.app %>/modules/base/controllers/modals/tutorial/tutorial_device_add.js',
                      '<%= yeoman.app %>/modules/base/controllers/modals/tutorial/tutorial_panel_add.js',
                      '<%= yeoman.app %>/modules/base/controllers/modals/tutorial/tutorial_section_add.js',
                      '<%= yeoman.app %>/modules/base/controllers/modals/tutorial/tutorial_dashboard_add.js'
                    ]
                  }
                ]
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist:{
                expand: true,
                src: ['dist/js/app.js']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/js/app.js': [ 'dist/js/app.js' ],
                    'dist/js/vendor.js': [ 'dist/js/vendor.js' ],
                    'dist/js/vendor2.js': [ 'dist/js/vendor2.js' ]
                }
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/assets/css/style.css': [ 'dist/assets/css/style.css' ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('server', [
        //  'jshint',
        'bower',
        'express:dev',
        'open',
        'watch'
    ]);
    grunt.registerTask('test', [
        //  'jshint',
        'bower'
    ]);
    grunt.registerTask('heroku:production', [
        'bower'
    ]);
    grunt.registerTask('default', [
        //  'jshint',
        'bower'
    ]);
    grunt.registerTask('build', [
      //  'bower',
        'clean:dist',
        'copy:dist',
        'useminPrepare',
//        'concat:lib',
        'concat:app',
        'ngAnnotate:dist',
        'uglify:dist',
        'usemin',
        'concat:style',
       // 'htmlbuild:dist',
        'cssmin:dist'

    ]);

};
