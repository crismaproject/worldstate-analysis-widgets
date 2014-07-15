angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'indicatorCriteriaAxisChooser',
    [
        function () {
            'use strict';

            var scope;

            scope = {
                iccObject: '=',
                isXAxis: '@',
                selectedAxis: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/indicatorCriteriaAxisChooserTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.IndicatorCriteriaAxisChooserDirectiveController'
            };
        }
    ]
);