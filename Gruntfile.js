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
                configFile: 'test/karma.conf.js',
                singleRun: true
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
            html: '<%%= yeoman.app %>/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%%= yeoman.dist %>/assets/css/{,*/}*.css'],
            options: {
                dirs: ['<%%= yeoman.dist %>']
            }
        },
        concat: {
            generated: {
                files: [
                    {
                        dest: '<%%= yeoman.dist %>/js/angular.js',
                        src: [
                            '<%%= yeoman.app %>/assets/js/angular/angular.min.js',
                            '<%%= yeoman.app %>/assets/js/angular/angular-cookies.min.js',
                            '<%%= yeoman.app %>/assets/js/angular/angular-animate.min.js',
                            '<%%= yeoman.app %>/assets/js/angular/angular-ui-router.min.js',
                            '<%%= yeoman.app %>/assets/js/angular/angular-translate.js',
                            '<%%= yeoman.app %>/assets/js/angular/ngStorage.min.js',
                            '<%%= yeoman.app %>/assets/js/angular/ui-load.js',
                            '<%%= yeoman.app %>/assets/js/angular/ui-jq.js',
                            '<%%= yeoman.app %>/assets/js/angular/ui-validate.js',
                            '<%%= yeoman.app %>/assets/js/angular/ui-bootstrap-tpls.min.js'
                        ]
                    }
                ]
            }
        },
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%%= yeoman.dist %>/scripts',
                        src: '*.js',
                        dest: '<%%= yeoman.dist %>/scripts'
                    }
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/scripts/scripts.js': [
                        '<%%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.registerTask('server', [
        //  'jshint',
        'bower',
        'express:dev',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        //  'jshint',
        'bower',
        'karma'
    ]);

    grunt.registerTask('heroku:production', [
        'bower'
    ]);


    grunt.registerTask('default', [
        //  'jshint',
        'bower'
    ]);

    grunt.registerTask('build', [
        'useminPrepare',
        'concat:generated'
    ]);

};
