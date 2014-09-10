angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'decisionStrategyManager',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                decisionStrategies: '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/decisionStrategyManagerTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.decisionStrategyManagerDirectiveController'
            };
        }
    ]
);