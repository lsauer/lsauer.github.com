'use strict';

module.exports = function(grunt){

    /* Configure
  ============================ */
    var configs = {

        css_combine_files : [
            'src/css/vendor/zocial/zocial.css',
            'src/css/flags32.css',
            'src/css/vendor/bootstrap.min.css',
            'src/css/compiled.css'],

        js_combine_files : [
            'src/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js',
            'src/js/vendor/jquery-1.10.1.min.js',
            'src/js/vendor/skrollr.js',
            'src/js/vendor/imagesloaded.js',
            'src/js/vendor/bootstrap.min.js',
            'src/js/vendor/hammer.min.js',
            'src/js/main.js'],

        js_hint_files : [
            'src/js/main.js'],

        watch_files : [
            'src/sass/*',
            'src/js/*',
            'src/css/*'],

        sass_files : 'src/vendor/css'
    };

    /* Init
  ============================ */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/css/compiled.css': 'src/sass/main.scss'
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                },
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: configs.js_combine_files,
                dest: 'src/js/compiled.js',
            },
        },
        uglify: {
            my_target: {
                files: {
                    'src/dist/dist-compiled.min.js' : 'src/js/compiled.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'src/dist/dist-main.min.css' : configs.css_combine_files
                }
            }
        },
        watch: {
            css: {
                files: ['src/sass/*'],
                tasks: ['sass']
            },
            src: {
                files: configs.watch_files,
                tasks: ['build']
            }
        },
        stylelint: {
            options: {
                configFile: '.stylelintrc',
                formatter: 'string',
                ignoreDisables: false,
                failOnError: true,
                outputFile: '',
                reportNeedlessDisables: false,
                syntax: ''
            },
            src: [
                'src/css/**/*.{css,less,scss}'
            ]
        }
        });

        // Add plugins
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-jshint');

        // Register tasks
        grunt.registerTask('build', ['cssmin','concat','uglify','jshint', 'sass']);
        grunt.registerTask('default', ['watch']);

        grunt.event.on('watch', function(action, filepath) {
        grunt.log.writeln(filepath + ' has ' + action);
    });

};
