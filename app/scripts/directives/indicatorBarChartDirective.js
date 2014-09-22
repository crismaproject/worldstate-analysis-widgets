angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'indicatorBarCharts',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorBarChartTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.indicatorBarChartDirectiveController'
            };
        }
    ]
);