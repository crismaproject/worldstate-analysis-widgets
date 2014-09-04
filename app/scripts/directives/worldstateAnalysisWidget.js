angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'worldstateAnalysisWidget',
    [
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates:'=',
                criteriaFunctionSets:'=',
                selectedCriteriaFunction:'='
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl:'templates/worldstateAnalysisWidgetTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.WorldstateAnalysisWidgetDirectiveController'
            };
        }
    ]
    );