angular.module(
    'eu.crismaproject.worldstateAnalysis.directives'
).directive(
    'relationAnalysisChart',
    [
        'de.cismet.crisma.ICMM.Worldstates',
        function () {
            'use strict';

            var scope;
            scope = {
                worldstates: '&',
                chartHeight: '@height',
                forCriteria: '=',
                criteriaFunctionSet: '=criteriaFunction'
            };

            return {
                scope: scope,
                restrict: 'E',
                templateUrl: 'templates/relationAnalysisChartTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.RelationAnalysisChartDirectiveController'
            };
        }
    ]
);