// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',
        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],
        // list of files / patterns to load in the browser
        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/ng-table/ng-table.js',
            // for some reason */** globbering does not work as expected :/
            'app/scripts/app.js',
            'app/scripts/controllers/initialiserController.js',
            'app/scripts/controllers/mainController.js',
            'app/scripts/controllers/indicatorCriteriaTableDirectiveController.js',
            'app/scripts/directives/initialiserDirective.js',
            'app/scripts/directives/indicatorCriteriaTableDirective.js',
            'app/scripts/services/initialiserService.js',
            'app/scripts/services/mainService.js',
            'app/scripts/services/analysisService.js',
            'test/mock/**/*.js',
            'test/spec/**/*.js'
        ],
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
