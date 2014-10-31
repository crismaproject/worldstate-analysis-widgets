angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'icmmContextProvider',
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
                templateUrl: 'templates/icmmContextProviderTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IcmmContextProviderDirectiveController'
            };
        }
    ]
    );