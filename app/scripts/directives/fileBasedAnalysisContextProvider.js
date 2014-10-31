angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'fileContextProvider',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                'worldstates': '=',
                'selectedWorldstates': '=',
                'decisionStrategies': '=',
                'criteriaFunctions': '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/fileContextProviderTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.FileContextProviderDirectiveController'
            };
        }
    ]
    );