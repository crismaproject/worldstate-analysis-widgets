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
                forCriteria: '='
            };

            return {
                scope: scope,
                restrict: 'E',
                link:function(scope,elem){
                    console.log("elem width: "+elem.width())
                },
                templateUrl: 'templates/relationAnalysisChartTemplate.html',
                controller: 'eu.crismaproject.worldstateAnalysis.controllers.RelationAnalysisChartDirectiveController'
            };
        }
    ]
    );