angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
    ).directive(
    'worldstateAnalysisWidget',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        function (WorldstateService) {
            'use strict';

            var scope, linkFunction, drawLegend;
            scope = {
                worldstates:'=',
                criteriaFunctionSets:'=',
                selectedCriteriaFunction:"="
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