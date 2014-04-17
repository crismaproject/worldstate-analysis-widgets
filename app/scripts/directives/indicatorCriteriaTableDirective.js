angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'indicatorCriteriaTable',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                worldstates: '=',
                forCriteria: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorCriteriaTableTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaTableDirectiveController'
            };
        }
    ]
);