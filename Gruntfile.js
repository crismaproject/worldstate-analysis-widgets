// Generated on 2014-03-18 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.registerMultiTask('echoMessage', 'Echo message', function () {
      grunt.log.writeln(grunt.log.wordlist([this.data], {color: 'yellow'}));
  });
  
  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    watch: {
       coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['copy:styles', 'autoprefixer']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    autoprefixer: {
      options: ['last 1 version'],
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      // cleans cdnified and test components
      deploy: {
          src: [
              '<%= yeoman.dist %>/bower_components/angular',
              '<%= yeoman.dist %>/bower_components/angular-resource',
              '<%= yeoman.dist %>/bower_components/angular-mocks',
              '<%= yeoman.dist %>/bower_components/angular-scenario',
              '<%= yeoman.dist %>/bower_components/jquery',
          ]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    },
     coffee: {
      options: {
        sourceMap: true,
        sourceRoot: ''
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
     // not used since Uglify task does concat,
    // but still available if needed
    concat: {
      dist: {
          src: '<%= yeoman.app %>/scripts/**/*.js',
          dest: '<%= yeoman.dist %>/scripts/worldstate-analysis-widget.js'
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      // By default, your `index.html` <!-- Usemin Block --> will take care of
      // minification. This option is pre-configured if you do not wish to use
      // Usemin blocks.
      // dist: {
      //   files: {
      //     '<%= yeoman.dist %>/styles/main.css': [
      //       '.tmp/styles/{,*/}*.css',
      //       '<%= yeoman.app %>/styles/{,*/}*.css'
      //     ]
      //   }
      // }
    },
    htmlmin: {
            dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      },
      deploy: {
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
       dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{gif,webp}',
            'styles/fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
    },
    concurrent: {
      server: [
        'coffee:dist',
        'copy:styles'
      ],
      test: [
        'coffee',
        'copy:styles'
      ],
      dist: [
        'coffee',
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin:dist'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
     dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
        }]
      }
    }/*,
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    }*/,
    ngtemplates: {
        dist: {
            options: {
                module: 'eu.crismaproject.worldstateAnalysis.directives',
                htmlmin:  '<%= htmlmin.deploy %>',
                usemin: 'scripts/worldstate-analysis-widget.min.js'
            },
            cwd: '<%= yeoman.app %>',
            src: 'templates/**.html',
            dest: '<%= yeoman.dist %>/scripts/worldstate-analysis-widget.min.js'
        },
        deploy: {
            options: {
                module: 'eu.crismaproject.worldstateAnalysis.directives'
            },
            cwd: '<%= yeoman.app %>',
            src: 'templates/**.html',
            dest: '<%= yeoman.dist %>/scripts/worldstate-analysis-widget-tpl.js'
        }
    },
    // we do this since the grunt-google-cdn plugin is stale, quick and dirty
    replace: {
        cdnify: {
            src: ['<%= yeoman.dist %>/index.html'],
            dest: ['<%= yeoman.dist %>/index.html'],
            replacements: [
                {from: 'bower_components/bootstrap/dist/css/bootstrap.css', to: '//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css'},
                {from: 'bower_components/bootstrap/dist/js/bootstrap.js', to: '//netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js'},
                {from: 'bower_components/angular/angular.js', to: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.min.js'},
                {from: 'bower_components/angular-resource/angular-resource.js', to: '//ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular-resource.min.js'},
                {from: 'bower_components/jquery/dist/jquery.js', to: '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'},
                {from: 'bower_components/jquery-ui/ui/jquery-ui.js', to: '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js'},
                // mixed opinion on this topic (replace bower dep with min on dist creation), but no solution
                {from: 'bower_components/angular-commons/dist/scripts/angular-commons.js', to: 'bower_components/angular-commons/dist/scripts/angular-commons.min.js'}
            ]
        },
        // we would like to use uglify but its dead code removal won't find the debug statements as they don't use a 
        // global var but an injected one, maybe reconsider debug config in the future
        debugCode: {
            // this is the concatenated file
            src: ['.tmp/concat/scripts/worldstate-analysis-widget.min.js'],
            dest: ['.tmp/concat/scripts/worldstate-analysis-widget.min.js'],
            replacements: [
                // unfortunately we cannot simply match opening { and count other opening { and then match the last closing one
                // if this is needed some time in the future, we have to match everything and process the text in a to-function
                // 
                {from: /if\s*\(\s*DEBUG\s*\)\s*\{\s*console\s*\.\s*log\s*\(\s*('|").*\1??\s*\)\s*;?\s*\}/g, to: ''}
            ]
            
        }
    },
    echoMessage: {
        message: 'REMEMBER TO UPDATE REPLACE AND CLEAN TASKS IF BOWER DEPS ARE CHANGED!'
    },
    concat_css: {
        all: {
            src: ['<%= yeoman.app %>/styles/**/*.css'],
            dest: '<%= yeoman.dist %>/styles/worldstate-analysis-widget.css'
        }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
//    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concat',
    'ngtemplates:dist',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'copy:dist',
    'cdnify',
    'replace:cdnify',
    'clean:deploy',
    'ngmin',
    'cssmin',
    'concat_css',
    'replace:debugCode',
    'uglify',
//    'rev',
    'usemin',
    'htmlmin:deploy',
    'ngtemplates:deploy',
    'echoMessage'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
