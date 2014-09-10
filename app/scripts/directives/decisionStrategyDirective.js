angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'decisionStrategy',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                decisionStrategy: '=',
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/decisionStrategyTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.DecisionStrategyDirectiveController'
            };
        }
    ]
);