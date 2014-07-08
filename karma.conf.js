// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
config.set({
// base path, that will be used to resolve files and exclude
basePath: '',
    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],
//    plugins: [
//        // these plugins will be require() by Karma
//        'karma-ng-html2js-preprocessor',
//        ],
    // list of files / patterns to load in the browser
    files: [
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/ng-table/ng-table.js',
        'app/bower_components/icmm_js/dist/scripts/icmm_js.js',
        'app/scripts/directives/indicatorCriteriaTableDirective.js',
        'app/scripts/**/*.js',
        'app/templates/**/*.html',
//            'test/mock/**/*.js',
        'test/spec/**/*.js'
    ],
    preprocessors: {
    'app/templates/*.html': 'ng-html2js'
    },
    ngHtml2JsPreprocessor: {
    stripPrefix: 'app/'
    },
    // list of files / patterns to exclude
    exclude: [],
    // web server port
    port: 8080,
    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
});
    };
